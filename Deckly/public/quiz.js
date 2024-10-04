import quizQuestion from './quizQuestion.js';

class quiz {
    constructor(id, questions=[]){
        this.id=id;
        this.questions=questions;
    }
}

let quizzes = (JSON.parse(localStorage.getItem("quizzes")) || []).map(currentQuiz => {
    return new quiz(currentQuiz.id, currentQuiz.questions);
});

function clearInputs() {
    document.getElementById('question').value = '';
    document.getElementById('answer1').value = '';
    document.getElementById('answer2').value = '';
    document.getElementById('answer3').value = '';
    document.getElementById('answer4').value = '';
    document.getElementById('correct-answer').value = '';
}

function displayQuestions() {
    const quizId=getQuizIdFromURL();
    const currentQuiz=quizzes.find(quiz => quiz.id == quizId);
    let output = document.getElementById('quiz-output');
    output.innerHTML = ''; // Clear previous output

    for (var i=0; i<currentQuiz.questions.length; i++){
        const currentQuestion = currentQuiz.questions[i];
        output.innerHTML += `<h3>Question: ${currentQuestion.question}</h3>`;
        output.innerHTML += `<p>Answers: ${currentQuestion.answers.join(', ')}</p>`;
        output.innerHTML += `<p>Correct Answer Index: ${currentQuestion.correctAnswer + 1}</p><hr>`;
    }    
}

function getQuizIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadQuestionFiles(fileDirectories){
    const quizId=getQuizIdFromURL();
    const currentQuiz=quizzes.find(quiz => quiz.id == quizId);
    const quizFileText=document.getElementById("quizFileText");
    quizFileText.textContent="Select a file:";
    for (var i=0; i<fileDirectories.length; i++){
        //read three files
        const reader = new FileReader();
        const file=fileDirectories[i];
        reader.onload = function(event){
            const fileContent=event.target.result;
            const allLines=fileContent.split("\n");
            const options = [];
            if (allLines.length===6){
                for (var i=1; i<5; i++){
                    allLines[i]=allLines[i].trimStart();
                    options.push(allLines[i]);
                    console.log(allLines[i]);
                    if (allLines[i]===allLines[5]){
                        answer=i-1;
                    }
                }
                allLines[5]=allLines[5].substr(11);

                const newQuestion=new quizQuestion(allLines[0], options, answer);
                currentQuiz.questions.push(newQuestion);
                localStorage.setItem("quizzes", JSON.stringify(quizzes));
                displayQuestions(quizzes);
            } else if (allLines.length===7){
                var answer;
                allLines[6]=allLines[6].substr(11);
                for (var i=2; i<6; i++){
                    allLines[i]=allLines[i].trimStart();
                    options.push(allLines[i]);
                    console.log(allLines[i]);
                    if (allLines[i]===allLines[6]){
                        answer=i-2;
                    }
                }

                const newQuestion=new quizQuestion(allLines[1], options, answer);
                currentQuiz.questions.push(newQuestion);
                localStorage.setItem("quizzes", JSON.stringify(quizzes));
                displayQuestions(quizzes);
            } else{
                quizFileText.textContent="Select a file (file must follow strict format):";
            }
        };
        reader.readAsText(file);
    }
}

function playQuiz(){ 
    const quizId=getQuizIdFromURL();
    const currentQuiz=quizzes.find(quiz => quiz.id == quizId);   
    let score = 0;
    //const totalQuestions = quizzes[currentQuizName].questions.length; // Get the total number of questions
    
    // Check if there are no questions
    if (currentQuiz.questions.length === 0) {
        alert("Atleast one question is required to play the quiz");
        return;
    }
    
    // Loop through each question
    for (var i=0;i<currentQuiz.questions.length; i++){
        const userAnswer = prompt(`${currentQuiz.questions[i].question}\n1: ${currentQuiz.questions[i].answers[0]}\n2: ${currentQuiz.questions[i].answers[1]}\n3: ${currentQuiz.questions[i].answers[2]}\n4: ${currentQuiz.questions[i].answers[3]}`);
        const userAnswerInt = parseInt(userAnswer);
        // Ensure the user's input is a number and between 1 and 4
        if (userAnswerInt < 1 || userAnswerInt > 4 || isNaN(userAnswerInt)) {
            alert("Please enter a valid answer (1-4).");
            return; // Skip to the next question if the answer is invalid
        }
        if (userAnswerInt === currentQuiz.questions[i].correctAnswer+1) {
            score++;
        }
    }
    
    alert(`You scored ${score} out of ${currentQuiz.questions.length}!`); 
}

document.addEventListener('DOMContentLoaded', function (){
    const browseFiles=document.getElementById('quizFileInput');
    browseFiles.addEventListener("change", function(event){
        var files=browseFiles.files;
        loadQuestionFiles(files);
    });

    const quizId=getQuizIdFromURL();
    const currentQuiz=quizzes.find(quiz => quiz.id == quizId);
    displayQuestions(quizzes);

    const saveQuizButton=document.getElementById("saveQuizButton");
    if (saveQuizButton){
        saveQuizButton.addEventListener('click', function(){
            // Optionally clear the quiz name for the next quiz        
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
        });
    }

    const closeQuizButton=document.getElementById("exitQuizButton");
    if (closeQuizButton) {
        closeQuizButton.addEventListener('click', function () {
            window.location.href="./quizPage.html";  
        });
    }

    const submitQuestionButton=document.getElementById("submitQuestionButton");
    if (submitQuestionButton){
        submitQuestionButton.addEventListener("click", function() {
        
            // Get values from the input fields
            var tempAnswers=[];
            let question = document.getElementById('question').value;
            let answer1 = document.getElementById('answer1').value;
            tempAnswers.push(answer1);
            let answer2 = document.getElementById('answer2').value;
            tempAnswers.push(answer2);
            let answer3 = document.getElementById('answer3').value;
            tempAnswers.push(answer3);
            let answer4 = document.getElementById('answer4').value;
            tempAnswers.push(answer4);
            let correctAnswer = parseInt(document.getElementById('correct-answer').value) - 1; // Subtract 1 for index
        
            const newQuizQuestion=new quizQuestion(question, tempAnswers, correctAnswer);

            if (!currentQuiz) {
                currentQuiz.questions.push(newQuizQuestion);
            }

            currentQuiz.questions.push(newQuizQuestion);

            localStorage.setItem('quizzes', JSON.stringify(quizzes));
            // Clear the input fields after submission
            clearInputs();
                
            displayQuestions();
        });
    }

    const playQuizButton=document.getElementById("playQuizButton");
    if (playQuizButton) {
        playQuizButton.addEventListener('click', function () {
            playQuiz();
        });
    }
});

export default quiz;