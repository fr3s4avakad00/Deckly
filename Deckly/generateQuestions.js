require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');


// Initialize OpenAI with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const imageFolder = './images';  // Local image folder
const outputFolder = './output'; // Output folder for generated MCQs and cue cards
const logFile = './processedImages.log'; // Log file to keep track of processed images

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Ensure the log file exists
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '', (err) => {
    if (err) throw err;
  });
}

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
    return response.data.data.link; // Return the public image URL from Imgur
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    throw new Error("Image upload failed.");
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
    model: "gpt-3.5-turbo", // Adjust model as needed
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content.trim();
}

// Function to generate MCQs and cue cards based on image description
async function generateQuestionsAndCueCards(imageDescription) {
  const prompt = `Based on this image description: "${imageDescription}", generate 3 multiple-choice questions (with 4 answer choices each and provide the right answer below the choices) and 3 cue cards. The cue cards should have the same question and answer. there should not be a heading (multiple choice: ) on any of the files. `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Adjust model as needed
    messages: [{ role: "user", content: prompt }]
  });

  const generatedText = response.choices[0].message.content.trim();
  const [mcQuestions, cueCards] = parseGeneratedText(generatedText);

  return { mcQuestions, cueCards };
}

// Helper to parse generated text into MCQs and cue cards
function parseGeneratedText(text) {
  const sections = text.split('\n\n');  // Splitting text into sections
  const mcQuestions = sections.slice(0, 3);  // First 3 sections for MCQs
  const cueCards = sections.slice(3, 6);     // Next 3 sections for cue cards
  return [mcQuestions, cueCards];
}

// Function to save MCQs and cue cards to individual files
function saveToFile(topicName, mcQuestions, cueCards) {
  mcQuestions.forEach((question, index) => {
    const mcFileName = `${outputFolder}/${topicName}_mc_${index + 1}.txt`;
    fs.writeFileSync(mcFileName, question, (err) => {
      if (err) throw err;
    });
  });

  cueCards.forEach((card, index) => {
    const cueFileName = `${outputFolder}/${topicName}_qcard_${index + 1}.txt`;
    fs.writeFileSync(cueFileName, card, (err) => {
      if (err) throw err;
    });
  });

  console.log(`MCQs and Cue Cards saved for topic: ${topicName}`);
}

// Function to check if the image has already been processed
function isImageProcessed(imageName) {
  const processedImages = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean);
  return processedImages.includes(imageName);
}

// Function to mark the image as processed
function markImageAsProcessed(imageName) {
  fs.appendFileSync(logFile, imageName + '\n', (err) => {
    if (err) throw err;
  });
}

// Main function to process images from the folder
async function processImagesFromFolder() {
  fs.readdir(imageFolder, async (err, files) => {
    if (err) {
      console.log("Unable to scan folder:", err);
      return;
    }

    for (const file of files) {
      const imagePath = path.join(imageFolder, file);

      // Skip the image if it has already been processed
      if (isImageProcessed(file)) {
        console.log(`Image already processed: ${file}`);
        continue;
      }

      if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png') {
        try {
          // Step 1: Upload the image and get the URL
          const imageUrl = await uploadImageToImgur(imagePath);
          console.log(`Image uploaded successfully: ${imageUrl}`);

          // Step 2: Generate the image description
          const imageDescription = await generateImageDescription(imageUrl);
          console.log(`Image description generated: ${imageDescription}`);

          // Step 3: Generate a topic name based on the description
          const topicName = await generateTopicName(imageDescription);
          console.log(`Topic name generated: ${topicName}`);

          // Step 4: Generate MCQs and cue cards
          const { mcQuestions, cueCards } = await generateQuestionsAndCueCards(imageDescription);

          // Step 5: Save each MCQ and cue card to separate files
          saveToFile(topicName, mcQuestions, cueCards);

          // Mark the image as processed
          markImageAsProcessed(file);

        } catch (error) {
          console.error(`Failed to process image ${file}:`, error);
        }
      }
    }
  });
}

// Start processing images
processImagesFromFolder();
