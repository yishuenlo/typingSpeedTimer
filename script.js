const TIMERDISPLAY = document.querySelector(".timer");
const PROMPT = document.querySelector("#prompt-txt");
const INPUT = document.querySelector("#input-area");
const RESETBTN = document.querySelector("button");

// select text input area when browser is loaded
window.onload = INPUT.select();

var interval;
var timer = [0,0,0]; //min, sec
var timerRunning = false;

function leadingZero(time){
  if(time <=9){
    time = "0" + time;
  }
  return time;
}

function runTimer(){
 let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]);//add 1 to secomd bc of interval lag of 1000ms
 TIMERDISPLAY.innerHTML = currentTime;
 timer[2]++; //increment seconds as the timer runs

 //convert time and display
 //onvert ms to minute. since interval is set to 100ms:
 // 1ms(100)(1sec/1000ms)(1min/60sec)
 timer[0] = Math.floor(timer[2]*100/1000/60);

  //onvert ms to second. since interval is set to 100ms:
  // 1ms(100)(1sec/100ms) - 1min(60sec/1min)
 timer[1] = Math.floor((timer[2]*100/1000) - (timer[0]*60));
}

function startTimer(){
  let inputTxtLength = INPUT.value.length;
  if(inputTxtLength == 1 && !timerRunning){
    timerRunning = true;
    interval = setInterval(runTimer, 100); //interval of 100ms
  }
}


function spellCheck(){
  let txtEntered = INPUT.value;
  let promptTxtMatch = PROMPT.innerHTML.substring(0, txtEntered.length);

  //if text matches exactly - game ends
  if(txtEntered == PROMPT.innerHTML){
    // stops timer
    clearInterval(interval);

    //disable textarea so users can't edit the text
    INPUT.disabled = true;

    // change border display and text to green to signal game over
    INPUT.style.borderColor = "#74EBD5";
    INPUT.style.color = "#4BD5C7";
  } else {
    if(txtEntered == promptTxtMatch){
      INPUT.style.borderColor = "#E0E0E0"; //grey
    } else {
      INPUT.style.borderColor = "#EC407A"; //magenta
    }
  }
}

function reset(){
  //reset interval and timer value
  clearInterval(interval);
  interval = null;
  timer = [0,0,0];
  timerRunning = false;

  //reset display
  INPUT.value = "";
  TIMERDISPLAY.innerHTML = "00:00";
  INPUT.disabled = false;
  INPUT.style.borderColor = "#74EBD5";
  INPUT.style.color = "#616161";
}


// -------EVENT LISTENERS---------
// listen to keypress in input Area to start timer
INPUT.addEventListener("keyup", startTimer);

// listen to keyup, then do spell check
INPUT.addEventListener("keyup", spellCheck);

// listen to mouse click release, then reset
RESETBTN.addEventListener("mouseup", reset);
