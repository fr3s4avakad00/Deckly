import cueCard from './cueCard.js'; 
//this is the user's account

var myCueCards=[];

const cueCardDivs=document.getElementById("cardDivs");

document.addEventListener('DOMContentLoaded', function (){
    const createCueCardButton=document.getElementById("createCueCardButton");

    createCueCardButton.addEventListener("click", function(){
        const newCueCard=new cueCard(myCueCards.length);
        newCueCard.id=myCueCards.length;
        myCueCards.push(newCueCard);
        var cueCardHomeText=document.createElement("p");
        cueCardHomeText.textContent="Cue card " + newCueCard.id;
        var button = document.createElement("button");
        button.textContent = "Open Cue Card";
        button.addEventListener('click', function() {
            myCueCards[newCueCard.id].show();
            console.log("hello");
        });
        cueCardDivs.appendChild(cueCardHomeText);
        cueCardDivs.appendChild(button);
    });
});