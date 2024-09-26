function loadCart() {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:8080/getCart?userId='+userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }).then(cartItems => {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;
        cartItems.forEach(cart => {
            const cartDiv = document.createElement('div');
            cartDiv.classList.add('cart-item');
            cartDiv.innerHTML = `
                <img src="img/${cart.cake.img}" alt="${cart.cake.title}">
                <h2>${cart.cake.title}</h2>
                <p>${cart.cake.description}</p>
                <p><strong>Price:</strong> Rs.${cart.cake.price}</p>
                <button onclick="removeFromCart(${cart.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartDiv);
            totalPrice += cart.cake.price;
        });
        totalPriceElement.innerText = totalPrice;
    }).catch(error => {
        console.error('Error:', error);
    });
}

loadCart();

function removeFromCart(cartId) {
    fetch('http://localhost:8080/cart/removeItem?cartId='+cartId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        location.reload();
    }).catch(error => {
        console.error('Error:', error);
    });
}