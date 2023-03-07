$(document).ready(function () {

    // Event listener for search button
    $("#search-button").on("click", function (event) {
        event.preventDefault();

        var cityName = $("#cityName").val();

        // Clear search bar
        $("#cityName").val("");

        // Convert city name to latitude and longitude using OpenWeatherMap API
        var apiKey = "e7d5a956a7a8f88243a72f1dd3fe8678";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // Use latitude and longitude to get 5 day weather forecast using OpenWeatherMap API
            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            $.ajax({
                url: forecastUrl,
                method: "GET"
            }).then(function (response) {
                // Display 5 day weather forecast
                console.log(response);
            });

            // Update recent searches display
        });
    });

});
