var api_key = "f98fbdda7a8581faf516496b935f66e0";
var cityInfo = "";
const SEARCH_HISTORY_KEY = "searchHistory";

/**
 * adds query to search history if not present. This function modifies local storage.
 * @param {string} query
 */
function updateSearchHistory(query) {
  var rawSearchHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
  var searchHistory = JSON.parse(rawSearchHistory);
  if (!searchHistory) {
    searchHistory = [];
  }
  // if search history does not include query
  if (!searchHistory.includes(query)) {
    //add query to search history array
    searchHistory.push(query);
    //store history in local storage
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  }
  return searchHistory;
}

$(document).ready(function () {
  $(".firstSearch").on("click", function (e) {
    e.preventDefault();
    cityInfo = $("#searchCity").val();
    var searchHistory = updateSearchHistory(cityInfo);
    // localStorage.getItem("searchHistory", cityInfo);
    oneDayForecast(cityInfo);
    fiveDayForecast(cityInfo);
  });

  //This function puts the current days forecast on the screen
  function oneDayForecast(cityInfo) {
    console.log(cityInfo);
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInfo},us&appid=${api_key}&units=imperial`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      console.log(res.main.temp);
      $(".weatherOneDiv").text("");
      var weatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png"
      );
      $(".weatherOneDiv").append(weatherIcon);
      var cityName = $("<h2>").text(cityInfo.toUpperCase());
      $(".weatherOneDiv").append(cityName);
      var temperatureP = $("<h5>").text(
        "Temperature: " + Math.round(res.main.temp) + " F"
      );
      $(".weatherOneDiv").append(temperatureP);
      var humid = $("<h5>").text("Humidity: " + res.main.humidity + "%");
      $(".weatherOneDiv").append(humid);
      var wind = $("<h5>").text("Wind Speed: " + res.wind.speed);
      $(".weatherOneDiv").append(wind);
      var uvInd = $("<h5>").text("UV Index: " + res.coord.lat, res.coord.lon);
      $(".weatherOneDiv").append(uvInd);
    });

    var currentTime = moment().format("dddd MMM Do YY");
    var displayTime = document.getElementById("currentDay");
    // displayTime.textContent = time;
    // console.log(res);
  }

  //This function puts the 5 day forecast on the screen
  function fiveDayForecast(cityInfo) {
    var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInfo},us&appid=${api_key}&units=imperial`;
    // console.log(query5DayURL);
    var forecastHeader = $("<h2>").text("5-Day Forecast: ").attr({
      class: "w-100",
      id: "fiveDayHead",
    });
    $("#fiveHead").append(forecastHeader);
    $.ajax({
      url: query5DayURL,
      method: "GET",
    }).then(function (res) {
      // console.log(res.list);
      for (var i = 7; i < 40; i += 8) {
        console.log(res.list[i]);

        var dateElement = $("<h6>").text(
          moment(res.list[i].dt_txt).format("dddd")
        );
        $(".fiveDayList").append(dateElement);
        var fiveDayIcon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            res.list[i].weather[0].icon +
            ".png"
        );
        dateElement.append(fiveDayIcon);
        var tempForecast = $("<p>").text(
          "Temperature: " + Math.round(res.list[i].main.temp) + "F"
        );
        $(".fiveDayList").append(tempForecast);
        var humidForecast = $("<p>").text(
          "Humidity: " + res.list[i].main.humidity + "%"
        );
        $(".fiveDayList").append(humidForecast);
      }
    });
  }

  $("#kc").on("click", function (e) {
    e.preventDefault();
    var kcURL = `https://api.openweathermap.org/data/2.5/weather?q=kansas&city,us&appid=${api_key}&units=imperial`;
    $.ajax({
      url: kcURL,
      method: "GET",
    }).then(function (res) {
      console.log(res.main.temp);
      $(".weatherOneDiv").text("");
      var weatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png"
      );
      $(".weatherOneDiv").append(weatherIcon);
      var cityName = $("<h2>").text("Kansas City".toUpperCase());
      $(".weatherOneDiv").append(cityName);
      var temperatureP = $("<h5>").text(
        "Temperature: " + Math.round(res.main.temp) + " F"
      );
      $(".weatherOneDiv").append(temperatureP);
      var humid = $("<h5>").text("Humidity: " + res.main.humidity + "%");
      $(".weatherOneDiv").append(humid);
      var wind = $("<h5>").text("Wind Speed: " + res.wind.speed);
      $(".weatherOneDiv").append(wind);
      var uvInd = $("<h5>").text("UV Index: " + res.coord.lat, res.coord.lon);
      $(".weatherOneDiv").append(uvInd);
    });
  });

  $("#den").on("click", function (e) {
    e.preventDefault();
    var kcURL = `https://api.openweathermap.org/data/2.5/weather?q=denver,us&appid=${api_key}&units=imperial`;
    $.ajax({
      url: kcURL,
      method: "GET",
    }).then(function (res) {
      console.log(res.main.temp);
      $(".weatherOneDiv").text("");
      var weatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png"
      );
      $(".weatherOneDiv").append(weatherIcon);
      var cityName = $("<h2>").text("Denver".toUpperCase());
      $(".weatherOneDiv").append(cityName);
      var temperatureP = $("<h5>").text(
        "Temperature: " + Math.round(res.main.temp) + " F"
      );
      $(".weatherOneDiv").append(temperatureP);
      var humid = $("<h5>").text("Humidity: " + res.main.humidity + "%");
      $(".weatherOneDiv").append(humid);
      var wind = $("<h5>").text("Wind Speed: " + res.wind.speed);
      $(".weatherOneDiv").append(wind);
      var uvInd = $("<h5>").text("UV Index: " + res.coord.lat, res.coord.lon);
      $(".weatherOneDiv").append(uvInd);
    });
  });

  $("#sd").on("click", function (e) {
    e.preventDefault();
    var kcURL = `https://api.openweathermap.org/data/2.5/weather?q=san&diego,us&appid=${api_key}&units=imperial`;
    $.ajax({
      url: kcURL,
      method: "GET",
    }).then(function (res) {
      console.log(res.main.temp);
      $(".weatherOneDiv").text("");
      var weatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png"
      );
      $(".weatherOneDiv").append(weatherIcon);
      var cityName = $("<h2>").text("San Diego".toUpperCase());
      $(".weatherOneDiv").append(cityName);
      var temperatureP = $("<h5>").text(
        "Temperature: " + Math.round(res.main.temp) + " F"
      );
      $(".weatherOneDiv").append(temperatureP);
      var humid = $("<h5>").text("Humidity: " + res.main.humidity + "%");
      $(".weatherOneDiv").append(humid);
      var wind = $("<h5>").text("Wind Speed: " + res.wind.speed);
      $(".weatherOneDiv").append(wind);
      var uvInd = $("<h5>").text("UV Index: " + res.coord.lat, res.coord.lon);
      $(".weatherOneDiv").append(uvInd);
    });
  });
});
