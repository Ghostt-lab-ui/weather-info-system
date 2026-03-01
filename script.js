// Your API Key from OpenWeatherMap
const API_KEY = "3e36d740adeebf8c81f9d0e2a7d11262"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Get HTML elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContainer = document.getElementById("weatherContainer");

// Add event listeners
searchBtn.addEventListener("click", searchWeather);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

// Main function to search weather
function searchWeather() {
    const city = searchInput.value.trim();
    
    if (!city) {
        showError("Please enter a city name");
        return;
    }

    // Show loading message
    weatherContainer.innerHTML = "<p class='no-data'>Loading weather data...</p>";

    // Fetch weather data from API
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {function getWeather(city) {
    fetch(...)
}
            displayWeather(data);
        })
        .catch((error) => {
            showError(error.message);
        });
}

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const condition = weather[0].main;
    const description = weather[0].description;

    // Get weather icon emoji based on condition
    const icon = getWeatherIcon(condition);

    // Create HTML for weather display
    const weatherHTML = `
        <div class="weather-info">
            <div class="city-name">${name}</div>
            <div class="weather-icon">${icon}</div>
            <div class="temperature">${temp}°C</div>
            <div class="weather-condition">${description}</div>
            
            <div class="details">
                <div class="detail-item">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value">${feelsLike}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${windSpeed} m/s</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Condition</div>
                    <div class="detail-value">${condition}</div>
                </div>
            </div>
        </div>
    `;

    weatherContainer.innerHTML = weatherHTML;
    searchInput.value = ""; // Clear search box
}

// Function to get weather emoji icon
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

    return icons[condition] || "🌤️"; // Default icon if condition not found
}

// Function to show error message
function showError(message) {
    weatherContainer.innerHTML = `<div class="error">❌ ${message}</div>`;
}
