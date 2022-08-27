function showDate() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let dateElement = document.querySelector("#curDate");
  dateElement.innerHTML = now.getDate();
  let monthElement = document.querySelector("#month");
  monthElement.innerHTML = month;
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = day;
}

function showTime() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = document.querySelector("#tm");
  time.innerHTML = `${hour}:${minutes}`;
}

showDate();
showTime();
