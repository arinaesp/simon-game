var level              = 0;
var started            = false;
var showingPattern     = false;   // blocks clicks during sequence playback
var userClickedPattern = [];
var gamePattern        = [];
var buttonColours      = ["red", "blue", "green", "yellow"];
var highScore          = parseInt(localStorage.getItem("simonHighScore") || "0");

$("#high-score").text(highScore);

// Sequence speed — faster each level, floor at 260ms
function stepSpeed() {
  return Math.max(260, 900 - (level - 1) * 35);
}

function nextSequence() {
  userClickedPattern = [];
  showingPattern     = true;
  level++;

  $("#level-num").text(level);
  $("#level-title").text("Level " + level);

  var randomColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColour);

  playPattern();
}

function playPattern() {
  var speed      = stepSpeed();
  var onDuration = Math.round(speed * 0.55);

  gamePattern.forEach(function(colour, i) {
    setTimeout(function() {
      lightUp(colour, onDuration);
    }, i * (speed + 80));
  });

  // Bug fix: wait until the LAST button actually turns off, then allow clicks.
  // Previous code used gamePattern.length * (speed+80) which added an extra
  // full step of unnecessary wait time.
  var totalWait = (gamePattern.length - 1) * (speed + 80) + onDuration + 200;
  setTimeout(function() { showingPattern = false; }, totalWait);
}

function lightUp(colour, onDuration) {
  $("#" + colour).addClass("pressed");
  playSound(colour);
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, onDuration);
}

// ── Button clicks ──────────────────────────────────────────────
$(".btn").on("click", function() {
  if (!started || showingPattern) return;

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Any key starts the game
$(document).on("keydown", function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 140);
}

// ── Answer checking ────────────────────────────────────────────
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    // Wrong answer
    playSound("wrong");

    $("#flash-overlay").addClass("active");
    setTimeout(function() { $("#flash-overlay").removeClass("active"); }, 450);

    $(".container").addClass("shake");
    setTimeout(function() { $(".container").removeClass("shake"); }, 450);

    if (level > highScore) {
      highScore = level;
      localStorage.setItem("simonHighScore", highScore);
      $("#high-score").text(highScore);
    }

    $("#level-title").text("⚡ GAME OVER — PRESS ANY KEY ⚡");
    startOver();
    return;
  }

  // Correct — check if full sequence matched
  if (userClickedPattern.length === gamePattern.length) {
    showingPattern = true;   // block clicks during level-up pause
    $(".container").addClass("level-up");
    setTimeout(function() {
      $(".container").removeClass("level-up");
      nextSequence();
    }, 900);
  }
}

function startOver() {
  level          = 0;
  started        = false;
  showingPattern = false;
  gamePattern    = [];
  $("#level-num").text("—");
}
