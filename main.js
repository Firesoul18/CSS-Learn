document.documentElement.querySelector(".menu").style.setProperty("--fullwidth", window.innerWidth);
document.documentElement.querySelector(".menu").style.setProperty("--fullheight", window.innerHeight);
let a = new Audio("drop.mp3");
let vars = JSON.parse(localStorage.getItem("vars")) || {
    bgc: '#FFDE53',
    fc: '#000',
    shadow: 'rgba(0,0,0,0.4)',
    left: '7%',
    light:true
}

document.documentElement.style.setProperty('--left', vars.left);
document.documentElement.style.setProperty('--fc', vars.fc);
document.documentElement.style.setProperty('--bgc', vars.bgc);
document.documentElement.style.setProperty('--shadow', vars.shadow);

let cb = document.getElementsByClassName("round")[0];
cb.addEventListener('click', () => {
let light = vars.light;
    if (!light) {
        document.documentElement.style.setProperty('--left', '7%');
        document.documentElement.style.setProperty('--bgc', '#FFDE53');
        document.documentElement.style.setProperty('--fc', '#000');
        document.documentElement.style.setProperty('--shadow', 'rgba(0,0,0,0.4)');

        vars = {
            bgc: '#FFDE53',
            fc: '#000',
            shadow: 'rgba(0,0,0,0.4)',
            left: '7%',
            light:true
        }
    }
    else {
        document.documentElement.style.setProperty('--bgc', '#141e24');
        document.documentElement.style.setProperty('--fc', '#53a1b3');
        document.documentElement.style.setProperty('--shadow', 'rgba(83,161,169,0.4)');
        document.documentElement.style.setProperty('--left', '60%');
        vars = {
            bgc: '#141e24',
            fc: '#53a1b3',
            shadow: 'rgba(83,161,169,0.4)',
            left: '60%',
            light:false
        }
    }
    localStorage.setItem("vars", JSON.stringify(vars));
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
    wins.classList.add("pre-animation");
    window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
    });
}

function handle(str) {
    navigator.vibrate(100);
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
    if (document.querySelector(".nav-button").getAttribute("data-active") == "true" && (e.pageY < v.offsetTop || e.pageX < v.offsetLeft || e.pageX > (v.offsetLeft + v.offsetWidth) || e.pageY > (v.offsetTop + v.offsetHeight))) {

        console.log(document.getElementsByClassName("menu"));
        console.log(e);
        document.querySelector(".nav-button").setAttribute("data-active", "false");
        document.querySelector(".menu").setAttribute("data-menu-active", "false");
        document.querySelector(".body-on-menu").setAttribute("data-menu-active", "false");
    }
});

let options = {
    root: null,
    rootMargin: "30%",
    threshold: 0.7
}

let o = new IntersectionObserver((e, o) => {
    e.forEach(
        (entry) => {
            console.log(entry);
            if (entry.isIntersecting) {
                entry.target.classList.toggle('flipping');
                console.log(entry);
            }
            else {
                entry.target.classList.toggle('flipping');
            }
        }
    )
}, options);
let xds = document.querySelectorAll(".menu-item");
xds.forEach(
    (xd) => {
        o.observe(xd);
        xd.addEventListener('mouseover', () => {
            a.play();
        })
    }
)
