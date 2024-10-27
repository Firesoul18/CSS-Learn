let slider = document.getElementsByClassName("slider")[0];
let allImg = document.getElementsByTagName("img");


let size = allImg.length;
let current = 2, prev = 1; next = 0;

let nextButton = document.getElementsByClassName("next")[0];
let prevButton = document.getElementsByClassName("prev")[0];

nextButton.addEventListener("click", () => {
  scroll(true);
});
prevButton.addEventListener("click", () => {
  scroll(false);
});


function scroll(front) {
  if (front) {
    if (current >= (size - 1)) {
      current = 0;
    }
    else {
      current++;
    }

    prev = current - 1;
    if (prev < 0) {
      prev = size - 1;
    }

    next = current + 1;
    if (next >= size) {
      next = 0;
    }
    controlTransitionFront();
  }

  else {
    if (current <= 0) {
      current = size - 1;
    }
    else {
      current--;
    }

    prev = current - 1;
    if (prev < 0) {
      prev = size - 1;
    }

    next = current + 1;
    if (next >= size) {
      next = 0;
    }

    controlTransitionBack();
  }


  console.log(prev, current, next);

  allImg[current].style.left = "0";
  allImg[prev].style.left = "-100%";
  allImg[next].style.left = "100%";
}

function controlTransitionFront() {
  for (let index = 0; index < allImg.length; index++) {
    if (index === current) {
      allImg[index].style.transition = "all 0.4s";
      allImg[prev].style.transition = "all 0.4s";
      // allImg[next].style.transition="all 0.4s";
    }
    else {
      allImg[index].style.transition = "all 0s";
      allImg[prev].style.transition = "all 0.4s";
      // allImg[next].style.transition="all 0.4s";
    }
  }
}

function controlTransitionBack() {
  for (let index = 0; index < allImg.length; index++) {
    if (index === current) {
      allImg[index].style.transition = "all 0.4s";
      // allImg[prev].style.transition="all 0.4s";
      allImg[next].style.transition = "all 0.4s";
    }
    else {
      allImg[index].style.transition = "all 0s";
      // allImg[prev].style.transition="all 0.4s";
      allImg[next].style.transition = "all 0.4s";
    }
  }
}

setInterval(() => { scroll(true) }, 4000)