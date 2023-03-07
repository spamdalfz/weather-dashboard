
var searchButton = document.querySelector("#search-button");

// Add event listener for search button
searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Get city name input
    var cityName = document.querySelector("#cityName").value;

    // Clear search bar
    document.querySelector("#cityName").value = "";

    // Convert city name to latitude and longitude using OpenWeatherMap API
    var apiKey = "e7d5a956a7a8f88243a72f1dd3fe8678";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // Use latitude and longitude to get 5 day weather forecast using OpenWeatherMap API
            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            fetch(forecastUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                })
        });
});