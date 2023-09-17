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
// Creates default value for time to do quiz and score value, initializes timeInterval in global scope
var timeLeft = 120;
var finalScore = null;
var timeInterval;

// Function that executes when start button is clicked, starts timer and displays first question
function startQuiz() {
    startPage.style.display = "none";
    lossPage.style.display = "none";
    quizPage.style.display = "flex";
    winPage.style.display = "none";
    leaderboardPage.style.display = "none";

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
    }, 1000);
    
    // Calls function that controls which question is displayed
    display(currentQues);
    for (var i = 0; i < options.length; i++){
        options[i].addEventListener("click", checkAns);
    }
}
    
// Displays content to questions option buttons
function display(index) {
    var ques = questions[index];
    questionHeader.textContent = ques.question;

    for (var i = 0; i < options.length; i++) {
        options[i].textContent = ques.choices[i];
    }
}

// Check that the option the user selects matches the answer
var incorrectNotify =  document.getElementById("incorrect-notify");
function checkAns() {
    var userSelect = this.textContent;
    ques = questions[currentQues];
    // Determines if the answer matches and moves on if it does or penalizes and notifies if it doesn't
    if (userSelect === ques.answer) {
        currentQues++;
        incorrectNotify.textContent = "";
        if (currentQues < questions.length)  {
            display(currentQues);
        } else {
            finish(timeLeft);
        }
    } else {
        timeLeft -= 10;
        incorrectNotify.textContent = "INCORRECT";
    }
}

// grabs play again button
var again = document.querySelector(".again-btn")
// Function that controls what happens when the games ends either because all questions answered correctly or times runs out.
function finish(time) {
    if (time > 0) {
        var score = calcScore(timeLeft);
        finalScore = score;
        quizPage.style.display = "none";
        winPage.style.display = "flex";
        
        return score;
    } else {
        lossPage.style.display = "flex";
        quizPage.style.display = "none";
        again.addEventListener("click", startQuiz)
        timeLeft = 120;
        currentQues = 0;
    }
}

// Calculates the score and returns
function calcScore(time) {
    var score = time;
    console.log(score);
    // clearInterval(timeInterval)
    return score;
}

// Intialize the highscores array
let highscores = []
// Grabs elements associated with the form to enter name
var winPage = document.getElementById("win-pg");
var nameEl = document.querySelector("#name");
var submitEl = document.querySelector("form");

// Event listener on the form for submission
submitEl.addEventListener("submit", function(event){
    event.preventDefault();
    // Creates an entry object
    var entry = {
        name: nameEl.value,
        score: finalScore
    }
    // Pulls any existing scores from local storage
    highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    // Pushes entry object into highscores array
    highscores.push(entry);
    // Sorts highscores array
    highscores.sort(function(a, b){
        return b.score - a.score;
    })
    console.log(highscores);
    // Re-stores updated and sorted highscores
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Loop to create list elements for all highscores and append to page
    var leaderboardList = document.getElementById("leaderboard-ol");
    for (var i = 0; i < highscores.length; i++) {
        // var index = highscores[i];
        var listEl = document.createElement("li");
        listEl.textContent = highscores[i].name + " - Score:" + highscores[i].score;
        leaderboardList.appendChild(listEl);
    }
    leaderboardPage.style.display = "flex";
    winPage.style.display = "none";
    // Event listener for play again button on leaderboard page
    var again2 = document.querySelector(".again-btn2");
    again2.addEventListener("click" , startQuiz);
});  



    
// Grab elements for start button event listener
var startButton = document.querySelector(".start-btn");
var startPage = document.getElementById("start-pg");
// Event  listener for start button
startButton.addEventListener("click", function() {
    startQuiz()
})
