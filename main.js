var api_key = "f98fbdda7a8581faf516496b935f66e0";
var cityInfo = "";
const SEARCH_HISTORY_KEY = "searchHistory";
const previousSearches = JSON.parse(localStorage.getItem("searchHistory"));

/**
 * adds query to search history if not present. This function modifies local storage.
 * @param {string} query
 */
function autocomplete(inp, arr) {
  console.log(arr);
  console.log(inp);

  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

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

// function renderPreviousSearch(previousSearches) {
//   for (var i = 0; i < previousSearches.length; i++) {
//     if (previousSearches[i] === "") {
//       return;
//     }
//     var previousButton = $("<button>");
//     previousButton.attr("class", "btn btn-secondary historySearch");
//     previousButton.text(previousSearches[i].toUpperCase());
//     $(".history").append(previousButton);
//   }
// }

// renderPreviousSearch(previousSearches);

$(document).ready(function () {
  $(".firstSearch").on("click", function (e) {
    e.preventDefault();

    cityInfo = $(".citySearch").val();
    autocomplete(document.getElementById("myInput"), previousSearches);
    var searchHistory = updateSearchHistory(cityInfo);
    // localStorage.getItem("searchHistory", cityInfo);
    oneDayForecast(cityInfo);
    fiveDayForecast(cityInfo);
  });

  $(".historySearch").on("click", function (e) {
    e.preventDefault();

    historyCityInfo = $(this).text();
    autocomplete(document.getElementById("myInput"), previousSearches);
    var searchHistory = updateSearchHistory(historyCityInfo);
    // localStorage.getItem("searchHistory", historyCityInfo);
    oneDayForecast(historyCityInfo);
    fiveDayForecast(historyCityInfo);
  });

  cityInfo = $(".citySearch").val();

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
