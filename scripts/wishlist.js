function loadwishitem() {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:8080/getWish?userId='+userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }) .then(cartItems => {
            const wishlistItem = document.getElementById('wishitem');
            const totalPriceElement = document.getElementById('total-price');
            let totalPrice = 0;
            cartItems.forEach(w => {

                const creatediv = document.createElement('div');
                creatediv.classList.add('wish-item');
                creatediv.innerHTML=`
               <img src="img/${w.cake.img}" alt="${w.cake.title}">
               <h2>${w.cake.title}</h2>
               <p>${w.cake.description}</p>
                <p><strong>Price:</strong> Rs.${w.cake.price}</p>
                 <button onclick="removeFromWishList(${w.id})">Remove from wishList</button>
                `;
                wishlistItem.appendChild(creatediv);
            });
                
            }).catch(error => {
                console.error('Error:', error);
            });

}

loadwishitem();

function removeFromWishList(wishItemId) {
    fetch('http://localhost:8080/wish/removeItem?wishItemId='+wishItemId, {
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