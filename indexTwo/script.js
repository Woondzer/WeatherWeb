document.addEventListener("DOMContentLoaded", () => {

const dailyForecast = JSON.parse(localStorage.getItem("weatherData"));

if (dailyForecast) {
  document.querySelector('.dlyweatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[0])}`;
}

 else {
  console.error("No forecast data available");
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
    95: "⛈️"
  };
  
  return weatherCodeMap[weatherCode] || "🌈";
}

    // Error handling function
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

});