let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

// Detecting keydown event on windows document to start
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// Press title document to start
$("#level-title").click(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// 2. Detect button on click
$(".btn").on("click", function() {

    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

// 5. Function to check answers
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key or Click Here to Restart");

        startOver();
    }
}

// 6. Function to restart game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// 1. Function choose button in sequence
function nextSequence() {
    userClickedPattern = [];

    level ++;

    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// 3. Function to play sound
function playSound(name) {
        let sound = new Audio(`./sounds/${name}.mp3`);
        sound.play();  
}

// 4. Function to animate on click
function animatePress(currentColour) {
    $(`.${currentColour}`).addClass('pressed');
    setTimeout(function () {
        $(`.${currentColour}`).removeClass('pressed')
    }, 100)
}