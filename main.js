var api_key = "f98fbdda7a8581faf516496b935f66e0";
var cityInfo = "";

$("button").on("click", function (e) {
  e.preventDefault();
  var time = $(this).parent().attr("id");
  cityInfo = $("#searchCity").val();
  oneDayForecast(cityInfo);
  fiveDayForecast(cityInfo);
  // console.log(cityInfo);
});

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
    var cityName = $("<h5>").text(cityInfo.toUpperCase());
    $(".weatherOneDiv").append(cityName);
    var temperatureP = $("<p>").text("Temp " + res.main.temp + " F");
    $(".weatherOneDiv").append(temperatureP);

    // console.log(res);
  });
  var currentTime = moment().format("MMM Do YY");
  var displayTime = document.getElementById("currentDay");
  // displayTime.textContent = time;
  // console.log(res);
}

function fiveDayForecast(cityInfo) {
  var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInfo},us&appid=${api_key}`;
  // console.log(query5DayURL);
  $.ajax({
    url: query5DayURL,
    method: "GET",
  }).then(function (res) {
    // console.log(res.list);
    for (var i = 7; i < 40; i += 8) {
      console.log(res.list[i]);
    }
  });
}
// var openWeather = ""

// var movie = "Mr. Nobody";
//     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   // Create a new table row element
//   var tRow = $("<tr>");

//   // Methods run on jQuery selectors return the selector they we run on
//   // This is why we can create and save a reference to a td in the same statement we update its text
//   var titleTd = $("<td>").text(response.Title);
//   var yearTd = $("<td>").text(response.Year);
//   var actorsTd = $("<td>").text(response.Actors);

//   // Append the newly created table data to the table row
//   tRow.append(titleTd, yearTd, actorsTd);
//   // Append the table row to the table body
//   $("tbody").append(tRow);
// });

// var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${locationCity},us&appid=${APIKey}&units=metric`;
