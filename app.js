let cartCount = 0;

const cartBadge = document.getElementById("cart-badge");

function addToCart(product){

cartCount++;

cartBadge.textContent = cartCount;

showToast(product + " agregado al carrito");

}



function showToast(msg){

const toast = document.getElementById("toast");

toast.textContent = msg;

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},3000);

}



const suggestions = [
"Smartphones Samsung",
"Laptops Lenovo",
"Audífonos Sony",
"Smart TV",
"Apple Watch"
];

const searchInput = document.getElementById("search-input");

const suggestionsBox = document.getElementById("search-suggestions");

searchInput.addEventListener("input",()=>{

const val = searchInput.value.toLowerCase();

const filtered = suggestions.filter(s=>s.toLowerCase().includes(val));

suggestionsBox.innerHTML = filtered.map(s=>`<div>${s}</div>`).join("");

});