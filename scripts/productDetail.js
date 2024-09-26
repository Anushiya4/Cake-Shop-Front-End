function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  lens.style.left = img.x + "px";
  lens.style.top = img.y + "px";
  result.style.left = (img.x + img.width + 20) + "px";
  result.style.top = img.y + "px";
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  // lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  // lens.addEventListener("touchmove", moveLens);
  // img.addEventListener("touchmove", moveLens);
  img.addEventListener("mouseout", moveLens);
  function removeZoom() {
    result.style.display = 'none';

  }
  function moveLens(e) {
    
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    if(x == 0 && y == 0) {
      result.style.display = 'none';
    } else {
      result.style.display = 'block';
    }
    if (x != 0) {
      lens.style.left = ((img.x + pos.x) - (lens.offsetWidth / 2)) + "px";
    }
    if (y != 0) {
      lens.style.top = ((img.y + pos.y)- (lens.offsetHeight / 2)) + "px";
    }
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

function displayProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    fetch('http://localhost:8080/getCakeById?id='+id, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":'http://localhost:52330',
          "Access-Control-Allow-Credentials":'true'
      }
    }).then(response => {
        return response.json();
    }).then(cake => {
      const productImg = document.getElementById('product-img');
      productImg.innerHTML = `<img id="product-detail-img" class="product-detail-img" src="img/${cake.img}" alt="${cake.title}">`;
      const cakeDetailDiv = document.getElementById('product-detail');
      cakeDetailDiv.innerHTML = `
          <h2>${cake.title}</h2>
          <p>${cake.description}</p>
          <p><strong>Price:</strong> Rs.${cake.price.toFixed(2)}</p>
          <button onclick="addToCart(${cake.id})">Add To Cart</button>
              <button onclick="getwishitem(${cake.id})">Add wishlist</button>
          `;
        imageZoom("product-detail-img", "zoom-div");

        relatedProducts(cake.id);
    }).catch(error => {
        console.error('Error:', error);
    });
  }

  displayProductDetail();

  function relatedProducts(cakeId) {
    fetch('http://localhost:8080/getRelatedProducts?cakeId='+cakeId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        }
    }).then(response => {
        return response.json();
    }).then(cakeList => {
        const cakeListDiv = document.getElementById('related-products');
        cakeList.forEach(cake => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
              <img src="img/${cake.img}" alt="${cake.title}">
                  <p>${cake.title}</p>
                  <p><strong>Price:</strong> Rs.${cake.price.toFixed(2)}</p>
                  <a href="productDetail.html?id=${cake.id}">View Details</a>
              `;
          cakeListDiv.appendChild(card);
        })
    }).catch(error => {
        console.error('Error:', error);
    });
  }
  
  function addToCart(cakeId) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch('http://localhost:8080/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        },
        body: JSON.stringify({ cakeId, userId, qty: 1 })
      }).then(response => {
          if (response.ok) {
            alert("Cake successfully added in your cart.");
            location.reload();
          } else {
            alert("something went wrong.");
          }
      }).catch(error => {
          console.error('Error:', error);
          showError('login-error', 'An error occurred. Please try again later.');
      });
    } else {
      alert("Kindly login to add items into cart.");
      window.location.href = '/login.html'; 
    }
  }

  function getwishitem(cakeId){
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch('http://localhost:8080/addItemToWishList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":'http://localhost:52330',
            "Access-Control-Allow-Credentials":'true'
        },
        body: JSON.stringify({ cakeId, userId, qty: 1 })
      }).then(response => {

        if (response.ok){
          alert("Cake successfully added in your WishList.");
          location.reload();
        }
        else{
          alert("something went wrong.");
        }

      }).catch(error => {
        console.error('Error:', error);
        showError('login-error', 'An error occurred. Please try again later.');

      });
  }
}