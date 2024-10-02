

// Set up event listeners for the upload button and file input
document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click(); // Trigger the hidden file input
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        console.log("File chosen:", file.name); // Log the file name
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
