document.addEventListener("DOMContentLoaded", () => {


//show users search location in text

function getUserSearch() {
  const cityName = localStorage.getItem("userSearch");

  if (cityName) {
    document.querySelector('.cityName').textContent = cityName;
  }
  else {
    document.querySelector('.cityName').textContent = "No city entered.";
  }
}
window.onload = getUserSearch;

//weather for 5 days
const dailyForecast = JSON.parse(localStorage.getItem("dailyweatherData"));
const currentForecast = JSON.parse(localStorage.getItem("currweatherData"));

if (dailyForecast) {

  // today
  document.querySelector('.day1weatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[0])}`;
  document.querySelector('.tempMinMax1').innerHTML = `${(dailyForecast.temperature_2m_min[0])} - ${(dailyForecast.temperature_2m_max[0])}`;
  document.querySelector('.day1Rainsum').innerHTML = `${(dailyForecast.rain_sum[0])}`;
  document.querySelector('.day1WindSpeed').innerHTML = `${(dailyForecast.wind_speed_10m_max[0])}`;
  document.querySelector('.currTemp').innerHTML = `${(currentForecast.temperature_2m)}°c`;

    for (let i = 0; i < 5; i++) {
      document.querySelector(`.day${i+1}weatherCode`).innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[i])}`;
      document.querySelector(`.tempMinMax${i+1}`).innerHTML = `${(dailyForecast.temperature_2m_min[i])} - ${(dailyForecast.temperature_2m_max[i])}`;
      document.querySelector(`.day${i+1}Rainsum`).innerHTML = `${(dailyForecast.rain_sum[i])}`;
      document.querySelector(`.day${i+1}WindSpeed`).innerHTML = `${(dailyForecast.wind_speed_10m_max[i])}`;
    }

    for (let i = 0; i < 4; i++) {
      const tempMin = dailyForecast.temperature_2m_min[i];
      const tempMax = dailyForecast.temperature_2m_max[i];
      const avgTemp = (tempMin + tempMax) / 2;

      document.querySelector(`.day${i+1}Temp`).innerHTML = `${avgTemp.toFixed(1)}°c`;
    }

  // // day2
  // document.querySelector('.day2weatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[1])}`;
  // document.querySelector('.tempMinMax2').innerHTML = `${(dailyForecast.temperature_2m_min[1])} - ${(dailyForecast.temperature_2m_max[1])}`;
  // document.querySelector('.day2Rainsum').innerHTML = `${(dailyForecast.rain_sum[1])}`;
  // document.querySelector('.day2WindSpeed').innerHTML = `${(dailyForecast.wind_speed_10m_max[1])}`;
  // const tempMinDay2 = dailyForecast.temperature_2m_min[1];
  // const tempMaxDay2 = dailyForecast.temperature_2m_max[1];
  // const avgTempDay2 = (tempMinDay2 + tempMaxDay2) / 2;
  // document.querySelector('.day2Temp').innerHTML = `${avgTempDay2.toFixed(1)}°c`

  // // day3
  // document.querySelector('.day3weatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[2])}`;
  // document.querySelector('.tempMinMax3').innerHTML = `${(dailyForecast.temperature_2m_min[2])} - ${(dailyForecast.temperature_2m_max[2])}`;
  // document.querySelector('.day3Rainsum').innerHTML = `${(dailyForecast.rain_sum[2])}`;
  // document.querySelector('.day3WindSpeed').innerHTML = `${(dailyForecast.wind_speed_10m_max[2])}`;
  // const tempMinDay3 = dailyForecast.temperature_2m_min[2];
  // const tempMaxDay3 = dailyForecast.temperature_2m_max[2];
  // const avgTempDay3 = (tempMinDay3 + tempMaxDay3) / 2;
  // document.querySelector('.day3Temp').innerHTML = `${avgTempDay3.toFixed(1)}°c`

  // // day4
  // document.querySelector('.day4weatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[3])}`;
  // document.querySelector('.tempMinMax4').innerHTML = `${(dailyForecast.temperature_2m_min[3])} - ${(dailyForecast.temperature_2m_max[3])}`;
  // document.querySelector('.day4Rainsum').innerHTML = `${(dailyForecast.rain_sum[3])}`;
  // document.querySelector('.day4WindSpeed').innerHTML = `${(dailyForecast.wind_speed_10m_max[3])}`;
  // const tempMinDay4 = dailyForecast.temperature_2m_min[3];
  // const tempMaxDay4 = dailyForecast.temperature_2m_max[3];
  // const avgTempDay4 = (tempMinDay4 + tempMaxDay4) / 2;
  // document.querySelector('.day4Temp').innerHTML = `${avgTempDay4.toFixed(1)}°c`

  // // day5
  // document.querySelector('.day5weatherCode').innerHTML = `${getWeatherEmoji(dailyForecast.weather_code[4])}`;
  // document.querySelector('.tempMinMax5').innerHTML = `${(dailyForecast.temperature_2m_min[4])} - ${(dailyForecast.temperature_2m_max[4])}`;
  // document.querySelector('.day5Rainsum').innerHTML = `${(dailyForecast.rain_sum[4])}`;
  // document.querySelector('.day5WindSpeed').innerHTML = `${(dailyForecast.wind_speed_10m_max[4])}`;
  // const tempMinDay5 = dailyForecast.temperature_2m_min[4];
  // const tempMaxDay5 = dailyForecast.temperature_2m_max[4];
  // const avgTempDay5 = (tempMinDay5 + tempMaxDay5) / 2;
  // document.querySelector('.day5Temp').innerHTML = `${avgTempDay5.toFixed(1)}°c`
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
    80: "🌧️",
    95: "⛈️"
  };
  
  return weatherCodeMap[weatherCode] || "🌈";
}




// todays date + 4days
const dayDateClasses = ["day1Date", "day2Date", "day3Date", "day4Date", "day5Date"];

const todayDate = new Date();
const dateFormat = {month: 'short', day: 'numeric' };

for (let i = 0; i < dayDateClasses.length; i++) {
    const futureDate = new Date(todayDate);
    futureDate.setDate(todayDate.getDate() + i);
    
    const formattedDate = futureDate.toLocaleDateString('en-US', dateFormat);
    const dateElement = document.querySelector(`.${dayDateClasses[i]}`);

if (dateElement) {
  dateElement.innerHTML = `${formattedDate}`
}
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