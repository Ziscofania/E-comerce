// Función para filtrar productos
function filterProducts() {
    const category = document.getElementById('category').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const price = document.getElementById('price').value;
    
    const filteredProducts = products.filter(product => {
        // Filtrar por categoría
        if (category !== 'all' && product.category !== category) return false;
        
        // Filtrar por talla
        if (size !== 'all' && !product.size.includes(size)) return false;
        
        // Filtrar por color
        if (color !== 'all' && product.color !== color) return false;
        
        // Filtrar por precio
        if (price !== 'all') {
            const [min, max] = price.split('-').map(Number);
            if (max) {
                if (product.price < min || product.price > max) return false;
            } else {
                if (product.price < min) return false;
            }
        }
        
        return true;
    });
    
    displayFilteredProducts(filteredProducts);
}

// Mostrar productos filtrados
function displayFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById('all-products');
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-results">
                <p>No se encontraron productos con estos filtros.</p>
                <button onclick="resetFilters()" class="btn">Mostrar todos</button>
            </div>
        `;
    } else {
        productsContainer.innerHTML = filteredProducts.map(product => `
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

// Resetear filtros
function resetFilters() {
    document.getElementById('category').value = 'all';
    document.getElementById('size').value = 'all';
    document.getElementById('color').value = 'all';
    document.getElementById('price').value = 'all';
    
    displayAllProducts();
}

// Event listeners para los filtros
document.addEventListener('DOMContentLoaded', function() {
    const filterSelects = document.querySelectorAll('.filters select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterProducts);
    });
    
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
});

// Hacer funciones disponibles globalmente
window.resetFilters = resetFilters;