//this is the user's account
import cueCard from './cueCard.js';

myCueCards=[];

document.addEventListener('DOMContentLoaded', function (){
    const createCueCardButton=document.getElementById("createCueCardButton");

    createCueCardButton.addEventListener("click", function(){
        const newCueCard=new cueCard("", "", false);
        myCueCards.push(newCueCard);
    });
});