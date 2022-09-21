import { API_KEY } from "./myconfig.js";
const ICON_DOM = document.getElementById("iconWeather");
const CITY_DOM = document.getElementById("cityName");
const WEATHER_DESCRIPTION_DOM = document.getElementById("weatherDescription");
const SPINNER_DOM = document.getElementById("spinnerWeather");
const DATA_WEATHER_DOM = document.getElementById("dataWeather");

// BROWSER LOCATION
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
    WEATHER_DESCRIPTION_DOM.innerHTML =
      "Geolocation is not supported by this browser.";
  }
}
getLocation();

// WEATHER API FETCHING
async function showPosition(position) {
  try {
    setTimeout(async function () {
      const LAT = position.coords.latitude;
      const LON = position.coords.longitude;
      const API = API_KEY;
      const RESPONSE = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API}&units=metric`
      );
      const DATA = await RESPONSE.json();
      let cityName = DATA.name;
      let iconWeather = DATA.weather[0].icon;
      let temperature = `${Math.trunc(DATA.main.temp)}°`;

      ICON_DOM.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconWeather}.png`
      );

      SPINNER_DOM.classList.add("d-none");
      CITY_DOM.innerHTML = cityName;
      WEATHER_DESCRIPTION_DOM.innerHTML = temperature;
      DATA_WEATHER_DOM.classList.remove("d-none");
    }, 4000);
  } catch (err) {
    console.error("There was an error connecting to the API");
  }
}
