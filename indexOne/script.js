// template literal &{} kommer var användbart kolla upp 

fetch('https://api.open-meteo.com/v1/forecast?latitude=59.3294&longitude=18.0687&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&models=metno_seamless')
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error('Error', error));

