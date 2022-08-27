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

function changeCity(event) {
  event.preventDefault();
  let cityname = document.querySelector("#city");
  let myCity = cityname.value.toLowerCase();
  let weUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=metric`;
  axios.get(weUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  let myCity = response.data.name;
  let myCountry = response.data.sys.country;
  h1.innerHTML = `${myCity}, ${myCountry}`.toUpperCase();
  let curHum = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  hum.innerHTML = `${curHum}%`;
  let curWind = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${curWind}m/s`;
  let curTemp = Math.floor(response.data.main.temp);
  let temp = document.querySelector("#deg");
  temp.innerHTML = `${curTemp}°C`;
  let curDescrpt = response.data.weather[0].description;
  let desc = document.querySelector("#desc");
  desc.innerHTML = `${curDescrpt}`;
}

let apiKey = "9ebbcc5f37304a3ed740e8af90680e70";
let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", changeCity);

showDate();
showTime();
