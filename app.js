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

  currentWeatherState.innerHTML = weatherInfo;
  currentHumidity.innerHTML = humidity;
  headingOne.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  windSpeed.innerHTML = speedOfWind;
  timeElement.innerHTML = formattedDate(date);
}

function formattedDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Wednesday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "267ca2c9b55504a4o4ef34d3b037dtb8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refrechWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Rabat");
