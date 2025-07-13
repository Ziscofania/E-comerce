// Funciones generales del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil (podría implementarse)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    const header = document.querySelector('header .container');
    if (header) {
        header.appendChild(menuToggle);
    }
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Cargar productos si estamos en esa página
    if (document.getElementById('all-products') && !document.getElementById('featured-products')) {
        displayAllProducts();
    }
});

function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Función para manejar la compra por WhatsApp
function buyViaWhatsApp(productTitle) {
    const message = `Estoy interesado en comprar: ${productTitle}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`, '_blank');
}

// Hacer funciones disponibles globalmente
window.buyViaWhatsApp = buyViaWhatsApp;
window.toggleMobileMenu = toggleMobileMenu;