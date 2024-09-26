function listCategories() {
    fetch('http://localhost:8080/getCategories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }).then(categories => {
        const categorytDiv = document.getElementById('categories-div');
        categories.forEach(c => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="img/${c.img}" alt="${c.category}">
                    <p><strong>${c.category}</strong></p>
                    <a href="cakeList.html?category_id=${c.id}">View Cakes</a>
                `;
            categorytDiv.appendChild(card);
        })
    }).catch(error => {
        console.error('Error:', error);
        //errorMessage.textContent = 'An error occurred. Please try again later.';
    });
  }
  
  listCategories(); 