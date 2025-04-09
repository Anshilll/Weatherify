import { validateUser, emailExists, addUser } from './users.js';

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const loginBox = document.querySelector('.auth-box');
const signupBox = document.querySelector('.signup-box');

// Event Listeners
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.add('hidden');
    signupBox.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);

// Functions
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Validate user credentials
    const user = validateUser(email, password);
    
    if (user) {
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.name);
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        // Redirect to dashboard
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Validate password strength
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }

    // Check if email already exists
    if (emailExists(email)) {
        alert('Email already registered. Please login instead.');
        return;
    }

    // Add new user
    if (addUser(email, password, name)) {
        alert('Registration successful! Please login.');
        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
        signupForm.reset();
    } else {
        alert('Registration failed. Please try again.');
    }
}

// Check if user is already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
} 