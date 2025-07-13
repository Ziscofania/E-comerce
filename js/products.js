// Base de datos de productos
const products = [
    {
        id: 1,
        title: "Camisa Estampada Clásica",
        price: 29.99,
        image: "images/product1.jpg",
        category: "clasicas",
        size: ["S", "M", "L", "XL"],
        color: "blanco",
        rating: 4.5,
        reviews: 24,
        description: "Camisa de algodón 100% con estampado exclusivo. Corte clásico y cómodo para uso diario."
    },
    {
        id: 2,
        title: "Camisa Estampada Moderna",
        price: 34.99,
        image: "images/product2.jpg",
        category: "modernas",
        size: ["M", "L", "XL"],
        color: "negro",
        rating: 4.2,
        reviews: 18,
        description: "Diseño moderno con estampado artístico. Tela suave y transpirable."
    },
    {
        id: 3,
        title: "Camisa Gráfica Urbana",
        price: 39.99,
        image: "images/product3.jpg",
        category: "graficas",
        size: ["S", "M", "L"],
        color: "azul",
        rating: 4.8,
        reviews: 32,
        description: "Estampado gráfico urbano con colores vibrantes. Ideal para looks casuales."
    },
    {
        id: 4,
        title: "Camisa Estampada Vintage",
        price: 27.99,
        image: "images/product4.jpg",
        category: "clasicas",
        size: ["S", "M", "XL"],
        color: "rojo",
        rating: 4.0,
        reviews: 15,
        description: "Estilo retro con estampado vintage. Corte regular para mayor comodidad."
    },
    {
        id: 5,
        title: "Camisa Estampada Artística",
        price: 45.99,
        image: "images/product5.jpg",
        category: "graficas",
        size: ["M", "L", "XL"],
        color: "blanco",
        rating: 4.7,
        reviews: 28,
        description: "Diseño artístico exclusivo. Tela premium con gran durabilidad."
    },
    {
        id: 6,
        title: "Camisa Estampada Minimalista",
        price: 31.99,
        image: "images/product6.jpg",
        category: "modernas",
        size: ["S", "M", "L", "XL"],
        color: "negro",
        rating: 4.3,
        reviews: 21,
        description: "Diseño limpio y minimalista. Perfecta para combinar con cualquier outfit."
    }
];

// Mostrar productos destacados en la página de inicio
function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    
    if (featuredContainer) {
        // Seleccionar 4 productos aleatorios como destacados
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const featured = shuffled.slice(0, 4);
        
        featuredContainer.innerHTML = featured.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <a href="producto.html?id=${product.id}" class="btn btn-small">Ver detalles</a>
                        <button class="btn btn-small btn-secondary" onclick="addToCart(${product.id})">Añadir</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Mostrar todos los productos en la página de productos
function displayAllProducts() {
    const productsContainer = document.getElementById('all-products');
    
    if (productsContainer) {
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <a href="producto.html?id=${product.id}" class="btn btn-small">Ver detalles</a>
                        <button class="btn btn-small btn-secondary" onclick="addToCart(${product.id})">Añadir</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Mostrar productos relacionados en la página de producto
function displayRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('related-products');
    
    if (relatedContainer) {
        // Obtener el producto actual para encontrar relacionados por categoría
        const currentProduct = products.find(p => p.id === currentProductId);
        const related = products.filter(p => 
            p.category === currentProduct.category && p.id !== currentProductId
        ).slice(0, 3);
        
        // Si no hay suficientes relacionados, completar con productos aleatorios
        if (related.length < 3) {
            const otherProducts = products.filter(p => 
                p.category !== currentProduct.category && p.id !== currentProductId
            );
            const needed = 3 - related.length;
            related.push(...otherProducts.slice(0, needed));
        }
        
        relatedContainer.innerHTML = related.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${generateRatingStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <a href="producto.html?id=${product.id}" class="btn btn-small">Ver detalles</a>
                        <button class="btn btn-small btn-secondary" onclick="addToCart(${product.id})">Añadir</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Mostrar detalles de un producto individual
function displayProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        
        // Actualizar imágenes (en una implementación real tendrías estas imágenes)
        document.getElementById('main-product-image').src = product.image;
        
        // Actualizar rating
        const ratingElement = document.querySelector('.rating');
        if (ratingElement) {
            ratingElement.innerHTML = `
                ${generateRatingStars(product.rating)}
                <span>(${product.reviews} reseñas)</span>
            `;
        }
        
        // Mostrar productos relacionados
        displayRelatedProducts(productId);
    }
}

// Generar estrellas de rating
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayAllProducts();
    
    // Mostrar detalles del producto si estamos en esa página
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        displayProductDetails(productId);
    }
});

// Funciones del carrito (simplificadas para GitHub Pages)
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        alert(`${product.title} añadido al carrito`);
    }
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

// Hacer estas funciones disponibles globalmente
window.addToCart = addToCart;