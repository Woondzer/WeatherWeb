// template literal &{} kommer var användbart kolla upp 



// --------------------- search location function---------------------//



function searchLocation() {
    const searchValue = document.getElementById("inputSearch").value;
    

    if (searchValue) {

        fetch(`https://api.api-ninjas.com/v1/geocoding?city=${searchValue}`, {
            headers: {
                'X-API-Key':'s0Hj2ajvVWXKXrWtKy7l7Q==FysjY4kGVumIPBcF'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].latitude;
                const lon = data[0].longitude;
                console.log(`coordinates of ${searchValue}: Latitude ${lat}, longitude: ${lon}`); //removie this

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=Europe%2FBerlin&forecast_days=5&models=icon_seamless`)
                .then(response => response.json())
                .then(weatherData => {

                const currentForecast = weatherData.current;
                localStorage.setItem("currweatherData",JSON.stringify(currentForecast));
                const dailyForecast = weatherData.daily;
                localStorage.setItem("dailyweatherData",JSON.stringify(dailyForecast));
            

                    //show search result in box
                    if (dailyForecast) {
                        document.querySelector('#moreInfo').style.display= 'block';

                        document.querySelector('.dlyweatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[0])}`;
                        document.querySelector('.tempMinMax').innerHTML = `${(dailyForecast.temperature_2m_min[0])} - ${(dailyForecast.temperature_2m_max[0])}`;
                        document.querySelector('.dlyRainsum').innerHTML = `${(dailyForecast.rain_sum[0])}`;
                        document.querySelector('.dlyWindSpeed').innerHTML = `${(dailyForecast.wind_speed_10m_max[0])}`;
                        document.querySelector('.currTemp').innerHTML = `${(currentForecast.temperature_2m)}°c`;

                        //todays date
                        const todayDate = new Date();
                        const dateFormat = {month: 'short', day: 'numeric' };
                        const formattedDate = todayDate.toLocaleDateString('en-US', dateFormat);
                        const dateElement = document.querySelector('.dayDate');

                        dateElement.innerHTML = `${formattedDate}`;
                    }

                console.log(dailyForecast)
                console.log(currentForecast)

                })
            }
        })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



} else {
    console.log("Please enter a city name"); // change to popup or htmltext Error message instead 
}
}


function getWeatherEmoji(weatherCode) {
    const weatherCodeMap = {
      0: "☀️",
      1: "🌤️",
      2: "⛅",
      3: "☁️",
      45: "🌫️",
      48: "🌫️",
      51: "🌧️",
      61: "🌦️",
      63: "🌧️",
      71: "❄️",
      80: "🌧️",
      95: "⛈️"
    };
    
    return weatherCodeMap[weatherCode] || "🌈";
  }


// --------------------- store user search input for page 2---------------------//

function userSearch() {
    const userSearchValue = document.getElementById("inputSearch").value;
    localStorage.setItem("userSearch", userSearchValue);
}





//loading location on popup
function getUserSearch() {
    var inputText = document.querySelector('#inputSearch').value;
    document.querySelector('.locationName').innerHTML = inputText;
  }
  window.onload = getUserSearch;
  

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            userLocation.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            userLocation.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            userLocation.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            userLocation.innerHTML = "An unknown error occured.";
            break;
    }
}


//  document.getElementById("latitude-paragraph").innerText=apidata.latitude
//    detta kan läggas in mellan data => { } för att visa latitude i text. 

// om du vill få ut typ latitude
// så skriver du data.latitude
// och kan spara det i en variabel eller vad du vill
// let latitude = data.latitude

// gör en paragraf i html
// med ett id
// typ id="latitude-paragraph"
// sen i js skriver du
// document.getElementById("latitude-paragraph").innerText = data.latitude 
// eller nåt i den stilen