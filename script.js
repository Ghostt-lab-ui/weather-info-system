const API_KEY = "3e36d740adeebf8c81f9d0e2a7d11262";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContainer = document.getElementById("weatherContainer");

// Event listeners
searchBtn.addEventListener("click", searchWeather);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

// Main function
function searchWeather(cityFromStorage = null) {
    const city = cityFromStorage || searchInput.value.trim();

    if (!city) {
        showError("Please enter a city name");
        return;
    }

    weatherContainer.innerHTML = "<p class='no-data'>Loading weather data...</p>";

    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
            localStorage.setItem("savedCity", city); // Save last searched city
        })
        .catch((error) => {
            showError(error.message);
        });
}

// Display weather
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const condition = weather[0].main;
    const description = weather[0].description;

    const icon = getWeatherIcon(condition);

    const weatherHTML = `
        <div class="weather-info ios-card">
            <div class="city-name">${name}</div>
            <div class="weather-icon">${icon}</div>
            <div class="temperature">${temp}°C</div>
            <div class="weather-condition">${description}</div>
            
            <div class="details">
                <div class="detail-item"><span>Feels Like:</span> ${feelsLike}°C</div>
                <div class="detail-item"><span>Humidity:</span> ${humidity}%</div>
                <div class="detail-item"><span>Wind:</span> ${windSpeed} m/s</div>
                <div class="detail-item"><span>Condition:</span> ${condition}</div>
            </div>
        </div>
    `;

    weatherContainer.innerHTML = weatherHTML;
    searchInput.value = "";
}

// Weather icons
function getWeatherIcon(condition) {
    const icons = {
        "Clear": "☀️",
        "Clouds": "☁️",
        "Rain": "🌧️",
        "Drizzle": "🌦️",
        "Thunderstorm": "⛈️",
        "Snow": "❄️",
        "Mist": "🌫️",
        "Smoke": "💨",
        "Haze": "🌫️",
        "Dust": "🌪️",
        "Fog": "🌫️",
        "Sand": "🌪️",
        "Ash": "💨",
        "Squall": "💨",
        "Tornado": "🌪️"
    };
    return icons[condition] || "🌤️";
}

// Error message
function showError(message) {
    weatherContainer.innerHTML = `<div class="error">❌ ${message}</div>`;
}

// Load saved city on startup
window.onload = function() {
    const savedCity = localStorage.getItem("savedCity");
    if (savedCity) {
        searchWeather(savedCity);
    }
};
