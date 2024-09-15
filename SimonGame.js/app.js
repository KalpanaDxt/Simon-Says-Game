let gameSequence = [];
let userSequence = [];

let buttons = ["goldenrod", "crimson", "coral", "gray"];

let start = false;
let level = 0;
let h3 = document.querySelector('h3');

document.addEventListener("keypress", function() {
    if(start == false)
    {
        console.log("Game started");
        start = true;

        setTimeout(levelUp, 1000);
    }
});

function buttonFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn){
    btn.classList.add("user-flash");

    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 200);
}

function levelUp() {
    userSequence = [];

    level++;
    h3.innerText = `Level-${level}`;

    //choose random button to flash
    let random = Math.floor(Math.random() * 4);
    let randomColor = buttons[random];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSequence.push(randomColor);
    console.log(gameSequence);

    // console.log(random);
    // console.log(randomColor);
    // console.log(randomBtn);
    buttonFlash(randomBtn);
}

function matchAns(index){
    // console.log(`current level: ${level}`);

    // let index = level-1;
    if(userSequence[index] === gameSequence[index])
    {
        if(userSequence.length == gameSequence.length)
        {
            levelUp();
        }
        console.log("same value");
    }
    else
    {
        h3.innerHTML = `GAME OVER! Your score is <b> ${level-1} </b> <br> Press any key to re-start!`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();       //to reset game again once it's over 
    }

}

function buttonPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    matchAns(userSequence.length-1);
}

let btns = document.querySelectorAll(".btn");
for(btn of btns)
{
    btn.addEventListener("click", buttonPress);
}

function reset() {
    start = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}