// object to house global variables
const vars = {
  sessionMax: 60,
  sessionMin: 5,
  breakMax: 20,
  breakMin: 1,
  sessionInterval: null,
  breakInterval: null,
  minutes: null,
  seconds: null,
  t: null
}


// add event listeners to replace inline HTML onclick elements
window.onload = function () {
  const button = document.querySelectorAll('.btn');
  button.forEach(button => button.addEventListener('click', handleClick));
  defaults();
}


// assigns correct function based on button clicked 
function handleClick(e) {
  const button = e.currentTarget.classList.item(0);
  button == 'increment-btn'
    ? incrementTimer()
    : button == 'decrement-btn'
    ? decrementTimer()
    : button == 'start-stop-btn'
    ? startBtnToggle()
    : button == 'defaults-btn'
    ? defaults()
    : button == 'sb-toggle-btn'
    ? sbBtnToggle()
    : reset() 
}


// gets and returns current state of btn passed in
function btnState(elem) {
  return document.getElementById(elem);
}


// gets and returns id of digital readout for .innerHTML injection
function readout() {
  return document.getElementById('display');
}


// toggles session/break! button text
function sbBtnToggle() {
  vars.seconds = 60;
  return btnState('sb-btn').innerHTML == 'session'
  ? (btnState('sb-btn').innerHTML = "break!", vars.minutes = vars.breakInterval, document.getElementById('display').innerHTML = vars.minutes + ":" + "00")
  : (btnState('sb-btn').innerHTML = "session", vars.minutes = vars.sessionInterval , document.getElementById('display').innerHTML = vars.minutes + ":" + "00")
}


// toggles start/stop button text
function startBtnToggle() {
  return btnState('start-btn').innerHTML == "start"
  ? (btnState('start-btn').innerHTML = "stop", toggleBtnDisable(true), startTimer())
  : (btnState('start-btn').innerHTML = "start", toggleBtnDisable(false), clearTimeout(vars.t))
}


// disables certain buttons when timer is running
function toggleBtnDisable(toggle) {
  const button = document.querySelectorAll('.disabled-btn');
  toggle == true 
    ? button.forEach(button => button.setAttribute('disabled', toggle))
    : button.forEach(button => button.removeAttribute('disabled'))
}


// increases timer settings
function incrementTimer() {
  return btnState('sb-btn').innerHTML == "session"
  ? (vars.sessionInterval < vars.sessionMax && vars.sessionInterval++, vars.minutes = vars.sessionInterval, readout().innerHTML = vars.minutes + ":" + "00") 
  : (vars.breakInterval < vars.breakMax && vars.breakInterval++, vars.minutes = vars.breakInterval, readout().innerHTML = vars.minutes + ":" + "00") 
}


// decreases timer settings
function decrementTimer() {
  return btnState('sb-btn').innerHTML == "session"
  ? (vars.sessionInterval > vars.sessionMin && vars.sessionInterval--, vars.minutes = vars.sessionInterval, readout().innerHTML = vars.minutes + ":" + "00") 
  : (vars.breakInterval > vars.breakMin && vars.breakInterval--, vars.minutes = vars.breakInterval, readout().innerHTML = vars.minutes + ":" + "00") 
}


// sets all settings to default
function defaults() {
  vars.sessionInterval = 25;
  vars.breakInterval = 5;
  vars.seconds = 60;
  vars.minutes = vars.sessionInterval;
  document.getElementById('sb-btn').innerHTML = "session";
  document.getElementById('start-btn').innerHTML = "start";
  readout().innerHTML = vars.sessionInterval + ":" + "00";
}


// counts down and displays timer
function startTimer() {
  clearTimeout(vars.t);
  vars.seconds == 60
    ? document.getElementById('display').innerHTML = vars.minutes + ":" + "00"
    : document.getElementById('display').innerHTML = vars.minutes - 1 + ":" + (vars.seconds < 10 ? "0" : "") + vars.seconds,
    vars.seconds--;
  vars.seconds == 0 && (vars.minutes--, vars.seconds = 60);
  vars.minutes == 0 && (document.getElementById('ding').play(), sbBtnToggle());
  vars.t = setTimeout(startTimer, 1000);
}


// resets timer to back to current settings
function reset() {
  startBtnToggle();
  toggleBtnDisable(false);
  btnState('sb-btn').innerHTML == 'session'
  ? (vars.minutes = vars.sessionInterval, readout().innerHTML = vars.minutes + ":" + "00")
  : (vars.minutes = vars.breakInterval, readout().innerHTML = vars.minutes + ":" + "00"),
  vars.seconds = 60,
  document.getElementById('start-btn').innerHTML = "start"
  clearTimeout(vars.t);
}