// Delcare API Key as constant
const apiKey = "a7a720181a7de2e5dae1fec13acc6175";

// Declare search button element as variable
// TODO: Do history button elements need to be declared beforehand?
var searchButton = document.getElementById("search-button");

var cityName = "";

function findLatitudeLongitude(cityName) {
  var queryResult = [];
  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;

  async function fetchData() {
    const response = await fetch(requestUrl);
    const data = await response.json();
    console.log(data);
    return data;
  }

/*
  fetch(requestUrl)
    .then(function (response) {
      var respQuery = response.json();
      return respQuery;
    })
    .then(function (data) {
      queryResult = [data[0].lat, data[0].lon];
      console.log("queryReesult: ", queryResult);
      return queryResult;
    });
*/

}

function submitQuery() {
  // TODO: Parse city name and replace " " with "_"
  cityName = document.getElementById("city-search-form").value;
  // console.log(findLatitudeLongitude(cityName));
  var latLong = Object.assign({}, findLatitudeLongitude(cityName));

  // console.log(latLong);
  // TODO: Submit info to OpenWeather API
  // TODO: Get data from OpenWeather API  
}

function displayWeatherData() {
  // TODO: Change HTML elements accordingly on current weather box
  // TODO: Populate 5-Day Forecast with relevant data
}

function saveToHistory() {
  // TODO: Save city info to localStorage and add HTML button element
}

function getWeatherData() {
  submitQuery();
  displayWeatherData();
  saveToHistory();
}

// TODO: Get localStorage to pull previous searches and add corresponding button elements
// TODO: Set default city to Toronto and display info? (Do not add to history though)

// Add event listener to search button
// TODO: Do listeners to history button elements need to be added beforehand?
searchButton.addEventListener("click", getWeatherData);