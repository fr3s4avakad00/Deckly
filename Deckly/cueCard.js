class cueCard{
    constructor(id, text){
        //current side is the side of the cue card we are viewing, 
        //either the side which has the question, or the side which has an answer
        //so its a boolean. 0 (false) for the question and 1 (true) for the answer
        this.id=id;
        this.text=text;
    }

    loadCueCardContent(){
        const textArea=document.getElementById("cueCardText");
        if(textArea){
            textArea.value=this.text;
            console.log(textArea.value);
        }else{
            console.error("cue card not found!")
        }
    }
}

document.addEventListener('DOMContentLoaded', function (){
    const closeCueCardButton=document.getElementById("exitCueCardButton");
    const textArea=document.getElementById("cueCardText");

    if (closeCueCardButton) {
        this.text=textArea.value;
        closeCueCardButton.addEventListener('click', function () {
            window.history.back();  
        });
    } else {
        console.error("Close Cue Card button not found!");
    }
});

export default cueCard;