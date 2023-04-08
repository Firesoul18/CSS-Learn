
document.documentElement.querySelector(".menu").style.setProperty("--fullwidth", window.innerWidth);
document.documentElement.querySelector(".menu").style.setProperty("--fullheight", window.innerHeight);
let vars = JSON.parse(localStorage.getItem("vars")) || {
    white: '#fff',
    black: '#000',
    whiteShadow: 'rgba(256,256,256,0.4)',
    left: '7%'
}

document.documentElement.style.setProperty('--left', vars.left);
document.documentElement.style.setProperty('--white', vars.white);
document.documentElement.style.setProperty('--black', vars.black);
document.documentElement.style.setProperty('--white-shadow', vars.whiteShadow);

let cb = document.getElementsByClassName("round")[0];
let dark = false;
cb.addEventListener('click', _ => {
    if (!dark) {
        document.documentElement.style.setProperty('--left', '60%');
        document.documentElement.style.setProperty('--white', '#000');
        document.documentElement.style.setProperty('--black', '#fff');
        document.documentElement.style.setProperty('--white-shadow', 'rgba(0,0,0,0.4)');

        vars = {
            white: '#000',
            black: '#fff',
            whiteShadow: 'rgba(0,0,0,0.4)',
            left: '60%'
        }

    }
    else {
        document.documentElement.style.setProperty('--white', '#fff');
        document.documentElement.style.setProperty('--black', '#000');
        document.documentElement.style.setProperty('--white-shadow', 'rgba(256,256,256,0.4)');
        document.documentElement.style.setProperty('--left', '7%');
        vars = {
            white: '#fff',
            black: '#000',
            whiteShadow: 'rgba(256,256,256,0.4)',
            left: '7%'
        }
    }
    localStorage.setItem("vars", JSON.stringify(vars));
    dark = !dark;
});


let obj = JSON.parse(localStorage.getItem("obj")) || {
    "win": 0,
    "lose": 0,
    "draw": 0
};

let rock = document.querySelector(".rock")
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
let wins = document.querySelector(".win");
let loses = document.querySelector(".lose");
let draws = document.querySelector(".draw");
let reset = document.querySelector(".reset");
let nav = document.querySelector(".nav-button");
let nav_after = document.querySelector(".nav-button::after");
let nav_before = document.querySelector("nav-button::before");
let menu = document.querySelector(".menu");
let outbody = document.querySelector(".body-on-menu");

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
    d.innerHTML = '';
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
    wins.innerHTML = 'Wins: ' + obj.win;
    loses.innerHTML = 'Loses: ' + obj.lose;
    draws.innerHTML = 'Draws: ' + obj.draw;
    window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
    });
}

function handle(str) {
    navigator.vibrate(400);
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

window.addEventListener('beforeunload', () => document.body.getElementsByClassName("chose")[0].style.setProperty("animation", "t 0.4s ease-in 0s 1 normal forwards"));


let x = () => {
    let isActive = nav.getAttribute("data-active");
    console.log(isActive);
    if (isActive === "false") {
        isActive = "true"
    }
    else {
        isActive = "false"
    }
    nav.setAttribute("data-active", isActive);
    menu.setAttribute("data-menu-active", isActive);
    outbody.setAttribute("data-menu-active", isActive);


    console.log(document.documentElement.querySelector(".menu").style.getPropertyValue("--fullwidth"));
    document.documentElement.querySelector(".menu").style.setProperty("--fullwidth", window.innerWidth);
    document.documentElement.querySelector(".menu").style.setProperty("--fullheight", window.innerHeight);
}

nav.addEventListener('click', () => {
    x();
})


outbody.addEventListener('click', (e) => {
    let v = document.getElementsByClassName("menu")[0];
    if (document.querySelector(".nav-button").getAttribute("data-active") == "true" && (e.clientY<v.offsetTop||e.clientX < v.offsetLeft||e.clientX>(v.offsetLeft+v.offsetWidth)||e.clientY>(v.offsetTop+v.offsetHeight))) {

        console.log(e.clientY+" "+(v.offsetHeight+v.offsetTop));
        document.querySelector(".nav-button").setAttribute("data-active", "false");
        document.querySelector(".menu").setAttribute("data-menu-active", "false");
        document.querySelector(".body-on-menu").setAttribute("data-menu-active", "false");
    }
});