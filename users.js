// User data storage
const users = [
    {
        email: 'admin@example.com',
        password: 'admin123', // In a real app, this would be hashed
        name: 'Admin User'
    }
];

// Function to validate user credentials
function validateUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
}

// Function to check if email exists
function emailExists(email) {
    return users.some(u => u.email === email);
}

// Function to add new user
function addUser(email, password, name) {
    if (emailExists(email)) {
        return false;
    }
    users.push({ email, password, name });
    return true;
}

// Export functions
export { validateUser, emailExists, addUser }; 