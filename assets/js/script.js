$(document).ready(function () {

    // Event listener for search button
    $("#search-button").on("click", function (event) {
        event.preventDefault();

        // Save search query to local storage
        var cityName = $("#cityName").val();
        saveSearchQuery(cityName);

        // Clear search bar
        $("#cityName").val("");

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
