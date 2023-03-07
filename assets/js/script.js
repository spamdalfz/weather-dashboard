$(document).ready(function () {

    // Event listener for search button
    $("#search-button").on("click", function (event) {
        event.preventDefault();

        // Save search query to local storage
        var cityName = $("#cityName").val();
        saveSearchQuery(cityName);

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
        });
        // Update recent searches display
        displayRecentSearches();



    });

    // Function to save search query to local storage
    function saveSearchQuery(query) {
        var searches = localStorage.getItem("recentSearches");
        if (searches) {
            searches = JSON.parse(searches);
        } else {
            searches = [];
        }
        searches.unshift(query);
        localStorage.setItem("recentSearches", JSON.stringify(searches));
    }

    // Function to display recent searches in the "recent-searches" container
    function displayRecentSearches() {
        var searches = JSON.parse(localStorage.getItem("recentSearches"));
        $("#recent-searches").empty();
        if (searches) {
            for (var i = 0; i < searches.length; i++) {
                var li = $("<li></li>").text(searches[i]);
                $("#recent-searches").append(li);
            }
        }
    }

    // Display initial recent searches on page load
    displayRecentSearches();
});
