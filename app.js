let pingPongMaxScore;
//fetch if there is any maxscore present or not
if (window.localStorage.getItem("pingPongMaxScore")) {
  pingPongMaxScore = window.localStorage.getItem("pingPongMaxScore");
  alert(`Maximum score is ${pingPongMaxScore}`);
} else {
  alert(`This is Your First Time`);
  pingPongMaxScore = 0; //set max score 0 for ffirst time
}


const rod = document.querySelectorAll(".rod");
const ball = document.querySelector(".ball");
const body = document.querySelector("body");

// gettig screen size (width and height)
const mainWidth = window.innerWidth;
const mainHeight = window.innerHeight;

// make partition width to 1% which help move rod by 1 %
const onePerWidth = mainWidth / 100;


// Move Rod function
function moveRod() {
  window.addEventListener("keypress", (event) => {

    const k = event.key.toUpperCase(); // Press key turn into upper
    const rodCod = rod[0].getBoundingClientRect(); // getting Rod's boundary

    // Move left and not move into left side when rod touch left side screen
    if (k == "A" && Math.floor(rodCod.left) > 0) {
      rod[0].style.left = rod[0].offsetLeft - onePerWidth + "px";
      rod[1].style.left = rod[1].offsetLeft - onePerWidth + "px";
    }

    // Move right and not move into right side when rod touch right side screen
    if (k == "D" && Math.floor(rodCod.right) < Math.floor(mainWidth)) {
      rod[0].style.left = rod[0].offsetLeft + onePerWidth + "px";
      rod[1].style.left = rod[1].offsetLeft + onePerWidth + "px";
    }
  });
}
moveRod();


//Initial Score of Rod 1
let score1 = 0;
const rod1Score = document.querySelector(".score1");

//Initial Score of Rod 2
let score2 = 0;
const rod2Score = document.querySelector(".score2");

//Move the Ball
function moveBall() {

  let leftright = Math.floor(Math.random() * 2); // choose 0 or 1
  let right = leftright ? true : false; // set 1 for move to right  and 0 for move to not right(left)
  let updown = Math.floor(Math.random() * 2); // choose 0 or 1
  let up = true; //Initially ball move to upwards
  
  let ballMove = setInterval(() => {
    //move 1px y axis (top or down) and 1px x axis (left or right)
    let ballTop = Math.floor(ball.offsetTop);
    let ballLeft = Math.floor(ball.offsetLeft);

    if (right && up) {
      //when ball want to go right side and upwards
      ball.style.top = ballTop - 1 + "px";
      ball.style.left = ballLeft + 1 + "px";
    }

    else if (!right && up) {
      //when ball want to go left side and upwards
      ball.style.top = ballTop - 1 + "px";
      ball.style.left = ballLeft - 1 + "px";
    }
      
    else if (right && !up) {
      //when ball want to go right side and downwards
      ball.style.top = ballTop + 1 + "px";
      ball.style.left = ballLeft + 1 + "px";
    }
      
    else if (!right && !up) {
      //when ball want to go left side and downwards
      ball.style.top = ballTop + 1 + "px";
      ball.style.left = ballLeft - 1 + "px";
    }

    //get all coordinate of ball
    let ballCod = ball.getBoundingClientRect();
    let ballCodLeft = parseInt(ballCod.left);
    let ballCodRight = parseInt(ballCod.right);
    let ballCodTop = parseInt(ballCod.top);
    let ballCodBottom = parseInt(ballCod.bottom);

    // if ball alredy on top choose randomly direction left or right and downwards
    if (ballCodTop == 20) {
      //get rod position to want ball on rod or not
      const rodCod = rod[0].getBoundingClientRect();
      leftright = Math.floor(Math.random() * 2);
      right = leftright ? true : false;
      if (
        parseInt(rodCod.left) <= ballCodLeft &&
        parseInt(rodCod.right) >= ballCodRight
      ) {
        score1++;
        rod1Score.innerHTML = score1;
        up = false;
      } else {
        // if ball not in rod
        clearInterval(ballMove);
        if (pingPongMaxScore >= score2) {
          alert(
            `Rod 2 Win with Score ${score2} and max score is ${pingPongMaxScore}`
          );
        } else {
          //set as max score on local sotage
          window.localStorage.setItem("pingPongMaxScore", score2);
          alert(`Rod 2 Win with  Score ${score2} and this max score`);
        }
      }
    }

    // if ball alredy on bottom choose randomly direction left or right and upwards
    if (ballCodBottom == Math.floor(mainHeight - 20)) {
      //get rod position to want ball on rod or not
      const rodCod = rod[0].getBoundingClientRect();
      leftright = Math.floor(Math.random() * 2);
      right = leftright ? true : false;
      if (
        parseInt(rodCod.left) <= ballCodLeft &&
        parseInt(rodCod.right) >= ballCodRight
      ) {
        score2++;
        rod2Score.innerHTML = score1;
        up = true;
      } else {
        // if ball not in rod
        clearInterval(ballMove);
        if (pingPongMaxScore >= score1) {
          alert(
            `Rod 1 Win with Score ${score1} and max score is ${pingPongMaxScore}`
          );
        } else {
          //set as max score on local sotage
          window.localStorage.setItem("pingPongMaxScore", score1);
          alert(`Rod 1 Win with  Score ${score1} and this max score`);
        }
      }
    }

    // if ball alredy on right choose  left side move
    if (ballCodRight == Math.floor(mainWidth)) {
      right = false;
    }
    
    // if ball alredy on left choose  right side move
    if (ballCodLeft == 0) {
      right = true;
    }
  }, 1);
}
moveBall();
