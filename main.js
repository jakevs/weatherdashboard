var api_key = "f98fbdda7a8581faf516496b935f66e0";
var cityInfo = "";

$("button").on("click", function (e) {
  e.preventDefault();
  cityInfo = $("#searchCity").val();
  oneDayForecast(cityInfo);
  // console.log(cityInfo);
});

function oneDayForecast(cityInfo) {
  console.log(cityInfo);
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInfo},us&appid=${api_key}&units=imperial`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (res) {
    $("id").append();
    // console.log(queryURL);
  });
  var currentTime = moment().format("MMM Do YY");
  var displayTime = document.getElementById("currentDay");
  displayTime.textContent = time;
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