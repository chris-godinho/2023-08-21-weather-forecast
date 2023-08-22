// Declare API Key as constant
const apiKey = "a7a720181a7de2e5dae1fec13acc6175";

// Declare button elements as variables
var searchButton = document.getElementById("search-button");
var historyButton0 = document.getElementById("history-0");
var historyButton1 = document.getElementById("history-1");
var historyButton2 = document.getElementById("history-2");
var historyButton3 = document.getElementById("history-3");
var historyButton4 = document.getElementById("history-4");
var historyButton5 = document.getElementById("history-5");
var historyButton6 = document.getElementById("history-6");
var historyButton7 = document.getElementById("history-7");
var historyButton8 = document.getElementById("history-8");
var historyButton9 = document.getElementById("history-9");

// Declare other variables
var cityName = "";
var cityHistory = [];
var fetchLatitude = 0;
var fetchLongitude = 0;
var firstQuery = false;
var historySearch = 10;

// Direct history buttons to respective items in localStorage
function historySearch0() {
    historySearch = 0;
    getWeatherData();
}

function historySearch1() {
    historySearch = 1;
    getWeatherData();
}

function historySearch2() {
    historySearch = 2;
    getWeatherData();
}

function historySearch3() {
    historySearch = 3;
    getWeatherData();
}

function historySearch4() {
    historySearch = 4;
    getWeatherData();
}

function historySearch5() {
    historySearch = 5;
    getWeatherData();
}

function historySearch6() {
    historySearch = 6;
    getWeatherData();
}

function historySearch7() {
    historySearch = 7;
    getWeatherData();
}

function historySearch8() {
    historySearch = 8;
    getWeatherData();
}

function historySearch9() {
    historySearch = 9;
    getWeatherData();
}

function getWeatherData() {
  var geoRequestUrl = "";
  var weatherRequestUrl = "";

  // Check if a history button was pressed
  if (historySearch < 10) {
    cityName = document.getElementById("history-" + historySearch).innerHTML;
  } else {
    if (firstQuery) {
      // Capture and parse city name for URL
      cityName = document.getElementById("city-search-form").value;
      cityName = cityName.replaceAll(' ', '_');
    } else {
      // Set Toronto as default city for when application is first accessed
      cityName = "Toronto";
    }
  }
  // Empty text box
  document.getElementById("city-search-form").value = "";
  // Find latitude and longitude for entered city
  geoRequestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
  fetch(geoRequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Check if query was successful
      if (data.length === 0) {
        return false;
      } else {
        // Pull relevant data from response
        fetchLatitude = data[0].lat;
        fetchLongitude = data[0].lon;
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        cityName = cityName.replaceAll('_', ' ');
        // Check if there are past searches in localStorage
        if (localStorage.hasOwnProperty("city-history")) {
            cityHistory = localStorage.getItem("city-history").split(",");
        }
        if (firstQuery) {
          // Add last search to history and delete oldest search if necessary
            cityHistory.splice(0, 0, cityName);
          if (cityHistory.length > 10) {
            cityHistory.splice(10, 1);
          }
          // Upload history to localStorage
          localStorage.setItem("city-history", cityHistory);
        } else {
          firstQuery = true;
        }
        // Get weather data for the latitude and longitude provided
        weatherRequestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + fetchLatitude + "&lon=" + fetchLongitude + "&appid=" + apiKey + "&units=imperial";
        return fetch(weatherRequestUrl);
      }
    })
    .then(function (response) {
      if (!response) {
        return false;
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      if (!data) {
        // Display error message if query isn't valid
        document.getElementById("error-alert").style.display = "block";
      } else {
        // Add received data to relevant elements
        document.getElementById("error-alert").style.display = "none";
        document.getElementById("city-name").innerHTML = cityName + " (" + dayjs().format('M/D/YYYY') + ")";
        document.getElementById("city-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
        document.getElementById("city-temp").innerHTML = "Temp: " + data.list[0].main.temp + " °F";
        document.getElementById("city-wind").innerHTML = "Wind: " + data.list[0].wind.speed + " MPH";
        document.getElementById("city-humi").innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
        document.getElementById("day1-date").innerHTML = dayjs().add(1, 'day').format('M/D/YYYY');
        document.getElementById("day1-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png");
        document.getElementById("day1-temp").innerHTML = "Temp: " + data.list[8].main.temp + " °F";
        document.getElementById("day1-wind").innerHTML = "Wind: " + data.list[8].wind.speed + " MPH";
        document.getElementById("day1-humi").innerHTML = "Humidity: " + data.list[8].main.humidity + "%";
        document.getElementById("day2-date").innerHTML = dayjs().add(2, 'day').format('M/D/YYYY');
        document.getElementById("day2-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png");
        document.getElementById("day2-temp").innerHTML = "Temp: " + data.list[16].main.temp + " °F";
        document.getElementById("day2-wind").innerHTML = "Wind: " + data.list[16].wind.speed + " MPH";
        document.getElementById("day2-humi").innerHTML = "Humidity: " + data.list[16].main.humidity + "%";
        document.getElementById("day3-date").innerHTML = dayjs().add(3, 'day').format('M/D/YYYY');
        document.getElementById("day3-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png");
        document.getElementById("day3-temp").innerHTML = "Temp: " + data.list[24].main.temp + " °F";
        document.getElementById("day3-wind").innerHTML = "Wind: " + data.list[24].wind.speed + " MPH";
        document.getElementById("day3-humi").innerHTML = "Humidity: " + data.list[24].main.humidity + "%";
        document.getElementById("day4-date").innerHTML = dayjs().add(4, 'day').format('M/D/YYYY');
        document.getElementById("day4-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png");
        document.getElementById("day4-temp").innerHTML = "Temp: " + data.list[32].main.temp + " °F";
        document.getElementById("day4-wind").innerHTML = "Wind: " + data.list[32].wind.speed + " MPH";
        document.getElementById("day4-humi").innerHTML = "Humidity: " + data.list[32].main.humidity + "%";
        document.getElementById("day5-date").innerHTML = dayjs().add(5, 'day').format('M/D/YYYY');
        document.getElementById("day5-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + "@2x.png");
        document.getElementById("day5-temp").innerHTML = "Temp: " + data.list[39].main.temp + " °F";
        document.getElementById("day5-wind").innerHTML = "Wind: " + data.list[39].wind.speed + " MPH";
        document.getElementById("day5-humi").innerHTML = "Humidity: " + data.list[39].main.humidity + "%";
        // Populate history with past searches
        if (cityHistory.length > 0) {
          for (i = 0; i < cityHistory.length; i++) {
              document.getElementById("history-" + i).innerHTML = cityHistory[i];
              document.getElementById("history-" + i).style.display = "block";
          }
        }
        historySearch = 10;
      }
    })
}

getWeatherData();

// Add event listener to buttons
searchButton.addEventListener("click", getWeatherData);
historyButton0.addEventListener("click", historySearch0);
historyButton1.addEventListener("click", historySearch1);
historyButton2.addEventListener("click", historySearch2);
historyButton3.addEventListener("click", historySearch3);
historyButton4.addEventListener("click", historySearch4);
historyButton5.addEventListener("click", historySearch5);
historyButton6.addEventListener("click", historySearch6);
historyButton7.addEventListener("click", historySearch7);
historyButton8.addEventListener("click", historySearch8);
historyButton9.addEventListener("click", historySearch9);