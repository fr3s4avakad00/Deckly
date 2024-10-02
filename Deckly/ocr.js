// ocr.js

// Set up the file input and upload button event listeners
document.getElementById("uploadButton").addEventListener("click", function() {
    document.getElementById("fileInput").click();
    console.log("Upload button clicked."); // Add this line to see if the click works
});


//Define the extractTextFromImage function that processes the uploaded image with Tesseract.js
function extractTextFromImage(file) {
    return new Promise((resolve, reject) => {
        console.log("Processing..."); // Log processing message to the console

        // Use Tesseract to recognize the text from the image file
        Tesseract.recognize(
            file,
            'eng', // Set language to English
            {
                logger: function(info) {
                    console.log(info); // Log OCR progress
                }
            }
        ).then(({ data: { text } }) => {
            console.log("Extracted Text:", text); // Log the extracted text to the console
            document.getElementById('extractedText').innerHTML = `<pre>${text}</pre>`; // Show extracted text
            resolve(text); // Resolve the promise when processing completes
        }).catch(err => {
            console.error("Error during OCR:", err); // Log error
            reject(err); // Reject the promise on error
        });
    });
}
 