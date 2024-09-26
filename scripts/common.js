
function loggedInCheck() {
    const navLinkContainer = document.getElementById('nav-links');
    const userId = localStorage.getItem('userId');
    const li = document.createElement('li');
    if (userId != null) {
        li.innerHTML = `
        <a id="logout" href="#">Logout</a>
        `;
    } else {
        li.innerHTML = `
        <a href="login.html">Login</a>
        `;
    }
    navLinkContainer.appendChild(li);
}
loggedInCheck();

let logout = document.getElementById("logout");
logout.addEventListener("click", logoutFun);

function logoutFun() {
    localStorage.removeItem('userId');
    location.reload();
}


function loadCartItemCount() {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:8080/cart/itemCount?userId='+userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }).then(cartItemCount => {
        document.getElementById('cart-count').innerHTML = cartItemCount;
    }).catch(error => {
        console.error('Error:', error);
    });
}

function loadWishItemCount() {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:8080/wish/itemCount?userId='+userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }).then(wishItemCount => {
        document.getElementById('wishlist-count').innerHTML = wishItemCount;
    }).catch(error => {
        console.error('Error:', error);
    });
}

loadCartItemCount();

loadWishItemCount();