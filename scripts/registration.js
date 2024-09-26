

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Password validation
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        errorMessage.textContent = 'Password must be at least 8 characters long and include letters and numbers.';
        return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    errorMessage.textContent = '';
    
    // Submit form data to backend
    fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: email,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            password: password
        })
    }).then(response => {
        if (response.ok) {
            window.location.href = '/login.html';
        } else {
            errorMessage.textContent = 'Registration failed. Please try again.';
        }
    }).catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'Registration failed. Please try again.';
    });
});
