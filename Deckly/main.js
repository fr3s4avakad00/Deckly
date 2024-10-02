function createQuiz() {
    window.location.href = 'createQuiz.html';
    
  }
  
  function createCueCard() {
    window.location.href = 'accountPage.html';
  }
  
  function readNotes() {
    window.location.href = 'readNote.html';
  }

  // main.js
import { processImage } from './ocr.js'; // Import the processImage function

document.getElementById('uploadNotesButton').addEventListener('click', function() {
    document.getElementById('fileInput').click(); // Trigger the hidden file input
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        processImage(file); // Call the function to process the image
    }
});



  function exit() {
    window.location.href = 'helo.html';
  }
