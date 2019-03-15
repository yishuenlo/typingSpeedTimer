const TIMERDISPLAY = document.querySelector(".timer");
const PROMPT = document.querySelector("#prompt-text")
const INPUT = document.querySelector("#input-area")
const RESETBTN = document.querySelector("button");

// select text input area when browser is loaded
window.onload = INPUT.select();

var interval;
var timer = [0,0]; //min, sec

function leadingZero(time){
  if(time <=9){
    time = "0" + time;
  }
  return time;
}

function runTimer(){
 let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]+1);//add 1 to secomd bc of interval lag of 1000ms
 TIMERDISPLAY.innerHTML = currentTime;
 timer[1]++; //increment seconds as the timer runs

 //convert time and display
 timer[0] = Math.floor(timer[1]/60); //minute = 1 sec/100 ms * 1 min/60 sec
 timer[1] = Math.floor((timer[1]) - (timer[0]*60));
}

function startTimer(){
  let inputTxtLength = INPUT.value.length;
  if(inputTxtLength == 0){
    interval = setInterval(runTimer, 1000);
  }
}

function spellCheck(){
  let txtEntered = INPUT.value;
  let promptTxtMatch = PROMPT.substring(0, textEntered.length);
}

function reset(){

}


// -------EVENT LISTENERS---------
// listen to keypress in input Area to start timer
INPUT.addEventListener("keypress", startTimer);

// listen to keyup, then do spell check
INPUT.addEventListener("keyup", spellCheck);

// listen to mouse click release, then reset
RESETBTN.addEventListener("mouseup", reset);
