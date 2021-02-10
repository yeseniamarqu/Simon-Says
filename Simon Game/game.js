var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; //randomly generated array contain strings of color

var userClickedPattern = []; //contains the buttons user has enterned

var level = 0;
var startGame = false;
var buttonTracker = 0;

//keeps track of when to start and Restart game
//boolean varible used to keep track of when the game has started
$(document).on("keydown", function() {
  if (startGame === false) {
    nextSequence();
    startGame = true;
  }
});


//tracking user button clicks
$(".btn").on("click", function() {
  var userChosenColor = this.id; //id of the clicked button is store in unserChosenVarible
  userClickedPattern.push(userChosenColor); //the id is pushed into the array userClickedPattern
  playSound(userChosenColor); //sound played when clicked using playSound()
  animatePress(userChosenColor); //pressed animation added when clicked
  checkAnswer(level - 1);
});




//game pattern function
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3); //randon number 0-3 picked
  randomChosenColor = buttonColors[randomNumber]; //using the random number random color picked from array
  gamePattern.push(randomChosenColor); //random color added to array

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // "flashing" animation added
  playSound(randomChosenColor); //sound for pattern played
  //checkAnswer(level-1);
}

//sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//pressed class added when user pressed
function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed"); //class .pressed added and removed after 200milsec
  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  }, 100);

}

//compares the current user input with the game pattern
//if the game pattern and user entered buttons then the next level is produced and game continues
function checkAnswer(currentLevel) {
  if (userClickedPattern.length == level && (gamePattern[buttonTracker] === userClickedPattern[buttonTracker])) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      userClickedPattern = [];
      buttonTracker = 0;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else if (gamePattern[buttonTracker] != userClickedPattern[buttonTracker]) { //if the patterns do not match then game is stopped
    //game over message is displaye and startover function is called
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart"); //h1 title changed to display game over message
    $("body").addClass("game-over"); //game over css class added turning screen red
    setTimeout(function() {
      $("body").removeClass("game-over"); //game-over class removed to create "flash event"
    }, 200);
    startOver();
  } else {
    buttonTracker++; //varible keeps track of the current issuer input and used to compare the two arrays(gamePattern and userClickedPattern)
}

function startOver(){ //game is Restarted. setting all varibles to 0 or empty to allow for gameplay after game lost.
startGame = false;
userClickedPattern = [];
gamePattern = [];
buttonTracker = 0;
level = 0;

}
