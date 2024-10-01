import cueCard from './cueCard.js';

// Initialize cue cards from localStorage
var myCueCards = (JSON.parse(localStorage.getItem("myCueCards")) || []).map(cueCardData => {
    return new cueCard(cueCardData.id, cueCardData.text);
});

const cueCardDivs = document.getElementById("cardDivs");

document.addEventListener('DOMContentLoaded', function () {
    reloadCueCards(myCueCards);

    const createCueCardButton = document.getElementById("createCueCardButton");
    createCueCardButton.addEventListener("click", function () {
        const newCueCard = new cueCard(myCueCards.length);
        newCueCard.id = myCueCards.length;
        myCueCards.push(newCueCard);

        localStorage.setItem("myCueCards", JSON.stringify(myCueCards));
        reloadCueCards(myCueCards);
    });

    // Upload Notes functionality
    document.getElementById("uploadNoteButton").addEventListener("click", function () {
        const fileInput = document.getElementById("noteFileInput");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    Tesseract.recognize(
                        img,
                        'eng',
                        {
                            logger: info => console.log(info) // Optional logger for progress
                        }
                    ).then(({ data: { text } }) => {
                        document.getElementById("detectedText").innerText = text;
                        
                        // Log the extracted text to the console for testing purposes
                        console.log("Extracted text from detectedText div: ", text); 
                    }).catch(err => {
                        console.error("Error during OCR:", err);
                    });
                    
                };
            };

            reader.readAsDataURL(file);
        } else {
            alert("Please upload an image file.");
        }
    });
});

// Function to open a cue card
function openCueCard(cueCardId) {
    window.location.href = `cueCard.html?id=${cueCardId}`;
}

// Function to delete a cue card
function deleteCueCard(cueCardId) {
    myCueCards = myCueCards.filter(card => card.id !== cueCardId);
    localStorage.setItem("myCueCards", JSON.stringify(myCueCards));
    reloadCueCards(myCueCards);
}

// Function to reload cue cards
function reloadCueCards(cueCardArray) {
    cueCardDivs.innerHTML = "";
    for (let i = 0; i < cueCardArray.length; i++) {
        var cueCardHomeText = document.createElement("p");
        cueCardHomeText.textContent = "Cue card " + cueCardArray[i].id;

        var openButton = document.createElement("button");
        openButton.textContent = "Open Cue Card";
        openButton.onclick = function () {
            openCueCard(cueCardArray[i].id);
            cueCardArray[i].loadCueCardContent();
        };

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Cue Card";
        deleteButton.onclick = function () { deleteCueCard(cueCardArray[i].id) };

        cueCardDivs.appendChild(cueCardHomeText);
        cueCardDivs.appendChild(openButton);
        cueCardDivs.appendChild(deleteButton);
    }
}

// Function to exit the application
function exit() {
    window.location.href = 'helo.html';
}
