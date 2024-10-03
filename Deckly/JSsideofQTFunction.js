class quiz {
    constructor(id, question, answers, correctAnswer){
        this.id=id;
        this.question=question;
        this.answers=answers;
        this.correctAnswer=correctAnswer;
    }
}

let quizzes = (JSON.parse(localStorage.getItem("quizzes")) || []).map(currentQuiz => {
    return new quiz(currentQuiz.id, currentQuiz.question, currentQuiz.answers, currentQuiz.correctAnswer);
});
let currentQuizName = '';

function submitQuestion() {
    if (!currentQuizName) {
        currentQuizName="untitled quiz";
    }

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

    quizzes.push(new quiz(quizzes.length, question, tempAnswers, correctAnswer));

    /*if (!quizzes[currentQuizName]) {
        quizzes[currentQuizName] = { questions: [], answers: [], correctAnswers: [] };
    }

    // Store the question and answers
    quizzes[currentQuizName].questions.push(question);
    quizzes[currentQuizName].answers.push([answer1, answer2, answer3, answer4]);
    quizzes[currentQuizName].correctAnswers.push(correctAnswer);*/

    // Clear the input fields after submission
    clearInputs();

    // Log the entire quizzes object to the console
    console.log('Quizzes:', quizzes);

  
    displayQuestions();
}

function clearInputs() {
    document.getElementById('question').value = '';
    document.getElementById('answer1').value = '';
    document.getElementById('answer2').value = '';
    document.getElementById('answer3').value = '';
    document.getElementById('answer4').value = '';
    document.getElementById('correct-answer').value = '';
}

function displayQuestions() {
    let output = document.getElementById('quiz-output');
    output.innerHTML = ''; // Clear previous output

    for (var i=0; i<quizzes.length; i++){
        console.log(quizzes[i].answers);
        console.log("Question: " + quizzes[i].question);
        console.log("Answer: " + quizzes[i].answers);
        console.log("correct Answer: " + quizzes[i].correctAnswer);

        output.innerHTML += `<h3>Question: ${quizzes[i].question}</h3>`;
        output.innerHTML += `<p>Answers: ${quizzes[i].answers.join(', ')}</p>`;
        output.innerHTML += `<p>Correct Answer Index: ${quizzes[i].correctAnswer + 1}</p><hr>`;
    }
}

function saveQuiz() {
    currentQuizName = document.getElementById('quiz-name').value;
    if (!currentQuizName) {
        currentQuizName="untitled quiz";
    }
    // Optionally clear the quiz name for the next quiz
    document.getElementById('quiz-name').value = '';

    localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

function playQuiz() {
    if (!currentQuizName || !quizzes[currentQuizName]) {
        alert("Please save a quiz before playing.");
        return;
    }

    let score = 0;
    const totalQuestions = quizzes[currentQuizName].questions.length; // Get the total number of questions

    // Check if there are no questions
    if (totalQuestions === 0) {
        alert("No questions in the quiz.");
        return;
    }

    // Loop through each question
    quizzes[currentQuizName].questions.forEach((q, index) => {
        // Create the question prompt with answers
        const userAnswer = prompt(`${q}\n1: ${quizzes[currentQuizName].answers[index][0]}\n2: ${quizzes[currentQuizName].answers[index][1]}\n3: ${quizzes[currentQuizName].answers[index][2]}\n4: ${quizzes[currentQuizName].answers[index][3]}`);
        
        // Convert userAnswer to an integer
        const userAnswerInt = parseInt(userAnswer);

        // Ensure the user's input is a number and between 1 and 4
        if (userAnswerInt < 0 || userAnswerInt > 3 || isNaN(userAnswerInt)) {
            alert("Please enter a valid answer (1-4).");
            return; // Skip to the next question if the answer is invalid
        }

        // Check if the user's answer matches the correct answer
        // Since correctAnswers is zero-based, we subtract 1 from userAnswerInt
        if (userAnswerInt === quizzes[currentQuizName].correctAnswers[index] + 1) {
            score++;
        }
    });

    alert(`You scored ${score} out of ${totalQuestions}!`);
}

function exitQuiz(){
    window.history.back();
}