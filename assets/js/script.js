
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
                    // Update HTML with forecast data
                    var forecastRow = document.querySelector(".forecast-row");
                    forecastRow.innerHTML = "";

                    // Loop through forecast data and create HTML elements for each forecast entry
                    for (var i = 0; i < response.list.length; i++) {
                        var forecastEntry = response.list[i];

                        // Get date and time
                        var timestamp = forecastEntry.dt;
                        var date = new Date(timestamp * 1000);
                        var dateString = date.toLocaleDateString();

                        // Get weather icon and description
                        var iconCode = forecastEntry.weather[0].icon;
                        var description = forecastEntry.weather[0].description;

                        // Get temperature (in Fahrenheit)
                        var temperature = (forecastEntry.main.temp - 273.15) * 9 / 5 + 32;
                        temperature = temperature.toFixed(1);


                        // Create HTML element for forecast entry
                        var forecastEntryHtml = `
                            <div class="col-md-2 forecast-entry">
                                <div class="forecast-date">${dateString}</div>
                                <div class="forecast-icon">
                                    <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${description}">
                                </div>
                                <div class="forecast-description">${description}</div>
                                <div class="forecast-temperature">${temperature} &deg;F</div>
                            </div>
                        `;

                        // Append HTML element to forecast section
                        forecastRow.innerHTML += forecastEntryHtml;
                    }
                })
        });
});
