var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (e) {
    if (!started) {
        $("h1").text("Level " + level);
        started = true;
        nextSequence();
    }
});

$("#level-title").click(function (e) {
    if (!started) {
        $("h1").text("Level " + level);
        started = true;
        nextSequence();
    }
})

$(".btn").click(function () {
    if (started) {
        var userChosenColour = $(this).attr("id");
    
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
    
        checkAnswer(userClickedPattern.length - 1);
    }
});

function checkAnswer(currentLevel) {
    if(started){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
    
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
    
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
    
            startOver();
        }
    }
}
function nextSequence() {
    if(started) {
        userClickedPattern = [];
    
        level++;
        $("h1").text("Level " + level);
    
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
    
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }

