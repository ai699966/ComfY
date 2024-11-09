var currentUrl;
var companies = document.querySelectorAll('#page2 ul li');
var productItems;
var prod =[];
var productName = document.getElementById("name");
var productPrice = document.getElementById("salary");
var productCategory = document.getElementById("type");
var productDescr = document.getElementById("descr");
var table = document.querySelector("#add");
var button = document.querySelector("button");
var currentIndex;

if (localStorage.getItem("cart") != null) {
    
    var cartProducts = JSON.parse(localStorage.getItem("cart"));
    document.getElementById('cartSize').innerHTML = `<h6> ${cartProducts.length}</h6>`;

}else {
    var cartProducts = [];
}

if (window.location.pathname === '/index.html') {
    displayProduct()
    console.log('home');
 } else if (window.location.pathname === '/products.html') {
    getAllProducts();
     console.log('product');
 } else if (window.location.pathname === '/Cart.html') {
    renderCart();
     console.log('product');
 }

(async function () {
    var productsUrl = await fetch('https://ai699966.github.io/API/products.json', {method: 'GET'})
    var allProduct = await productsUrl.json();
    console.log(allProduct.product);
    prod = allProduct.product;
    getAllProducts();
    productItems = document.querySelectorAll('.add');

    return prod;
})();

 async function displayProduct() {
    var productsUrl = await fetch('https://ai699966.github.io/API/products.json', {method: 'GET'})    
    var allProduct = await productsUrl.json();
    console.log(allProduct);
    prod = allProduct.product;
    var cartona =``;
    for (let i = 0; i < 3; i++){
        let price = prod[i].fields.price / 100;
        cartona += `<div class = 'col-md-4 p-3'>
                        <div class = 'add'>
                        <div>
                            <img class = 'img-fluid imgContain rounded ' src= '${prod[i].fields.image[0].url}'>
                        </div>
                        <h3 class = 'text-center text-muted mt-2'>${prod[i].fields.name}</h3>
                        <h5 class = 'text-center'>${price}$</h5>
                        </div>
                    </div>`;  
    }
    document.getElementById('homeProduct').innerHTML = cartona;
    }
 async function getAllProducts() {
    var productsUrl = await fetch('https://ai699966.github.io/API/products.json', {method: 'GET'})    
    var allProduct = await productsUrl.json();
    let prop = allProduct.product;
    var cartona =``;
   
        for(i=0; prop.length>i; i++){
            let price = prop[i].fields.price / 100;
            cartona += `<div class = 'col-md-4 p-3 add'>
                        
                         <div>
                            <img class = 'img-fluid imgContain rounded ' src= '${prop[i].fields.image[0].url}'>
                         </div>
                        <h3 class = 'text-center text-muted mt-2'>${prop[i].fields.name}</h3>
                         <h5 class = 'text-center'>${price}$</h5>
                         <div class="d-flex justify-content-center align-items-center">
                         <button class="btn btn-primary mt-2 add" onclick="addToCart(${i})">Add To Cart</button>
                        </div>
                    </div>`;
        }
        
        
    document.getElementById('products').innerHTML = cartona;

}

for (let i = 0; i < companies.length; i++) {
    companies[i].addEventListener('click', function (e) {
        console.log(e.target.innerHTML);
        console.log(prod);
        let companyProductus = prod.filter((x) => x.fields.company == e.target.innerHTML.toLowerCase())
        console.log(companyProductus);
        var cartona = ``;
        for (let i = 0; i < companyProductus.length; i++) {
            let price = companyProductus[i].fields.price / 100;
            cartona += `<div class = 'col-md-4 p-3'>
                           
                            <div>
                                <img class = 'img-fluid imgContain rounded ' src= '${companyProductus[i].fields.image[0].url}'>
                            </div>
                            <h3 class = 'text-center text-muted'>${companyProductus[i].fields.name}</h3>
                            <h5 class = 'text-center'>${price}$</h5>
                            
                        </div>`;
            
        }
        document.getElementById('products').innerHTML = cartona;
        
    })   
}

function search(term) {
    
    var cartona = ``;
    for (let i = 0; i < prod.length; i++) {
       if (prod[i].fields.name.toLowerCase().includes(term) == true || prod[i].fields.name.toLowerCase().includes(term) == true || prod[i].fields.company.toLowerCase().includes(term) == true) { 
        let price = prod[i].fields.price / 100;
        cartona += `<div class = 'col-md-4 p-3'>
                        
                        <div>
                            <img class = 'img-fluid imgContain rounded' src= '${prod[i].fields.image[0].url}'>
                        </div>
                        <h3 class = 'text-center text-muted'>${prod[i].fields.name}</h3>
                        <h5 class = 'text-center'>${price}$</h5>
                       
                    </div>`;}

    }
    document.getElementById('products').innerHTML = cartona;
}

function addToCart(param) {
        let newObj = {...prod[param]};        
         newObj.quantity = 1;         
        cartProducts.push(newObj);
        console.log(cartProducts);
        localStorage.setItem('cart', JSON.stringify(cartProducts));
        document.getElementById('cartSize').innerHTML = `<h6> ${cartProducts.length}</h6>`;
        
}

function renderCart() {
    let cartona = ``;
    for (let i = 0; i < cartProducts.length; i++) {
        cartona += `<div class = 'p-3'>
                        <div class="d-flex justify-content-around align-items-center">

                        <div>
                            <img class = 'img-fluid imgContain rounded' src= '${cartProducts[i].fields.image[0].url}'>
                        </div>
                          <h3 class = 'text-center text-info'>${cartProducts[i].fields.name}</h3>
                            <h5 class = 'text-center'>${(cartProducts[i].fields.price / 100) * (cartProducts[i].quantity)}$</h5>
                        <div class="d-flex flex-column justify-content-around align-items-center">
                            <div class="p-2 cursor" onclick="increaseQuantity(${i})"> + </div>
                            <div class="p-1">${cartProducts[i].quantity}</div>
                            <div class="p-2 cursor" onclick="decreaseQuantity(${i})"> - </div>
                        </div>
                        </div>
                    </div>`;
        
    }
    document.getElementById('cartDetails').innerHTML = cartona;

}
function increaseQuantity(param) {
    cartProducts[param].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    renderCart();
}
function decreaseQuantity(param) {  
    if (cartProducts[param].quantity == 0) {
        cartProducts[param].quantity =0
    }  else {
        cartProducts[param].quantity -= 1;
    }
    renderCart();
}
function deleteProduct(param) {
    cartProducts.splice(param, 1);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    document.getElementById('cartSize').innerHTML = `<h6> ${cartProducts.length}</h6>`;
    renderCart();
}
function clearCart() {
    cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    document.getElementById('cartDetails').innerHTML = '';
    document.getElementById('cartSize').innerHTML = `<h6> ${cartProducts.length}</h6>`;
}
document.getElementById('clearCart').addEventListener('click', clearCart);


const signUp = () => {

    var email = document.getElementById('').value;
    var password = document.getElementById('').value;
    fetch("https://ai699966.github.io/API/products.json", {
        method: "POST",
        headers : {"content-type":""},
        body : JSON.stringify(users)
    }) 
}
 


// ################################## Add Product ##################################

function validate() {
if (productName.value != '' && productPrice.value != '' && productCategory.value != '') {
    var validator = true

} else {
    validator = false
}
return validator

}

function addProduct() {

if (validate()) {
if (button.innerHTML == 'Update') {
    product[currentIndex].name =productName.value ;
    product[currentIndex].price = productPrice.value;
    product[currentIndex].type = productCategory.value;
    product[currentIndex].Descr = productDescr.value;
    button.innerHTML = 'Add Product';

} else {
    
    let addProduct = {
        name : productName.value,
        price :productPrice.value,
        type : productCategory.value,
        Descr : productDescr.value
    };
    
}
} else {
alert('please Fill all information')
}

}

function clearProduct() {
productName.value = "";
productPrice.value = "";
productCategory.value = "";
productDescr.value = "";
}






