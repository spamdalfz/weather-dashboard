
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
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    // Fetch current weather and forecast data for the city searched
    Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl)
    ])
        .then(function (responses) {
            // Parse the responses as JSON data
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
        .then(function (responses) {
            var currentWeatherData = responses[0];
            var forecastData = responses[1];

            // Update HTML with current weather data for the city searched
            var currentWeatherSection = document.querySelector("#current-weather");
            currentWeatherSection.innerHTML = "";

            // Get weather icon and description
            var iconCode = currentWeatherData.weather[0].icon;
            var description = currentWeatherData.weather[0].description;

            // Get temperature (in Fahrenheit)
            var temperature = (currentWeatherData.main.temp - 273.15) * 9 / 5 + 32;
            temperature = temperature.toFixed(1);

            // Get humidity
            var humidity = currentWeatherData.main.humidity;

            // Get wind speed (in miles per hour)
            var windSpeed = (currentWeatherData.wind.speed * 2.23694).toFixed(1);

            // Create HTML element for current weather data
            var currentWeatherHtml = `
            <div>
                <h2>Current weather for ${cityName}</h2>
                <div class="current-weather-entry">
                    <div class="current-weather-icon">
                        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${description}">
                    </div>
                    <div class="current-weather-description">${description}</div>
                    <div class="current-weather-temperature">${temperature} &deg;F</div>
                    <div class="current-weather-humidity">Humidity: ${humidity}%</div>
                    <div class="current-weather-windspeed">Wind speed: ${windSpeed} mph</div>
                </div>
            </div>
        `;

            // Append HTML element to current weather section
            currentWeatherSection.innerHTML = currentWeatherHtml;

            // Update HTML with forecast data for 5 days
            var forecastRow = document.querySelector(".forecast-row");
            forecastRow.innerHTML = "";

            // Create HTML element for forecast section heading
            var forecastHeadingHtml = `
        <h2>5 Day Forecast</h2>
        `;

            // Append HTML element to forecast section
            forecastRow.innerHTML = forecastHeadingHtml;
            // Loop through forecast data for each day and create HTML elements for each day
            for (var i = 0; i < 5; i++) {
                var forecastEntry = forecastData.list[i * 8]; // Get the forecast for noon of the day

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

                // Get humidity
                var humidity = forecastEntry.main.humidity;

                // Get wind speed (in miles per hour)
                var windSpeed = (forecastEntry.wind.speed * 2.23694).toFixed(1);

                // Create HTML element for forecast entry
                var forecastEntryHtml = `
                            <div class="col-md-2 forecast-entry">
                                <div class="forecast-date">${dateString}</div>
                                <div class="forecast-icon">
                                    <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${description}">
                                </div>
                                <div class="forecast-description">${description}</div>
                                <div class="forecast-temperature">${temperature} &deg;F</div>
                                <div class="forecast-humidity">Humidity: ${humidity}%</div>
                                <div class="forecast-windspeed">Wind speed: ${windSpeed} mph</div>
                            </div>
                        `;
                // Append HTML element to forecast section
                forecastRow.innerHTML += forecastEntryHtml;
            }
        })
});

