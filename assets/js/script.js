let questions = [
    {
        question : "What is the abbreviation for tablespoon?",
        choices : ["tsp", "Tbsp", "t", "C"],
        answer : "Tbsp"
    }, {
        question: "What is the name of the technique use to incorporate air into a product?",
        choices: ["Beat", "Fold", "Chiffonade", "Whip"],
        answer: "Whip"
    }, {
        question: "What leavening agent is also commonly used as a household cleaner?",
        choices: ["Baking Powder", "Yeast", "Baking Soda", "Vinegar"],
        answer: "Baking Soda"
    }, {
        question: "What is the name of the classical technique to decoratively peel a mushroom or other item?",
        choices: ["Peel", "Pare", "Flute", "Skin"],
        answer: "Flute"
    }
]



// Hide quiz and leaderboard pages by default
var quizPage =  document.getElementById("quiz-pg");
quizPage.style.display =  "none";

var leaderboardPage = document.getElementById("leaderboard-pg");
leaderboardPage.style.display =  "none";

// Grab timer heading
var timerEl = document.getElementById("countdown");
// Function for timer
function countdown() {
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent =  timeLeft + " second remaining";
            timeLeft--;
        } else {
            timerEl.textContent = "Time's Up!";
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Grabs question header
var questionHeader = document.getElementById("question-header");
// Grabs option buttons and stores in an array
var options = [];
options = document.querySelectorAll(".option");
// Keeps track of which question is currently active
var currentQues = 0;
// Creates default value for time to do quiz
var timeLeft = 120;

// Function that executes when start button is clicked, starts timer and displays first question
function startQuiz() {
    // Timer
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent =  timeLeft + " second remaining";
            timeLeft--;
        } else {
            timerEl.textContent = "Time's Up!";
            clearInterval(timeInterval);
            finish();
        }
    }, 1000);
    
    // Calls function that controls which question is displayed
    display(currentQues);
    for (var i = 0; i < options.length; i++){
        options[i].addEventListener("click", checkAns);
    }
}
    
    
function display(index) {
    var ques = questions[index];
    questionHeader.textContent = ques.question;

    for (var i = 0; i < options.length; i++) {
        options[i].textContent = ques.choices[i];
    }
}

function checkAns() {
    var userSelect = this.textContent;
    ques = questions[currentQues];

    if (userSelect === ques.answer) {
        currentQues++;
        if (currentQues < questions.length)  {
            display(currentQues);
        } else {
            finish();
        }
    } else {
        timeLeft -= 5;
    }
}

function finish() {
    
}
    


// Grab elements for start button event listener
var startButton = document.querySelector(".start-btn");
var startPage = document.getElementById("start-pg");
// Event  listener for start button
startButton.addEventListener("click", function() {
    // countdown();
    startPage.style.display = "none";
    quizPage.style.display = "flex";
    startQuiz()
})
