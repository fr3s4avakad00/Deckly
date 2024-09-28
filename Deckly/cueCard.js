class cueCard{
    constructor(id){
        //current side is the side of the cue card we are viewing, 
        //either the side which has the question, or the side which has an answer
        //so its a boolean. 0 (false) for the question and 1 (true) for the answer
        this.id=id;
        this.createCueCardElement();
    }

    createCueCardElement(){
        var cueCardContainer=document.getElementById("cardDivs");
        this.cueCardElement=document.createElement("div");
        this.cueCardElement.id="cueCard"+this.id;
        this.cueCardElement.style.display="none";
    }

    show() {
        this.cueCardElement.style.display = "block"; 
    }

    hide() {
        this.cueCardElement.style.display = "none";
    }
};

export default cueCard;