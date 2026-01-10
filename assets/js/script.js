// Cart functionality
let cart = JSON.parse(localStorage.getItem('arbali_cart')) || [];
let cartCount = document.getElementById('cartCount');
let cartTotal = document.getElementById('cartTotal');

// Format Rupiah function
function formatRupiah(amount) {
    // Remove any existing formatting
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d]/g, '')) : amount;
    // Format with Indonesian locale (dot as thousand separator)
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num).replace('Rp', 'Rp ').replace(/,/g, '.');
}

// Initialize cart display
updateCartDisplay();

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    showNotification(`${name} added to cart!`, 'success');
}

// Add item to cart with rental type (HD/FD)
function addToCartWithType(carName, price, rentalType) {
    const rentalTypeText = rentalType === 'HD' ? 'Half Day (6H)' : 'Full Day (12H)';
    const name = `${carName} - ${rentalTypeText}`;
    
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            quantity: 1,
            rentalType: rentalType,
            carName: carName
        });
    }

    saveCart();
    updateCartDisplay();
    showNotification(`${name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

// Clear all items from cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty!', 'info');
        return;
    }

    if (confirm('Are you sure you want to remove all items from your cart?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        showNotification('Cart cleared successfully!', 'success');
    }
}

// Update cart quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('arbali_cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = formatRupiah(total);
    }

    // Update cart items display
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.querySelector('.cart-footer');
    if (cartItems) {
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            if (cartFooter) {
                cartFooter.style.display = 'none';
            }
            return;
        }

        // Show cart footer if items exist
        if (cartFooter) {
            cartFooter.style.display = 'flex';
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            const priceFormatted = formatRupiah(item.price);
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${priceFormatted} × ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
    }
}

// Cart modal functionality
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const checkoutBtn = document.getElementById('checkoutBtn');

if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    cartOverlay.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    cartClose.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Clear cart functionality
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        clearCart();
    });
}

// Checkout functionality
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }

        // Save cart to localStorage before redirect (most important!)
        try {
            localStorage.setItem('arbali_cart', JSON.stringify(cart));
        } catch (e) {
            console.error('Error saving cart to localStorage:', e);
        }

        // Generate checkout message
        const checkoutMessage = generateCheckoutMessage();

        // Redirect to checkout page with cart data
        const checkoutData = encodeURIComponent(JSON.stringify(cart));
        // Get the correct path to checkout.html based on current location
        const currentUrl = window.location.href;
        const currentPath = window.location.pathname;
        let checkoutPath = 'checkout.html';
        
        // Determine the correct relative path based on current location
        // Check for both forward and backward slashes (Windows vs Unix)
        if (currentUrl.includes('pages/activities/') || currentUrl.includes('pages\\activities\\') || 
            currentPath.includes('pages/activities/') || currentPath.includes('pages\\activities\\')) {
            checkoutPath = '../../checkout.html';
        } else if (currentUrl.includes('pages/tours/') || currentUrl.includes('pages\\tours\\') ||
                   currentPath.includes('pages/tours/') || currentPath.includes('pages\\tours\\')) {
            checkoutPath = '../../checkout.html';
        } else if (currentUrl.includes('pages/') || currentUrl.includes('pages\\') ||
                   currentPath.includes('pages/') || currentPath.includes('pages\\')) {
            checkoutPath = '../checkout.html';
        }
        // For root level files (index.html, car-rental.html), use 'checkout.html'
        
        window.location.href = `${checkoutPath}?cart=${checkoutData}`;
    });
}

// Generate checkout message for WhatsApp/Email (from cart modal)
function generateCheckoutMessage() {
    let message = "🛒 *AR Bali Tour & Travel - Booking Inquiry*\n\n";
    message += "Hello! I'd like to book the following items:\n\n";

    cart.forEach((item, index) => {
        const priceFormatted = formatRupiah(item.price);
        const subtotalFormatted = formatRupiah(item.price * item.quantity);
        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: ${priceFormatted} each\n`;
        message += `   Subtotal: ${subtotalFormatted}\n\n`;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = subtotal * 0.05;
    const finalTotal = subtotal + serviceFee;
    
    const subtotalFormatted = formatRupiah(subtotal);
    const serviceFeeFormatted = formatRupiah(serviceFee);
    const totalFormatted = formatRupiah(finalTotal);
    
    message += "💰 *Price Summary:*\n";
    message += `Subtotal: ${subtotalFormatted}\n`;
    message += `Service Fee (5%): ${serviceFeeFormatted}\n`;
    message += `*Total: ${totalFormatted}*\n\n`;
    message += "Please provide booking details and availability.\n\n";
    message += "📞 Contact Information:\n";
    message += "WhatsApp: 0813-3774-2281\n";
    message += "Email: arbalitourandtravel@gmail.com\n\n";
    message += "Thank you! 🌴✨";

    return message;
}

// Contact form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Generate WhatsApp message
        const whatsappMessage = `Hello AR Bali Tour & Travel!\n\n${data.message}\n\nFrom: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}`;

        // Open WhatsApp with message
        const whatsappUrl = `https://wa.me/6281337742281?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;

        if (email) {
            showNotification('Thank you for subscribing!', 'success');
            newsletterForm.querySelector('input').value = '';
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Notification styling is now handled by CSS classes
    `;

    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add CSS for notifications and mobile menu
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .empty-cart {
        text-align: center;
        color: #6c757d;
        padding: 2rem;
        font-style: italic;
    }

    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .cart-item-controls button {
        width: 30px;
        height: 30px;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: all 0.3s ease;
    }

    .cart-item-controls button:hover {
        background: #f8f9fa;
    }

    @media (min-width: 769px) {
        .nav-menu.active {
            display: flex !important;
            position: static;
            background: none;
            flex-direction: row;
            padding: 0;
            box-shadow: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            // Set initial opacity to 0 for fade-in effect
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // Show image when loaded
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            }, { once: true });
            
            // Handle error case - show image anyway or use fallback
            img.addEventListener('error', () => {
                // Try to show the image anyway (might be a CORS issue)
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 500);
                
                // Log error for debugging
                console.warn('Image failed to load:', img.src);
            }, { once: true });
            
            // Fallback: show image after 2 seconds even if load event doesn't fire
            setTimeout(() => {
                if (img.style.opacity === '0') {
                    img.style.opacity = '1';
                }
            }, 2000);
        }
    });
});