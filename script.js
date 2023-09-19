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
        question:"",
        choices:["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },

    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log<"],
        correctAnswer: ""
    },
];

//Event listeners
$("#start-button").click(startQuiz);

$("#quiz-container").on("click", ".choice", function() {
    checkAnswer($(this).text());
});

$("#save-button").click(function() {
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