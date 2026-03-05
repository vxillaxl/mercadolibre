// ===== BANNER SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');
let autoSlide = setInterval(nextSlide, 4000);

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

// Reiniciar auto-slide al hacer clic
document.querySelectorAll('.banner-arrow, .dot').forEach(el => {
  el.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 4000);
  });
});

// ===== CARRITO =====
let cartCount = 0;
const cartBadge = document.getElementById('cart-badge');

function addToCart(product) {
  cartCount++;
  cartBadge.textContent = cartCount;
  cartBadge.style.animation = 'none';
  setTimeout(() => cartBadge.style.animation = '', 10);
  showToast(`🛒 "${product}" agregado al carrito`);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== BÚSQUEDA =====
const suggestions = ['Smartphones Samsung', 'Laptops Lenovo', 'Audífonos Sony', 'Smart TV', 'Apple Watch', 'Cámaras Canon', 'Zapatillas Nike', 'Ropa deportiva'];

const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('search-suggestions');

searchInput.addEventListener('input', () => {
  const val = searchInput.value.trim().toLowerCase();
  if (!val) { suggestionsBox.classList.remove('show'); return; }
  const filtered = suggestions.filter(s => s.toLowerCase().includes(val));
  if (filtered.length === 0) { suggestionsBox.classList.remove('show'); return; }
  suggestionsBox.innerHTML = filtered.map(s => `<div class="suggestion-item" onclick="selectSuggestion('${s}')">🔍 ${s}</div>`).join('');
  suggestionsBox.classList.add('show');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) suggestionsBox.classList.remove('show');
});

function selectSuggestion(val) {
  searchInput.value = val;
  suggestionsBox.classList.remove('show');
  performSearch(val);
}

function handleSearch(e) {
  e.preventDefault();
  const val = searchInput.value.trim();
  if (val) performSearch(val);
}

function quickSearch(val) {
  searchInput.value = val;
  performSearch(val);
  document.getElementById('buscador').scrollIntoView({ behavior: 'smooth' });
}

const allProducts = [
  { name: 'Smartphone Samsung Galaxy A55', price: '$1.299.000', icon: '📱', cat: 'Smartphones' },
  { name: 'iPhone 15 Pro 256GB', price: '$4.199.000', icon: '📱', cat: 'Smartphones' },
  { name: 'Laptop Lenovo IdeaPad', price: '$1.749.000', icon: '💻', cat: 'Laptops' },
  { name: 'MacBook Air M2', price: '$5.299.000', icon: '💻', cat: 'Laptops' },
  { name: 'Audífonos Sony WH-1000XM5', price: '$899.000', icon: '🎧', cat: 'Audífonos' },
  { name: 'Smart TV Samsung 55"', price: '$2.299.000', icon: '📺', cat: 'Televisores' },
  { name: 'Apple Watch Series 9', price: '$1.599.000', icon: '⌚', cat: 'Smartwatch' },
  { name: 'Cámara Canon EOS R50', price: '$2.624.250', icon: '📷', cat: 'Cámaras' },
  { name: 'Zapatillas Nike Air Max', price: '$389.000', icon: '👟', cat: 'Zapatos' },
  { name: 'Camiseta Adidas Original', price: '$89.000', icon: '👕', cat: 'Ropa' },
  { name: 'Juguete LEGO Creator', price: '$249.000', icon: '🧸', cat: 'Juguetes' },
];

function performSearch(query) {
  const q = query.toLowerCase();
  const results = allProducts.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
  const section = document.getElementById('search-results');
  const grid = document.getElementById('search-results-grid');
  const title = document.getElementById('search-results-title');

  title.textContent = results.length > 0 ? `${results.length} resultado(s) para "${query}"` : `No se encontraron resultados para "${query}"`;

  grid.innerHTML = results.map(p => `
    <article class="product-card">
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <p class="product-price">${p.price}</p>
        <p class="product-shipping">🚚 Envío gratis</p>
        <button class="btn-add-cart" onclick="addToCart('${p.name}')">Agregar al carrito</button>
      </div>
    </article>
  `).join('');

  section.style.display = 'block';
}

// ===== SCROLL ANIMATIONS =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.1)';
});

// ===== SMOOTH SCROLL PARA LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
