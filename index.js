var actualGameList = [];
var currentUserList = [];
var currentLevel = 0;
var activeGame = false;
var gameCount = 0;

//GAME RULES

function startGame() {
    activeGame = true;
    currentLevel = 1;

    actualGameList = [];
    currentUserList = [];

    //Initial Logic
    setLevelText(1);

    handleCurrentKey();

    if(gameCount > 0)
    {
        return;
    }

    $(".btn").click(function() {
        //Handle button pressed

        switch(this.textContent)
        {
            case "A": handleClickedButton(1); break;
            case "B": handleClickedButton(2); break;
            case "C": handleClickedButton(3); break;
            case "D": handleClickedButton(4); break;
        }
    });

    _debug();
}

function setLevelText(level)
{
    $("h1").text("Level " + level);
}

function getRandomNumber()
{
    var ran = Math.random();

    ran *= 4;

    return Math.ceil(ran);
}

function handleCurrentKey()
{
    var pos = getRandomNumber();

    actualGameList.push(pos);
    handleClickedButton(pos, true);
}

function handleClickedButton(pos, byComputer = false)
{
    //Add blur shadow
    getKeyByPos(pos).classList.add("pressed");

    setTimeout(function(){
        getKeyByPos(pos).classList.remove("pressed");
    }, 100);

    if(byComputer){
        return;
    }

    //Handle the user input with the array ----------------------------
    currentUserList.push(pos);
    
    //Verify each user input with the game array
    var userInputsCount = currentUserList.length;

    for(var i = 0; i<userInputsCount; i++)
    {
        if(currentUserList[i] === actualGameList[i])
        {
            //They do match, check if a new level is set
            if(i === actualGameList.length - 1)
            {
                //They matched all, new game
                setTimeout(newLevel, 500);

                playSound(true)
            }
        }
        else
        {
            //Game failed
            gameOver();
            break;
        }
    }
}

function newLevel()
{
    currentLevel++;
    setLevelText(currentLevel);
    currentUserList = [];

    handleCurrentKey();
}

function gameOver()
{
    $("h1").text("Game Over, Press Any Key to Restart");
    activeGame = false;

    gameCount++;

    $("body").addClass("wrong-bg");
    setTimeout(function(){
        $("body").removeClass();
    }, 100);

    playSound(false);
}

function playSound(success)
{
    var path;

    if(success)
    {
        path = "./media/green.mp3";
    }
    else
    {
        path = "./media/wrong.mp3";
    }

    var audio = new Audio(path);
    audio.play();
}

//DOM HANDLING
function getKeyByPos(pos)
{
    switch(pos)
    {
        case 1: return document.querySelector(".btn-1");
        case 2: return document.querySelector(".btn-2");
        case 3: return document.querySelector(".btn-3");
        case 4: return document.querySelector(".btn-4");
        default: alert("An error happened!"); break;
    }
}

$(document).keypress(clickTouchEvent);
$(document).on("touch", clickTouchEvent);

function clickTouchEvent()
{
    if(!activeGame) {
        startGame();
    }
}