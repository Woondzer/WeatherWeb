// template literal &{} kommer var användbart kolla upp 
var todayWeather = document.querySelector('.today-Weather')
var todayTemp = document.querySelector('.today-Temp')
var userLatitude = document.querySelector('.user-latitude')
var userLongitude = document.querySelector('.user-longitude')

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

//html5 geolocation tror att man kan få det här att ändra latitude och longitude in fetch länken.
// för att få användarens live plats väder. undersök detta. tror vi då måste använda oss av PUSH i istället
// för att använda FETCH!! <-- 
const x = document.getElementById("auto-Location");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
   }
   else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "You're here:" + position.coords.latitude + " - " +
  position.coords.longitude;
}




//this link is for stockholm, it should be based on the location the user is on. 
fetch('https://api.open-meteo.com/v1/forecast?latitude=59.3268&longitude=18.3897&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&models=metno_seamless')
 .then(response => response.json())
 .then(data => {
    console.log(data)

    var weatherCode = data['current']['weather_code']; 
    var todayTempValue = data['current']['temperature_2m']


    var todayWeatherValue = weatherCodeMap[weatherCode];
    todayWeather.innerHTML = `${todayTempValue}°C ${todayWeatherValue}`;

    console.log(todayTemp)
 })
 
 .catch(error => console.error('Error', error));


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