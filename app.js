function refrechWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-current");
  let temperature = response.data.temperature.current;
  let headingOne = document.querySelector("#weather-app-city");
  headingOne.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
