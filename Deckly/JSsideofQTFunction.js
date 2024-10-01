

let quizzes = {}; 
let currentQuizName = '';

function submitQuestion() {
    if (!currentQuizName) {
        alert("Please enter a quiz name before adding questions.");
        return;
    }

    // Get values from the input fields
    let question = document.getElementById('question').value;
    let answer1 = document.getElementById('answer1').value;
    let answer2 = document.getElementById('answer2').value;
    let answer3 = document.getElementById('answer3').value;
    let answer4 = document.getElementById('answer4').value;
    let correctAnswer = parseInt(document.getElementById('correct-answer').value) - 1; // Subtract 1 for index

    
    if (!quizzes[currentQuizName]) {
        quizzes[currentQuizName] = { questions: [], answers: [], correctAnswers: [] };
    }

    // Store the question and answers
    quizzes[currentQuizName].questions.push(question);
    quizzes[currentQuizName].answers.push([answer1, answer2, answer3, answer4]);
    quizzes[currentQuizName].correctAnswers.push(correctAnswer);

    // Clear the input fields after submission
    clearInputs();

    // Log the entire quizzes object to the console
    console.log('Quizzes:', quizzes);

    // Display all stored questions and answers
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

    if (quizzes[currentQuizName]) {
        quizzes[currentQuizName].questions.forEach((q, index) => {
            output.innerHTML += `<h3>Question ${index + 1}: ${q}</h3>`;
            output.innerHTML += `<p>Answers: ${quizzes[currentQuizName].answers[index].join(', ')}</p>`;
            output.innerHTML += `<p>Correct Answer Index: ${quizzes[currentQuizName].correctAnswers[index] + 1}</p><hr>`;
        });
    }
}

function saveQuiz() {
    currentQuizName = document.getElementById('quiz-name').value;

    if (!currentQuizName) {
        alert("Please enter a quiz name to save.");
        return;
    }

    alert(`Quiz "${currentQuizName}" saved!`);
    console.log('Saved Quiz:', quizzes[currentQuizName]);
    // Optionally clear the quiz name for the next quiz
    document.getElementById('quiz-name').value = '';
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