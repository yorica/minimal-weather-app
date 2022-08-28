function showDate(timestamp) {
  let now = new Date(timestamp);
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

function showTime(timestamp) {
  let now = new Date(timestamp);
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
  findCity(myCity);
}

function findCity(city) {
  let weUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  cTemp = Math.floor(response.data.main.temp);
  let temp = document.querySelector("#deg");
  temp.innerHTML = `${cTemp}°C`;
  let desc = document.querySelector("#desc");
  desc.innerHTML = response.data.weather[0].description;
  showDate(response.data.dt * 1000);
  showTime(response.data.dt * 1000);
}

function goHome(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMe);
}

function findMe(position) {
  let curLat = position.coords.latitude;
  let curLon = position.coords.longitude;
  let weUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${curLat}&lon=${curLon}&appid=${apiKey}&units=metric`;
  axios.get(weUrl).then(showTemp);
}

function convertDeg(event) {
  event.preventDefault();
  let temp = document.querySelector("#deg");
  if (temp.className == "deg cel") {
    temp.className = "deg fah";
    let fTemp = Math.floor(cTemp * 1.8 + 32);
    temp.innerHTML = `${fTemp}°F`;
    btn.innerHTML = `<strong>°C</strong>`;
  } else {
    temp.className = "deg cel";
    temp.innerHTML = `${cTemp}°C`;
    btn.innerHTML = `<strong>°F</strong>`;
  }
}

let apiKey = "9ebbcc5f37304a3ed740e8af90680e70";

let cTemp = null;

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", changeCity);

let homeButton = document.querySelector("#home");
homeButton.addEventListener("click", goHome);

let btn = document.querySelector("#temp");
btn.addEventListener("click", convertDeg);

findCity("Kyiv");
