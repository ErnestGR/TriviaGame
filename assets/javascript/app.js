"use strict";
let questions = [
["Things that move", "bird", true],
["Things that move", "building", false],
["Things that move", "car", true],
["Things that move", "tree", false],
["Things that move", "toilet", false],
["Things that need water", "me, (yes you)", true],
["Things that need water", "plants", true],
["Things that need water", "fish", true],
["Things that need water", "bird", true],
["Things that need water", "dishwasher", true],
["Things that can sing", "bird", true],
["Things that can sing", "Madona", true],
["Things that can sing", "dog", false],
["Things that can sing", "spider", false],
["Things that can sing", "Nickelback", false],
["Things that can get fat", "your girlfriend", true],
["Things that can get fat", "dog", true],
["Things that can get fat", "house", false],
["Things that can get fat", "pipes", false],
["Things that can get fat", "a liar", true]];

let right = 0;
let wrong = 0;
let questionNumber = -1;
let playing = false;
const timeLimit = 2;
let count = timeLimit;

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }
    // start with new interval, stop current interval
    this.reset = function (newT) {
        t = newT;
        return this.stop().start();
    }
}

function showNextQuestion() {
    questionNumber++;
    count = timeLimit;

    if (questionNumber === questions.length) {
        playing = false;
        $("#startScreen").show();
        $("#quiz").hide();
        $("#messages").html("Your total score is: " + "<br>Wrong: " + wrong + "<br>Right: " + right);
        questionNumber = -1;
        timer.stop();
    }
    else {
        let row = questions[questionNumber];
        //["Things that can sing", "spider", false]
        $("#header").text(row[0]);
        $("#question").text(row[1]);
    }
}
var timer = new Timer(function () {
    if (playing) {
        console.log(count);
        count--;
        if (count <= 0) {
            wrong++;
            showNextQuestion();
        }
    }
}, 1000);

$(document).ready(function () {
    $("#start").on("click", function () {
        playing = true;
        right = 0;
        wrong = 0;
        $("#startScreen").hide();
        $("#quiz").show();
        count = timeLimit;
        timer.reset(1000);
        showNextQuestion();
    });
    $("#yes").on("click", function () {
        answerCheck(true);
    });
    $("#no").on("click", function () {
        answerCheck(false);
    });

});

function displayScore() {
    $("#right").text(right);
    $("#wrong").text(wrong);
}

function answerCheck(response) {
    if (response == questions[questionNumber][2]) {
        right++;
    }
    else {
        wrong++;
    }
    showNextQuestion();
}
