class cueCard{
    constructor(question, answer, currentSide){
        //current side is the side of the cue card we are viewing, 
        //either the side which has the question, or the side which has an answer
        //so its a boolean. 0 (false) for the question and 1 (true) for the answer
        this.question=question;
        this.answer=answer;
        this.currentSide=currentSide;
    }

    flipSide(){
        if (this.currentSide=false){
            this.currentSide=true;
        }else{
            this.currentSide=false;
        }
    }
};