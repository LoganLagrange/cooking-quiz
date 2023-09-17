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

// Hide quiz, loss, win, and leaderboard pages by default
var quizPage =  document.getElementById("quiz-pg");
quizPage.style.display =  "none";

var leaderboardPage = document.getElementById("leaderboard-pg");
leaderboardPage.style.display =  "none";

var lossPage = document.getElementById("loss-pg")
lossPage.style.display = "none";

var winPage = document.getElementById("win-pg")
winPage.style.display = "none";

// Grab timer heading
var timerEl = document.getElementById("countdown");
// Grabs question header
var questionHeader = document.getElementById("question-header");
// Grabs option buttons and stores in an array
var options = [];
options = document.querySelectorAll(".option");
// Keeps track of which question is currently active
var currentQues = 0;
// Creates default value for time to do quiz and score value
var timeLeft = 120;
var finalScore = null;
var timeInterval

// Function that executes when start button is clicked, starts timer and displays first question
function startQuiz() {
    startPage.style.display = "none";
    lossPage.style.display = "none";
    quizPage.style.display = "flex";
    winPage.style.display = "none";

    // Timer
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent =  timeLeft + " second remaining";
            timeLeft--;
        } else {
            timerEl.textContent = "Time's Up!";
            clearInterval(timeInterval);
            finish(timeLeft);
        }
    }, 100);
    
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
            finish(timeLeft);
        }
    } else {
        timeLeft -= 5;
    }
}

var again = document.querySelector(".again-btn")

function finish(time) {
    if (time > 0) {
        var score = calcScore(timeLeft);
        finalScore = score;
        quizPage.style.display = "none";
        winPage.style.display = "flex";
        clearInterval(timeInterval)
        return score;
    } else {
        lossPage.style.display = "flex";
        quizPage.style.display = "none";
        again.addEventListener("click", startQuiz)
        timeLeft = 120;
        currentQues = 0;
    }
}

function calcScore(time) {
    var score = time;
    console.log(score);
    return score;
}

let highscores = []


var winPage = document.getElementById("win-pg");
var nameEl = document.querySelector("#name");
var submitEl = document.querySelector("form");
submitEl.addEventListener("submit", function(event){
    event.preventDefault();

    var entry = {
        name: nameEl.value,
        score: finalScore
    }
    highscores = JSON.parse(localStorage.getItem("highscores"));
    highscores.push(entry);
    highscores.sort(function(a, b){
        return b.score - a.score;
    })
    console.log(highscores);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    var leaderboardList = document.getElementById("leaderboard-ol");
    for (var i = 0; i < highscores.length; i++) {
        // var index = highscores[i];
        var listEl = document.createElement("li");

        listEl.textContent = highscores[i].name + " - Score:" + highscores[i].score;
        leaderboardList.appendChild(listEl);
    }
    leaderboardPage.style.display = "flex";
    winPage.style.display = "none";
    
});  



    
// Grab elements for start button event listener
var startButton = document.querySelector(".start-btn");
var startPage = document.getElementById("start-pg");
// Event  listener for start button
startButton.addEventListener("click", function() {
    startQuiz()
})
