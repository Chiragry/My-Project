let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

function displayTime(){
    let date = new Date();

    // Getting hour, mins, secs from date
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30*hh + mm/2;
    let mRotation = 6*mm;
    let sRotation = 6*ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

}

setInterval(displayTime, 1000);

// Weather functionality
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherContainer = document.querySelector('.weather-container');

async function getWeather() {
    try {
        // Get user's location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        // Fetch weather data
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        
        const data = await response.json();
        
        // Update weather information
        document.getElementById('city').textContent = data.name;
        document.getElementById('temp').textContent = Math.round(data.main.temp);
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        document.getElementById('weather-desc').textContent = data.weather[0].description;

        // Update weather icon
        const weatherIcon = document.getElementById('weather-icon');
        const weatherCode = data.weather[0].id;
        
        // Set weather icon based on weather code
        if (weatherCode >= 200 && weatherCode < 300) {
            weatherIcon.className = 'fas fa-bolt';
            document.body.className = 'rainy';
        } else if (weatherCode >= 300 && weatherCode < 400) {
            weatherIcon.className = 'fas fa-cloud-rain';
            document.body.className = 'rainy';
        } else if (weatherCode >= 500 && weatherCode < 600) {
            weatherIcon.className = 'fas fa-cloud-showers-heavy';
            document.body.className = 'rainy';
        } else if (weatherCode >= 600 && weatherCode < 700) {
            weatherIcon.className = 'fas fa-snowflake';
            document.body.className = 'snowy';
        } else if (weatherCode >= 700 && weatherCode < 800) {
            weatherIcon.className = 'fas fa-smog';
            document.body.className = 'cloudy';
        } else if (weatherCode === 800) {
            weatherIcon.className = 'fas fa-sun';
            document.body.className = 'clear';
        } else if (weatherCode > 800) {
            weatherIcon.className = 'fas fa-cloud';
            document.body.className = 'cloudy';
        }

    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherContainer.innerHTML = '<div class="error">Unable to fetch weather data</div>';
    }
}

// Initial weather fetch
getWeather();

// Update weather every 30 minutes
setInterval(getWeather, 30 * 60 * 1000);