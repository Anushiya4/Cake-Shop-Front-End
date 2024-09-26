
        
document.getElementById('search-button').addEventListener('click', function() {
    let searchInput = document.getElementById('search-input').value;
    listCakes(searchInput, null);
});

function priceFilter (priceFilterVal) {
    listCakes(null, priceFilterVal);
}

function listCakes(searchInput, priceFilterVal) {
    const params = new URLSearchParams(window.location.search);
    let categoryId = params.get("category_id");
    let url = 'http://localhost:8080/getcakelist';
    console.log('category :'+categoryId);
    let filterStr = '';
    if (categoryId != null) {
        filterStr = '?categoryId='+categoryId;
    }
    if (searchInput != null) {
        filterStr = filterStr + ((filterStr != '') ? '&' : '?')+'searchValue='+searchInput;
    }
    if (priceFilterVal != null && priceFilterVal != '') {
        const priceRange = priceFilterVal.split("-");
        filterStr = filterStr + ((filterStr != '') ? '&' : '?')+'minPrice='+priceRange[0]
                    +'&maxPrice='+priceRange[1];
    }
    if (filterStr != '') {
        url = url + filterStr;
    }
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }).then(cakeList => {
        const cakeListDiv = document.getElementById('cake-list');
        cakeListDiv.innerHTML = "";
        cakeList.forEach(cake => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="img/${cake.img}" alt="${cake.title}">
                    <h2>${cake.title}</h2>
                    <p><strong>Price:</strong> Rs.${cake.price.toFixed(2)}</p>
                    <a href="productDetail.html?id=${cake.id}">View Details</a>
                `;
            cakeListDiv.appendChild(card);
        })
    }).catch(error => {
        console.error('Error:', error);
        //errorMessage.textContent = 'An error occurred. Please try again later.';
    });

}
    
listCakes(null);  



    
    
    // have to fetch list from backend (category id as input)
//     const cakeList = [
//         {id: 1, category: 3, img: 'Chocolate-Lava-Cake-Recipe.jpg', title: 'Chocolate-Lava-Cake', description: 'All you need are a few simple ingredients to make this show-stopping Chocolate Lava Cake.', price: 1000, qty: 1},
    
//         {id: 2, category: 3,  img: 'Bento Cake Cup cake Combo.jpeg', title: 'Bento Cake Cup cake Combo', description: 'Introducing our Bento Cake Cup Cake Combo, a delightful assortment of mini cupcakes in a convenient bento box. This combo includes a variety of flavors such as chocolate, vanilla, red velvet, and more, making it perfect for sharing or enjoying as a sweet treat for yourself.In addition to our cupcake combo, we also offer our Basic Cake', price: 490, qty: 1},
    
//         {id: 3, category: 1, img: 'Butterscotch Premium Cake.jpeg', title: 'Butterscotch Premium Cake', description: 'Indulge in the rich and decadent flavor of our Butterscotch Premium Cake. Made with the finest ingredients and topped with a luscious butterscotch frosting, this cake is a perfect treat for any occasion.', price: 650, qty: 1},
    
//         {id: 4, category: 1, img: 'Blueberry Purple Flower Cake.jpeg', title: 'Blueberry Purple Flower Cake', description: 'Indulge in the delightful taste of our Blueberry Purple Flower Cake. This basic cake is infused with the rich flavor of blueberries, creating a sweet and tangy sensation with every bite.', price: 490, qty: 1},
    
//         {id: 5, category: 2, img: 'Bento Cake.jpeg', title: 'Bento Cake', description: 'Indulge in the ultimate chocolate experience with our 1kg Death by Chocolate Cake. This rich and decadent dessert is every chocolate lover s dream come true!', price: 899, qty: 1},

//         {id: 6, category: 2, img: 'Death By Chocolate Cake.jpeg', title: 'Death By Chocolate Cake', description: 'Introducing our delicious Bento Cake and Basic Cake! Our Bento Cake is a delightful combination of fluffy sponge cake layered with creamy frosting and topped with a variety of fresh fruits and decorative designs.', price: 350, qty: 1}
//     ];
//     const cakeListDiv = document.getElementById('cake-list');
//     cakeList.forEach(cake => {
//         if (!categoryId || categoryId == cake.category) {
//             const card = document.createElement('div');
//             card.className = 'card';
//             card.innerHTML = `
//                 <img src="img/${cake.img}" alt="${cake.title}">
//                     <h2>${cake.title}</h2>
//                     <p><strong>Price:</strong> Rs.${cake.price.toFixed(2)}</p>
//                     <a href="productDetail.html?id=${cake.id}">View Details</a>
//                 `;
//             cakeListDiv.appendChild(card);
//         }
//     })
//   }
  
  