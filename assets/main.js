const timerElement = document.getElementById("time-remaining");
const timerView = document.getElementById("timer");
const highScoreView = document.querySelector("#highscores");
const startButton = document.getElementById("start-quiz");
const mainElement = document.querySelector("#main-content");
const messageElement = document.querySelector("h1");
const textElement = document.querySelector("p");
const choicesListElement = document.getElementById("choices-list");
const indicatorElement = document.getElementById("indicator");
const formElement = document.createElement("div");
const highscoresElement = document.createElement("div");
const textInputElement = document.createElement("input");
const formButton = document.createElement("button");
const backButton = document.createElement("button");
const clearButton = document.createElement("button");


var highscore = {
    initials: "",
    score: 0,
};
var score = 0;

var highscores = [];
var secondsLeft;
var timerInterval;

var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["A. <script>", "B. hasbulla", "C. <Javascript>"],
        answer: 0,
    },

    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: [
            "A. The <body> section",
            "B. Both the <head> section and the <body> section are correct",
            "C. Both are incorrect",
        ],
        answer: 1,
    },

    {
        question:"The external JavaScript file must contain the <script> tag.",
        choices: [
            "A. True",
            "B. False",
        ],
        answer: 1,
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: [
            "A. function myFunction()",
            "B. function:myFunction()",
            "C. function = myFunction()",
        ],
        answer: 0,
    },
    {
        question: "How do you call a function named myFunction",
        choices: [
            "A. call function myFunction()",
            "B. Dial 911",
            "C. myFunction()",
        ],
        answer: 2,
    },
];


// FUNCTIONS
init();

function init() {
    //score = 0;
    secondsLeft = 60;
}

function startGame() {
    startButton.remove();
    textElement.remove();
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    renderQuiz();
}

function renderQuiz(questionNumber) {
    questionNumber = questionNumber || 0;
    var questionItem = questions[questionNumber];
    messageElement.textContent = questionItem.question;

    var newChoices = document.createElement("div");
    choicesListElement.appendChild(newChoices);

    for (var i = 0; i < questionItem.choices.length; i++) {
        var choice = questionItem.choices[i];

        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.textContent = choice;
        newChoices.appendChild(li);

        li.addEventListener("click", function (event) {
            if (
                questionItem.answer ===
                parseInt(event.target.getAttribute("data-index"))
            ) {
                score += 10;
                indicatorElement.innerHTML = "<hr> you are correct!";
                indicatorElement.setAttribute("style", "color: pink");
            } else {
                secondsLeft -= 10;
                indicatorElement.innerHTML = "<hr> that is incorrect!";
                indicatorElement.setAttribute("style", "color: red");
            }

            questionNumber++;

            if (questionNumber === questions.length) {
                clearInterval(timerInterval);
                indicatorElement.textContent = "";
                newChoices.remove();
                messageElement.textContent = "Game Over!";
                messageElement.appendChild(textElement);
                textElement.textContent = "Your final score is: " + score;

                renderForm();
            } else {
                setTimeout(function () {
                    renderQuiz(questionNumber);
                    newChoices.remove();
                    indicatorElement.textContent = "";
                }, 1000);
            }
        });
    }
}

function renderForm() {
    formElement.textContent = "Enter name here: ";
    formElement.setAttribute("style", "color: white");
    formButton.textContent = "SUBMIT";
    mainElement.appendChild(formElement);
    formElement.appendChild(textInputElement);
    formElement.appendChild(formButton);
}

function submitHighscore() {
    var initialInput = document.querySelector("input").value;
    highscore.initials = initialInput;
    highscore.score = score;
    console.log(highscore);
    localStorage.setItem("highscore", JSON.stringify(highscore));
    mainElement.innerHTML = "";
    highScoreView.textContent = "";
    timerView.textContent = "";

    renderHighscores();
}

function renderHighscores() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
    console.log(storedHighscore);
    messageElement.innerHTML = "Highscores";
    messageElement.setAttribute("style", "color: white");
    mainElement.appendChild(messageElement);
    console.log(storedHighscore.initials);
    console.log(storedHighscore.score);
    highscoresElement.setAttribute("class", "highscore-element");
    highscoresElement.textContent = `${storedHighscore.initials} - ${storedHighscore.score}`;
    messageElement.appendChild(highscoresElement);
    backButton.textContent = "Home";
    clearButton.textContent = "Clear";
    mainElement.appendChild(backButton);
    mainElement.appendChild(clearButton);
}

function clear() {
    highscoresElement.remove();
}

function home() {
    location.reload();
}

highScoreView.addEventListener("click", function () {
    textElement.remove();
    startButton.remove();
    renderHighscores();
});

startButton.addEventListener("click", startGame);
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", home);
clearButton.addEventListener("click", clear);