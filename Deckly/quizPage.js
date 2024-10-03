import quiz from './quiz.js';

let quizzes = (JSON.parse(localStorage.getItem("quizzes")) || []).map(currentQuiz => {
    return new quiz(currentQuiz.id, currentQuiz.questions);
});

document.addEventListener('DOMContentLoaded', function (){
    reloadQuizzes(quizzes);

    const createQuizButton=document.getElementById("createQuizButton");
    createQuizButton.addEventListener("click", function(){
        const newQuiz=new quiz(quizzes.length);
        newQuiz.id=quizzes.length;
        quizzes.push(newQuiz);

        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        reloadQuizzes(quizzes);
    });

    const exitQuizPageButton = document.getElementById("exitQuizPageButton");
    exitQuizPageButton.addEventListener("click", function(){
        window.location.href="./helo.html";
    });
});

//this opens a quiz
function editQuiz(quiz){
    window.location.href=`quiz.html?id=${quiz.id}`;
}

//this deletes a quiz
function deleteQuiz(quizId){
    quizzes = quizzes.filter(quiz => quiz.id !== quizId);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    reloadQuizzes(quizzes);
}

function quizPagePlayQuiz(quizId){
    quiz = quizzes.find(quiz => quiz.id == quizId);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    quiz.playQuiz;
}

//this just reloads all the cue card objects on the account page
const quizDivs=document.getElementById("quizDivs");
function reloadQuizzes(quizArray){
    quizDivs.innerHTML="";
    for (let i=0; i<quizzes.length; i++){
        var quizHomeText=document.createElement("p");
        quizHomeText.textContent="Quiz " + quizArray[i].id;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit quiz";
        editButton.onclick=function(){editQuiz(quizArray[i]);};

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete quiz";
        deleteButton.onclick=function(){deleteQuiz(quizArray[i].id)};

        var playButton = document.createElement("button");
        playButton.textContent = "Delete quiz";
        playButton.onclick=function(){quizPagePlayQuiz(quizArray[i].id)};

        quizDivs.appendChild(quizHomeText);
        quizDivs.appendChild(editButton);
        quizDivs.appendChild(deleteButton);
    }
}