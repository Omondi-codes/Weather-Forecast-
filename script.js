import { apiKey, apiUrl } from "./config.js";


const searchInput = document.querySelector(".search-input");
const searchicon = document.querySelector(".search-icon");
const weatherIconImg = document.querySelector(".weather-icon-img");
const temperatureEl = document.querySelector(".temperature");
const cityNameEl = document.querySelector(".city-name");
const humidityEl = document.querySelector(".humidity-details span");
const windSpeedEl = document.querySelector(".wind-speed-details span");


function getWeatherImage(cloudiness) {
    if (cloudiness > 80 ) {
        return "./images/clouds.png";
    }else if(cloudiness > 50) {
        return "./images/drizzle.png";
    }else if(cloudiness > 20) {
        return "./images/mist.png";
    }else if(cloudiness > 5) {
        return "./images/clear.png";
    }else{
        return "./images/clear.png";
    }

    }

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        cityNameEl.textContent = data.name;
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
        humidityEl.textContent = `${data.main.humidity}%`;
        windSpeedEl.textContent = `${data.wind.speed}Km/h`;
        weatherIconImg.src - getWeatherImage(data.clouds.all);

        console.log({data});

    } catch (error) {

    }
}

searchicon.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if(city) {
        checkWeather(city)
    }else {
        alert("Please enter city name.")
    }
})

checkWeather("Nairobi")
