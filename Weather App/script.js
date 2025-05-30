const apiKey = "4cd0eee81294c867b4bc4cfc64e998c5"; // Using a working API key
const weatherBox = document.querySelector(".weather-body");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".location-not-found");
const refreshBtn = document.querySelector("#refreshBtn");

// Function to get weather data using city name
async function getWeatherByCity(city) {
    try {
        console.log("Fetching weather for city:", city);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error('Weather data not found');
        }

        const data = await response.json();
        console.log("Weather data received:", data);
        
        // Update weather information
        document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector("#humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector("#wind-speed").innerHTML = `${data.wind.speed} km/h`;

        // Update weather image based on weather condition
        const weatherImg = document.querySelector(".weather-img");
        switch(data.weather[0].main) {
            case 'Clear':
                weatherImg.src = "assets/clear.png";
                break;
            case 'Rain':
                weatherImg.src = "assets/rain.png";
                break;
            case 'Snow':
                weatherImg.src = "assets/snow.png";
                break;
            case 'Clouds':
                weatherImg.src = "assets/cloud.png";
                break;
            case 'Mist':
            case 'Haze':
                weatherImg.src = "assets/mist.png";
                break;
            default:
                weatherImg.src = "assets/cloud.png";
        }

        // Show weather information
        weatherBox.style.display = "block";
        weatherDetails.style.display = "flex";
        error404.style.display = "none";
        
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
    }
}

// Function to get weather data using coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        console.log("Fetching weather for coordinates:", lat, lon);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error('Weather data not found');
        }

        const data = await response.json();
        console.log("Weather data received:", data);
        
        // Update weather information
        document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector("#humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector("#wind-speed").innerHTML = `${data.wind.speed} km/h`;

        // Update weather image based on weather condition
        const weatherImg = document.querySelector(".weather-img");
        switch(data.weather[0].main) {
            case 'Clear':
                weatherImg.src = "assets/clear.png";
                break;
            case 'Rain':
                weatherImg.src = "assets/rain.png";
                break;
            case 'Snow':
                weatherImg.src = "assets/snow.png";
                break;
            case 'Clouds':
                weatherImg.src = "assets/cloud.png";
                break;
            case 'Mist':
            case 'Haze':
                weatherImg.src = "assets/mist.png";
                break;
            default:
                weatherImg.src = "assets/cloud.png";
        }

        // Show weather information
        weatherBox.style.display = "block";
        weatherDetails.style.display = "flex";
        error404.style.display = "none";
        
    } catch (error) {
        console.error("Error fetching weather:", error);
        // If coordinates fail, try city name
        getWeatherByCity("Delhi");
    }
}

// Function to get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        console.log("Requesting location...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Location received:", latitude, longitude);
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                // If location access is denied, use Delhi as fallback
                getWeatherByCity("Delhi");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000, // Increased timeout to 10 seconds
                maximumAge: 0
            }
        );
    } else {
        console.error("Geolocation not supported");
        // If geolocation is not supported, use Delhi as fallback
        getWeatherByCity("Delhi");
    }
}

// Get weather on page load
getUserLocation();

// Refresh button click handler
refreshBtn.addEventListener("click", () => {
    getUserLocation();
});