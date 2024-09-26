

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

   
    clearErrorMessages();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email address.');
        return;
    }
    if (password.length < 8) {
        showError('password-error', 'Password must be at least 8 characters long.');
        return;
    }

    
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            showError('login-error', 'Login failed. Please check your email and password.');
        }
    }).then(data => {
        localStorage.setItem('userId', data);
        window.location.href = '/homePage.html'; 
    }).catch(error => {
        console.error('Error:', error);
        showError('login-error', 'An error occurred. Please try again later.');
    });
});

document.getElementById('register').addEventListener('click', function () {
   
    window.location.href = '/register.html'; 
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.textContent = '');
}