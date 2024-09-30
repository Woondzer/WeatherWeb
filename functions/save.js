

function userFavorite() {
    event.preventDefault();
    const star = document.querySelector('.favStar');
    let savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];

    // Check if star is already active (removal case)
    if (star.classList.contains('active')) {
        star.classList.remove('active');
        star.innerHTML = '&#9734;'; // Empty star



        // Update the UI
        updateSavedLocationsUI();
    } else {
        // Check if the maximum number of favorites (3) is reached
        if (savedLocations.length >= 3) {
            alert("You can only save up to 3 locations.");
            return;  // Prevent further saves
        }

        // Activate the star and save the current location
        star.classList.add('active');
        star.innerHTML = '&#9733;'; // Filled star

        const cityName = document.querySelector('#inputSearch').value;
        const currentForecast = JSON.parse(localStorage.getItem("currweatherData"));
        const dailyForecast = JSON.parse(localStorage.getItem("dailyweatherData"));

        if (!dailyForecast || !currentForecast || !cityName) {
            console.log("No data available to save.");
            return;
        }

        const savedData = {
            location: cityName,
            weatherCode: getWeatherEmoji(dailyForecast.weather_code[0]),
            currTemp: currentForecast.temperature_2m,
            rain: dailyForecast.rain_sum[0],
            tempMin: dailyForecast.temperature_2m_min[0],
            tempMax: dailyForecast.temperature_2m_max[0],
            windSpeed: dailyForecast.wind_speed_10m_max[0],
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };

        // Save the new favorite location in localStorage
        savedLocations.push(savedData);
        localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

        // Reset and hide the popup after saving
        resetPopup();

        // Update the UI
        updateSavedLocationsUI();
    }
}





function removeFavorite(index) {
    let savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    savedLocations.splice(index, 1);
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    updateSavedLocationsUI();
}


// when favorite star is clicked put it in free saveslot

function updateSavedLocationsUI() {
    const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    const saveBoxes = [".searchSave1", ".searchSave2", ".searchSave3"];

    // Clear the saved boxes before updating
    saveBoxes.forEach(selector => {
        const box = document.querySelector(selector);
        box.innerHTML = ''; 
        box.style.display = 'none'; // Hide saveboxes
    });

    savedLocations.forEach((locationData, index) => {
        if (index < saveBoxes.length) {
            const box = document.querySelector(saveBoxes[index]);

            // add data to saveboxes
            box.innerHTML = `
                <p class="locationName">${locationData.location}</p>
                <p class="dayDate">${locationData.date}</p>
                <p class="dlyweatherCode">${locationData.weatherCode}</p>
                <p class="currTemp">${locationData.currTemp}°C</p>
                <p class="dlyRainsum">${locationData.rain} mm</p>
                <p class="tempMinMax">${locationData.tempMin} - ${locationData.tempMax}°C</p>
                <p class="dlyWindSpeed">${locationData.windSpeed} m/s</p>
                <button class="removeStar" onclick="removeFavorite(${index}); event.stopPropagation();">&#9733;</button>
            `;
            
            // redirection function for saveboxes to get more info onpage 2
            box.onclick = function() {
                localStorage.setItem("selectedLocation", JSON.stringify(locationData));
                window.location.href = "/indexTwo/indexTwo.html"; 
            };

            // display savedbox
            box.style.display = 'block';
        }
    });
}

function resetPopup() {
    // Hide the popup
    document.querySelector('#moreInfo').style.display = 'none';

    // Clear the input field
    document.getElementById('inputSearch').value = '';

    // Clear weather info inside the popup
    document.querySelector('.dlyweatherCode').innerHTML = '';
    document.querySelector('.tempMinMax').innerHTML = '';
    document.querySelector('.dlyRainsum').innerHTML = '';
    document.querySelector('.dlyWindSpeed').innerHTML = '';
    document.querySelector('.currTemp').innerHTML = '';

    // Reset the star button to an empty state
    const star = document.querySelector('.favStar');
    star.classList.remove('active');
    star.innerHTML = '&#9734;'; // Empty star
}


window.onload = function() {
    updateSavedLocationsUI();
};

updateSavedLocationsUI()