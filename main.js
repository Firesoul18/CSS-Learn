let cb = document.getElementsByClassName("round")[0];
let dark = false;
// let toggle = window.getComputedStyle(cb,':before');
cb.addEventListener('click', _ => {
    if (!dark) {
        document.documentElement.style.setProperty('--left', '58%');
        document.documentElement.style.setProperty('--white', '#000');
        document.documentElement.style.setProperty('--black', '#fff');
        document.documentElement.style.setProperty('--white-shadow', 'rgba(0,0,0,0.4)');
        console.log(document.getElementsByClassName('round::after'));

    }
    else {
        document.documentElement.style.setProperty('--white', '#fff');
        document.documentElement.style.setProperty('--black', '#000');
        document.documentElement.style.setProperty('--white-shadow', 'rgba(256,256,256,0.4)');
        document.documentElement.style.setProperty('--left', '7%');
    }
    dark = !dark;
});

// console.log(localStorage.getItem("error")||4);

let obj = JSON.parse(localStorage.getItem("obj")) || {
    "win": 0,
    "lose": 0,
    "draw": 0
};
// if(localStorage.getItem("obj")){
//     obj = ;
// }

let rock = document.querySelector(".rock")
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
let wins = document.querySelector(".win");
let loses = document.querySelector(".lose");
let draws = document.querySelector(".draw");
let reset = document.querySelector(".reset");


wins.append(obj.win);
loses.append(obj.lose);
draws.append(obj.draw);


function getEmoji(emoji) {
    if (emoji === "rock")
        return '✊';
    else if (emoji === "paper")
        return '🤚';
    else if (emoji === "scissors")
        return '✌️';
}


function chose(user, comp, result) {
    let d = document.querySelector(".chose");
    d.innerHTML='';
    let p1 = document.createElement("p");
    let text = document.createTextNode(`You Chose ${getEmoji(user)}`);
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    p3.appendChild(document.createTextNode(`It's a ${result}`));
    let text2 = document.createTextNode(`Bot: ${getEmoji(comp)}`);
    p1.appendChild(text);
    p2.appendChild(text2);
    d.style.setProperty("animation", "s 0.4s ease-out 0s 1 normal forwards");
    d.appendChild(p1);
    d.appendChild(p2);
    d.appendChild(p3);
}


function check(user, comp) {
    if (user === comp) {
        obj.draw++;
        chose(user, comp, "draw");
    }
    else if ((user === 'rock' && comp === 'scissors') || (user === "paper" && comp == "rock") || (user === "scissors" && comp === "paper")) {
        obj.win++;
        chose(user, comp, "win");
    }
    else {
        obj.lose++;
        chose(user, comp, "lose");

    }
    localStorage.setItem("obj", JSON.stringify(obj));
    // console.log(obj);
    // alert(obj)
    wins.innerHTML = 'Wins: ' + obj.win;
    loses.innerHTML = 'Loses: ' + obj.lose;
    draws.innerHTML = 'Draws: ' + obj.draw;
}

function handle(str) {
    let x = Math.random();
    check(str, x < 0.33 ? "rock" : (x < 0.66 ? "paper" : "scissors"))
}

function resetScore() {
    obj = {
        "win": 0,
        "lose": 0,
        "draw": 0
    }
    wins.innerHTML = 'Wins: ' + obj.win;
    loses.innerHTML = 'Loses: ' + obj.lose;
    draws.innerHTML = 'Draws: ' + obj.draw;
    localStorage.setItem("obj", JSON.stringify(obj));
    document.body.getElementsByClassName("chose")[0].style.setProperty("animation", "t 0.4s ease-in 0s 1 normal forwards");
}

rock.addEventListener('click', function () { handle('rock') });
paper.addEventListener('click', function () { handle('paper') });
scissors.addEventListener('click', function () { handle('scissors') });
reset.addEventListener('click', function () { resetScore() });

window.addEventListener('beforeunload',()=>document.body.getElementsByClassName("chose")[0].style.setProperty("animation", "t 0.4s ease-in 0s 1 normal forwards"));