class cueCard{
    constructor(id, question, answer){
        //current side is the side of the cue card we are viewing, 
        //either the side which has the question, or the side which has an answer
        //so its a boolean. 0 (false) for the question and 1 (true) for the answer
        this.id=id;
        this.question=question;
        this.answer=answer;
    } 
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
        console.log("Loaded cue card question:", currentCueCard.question);
        textArea.value=currentCueCard.question;

        const saveCueCardButton=document.getElementById("saveCueCardButton");
        if (saveCueCardButton){
            saveCueCardButton.addEventListener('click', function () {
                currentCueCard.question=textArea.value;
                localStorage.setItem("myCueCards", JSON.stringify(myCueCards));
                console.log(currentCueCard.question);
            });
        }
    
        const closeCueCardButton=document.getElementById("exitCueCardButton");
        if (closeCueCardButton) {
            closeCueCardButton.addEventListener('click', function () {
                window.history.back();  
            });
        }
    } else {
        console.error("Cue Card not found in local storage!");
    }
});

export default cueCard;