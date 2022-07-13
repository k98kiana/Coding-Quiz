// TODO: add game logic
var startquiz = document.getElementById("start-btn");
var timeEl = document.querySelector(".timer");
var alltest = document.querySelector(".alltest");

var userinput = document.querySelector("#userinput");
var savebutton = document.querySelector("#save");

var seconds = 100;
var wrong = false;
var questionindex = 0;
var quizcontainer = document.querySelector("#quizcontainer");

var scorelist = document.querySelector("#scorelist");
var scoreform = document.querySelector("#score-form");
var scoretext = document.querySelector("score-text");

var listing = [];

function quiz() {
    startquiz.classList.add("hide");
    setTime();
    nextquestion();
}

function setTime() {
    var timerInterval = setInterval(function () {
        seconds--;
        timeEl.textContent = " " + seconds + " seconds left";

        if (wrong === true) {
            seconds = seconds - 10;
            wrong = false;
            return seconds;
        }
        if (seconds <= 0 || questionindex > 3 ) {
            clearInterval(timerInterval);
            highscore();
        }
    
    }, 1000);
}

function nextquestion() {
    if (questionindex <= 3 ) {
        quizcontainer.textContent = "";

        var questionnode = document.createElement("h1");
        quizcontainer.appendChild(questionnode);
        questionnode.textContent = questions[questionindex].question;

        var anslist = document.createElement("ul");
        quizcontainer.appendChild(anslist);

        for (var i = 0; i < questions[questionindex].answers.length; i++) {
            var questionnode = document.createElement("li");
            anslist.appendChild(questionnode);

            var button = document.createElement("button");
            questionnode.appendChild(button);
            questionnode.style.width = "fit-content";
            button.textContent = questions[questionindex].answers[i];

            button.setAttribute("data-index", i);
            var index = parseInt(button.getAttribute("data-index"));

        if (index === questions[questionindex].correctanswer) {
            anslist.addEventListener("click", function(event) {
                document.getElementById("presentanswer").textContent = "Incorect! 10 seconds deducted.";
                event.stopPropagation();
                wrong = true;
                questionindex++;
                nextquestion();
            });

            button.addEventListener("click", function(event) {
                document.getElementById("presentanswer").textContent = "Correct! Please answer next question.";
                event.stopPropagation();
                questionindex++;
                nextquestion();
            });
        }
        }
    }
}

function highscore() {
    alltest.classList.add("hidden");
    userinput.classList.remove("hidden");
    document.getElementById("highscore").textContent = "You got a Highscore of " + seconds;
    renderscores ();
}

function renderscores() {
    var storage = JSON.parse(localStorage.getItem("lastscore"));
    for (var i = 0; i < storage.length; i++) {
        document.getElementById("lastuser").textContent = storage[i];       
        console.log(storage[i]);

    }
}

savebutton.addEventListener("click", function(event) {
    event.preventDefault();

    var initials = document.querySelector(".initials").value;

    if (initials === "") {
        console.log("error", "Please enter initials to submit your score");
    } else {
        console.log("success", "Score Saved");

        var showscore = initials + " " + seconds;
        var storage = JSON.parse(localStorage.getItem("lastscore"));
        storage.push(showscore);
        localStorage.setItem("lastscore", JSON.stringify(storage));
    }

renderscores();

});

startquiz.addEventListener("click", quiz);
    document
    .addEventListener("click", function(event) {
    });

if (localStorage.getItem("lastscore") === null) {
    localStorage.setItem("lastscore", JSON.stringify([]));
}