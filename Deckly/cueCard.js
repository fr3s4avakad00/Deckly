class cueCard{
    constructor(id, question, answer, currentSide){
        //current side is the side of the cue card we are viewing, 
        //either the side which has the question, or the side which has an answer
        //so its a boolean. 0 (false) for the question and 1 (true) for the answer
        this.id=id;
        this.question=question;
        this.answer=answer;
        this.currentSide=false; //false is question side, true is answer side
    } 
}

function findSide(){
    if (!this.currentSide){
        return this.question;
    }
    return this.answer;
}

function getCueCardIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', function (){
    const cueCardId = getCueCardIdFromURL();
    const myCueCards = JSON.parse(localStorage.getItem("myCueCards") || []);
    const currentCueCard=myCueCards.find(card => card.id == cueCardId);

    if (currentCueCard){
        const textArea=document.getElementById("cueCardText");
        const currentCueCardObject = new cueCard(
            currentCueCard.id, 
            currentCueCard.question, 
            currentCueCard.answer, 
            currentCueCard.currentSide
        );
        //textArea.value=currentCueCardObject.findSide();
        textArea.value=currentCueCard.currentSide ? currentCueCard.answer : currentCueCard.question;

        const saveCueCardButton=document.getElementById("saveCueCardButton");
        if (saveCueCardButton){
            saveCueCardButton.addEventListener('click', function () {
                if (!currentCueCard.currentSide){
                    currentCueCard.question=textArea.value;
                } else {
                    currentCueCard.answer=textArea.value;
                }
                localStorage.setItem("myCueCards", JSON.stringify(myCueCards));
            });
        }
    
        const closeCueCardButton=document.getElementById("exitCueCardButton");
        if (closeCueCardButton) {
            closeCueCardButton.addEventListener('click', function () {
                window.history.back();  
            });
        }

        const flipCueCardButton=document.getElementById("flipCueCardButton");
        const displayCurrentSide=document.getElementById("displayCurrentSide");
        displayCurrentSide.textContent="Question side";
        displayCurrentSide.textContent="Question side";
        if (flipCueCardButton) {
            flipCueCardButton.addEventListener('click', function () {
                currentCueCard.currentSide = !currentCueCard.currentSide; 
                displayCurrentSide.textContent = currentCueCard.currentSide ? "Answer side" : "Question side";
                textArea.value=currentCueCard.currentSide ? currentCueCard.answer : currentCueCard.question;
                currentCueCard.currentSide ? currentCueCard.answer : currentCueCard.question = textArea.value;
                localStorage.setItem("myCueCards", JSON.stringify(myCueCards));
                currentCueCard.currentSide = !currentCueCard.currentSide; 
            });
        }
    } else {
        console.error("Cue Card not found in local storage!");
    }
});

export default cueCard;
