let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClikcedPattern = [];
let level = 0;
let start = 0;

function nextSequence() {
  userClikcedPattern.length = 0;

  level++;

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  $(this).fadeOut(100).fadeIn(100);

  playSound(userChosenColour);

  userClikcedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClikcedPattern.length - 1);
});

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = 1;
  }
});

function checkAnswer(currentLevel) {
  if (userClikcedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClikcedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over. Your best level is " + level + ", Press Any Key to restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  start = 0;
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
