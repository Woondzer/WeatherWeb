// template literal &{} kommer var användbart kolla upp 
var todayWeather = document.querySelector('.today-Weather')
var todayTemp = document.querySelector('.today-Temp')


const todayDate = new Date();
const dateFormat = {month: 'short', day: 'numeric' };
const formattedDate = todayDate.toLocaleDateString('en-US', dateFormat);
const dateElement = document.querySelector('#today-Date');

dateElement.innerHTML = `${formattedDate}`;
    

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
    95: "⛈️"
  };


  // --------------------- Clock ---------------------//

  setInterval(function(){
    const time = new Date().toTimeString().slice(0, 5);
    localTime.textContent = time
  }, 1000)


// --------------------- automated user Geolocation in top bar ---------------------//
const userLocation = document.getElementById("user-Location")

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    const locationName = data['address']['town']; //can't allways show town some times has to be 'suburb'
                        
                    userLocation.innerHTML += `${locationName}`;
                })
                .catch(error => console.error('Error fetching location name:', error));
        }, showError);
    } else {
        userLocation.innerHTML = "Geolocation is not supported by this browser.";
    }
}


getLocation();


// --------------------- automated user weathercode/temp by geolocation in top bar ---------------------//
function getLWCode() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&models=metno_seamless`)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                var weatherCode = data['current']['weather_code']; 
                var todayTempValue = data['current']['temperature_2m']


                var todayWeatherValue = weatherCodeMap[weatherCode];
                todayWeather.innerHTML = `${todayTempValue}°C ${todayWeatherValue}`;

                console.log(todayWeatherValue)
            })
            .catch(error => console.error('Error', error));
        }, showError);
    } else {

    }
}

getLWCode()


 

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

