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

});