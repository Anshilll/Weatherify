// DOM Elements
const themeButtons = document.querySelectorAll('.theme-btn');
const unitButtons = document.querySelectorAll('.unit-btn');
const feedbackForm = document.getElementById('feedback-form');

// Load saved settings
const savedTheme = localStorage.getItem('theme') || 'default';
const savedUnit = localStorage.getItem('unit') || 'metric';

// Event Listeners
themeButtons.forEach(button => {
    button.addEventListener('click', () => setTheme(button.dataset.theme));
});

unitButtons.forEach(button => {
    button.addEventListener('click', () => setUnit(button.dataset.unit));
});

feedbackForm.addEventListener('submit', handleFeedback);

// Functions
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateActiveThemeButton(theme);
}

function setUnit(unit) {
    localStorage.setItem('unit', unit);
    updateActiveUnitButton(unit);
}

function updateActiveThemeButton(theme) {
    themeButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.theme === theme);
    });
}

function updateActiveUnitButton(unit) {
    unitButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.unit === unit);
    });
}

function handleFeedback(e) {
    e.preventDefault();
    
    const feedbackType = document.getElementById('feedback-type').value;
    const feedbackMessage = document.getElementById('feedback-message').value;
    
    // In a real application, you would send this to a server
    // For now, we'll just show a success message
    alert('Thank you for your feedback! We will review it shortly.');
    feedbackForm.reset();
}

// Initialize
setTheme(savedTheme);
setUnit(savedUnit); 