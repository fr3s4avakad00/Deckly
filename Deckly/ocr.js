document.getElementById("uploadButton").addEventListener("click", function() {
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        console.log("File chosen:", file.name);
        processFile(file);
    }
});

function processFile(file) {
    // Call the OCR function from ocr.js
    extractTextFromImage(file);
}
