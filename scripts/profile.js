function displayProfileDetail() {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:8080/user/'+userId, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":'http://localhost:52330',
          "Access-Control-Allow-Credentials":'true'
      }
    }).then(response => {
        return response.json();
    }).then(user => {
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('phone').value = user.phone;
      document.getElementById('address').value = user.address;
    }).catch(error => {
        console.error('Error:', error);
    });
  }

  displayProfileDetail();


  document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }
    
    // Submit form data to backend
    fetch('http://localhost:8080/user/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        },
        body: JSON.stringify({
            id: userId,
            name: document.getElementById('name').value,
            email: email,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        })
    }).then(response => {
        console.error('success :', response);
        location.reload();
    }).catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'User update failed. Please try again.';
    });
});