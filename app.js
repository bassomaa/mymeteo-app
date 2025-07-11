function refrechWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-current");
  let temperature = response.data.temperature.current;
  let headingOne = document.querySelector("#weather-app-city");
  let currentWeatherState = document.querySelector("#weather-details");
  let currentHumidity = document.querySelector("#Humidity");
  let humidity = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  let speedOfWind = ` ${response.data.wind.speed} km/h`;
  let weatherInfo = response.data.condition.description;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconImg = document.querySelector("#icon");
  let city = response.data.city;
  iconImg.innerHTML = `<img
  src="${response.data.condition.icon_url}"
  id ="weather-app-icon"
  />`;

  currentWeatherState.innerHTML = weatherInfo;
  currentHumidity.innerHTML = humidity;
  headingOne.innerHTML = city;
  temperatureElement.innerHTML = Math.round(temperature);
  windSpeed.innerHTML = speedOfWind;
  timeElement.innerHTML = formattedDate(date);

  forecastWeather(city);
}

function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "267ca2c9b55504a4o4ef34d3b037dtb8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refrechWeather);
}
function showForecastWeather(response) {
  let days = response.data.daily;
  let data = response.data;
  htmlUpdateForecast(days);
}
function forecastWeather(city) {
  let apiForecastKey = "267ca2c9b55504a4o4ef34d3b037dtb8";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiForecastKey}&units=metric`;
  axios.get(apiForecastUrl).then(showForecastWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function htmlUpdateForecast(date) {
  let html = "";
  for (let i = 0; i < 5; i++) {
    let icon = date[i].condition.icon_url;
    let minForcast = Math.round(date[i].temperature.minimum);
    let maxForcast = Math.round(date[i].temperature.maximum);
    let weekDays = new Date(date[i].time * 1000);
    let days = formatDateForecast(weekDays);
    html += `
            <div class="weather-forecast-day">
              <div class="weather-forecast-date">${days}</div>
              <div class="weather-forecast-icon"> <img src=${icon} alt="" /> </div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature">
                  <strong>${maxForcast}°</strong>
                </div>
                <div id="weather-forecast-temperature">${minForcast}°</div>
              </div>
            </div>`;
  }

  function formatDateForecast(date) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastDays = days[date.getDay()];
    return forecastDays;
  }
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = html;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Rabat");
