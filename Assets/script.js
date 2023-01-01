// Ensures document is loaded, and only loads once. 
$(document).ready(function () {
    function onLoad(){
    }
    // This is the function to get search history from local storage. 
    const history = JSON.parse(localStorage.getItem('search-history')) || [];
    const historyLastValue = history[history.length - 1];
    console.log(historyLastValue);
    renderBtns();
    function renderBtns() {
        $(".history").empty();
        history.forEach(function (x) {
            const recentCityButton = $("<li><button>" + x + "</button></li>");
            $(".history").prepend(recentCityButton);
        })
    }
    //The on click will gather weather data and render it on the div section. 
    $("#search-button").on('click', function () {
        const searchVal = $('#search-value').val();
        searchClickHandler(searchVal);
    })

    $('.history').on('click', 'button', function () {
        searchClickHandler($(event.target).text());
    })

    const searchClickHandler = function (inputVal) {

        // Ensures user input is in string format. 
        let caseFix = inputVal.split(' ').map(letterArr => {
            let newWord = letterArr[0].toUpperCase() + letterArr.substring(1, letterArr.length).toLowerCase();
            return newWord;
        }).join(' ');

        const apiKey = `bd625c75b2eb876533b63e53efd22b4f`;
        // Constructs a query URL (template literal). 
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${caseFix}&appid=${apiKey}&units=imperial`;
        //Ajax is used to get the current weather. 
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
            success: function (res) {
                console.log("success! AJax1:")
                console.log(res)
                
                const currentWeatherHTML =
                    `
                        <h3 class="card-title">${res.name} ${new Date().toLocaleDateString()}</h3>
                        <div class="card">
                            <div class="card-body" id="currentWeather">
                                <h3 class="card-title">${res.name} (${new Date().toLocaleDateString()})
                                    <img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"/>
                                </h3>
                                <p class="card-text">Temperature: ${res.main.temp} °F</p>
                                <p class="card-text">Humidity: ${res.main.humidity}%</p>
                                <p id="endajax1" class="card-text">Wind Speed: ${res.wind.speed} MPH</p>
                            </div>
                        </div>
                    `;
            
        }    })
