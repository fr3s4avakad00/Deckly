import cueCard from './cueCard.js'; 
//this is the user's account

/*the problem is that if we want to save myCueCards, the way the localStorage works 
breaks some things in the object and the loadCueCardContent class method is not recognized as a cueCard
object, rather it would be plain types, it would look something like this:

[
   {"id": 0, "text": "First cue card"},
   {"id": 1, "text": "Second cue card"}
]

To solve this we have to either read my cue cards from storage if it exists or create it if it does not
exist. Then, we iterate over each element in myCueCards using .map, and execute a function to each
of those elements, and take all of that info and put it in the new cueCard object returned by the 
arrow function*/
var myCueCards=(JSON.parse(localStorage.getItem("myCueCards")) || []).map(cueCardData => {
    return new cueCard(cueCardData.id, cueCardData.question, cueCardData.answer, cueCardData.currentSide);
});

const cueCardDivs=document.getElementById("cardDivs");


document.addEventListener('DOMContentLoaded', function (){
    reloadCueCards(myCueCards);

    const createCueCardButton=document.getElementById("createCueCardButton");
    createCueCardButton.addEventListener("click", function(){
        const newCueCard=new cueCard(myCueCards.length, "", "", false);
        newCueCard.id=myCueCards.length;
        myCueCards.push(newCueCard);

        localStorage.setItem("myCueCards", JSON.stringify(myCueCards));

        reloadCueCards(myCueCards);
    });
});

//this opens a cueCard
function openCueCard(cueCard){
    window.location.href=`cueCard.html?id=${cueCard.id}`;
}

//this deletes a cue card
function deleteCueCard(cueCardId){
    // the filter loops through the array, and if the element the iterator is on is not
    // equal to the specified cuecard's id which we want to delete, it adds it keeps it 
    // in the myCueCardsArray 
    // card represents current cue card the iterator is looking at
    //thats why it compares card.id (the id of the current card iterator is looking at)
    //with cueCardId, which is the id of the specified cuecard
    myCueCards = myCueCards.filter(card => card.id !== cueCardId);
    localStorage.setItem("myCueCards", JSON.stringify(myCueCards));
    reloadCueCards(myCueCards);
}

//this just reloads all the cue card objects on the account page
function reloadCueCards(cueCardArray){
    cueCardDivs.innerHTML="";
    for (let i=0; i<cueCardArray.length; i++){
        var cueCardHomeText=document.createElement("p");
        cueCardHomeText.textContent="Cue card " + cueCardArray[i].id;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit Cue Card";
        editButton.onclick=function(){openCueCard(cueCardArray[i]);};

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Cue Card";
        deleteButton.onclick=function(){deleteCueCard(cueCardArray[i].id)};

        cueCardDivs.appendChild(cueCardHomeText);
        cueCardDivs.appendChild(editButton);
        cueCardDivs.appendChild(deleteButton);
    }
}