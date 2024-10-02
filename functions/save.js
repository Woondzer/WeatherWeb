

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
            return;  
        }

        // Activate the star and save the current location
        star.classList.add('active');
        star.innerHTML = '&#9733;'; 

        const cityName = localStorage.getItem("userSearch");
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
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            fiveDayForecast: {
                weatherCodes: dailyForecast.weather_code,
                minTemps: dailyForecast.temperature_2m_min,
                maxTemps: dailyForecast.temperature_2m_max,
                rainSums: dailyForecast.rain_sum,
                windSpeeds: dailyForecast.wind_speed_10m_max
            }
        };

        // Save the new favorite location in localStorage
        savedLocations.push(savedData);
        localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

        
        resetPopup();
        updateSavedLocationsUI();
    }
}



// --------------------- remove favorite location from slot---------------------//

function removeFavorite(index) {
    let savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    savedLocations.splice(index, 1);
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    updateSavedLocationsUI();
}


// --------------------- when favorite star is clicked put in free saveslot---------------------//

function updateSavedLocationsUI() {
    const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    const saveBoxes = [".searchSave1", ".searchSave2", ".searchSave3"];

    // Clear the saved boxes before updating
    saveBoxes.forEach(selector => {
        const box = document.querySelector(selector);
        box.innerHTML = ''; 
        box.style.display = 'none';
    });

    savedLocations.forEach((locationData, index) => {
        if (index < saveBoxes.length) {
            const box = document.querySelector(saveBoxes[index]);

            // add data to saveboxes
            box.innerHTML = `
                <section class="locationName">${locationData.location}</section>
                <section id="saveBtn" class="removeStar" onclick="removeFavorite(${index}); event.stopPropagation();">&#9733;</section>
                <section class="dayDate ddStyle">${locationData.date}</section>
                <section class="dlyweatherCode wcodestyle">${locationData.weatherCode}</section>
                <section class="currTemp ctempStyle">${locationData.currTemp}°c</section>
                
                <section class="info3">
                <p class="dlyRainsum drainStyle">${locationData.rain}</p>
                <p class="rainMetrics">&nbsp;- ☔(mm)</p>
                </section>

                <section class="info4"> <!--temp min & max-->
                <p class="tempMinMax tminmaxStyle">${locationData.tempMin} - ${locationData.tempMax}</p>
                <p class="txttmpMinMax">min °c&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;max °c</p>
                </section>

                <section class="info5">
                <p class="dlyWindSpeed dwindspdStyle">${locationData.windSpeed}</p>
                <p class="meterSecond">(m/s)</p>
                </section>

                


            `;
            
            // redirection function for saveboxes to get more info onpage 2
            box.onclick = function() {
                localStorage.setItem("selectedLocation", JSON.stringify(locationData));
                window.location.href = "../indexThree/indexThree.html"; 
            };

            box.style.display = 'grid';
        }
    });
}

function resetPopup() {
    // Hide popup & clear info
    document.querySelector('#moreInfo').style.display = 'none';
    document.getElementById('inputSearch').value = '';

    document.querySelector('.popupdlyweatherCode').innerHTML = '';
    document.querySelector('.popuptempMinMax').innerHTML = '';
    document.querySelector('.popupdlyRainsum').innerHTML = '';
    document.querySelector('.popupdlyWindSpeed').innerHTML = '';
    document.querySelector('.popupcurrTemp').innerHTML = '';

    // Reset the star button to an empty state
    const star = document.querySelector('.favStar');
    star.classList.remove('active');
    star.innerHTML = '&#9734;'; 
}


window.onload = function() {
    updateSavedLocationsUI();
};

updateSavedLocationsUI()