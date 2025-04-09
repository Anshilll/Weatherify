// Weather API Configuration
const API_KEY = '7163834871402cce50234b88a80bc415';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather Background Images
const weatherBackgrounds = {
    '01d': 'https://source.unsplash.com/1600x900/?sunny,sky',
    '01n': 'https://source.unsplash.com/1600x900/?night,stars',
    '02d': 'https://source.unsplash.com/1600x900/?partly-cloudy',
    '02n': 'https://source.unsplash.com/1600x900/?night-cloudy',
    '03d': 'https://source.unsplash.com/1600x900/?cloudy',
    '03n': 'https://source.unsplash.com/1600x900/?cloudy-night',
    '04d': 'https://source.unsplash.com/1600x900/?overcast',
    '04n': 'https://source.unsplash.com/1600x900/?overcast-night',
    '09d': 'https://source.unsplash.com/1600x900/?rain',
    '09n': 'https://source.unsplash.com/1600x900/?rainy-night',
    '10d': 'https://source.unsplash.com/1600x900/?sun-rain',
    '10n': 'https://source.unsplash.com/1600x900/?night-rain',
    '11d': 'https://source.unsplash.com/1600x900/?thunderstorm',
    '11n': 'https://source.unsplash.com/1600x900/?thunderstorm-night',
    '13d': 'https://source.unsplash.com/1600x900/?snow',
    '13n': 'https://source.unsplash.com/1600x900/?snow-night',
    '50d': 'https://source.unsplash.com/1600x900/?fog',
    '50n': 'https://source.unsplash.com/1600x900/?fog-night'
};

// Weather Trivia Facts
const weatherTrivia = [
    "The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, California in 1913.",
    "Lightning strikes the Earth about 100 times every second.",
    "A single snowflake can contain up to 200 ice crystals.",
    "The coldest temperature ever recorded on Earth was -89.2°C (-128.6°F) in Antarctica in 1983.",
    "Raindrops are not tear-shaped - they are actually shaped like hamburger buns!",
    "The average snowflake falls at a speed of 3.1 miles per hour.",
    "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
    "The Earth's atmosphere is made up of 78% nitrogen and 21% oxygen.",
    "The highest wind speed ever recorded was 253 mph in a tornado in Oklahoma in 1999.",
    "A typical cloud weighs about 500,000 kg (1.1 million pounds)."
];

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const weatherIcon = document.getElementById('weather-icon');
const date = document.getElementById('date');
const forecastContainer = document.getElementById('forecast-container');
const weatherBackground = document.querySelector('.weather-background');
const clothingRecommendation = document.getElementById('clothing-recommendation');
const activityRecommendation = document.getElementById('activity-recommendation');
const weatherFact = document.getElementById('weather-fact');

// Theme Buttons
const themeButtons = document.querySelectorAll('.theme-btn');

// Quick City Buttons
const quickCityButtons = document.querySelectorAll('.quick-city');

// Navigation Elements
const showFavoritesBtn = document.getElementById('show-favorites');
const showSettingsBtn = document.getElementById('show-settings');
const logoutBtn = document.getElementById('logout-btn');
const weatherSection = document.querySelector('.weather-section');
const favoritesSection = document.querySelector('.favorites-section');
const settingsSection = document.querySelector('.settings-section');
const homeLink = document.querySelector('.nav-links a:first-child');

// Feedback Form
const feedbackForm = document.getElementById('feedback-form');

// Favorites Management
const favoritesGrid = document.getElementById('favorites-grid');
const newFavoriteInput = document.getElementById('new-favorite');
const addFavoriteBtn = document.getElementById('add-favorite-btn');
const MAX_FAVORITES = 3;

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Chatbot functionality
const chatbotWidget = document.querySelector('.chatbot-widget');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotSend = document.querySelector('.chatbot-send');
const chatbotMessages = document.querySelector('.chatbot-messages');

// Function to handle section transitions
function switchSection(hideSection, showSection, activeNav, inactiveNavs) {
    // First, hide the current section
    hideSection.classList.add('hidden');
    
    // Then, show the new section
    setTimeout(() => {
        showSection.classList.remove('hidden');
        
        // Update navigation active states
        activeNav.classList.add('active');
        inactiveNavs.forEach(nav => nav.classList.remove('active'));
        
        // Scroll to top of the section
        showSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300); // Match this with CSS transition duration
}

// Event Listeners
searchBtn.addEventListener('click', () => getWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather(cityInput.value);
});

quickCityButtons.forEach(button => {
    button.addEventListener('click', () => getWeather(button.dataset.city));
});

themeButtons.forEach(button => {
    button.addEventListener('click', () => setTheme(button.dataset.theme));
});

homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(
        document.querySelector('.weather-section.hidden, .favorites-section:not(.hidden), .settings-section:not(.hidden)'),
        weatherSection,
        homeLink,
        [showFavoritesBtn, showSettingsBtn]
    );
});

showFavoritesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(
        document.querySelector('.favorites-section.hidden, .weather-section:not(.hidden), .settings-section:not(.hidden)'),
        favoritesSection,
        showFavoritesBtn,
        [homeLink, showSettingsBtn]
    );
});

showSettingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(
        document.querySelector('.settings-section.hidden, .weather-section:not(.hidden), .favorites-section:not(.hidden)'),
        settingsSection,
        showSettingsBtn,
        [homeLink, showFavoritesBtn]
    );
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('rememberMe');
    window.location.href = 'login.html';
});

feedbackForm.addEventListener('submit', handleFeedback);

// Theme Management
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Weather Functions
function getWeather(city) {
    fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found. Please try again.');
                return;
            }

            // Update city name and date
            document.getElementById('city-name').textContent = `Weather in ${data.name}, ${data.sys.country}`;
            
            // Update date with local timezone
            const localDate = new Date();
            document.getElementById('date').textContent = localDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Update main weather info
            document.getElementById('temperature').textContent = Math.round(data.main.temp);
            document.getElementById('wind-speed').textContent = data.wind.speed;
            document.getElementById('humidity').textContent = data.main.humidity;
            document.getElementById('pressure').textContent = data.main.pressure;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // Convert sunrise and sunset times to local timezone
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);
            
            // Format times in local timezone
            document.getElementById('sunrise').textContent = sunrise.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            
            document.getElementById('sunset').textContent = sunset.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });

            document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
            document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

            // Update background based on weather
            updateBackground(data.weather[0].main);
            
            // Update recommendations and trivia
            updateRecommendations(data.main.temp, data.weather[0].main);
            updateTrivia();
            
            // Get forecast for the city
            getForecast(city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

async function getForecast(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        if (data.cod === '404') {
            console.error('Forecast not found');
            return;
        }

        displayForecast(data.list);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayForecast(forecastList) {
    forecastContainer.innerHTML = '';
    
    // Get one forecast per day (every 8th item as data is in 3-hour intervals)
    const dailyForecasts = forecastList.filter((item, index) => index % 8 === 0).slice(0, 5);
    
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
            <div class="forecast-temp">
                <span class="max">${Math.round(forecast.main.temp_max)}°</span>
                <span class="min">${Math.round(forecast.main.temp_min)}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

function displayWeather(data) {
    cityName.textContent = `Weather in ${data.name}`;
    temp.textContent = Math.round(data.main.temp);
    feelsLike.textContent = Math.round(data.main.feels_like);
    wind.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    const currentDate = new Date();
    date.textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function updateBackground(iconCode) {
    const backgroundUrl = weatherBackgrounds[iconCode] || weatherBackgrounds['01d'];
    weatherBackground.style.backgroundImage = `url(${backgroundUrl})`;
}

function updateRecommendations(temp, weather) {
    // Clothing recommendations based on temperature
    let clothing = '';
    if (temp < 5) {
        clothing = 'Wear a heavy winter coat, gloves, and a scarf.';
    } else if (temp < 15) {
        clothing = 'A light jacket or sweater would be comfortable.';
    } else if (temp < 25) {
        clothing = 'Light clothing is suitable.';
    } else {
        clothing = 'Wear light, breathable clothing.';
    }
    clothingRecommendation.textContent = clothing;

    // Activity recommendations based on weather
    let activity = '';
    switch(weather.toLowerCase()) {
        case 'clear':
            activity = 'Perfect for outdoor activities like hiking or picnics!';
            break;
        case 'clouds':
            activity = 'Good for outdoor activities, but keep an eye on the sky.';
            break;
        case 'rain':
            activity = 'Indoor activities recommended.';
            break;
        case 'snow':
            activity = 'Great for winter sports if conditions are right!';
            break;
        default:
            activity = 'Check the weather conditions before planning activities.';
    }
    activityRecommendation.textContent = activity;
}

function updateTrivia() {
    const randomIndex = Math.floor(Math.random() * weatherTrivia.length);
    weatherFact.textContent = weatherTrivia[randomIndex];
}

// Functions
function handleFeedback(e) {
    e.preventDefault();
    
    const feedbackType = document.getElementById('feedback-type').value;
    const feedbackMessage = document.getElementById('feedback-message').value;
    const userEmail = localStorage.getItem('userEmail');
    
    // Using EmailJS to send feedback
    emailjs.send('service_2005', 'template_u7itwkh', {
        to_email: 'shuklaanant2005@gmail.com', // Replace with your email
        from_email: userEmail,
        feedback_type: feedbackType,
        message: feedbackMessage
    }, 'ZH-Ilt3zPZKCQcji1')
    .then(() => {
        alert('Thank you for your feedback! We will review it shortly.');
        feedbackForm.reset();
    })
    .catch(error => {
        console.error('Error sending feedback:', error);
        alert('Error sending feedback. Please try again later.');
    });
}

// Check if user is logged in
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

// Initialize with a default city
getWeather('London');

// Function to add a city to favorites
async function addToFavorites(city) {
    if (favorites.length >= MAX_FAVORITES) {
        alert('You can only add up to 3 favorite cities!');
        return;
    }

    if (favorites.includes(city)) {
        alert('This city is already in your favorites!');
        return;
    }

    try {
        // Verify city exists by making an API call
        const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        newFavoriteInput.value = '';
        displayFavorites();
    } catch (error) {
        alert('City not found. Please enter a valid city name.');
    }
}

// Function to remove a city from favorites
function removeFromFavorites(city) {
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Function to display favorites with weather details
async function displayFavorites() {
    favoritesGrid.innerHTML = '';
    
    for (const city of favorites) {
        try {
            const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            
            const favoriteCard = document.createElement('div');
            favoriteCard.className = 'favorite-card';
            favoriteCard.innerHTML = `
                <div class="favorite-header">
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <i class="fas fa-times remove-favorite" data-city="${city}"></i>
                </div>
                <div class="favorite-weather">
                    <div class="favorite-temp">
                        <span>${Math.round(data.main.temp)}°C</span>
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
                    </div>
                    <div class="favorite-details">
                        <div class="detail-item">
                            <i class="fas fa-wind"></i>
                            <span>${data.wind.speed} km/h</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tint"></i>
                            <span>${data.main.humidity}%</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-compress-arrows-alt"></i>
                            <span>${data.main.pressure} hPa</span>
                        </div>
                    </div>
                </div>
            `;
            
            favoritesGrid.appendChild(favoriteCard);
        } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error);
        }
    }
}

// Event Listeners for favorites
addFavoriteBtn.addEventListener('click', () => {
    const city = newFavoriteInput.value.trim();
    if (city) {
        addToFavorites(city);
    }
});

newFavoriteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = newFavoriteInput.value.trim();
        if (city) {
            addToFavorites(city);
        }
    }
});

favoritesGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-favorite')) {
        const city = e.target.dataset.city;
        removeFromFavorites(city);
    }
});

// Display favorites when favorites section is shown
showFavoritesBtn.addEventListener('click', () => {
    displayFavorites();
});

// Initialize chatbot with welcome message
function initializeChatbot() {
    chatbotMessages.innerHTML = ''; // Clear any existing messages
    addMessage('Hello! I\'m your weather assistant. How can I help you today?', false);
}

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotWidget.style.display = 'block';
    chatbotWidget.classList.add('active');
    chatbotToggle.style.display = 'none';
    initializeChatbot();
});

chatbotClose.addEventListener('click', () => {
    chatbotWidget.style.display = 'none';
    chatbotWidget.classList.remove('active');
    chatbotToggle.style.display = 'flex';
    chatbotMessages.innerHTML = '';
});

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle user input
async function handleUserInput() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        try {
            // Show loading state
            const loadingMessage = document.createElement('div');
            loadingMessage.classList.add('chatbot-message', 'bot');
            loadingMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
            chatbotMessages.appendChild(loadingMessage);
            
            // Get current weather data for context
            const currentCity = document.getElementById('city-name').textContent.split('in ')[1]?.split(',')[0] || 'London';
            const weatherResponse = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(currentCity)}&appid=${API_KEY}&units=metric`);
            const weatherData = await weatherResponse.json();
            
            // Prepare context for the chatbot
            const weatherContext = {
                city: weatherData.name,
                temperature: weatherData.main.temp,
                condition: weatherData.weather[0].main,
                humidity: weatherData.main.humidity,
                wind: weatherData.wind.speed
            };
            
            // Call Together AI API
            const response = await fetch('https://api.together.xyz/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 417b4ed211351de861c578c49d305cd9cc08d53a1f1bd7ae9b2278f9923f5f04'
                },
                body: JSON.stringify({
                    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a helpful weather assistant. Current weather in ${weatherContext.city}: ${weatherContext.temperature}°C, ${weatherContext.condition}, Humidity: ${weatherContext.humidity}%, Wind: ${weatherContext.wind} m/s. Provide accurate and concise information about weather conditions, forecasts, and related topics.`
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            // Remove loading message
            chatbotMessages.removeChild(loadingMessage);
            
            const data = await response.json();
            if (data.choices && data.choices[0]) {
                const botResponse = data.choices[0].message.content;
                addMessage(botResponse);
            } else {
                addMessage('I apologize, but I couldn\'t process your request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Remove loading message if it exists
            if (loadingMessage && loadingMessage.parentNode) {
                chatbotMessages.removeChild(loadingMessage);
            }
            addMessage('Sorry, I encountered an error. Please try again later.');
        }
    }
}

// Event listeners for sending messages
chatbotSend.addEventListener('click', handleUserInput);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
}); 