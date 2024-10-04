const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const OpenAI = require('openai');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3000;

// Enable CORS for all requests from the frontend
app.use(cors());

// Initialize OpenAI with the API key from the .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const imageFolder = './uploads';
const outputFolder = './output';

// Ensure the image upload folder exists
if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
}

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Function to upload an image to Imgur and return the URL
async function uploadImageToImgur(imagePath) {
    const form = new FormData();
    form.append("image", fs.createReadStream(imagePath));

    const config = {
        headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            ...form.getHeaders(),
        },
    };

    try {
        const response = await axios.post("https://api.imgur.com/3/upload", form, config);
        console.log(`Image uploaded to Imgur successfully: ${response.data.data.link}`);
        return response.data.data.link; // Return the public image URL from Imgur
    } catch (error) {
        console.error("Error uploading image to Imgur:", error.message);
        throw new Error("Image upload to Imgur failed.");
    }
}

// Function to generate a description of the image using OpenAI GPT
async function generateImageDescription(imageUrl) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Adjust model as needed
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,  // Use the uploaded image URL here
              },
            },
          ],
        },
      ],
    });
  
    // Extract and return the description from the response
    return response.choices[0].message.content;
  }

  // Function to generate a topic name based on the image description
async function generateTopicName(imageDescription) {
    const prompt = `Generate a short and appropriate topic name for the following image description: "${imageDescription}"`;
  
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Adjust model as needed
      messages: [{ role: "user", content: prompt }]
    });
  
    return response.choices[0].message.content.trim();
  }

// Function to generate MCQs and cue cards based on image description
async function generateQuestionsAndCueCards(imageDescription) {
    const prompt = `Based on the following image description: "${imageDescription}", generate:
  - multiple-choice questions with 4 answer choices each (ensure the questions are directly related to the description and factual).
  - For each question, provide the correct answer, clearly marked.`;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Adjust model as needed
      messages: [{ role: "user", content: prompt }]
    });
    generatedText=response.choices[0].message.content.trim();
    const mcQuestions = parseGeneratedText(generatedText);
    return mcQuestions
  }

// Helper to parse generated text into MCQs and cue cards
function parseGeneratedText(text) {
    // Split the text into sections, ensuring no empty sections and unnecessary headings
    const section = text.replace(/^\d+\.\s*/gm, ''); 
    const sections = section.split(/\n\s*\n/).filter(section => section.trim() !== '');  // Clean up empty sections
    const mcQuestions = sections.slice(0, 9);  // First 3 sections for MCQs
    return mcQuestions;
}


// Function to save MCQs and cue cards to a single file
function saveToFile(topicName, mcQuestions) {
    const fileName = `${outputFolder}/${topicName}.txt`;
    let fileContent = `Topic: ${topicName}\n\n`;

    // Append the MCQs to the file content
    fileContent += "Multiple Choice Questions:\n";
    mcQuestions.forEach((question, index) => {
        // Clean up the question formatting and avoid extra symbols like ###
        const cleanedQuestion = question.replace(/#+/g, '').trim();  // Remove Markdown-like headers
        fileContent += ` ${cleanedQuestion}\n\n`;
    });
    
    fs.writeFileSync(fileName, fileContent, (err) => {
        if (err) throw err;
    });

    console.log(`All MCQs saved to: ${fileName}`);
}
// Handle file upload and process via Imgur and OpenAI
app.post('/upload', upload.single('file'), async (req, res) => {
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    try {
        const imageUrl = await uploadImageToImgur(imagePath); // Upload to Imgur
        const content = await generateImageDescription(imageUrl); // Get description and questions
        // Log the content being sent back to the frontend
        console.log("Generated content:", content);
        const mcQuestions = await generateQuestionsAndCueCards(content);
        // Log the content being sent back to the frontend
        console.log("Generated mcq:",mcQuestions  );
        const topicname = await generateTopicName(content);
        // Log the content being sent back to the frontend
        console.log("Topic name:",topicname );
        // Step 5: Save all MCQs and cue cards to a single file
        saveToFile(topicname , mcQuestions);
        res.status(200).json({ success: true, content });
    } catch (error) {
        console.error("Error processing image:", error.message);
        res.status(500).json({ success: false, message: 'Failed to process image.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
