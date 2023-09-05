const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
// lets work on Alarm
const setAlarmBtn = document.querySelector("button");
let content = document.querySelector(".content");
let alarmTime;
// work on stop Alarm
let isAlarm = false;
let ringTone = new Audio("./files/ringtone.mp3");
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let amPm = i == 1 ? "AM" : "PM";
  let option = `<option value="${amPm}">${amPm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
  //getting hours , minutes and seconds
  let currentDate = new Date();
  let getHours = currentDate.getHours();
  let getMinutes = currentDate.getMinutes();
  let getSeconds = currentDate.getSeconds();
  amPm = "AM";
  if (getHours >= 12) {
    getHours = getHours - 12;
    amPm = "PM";
  }
  //If hour value is "0" set this value to "12"
  getHours = getHours == 0 ? (getHours = 12) : getHours;
  //adding '0' before hour , minute and seconds if this value is less than 10
  getHours = getHours < 10 ? "0" + getHours : getHours;
  getMinutes = getMinutes < 10 ? "0" + getMinutes : getMinutes;
  getSeconds = getSeconds < 10 ? "0" + getSeconds : getSeconds;
  currentTime.innerText = `${getHours}:${getMinutes}:${getSeconds}:${amPm}`;

  if (alarmTime == `${getHours}:${getMinutes}:${amPm}`) {
    ringTone.play();
    ringTone.loop == true;
    // console.log("Alarm is ringing..........");
  }
}, 1000);
// work on Alarm
function setAlarm() {
  //work on clear or stop alarm
  if (isAlarm) {
    alarmTime = "";
    ringTone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarm = false);
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please , select a valid time to set Alarm");
  }
  //   console.log(time);
  isAlarm = true;
  alarmTime = time;
  console.log(alarmTime);
  content.classList.add("disabled");
  setAlarmBtn.innerText = "clear Alarm";
}
setAlarmBtn.addEventListener("click", setAlarm);
