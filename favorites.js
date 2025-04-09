// Weather API Configuration
const API_KEY = '7163834871402cce50234b88a80bc415';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const favoritesGrid = document.getElementById('favorites-grid');
const newFavoriteInput = document.getElementById('new-favorite');
const addFavoriteBtn = document.getElementById('add-favorite-btn');

// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Event Listeners
addFavoriteBtn.addEventListener('click', addNewFavorite);
newFavoriteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewFavorite();
});

// Functions
async function addNewFavorite() {
    const city = newFavoriteInput.value.trim();
    if (!city) return;

    if (favorites.length >= 3) {
        alert('You can only have 3 favorite cities. Please remove one first.');
        return;
    }

    if (favorites.includes(city)) {
        alert('This city is already in your favorites.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        newFavoriteInput.value = '';
        displayFavorites();
    } catch (error) {
        console.error('Error adding favorite:', error);
        alert('Error adding city to favorites. Please try again.');
    }
}

function removeFavorite(city) {
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

async function displayFavorites() {
    favoritesGrid.innerHTML = '';
    
    for (const city of favorites) {
        try {
            const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            const card = document.createElement('div');
            card.className = 'favorite-card';
            card.innerHTML = `
                <i class="fas fa-times remove-favorite"></i>
                <h3>${data.name}</h3>
                <div class="weather-info">
                    <div class="temperature">
                        <span>${Math.round(data.main.temp)}</span>°C
                    </div>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                    <div class="weather-details">
                        <div>Feels like: ${Math.round(data.main.feels_like)}°C</div>
                        <div>Humidity: ${data.main.humidity}%</div>
                        <div>Wind: ${data.wind.speed} km/h</div>
                    </div>
                </div>
            `;

            card.querySelector('.remove-favorite').addEventListener('click', () => removeFavorite(city));
            favoritesGrid.appendChild(card);
        } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error);
        }
    }
}

// Initialize
displayFavorites(); 