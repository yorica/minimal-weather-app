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

function forecastDates(timestamp) {
  let now = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];
  return day;
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

function showIcon(iCode) {
  let iconMap = {
    "01d": "fa-sun",
    "01n": "fa-moon",
    "02d": "fa-cloud-sun",
    "02n": "fa-cloud-moon",
    "03d": "fa-cloud-sun",
    "03n": "fa-cloud-moon",
    "04d": "fa-cloud",
    "04n": "fa-cloud",
    "09d": "fa-cloud-showers-heavy",
    "09n": "fa-cloud-showers-heavy",
    "10d": "fa-cloud-rain",
    "10n": "fa-cloud-rain",
    "11d": "fa-cloud-bolt",
    "11d": "fa-cloud-bolt",
    "13d": "fa-snowflake",
    "13n": "fa-snowflake",
    "50d": "fa-smog",
    "50n": "fa-smog",
  };

  let iconClass = iconMap[iCode];
  return iconClass;
}

function showForecast(response) {
  let forecast = response.data.daily;
  let weForecast = document.querySelector("#up-weather");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      let iconCode = forecastDay.weather[0].icon;
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
       <p class="day">${forecastDates(forecastDay.dt)}</p>
        <i class="fa-solid ${showIcon(iconCode)} w-icon-2"></i>
        <p class="temps">
          <span class="temp-max cel">${Math.round(
            forecastDay.temp.max
          )}</span> <span class="temp-min cel">${Math.round(
          forecastDay.temp.min
        )}</span>
        </p>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let weUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(weUrl).then(showForecast);
}

function showTemp(response) {
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
  let temp = document.querySelector("#deg");
  cTemp = Math.floor(response.data.main.temp);
  if (temp.className == "deg fah") {
    let fTemp = Math.floor(cTemp * 1.8 + 32);
    temp.innerHTML = `${fTemp}°F`;
  } else {
    temp.innerHTML = `${cTemp}°C`;
  }

  let desc = document.querySelector("#desc");
  desc.innerHTML = response.data.weather[0].description;
  let iCode = response.data.weather[0].icon;
  let curIcon = document.querySelector("#icon");
  curIcon.setAttribute("class", `fa-solid ${showIcon(iCode)} w-icon`);

  getForecast(response.data.coord);
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
showDate();
showTime();
