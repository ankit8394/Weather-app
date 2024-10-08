//https://api.weatherapi.com/v1/current.json?key=ec661d77615e46e2b20171648243008&q=rishikesh&aqi=no

const img = document.getElementById("img");
const weatherResult = document.getElementById('weatherResult');
const dateElement = document.getElementById('current-date');

// Function to fetch weather data and update the UI
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    
    if (city === '') {
        weatherResult.innerHTML = 'Please enter a city name.';
        return;
    }
    
    const url = `https://api.weatherapi.com/v1/current.json?key=ec661d77615e46e2b20171648243008&q=${city}&aqi=no`;
    
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (data.error) {
            weatherResult.innerHTML = 'City not found.';
            return;
        }
        
        const temperature = data.current.temp_c; // Temperature in Celsius
        const weatherDescription = data.current.condition.text; // Weather description
        const location = data.location.name; // City name
        const humidity = data.current.humidity + " %"; //humidity
        const iconUrl = `http:${data.current.condition.icon}`; //img of weather
        const currentDate = new Date(data.location.localtime); // current date

        // Format the date
        const formattedDate = currentDate.toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // Update the date element
        dateElement.textContent = formattedDate;
        
        // Update the weather information
        img.src = iconUrl;
        
        const weatherHTML = `
        <h2>Weather in ${location}</h2> 
        <p id="temp"> ${temperature} °C</p>
        <img id="img" src="${iconUrl}" alt="Weather Icon">
        <div id="details"><div id="humidity"><span class="disp"><i class="fa-solid fa-temperature-empty"></i> Humidity</span><br>${humidity}</div>
        <div id="description"> <span class="disp"><i class="fa-solid fa-droplet"></i> Feels like</span><br>${weatherDescription}</div>
        </div>
        `;
        
        weatherResult.innerHTML = weatherHTML;
    } catch (error) {
        weatherResult.innerHTML = 'An error occurred while fetching weather data.';
    }
}

// Function to display the current date when the page loads
function displayCurrentDate() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    dateElement.textContent = formattedDate;
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDate(); // Show current date on page load
});
