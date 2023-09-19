//define quiz questions and answers
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },

    {
        question: "The condition in an if / else statement is enclosed with _____. ",
        choices: ["quotes", "curly bractets", "parenthesis", "square brackets"],
        correctAnswer: "parenthesis"
    },

    {
        question: "Arrays in JavaScript can be used to store",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },

    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    },
];

//Event listeners
$("#start-button").click(startQuiz);

$("#quiz-container").on("click", ".choice", function () {
    checkAnswer($(this).text());
});

$("#save-button").click(function () {
    var initials = $("#initials").val();
    //send code and initials to the server
    console.log(`Initials: ${initials}, Score: ${score}`);
});

let currentQuestionIndex = 0;
let timeLeft = 75; //initial time in seconds
let score = 0;
let timerInterval;

//funtion to start the quiz
function startQuiz() {
    $("#start-button").hide();
    showQuestion();
    startTimer();
}

//function to display a question
function showQuestion() {
    var question = quizQuestions[currentQuestionIndex];
    $("#quiz-continer h2").text(`Question ${currentQuestionIndex + 1}:`);
    $("#quiz-container .choice").each(function (index) {
        $(this).text(question.choices[index]);
    });
}

//funtion to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            $("#time").text(timeLeft);
        } else {
            endQuiz();
        }
    }, 1000);
}

// Function to start the quiz
function startQuiz() {
    $("#start-button").hide();
    currentQuestionIndex = 0;
    score = 0;
    showQuestionPage();
    startTimer();
}

// Function to show the current question page
function showQuestionPage() {
    $(".question").hide();
    $(`#question${currentQuestionIndex + 1}`).show();
}

//function to check the answer
function checkAnswer(selectedChoice) {
    var question = quizQuestions[currentQuestionIndex];
    if (selectedChoice === question.correctAnswer) {
        score++;
    } else {
        timeLeft -= 10; //penalty for wrong answer
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to show correct or wrong message
function showMessage(isCorrect) {
    const messageElement = $("<p>").attr("id", "message");
    if (isCorrect) {
        messageElement.text("Correct!");
    } else {
        messageElement.text("Wrong!");
        timeLeft -= 10; // Penalty for wrong answer
    }
    $("#quiz-container").append(messageElement);
}

// Function to handle click on choice buttons
$("#quiz-container").on("click", ".choice", function () {
    const selectedChoice = $(this).text();
    const question = quizQuestions[currentQuestionIndex];

    if (selectedChoice === question.correctAnswer) {
        score++;
        showMessage(true);
    } else {
        showMessage(false);
    }

    setTimeout(function () {
        $("#message").remove();
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000); // Delay before moving to the next question
});

//function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    $("#quiz-container").hide();
    $("#result-container").show();
    $("#score").text(score);
}