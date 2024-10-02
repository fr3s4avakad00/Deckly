

document.getElementById('uploadButton').addEventListener('click', function () {
  document.getElementById('fileInput').click(); // Trigger the hidden file input
});

document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the uploaded file
  const extractedTextDiv = document.getElementById('extractedText');
  
  if (file) {
      // Show the "Processing..." message
      extractedTextDiv.innerHTML = "Processing...";
      
      // Show file path and ask for confirmation
      const filePath = file.name; // Display the file name (or use file.path if available in your environment)
      extractedTextDiv.innerHTML = `File selected: ${filePath}<br><button id="confirmButton">Confirm</button>`;

      // Add event listener to the confirm button
      document.getElementById('confirmButton').addEventListener('click', function () {
          // Once confirmed, call the OCR function
          extractedTextDiv.innerHTML = "Extracting text...";
          extractTextFromImage(file).then(() => {
              // After OCR processing, reset file input for future uploads
              event.target.value = ''; 
          }).catch(err => {
              console.error("Error during OCR:", err);
              extractedTextDiv.innerHTML = "Error during OCR. Please try again.";
          });
      });
  }
});


// Function definitions for navigation (optional)
function createQuiz() {
    window.location.href = 'createQuiz.html';
}

function createCueCard() {
    window.location.href = 'accountPage.html';
}

function readNotes() {
    window.location.href = 'readNote.html';
}

function exit() {
    window.location.href = 'helo.html';
}
