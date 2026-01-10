// Checkout page specific functionality
// Cart variable is declared in script.js, so we don't redeclare it here
// We just ensure it exists and use it from the global scope

// Format Rupiah function (same as in script.js)
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

// Helper function to get cart (from script.js or initialize if needed)
function getCart() {
    // First priority: localStorage (most reliable)
    try {
        const savedCart = localStorage.getItem('arbali_cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                return parsedCart;
            }
        }
    } catch (e) {
        console.error('Error reading cart from localStorage:', e);
    }
    
    // Second priority: cart from script.js if available
    if (typeof cart !== 'undefined' && Array.isArray(cart) && cart.length > 0) {
        return cart;
    }
    
    // Third priority: window.cart
    if (typeof window.cart !== 'undefined' && Array.isArray(window.cart) && window.cart.length > 0) {
        return window.cart;
    }
    
    // Fallback: empty array
    return [];
}

function saveCart() {
    const currentCart = getCart();
    localStorage.setItem('arbali_cart', JSON.stringify(currentCart));
    // Also update the cart variable if it exists
    if (typeof cart !== 'undefined') {
        cart.length = 0;
        cart.push(...currentCart);
    }
}

function updateCartDisplay() {
    const currentCart = getCart();
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Wait for both DOM and scripts to be ready
function initializeCheckoutPage() {
    // Load cart data - prioritize localStorage, then URL parameter, then script.js cart
    let currentCart = [];
    
    // First, try to get from localStorage (most reliable)
    try {
        const savedCart = localStorage.getItem('arbali_cart');
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            if (Array.isArray(parsed) && parsed.length > 0) {
                currentCart = parsed;
                console.log('Cart loaded from localStorage:', currentCart.length, 'items');
            }
        }
    } catch (e) {
        console.error('Error loading cart from localStorage:', e);
    }
    
    // If localStorage is empty, try URL parameter
    if (!currentCart || currentCart.length === 0) {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const cartParam = urlParams.get('cart');
            if (cartParam) {
                const parsed = JSON.parse(decodeURIComponent(cartParam));
                if (Array.isArray(parsed) && parsed.length > 0) {
                    currentCart = parsed;
                    // Save to localStorage for future use
                    localStorage.setItem('arbali_cart', JSON.stringify(currentCart));
                    console.log('Cart loaded from URL parameter:', currentCart.length, 'items');
                }
            }
        } catch (error) {
            console.error('Error loading cart from URL:', error);
        }
    }
    
    // If still empty, try to get from script.js cart variable (wait a bit for script.js to load)
    if ((!currentCart || currentCart.length === 0)) {
        // Wait a bit for script.js to initialize
        setTimeout(() => {
            if (typeof cart !== 'undefined' && Array.isArray(cart) && cart.length > 0) {
                currentCart = [...cart];
                localStorage.setItem('arbali_cart', JSON.stringify(currentCart));
                console.log('Cart loaded from script.js variable:', currentCart.length, 'items');
            } else if (typeof window.cart !== 'undefined' && Array.isArray(window.cart) && window.cart.length > 0) {
                currentCart = [...window.cart];
                localStorage.setItem('arbali_cart', JSON.stringify(currentCart));
                console.log('Cart loaded from window.cart:', currentCart.length, 'items');
            }
            
            // Final attempt with getCart()
            if ((!currentCart || currentCart.length === 0)) {
                const cartFromFunction = getCart();
                if (Array.isArray(cartFromFunction) && cartFromFunction.length > 0) {
                    currentCart = cartFromFunction;
                    console.log('Cart loaded from getCart() function:', currentCart.length, 'items');
                }
            }
            
            // Sync cart to all variables
            if (currentCart && currentCart.length > 0) {
                syncCartToAllSources(currentCart);
            }
            
            // Initialize checkout display
            initializeCheckout();
        }, 100);
    } else {
        // Sync cart to all variables
        syncCartToAllSources(currentCart);
        // Initialize checkout display immediately
        setTimeout(() => {
            initializeCheckout();
        }, 100);
    }
}

// Helper function to sync cart to all sources
function syncCartToAllSources(cartData) {
    if (!cartData || !Array.isArray(cartData) || cartData.length === 0) {
        return;
    }
    
    try {
        // Save to localStorage
        localStorage.setItem('arbali_cart', JSON.stringify(cartData));
        
        // Update cart variable if available
        if (typeof cart !== 'undefined') {
            cart.length = 0;
            cart.push(...cartData);
        } else {
            window.cart = cartData;
        }
        
        console.log('Cart synced to all sources:', cartData.length, 'items');
    } catch (e) {
        console.error('Error syncing cart:', e);
    }
}

// Function to initialize checkout display
function initializeCheckout() {
    const currentCart = getCart();
    
    // Debug logging
    console.log('Initialize checkout - Cart data:', currentCart);
    console.log('Cart length:', currentCart ? currentCart.length : 0);
    console.log('LocalStorage cart:', localStorage.getItem('arbali_cart'));
    
    // Validate cart data
    if (!currentCart || !Array.isArray(currentCart) || currentCart.length === 0) {
        console.warn('Cart is empty or invalid, showing empty cart message');
        showEmptyCart();
        return;
    }
    
    // Hide empty cart section
    const emptyCartSection = document.getElementById('emptyCartSection');
    if (emptyCartSection) {
        emptyCartSection.style.display = 'none';
    }
    // Show checkout section
    const checkoutSection = document.querySelector('.checkout-section');
    if (checkoutSection) {
        checkoutSection.style.display = 'block';
    }
    
    // Always call displayCartSummary to show order summary
    displayCartSummary();
    updateCartDisplay();
    
    // Check if cart contains car rental items and travel items
    const hasCarRental = currentCart.some(item => 
        item.name.toLowerCase().includes('rental') || 
        item.name.toLowerCase().includes('car') ||
        item.name.toLowerCase().includes('vehicle')
    );
    const hasTravel = currentCart.some(item => 
        !item.name.toLowerCase().includes('rental') && 
        !item.name.toLowerCase().includes('car') &&
        !item.name.toLowerCase().includes('vehicle')
    );
    
    // Adjust form based on cart contents
    adjustFormForCheckout(hasCarRental, hasTravel);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCheckoutPage();
    
    // Wait for DOM to be fully ready before displaying cart summary
    // Use setTimeout to ensure all elements are loaded and script.js is executed
    setTimeout(() => {
        initializeCheckout();
    }, 200);
    
    // Also try on window load as fallback
    window.addEventListener('load', () => {
        setTimeout(() => {
            initializeCheckout();
        }, 300);
    });
    
    // Checkout form handling
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(checkoutForm);
            const cartData = getCart();
            const hasCarRental = cartData.some(item => 
                item.name.toLowerCase().includes('rental') || 
                item.name.toLowerCase().includes('car') ||
                item.name.toLowerCase().includes('vehicle')
            );
            const hasTravel = cartData.some(item => 
                !item.name.toLowerCase().includes('rental') && 
                !item.name.toLowerCase().includes('car') &&
                !item.name.toLowerCase().includes('vehicle')
            );

            const bookingDetails = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                country: formData.get('country'),
                nationality: formData.get('nationality'),
                arrivalDate: formData.get('arrivalDate'),
                departureDate: formData.get('departureDate'),
                hotelName: formData.get('hotelName'),
                hotelLocation: formData.get('hotelLocation'),
                pickupDate: formData.get('pickupDate'),
                returnDate: formData.get('returnDate'),
                pickupLocation: formData.get('pickupLocation'),
                returnLocation: formData.get('returnLocation'),
                passengers: formData.get('passengers'),
                serviceType: formData.get('serviceType'),
                specialRequests: formData.get('specialRequests'),
                emergencyContact: formData.get('emergencyContact'),
                termsAgree: formData.get('termsAgree'),
                newsletterAgree: formData.get('newsletterAgree'),
                isCarRental: hasCarRental,
                hasTravel: hasTravel
            };

            // Validate dates based on booking type
            if (hasCarRental) {
                if (!bookingDetails.pickupDate || !bookingDetails.returnDate) {
                    showNotification('Please fill in pickup and return dates for car rental', 'error');
                    return;
                }
                const pickupDate = new Date(bookingDetails.pickupDate);
                const returnDate = new Date(bookingDetails.returnDate);
                if (returnDate <= pickupDate) {
                    showNotification('Return date must be after pickup date', 'error');
                    return;
                }
                if (!bookingDetails.pickupLocation || !bookingDetails.returnLocation || !bookingDetails.passengers || !bookingDetails.serviceType) {
                    showNotification('Please fill in all required car rental information', 'error');
                    return;
                }
            }
            
            if (hasTravel) {
                if (bookingDetails.arrivalDate && bookingDetails.departureDate) {
                    const arrivalDate = new Date(bookingDetails.arrivalDate);
                    const departureDate = new Date(bookingDetails.departureDate);
                    if (departureDate <= arrivalDate) {
                        showNotification('Departure date must be after arrival date', 'error');
                        return;
                    }
                }
            }

            // Generate WhatsApp message
            const whatsappMessage = generateCheckoutMessage(bookingDetails);

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/6281337742281?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            showNotification('Booking request sent successfully! We will contact you shortly.', 'success');

            // Clear cart after successful booking
            const cartToClear = getCart();
            cartToClear.length = 0;
            if (typeof cart !== 'undefined') {
                cart.length = 0;
            }
            saveCart();
            updateCartDisplay();

            // Redirect to home page after a delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .checkout-section {
            padding: 120px 0 5rem;
            background: var(--gray-100);
            min-height: 100vh;
        }

        .checkout-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .checkout-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .checkout-header h1 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        .checkout-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }

        .order-summary {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
            height: fit-content;
            display: block !important;
            visibility: visible !important;
        }

        .order-summary h2 {
            color: var(--dark-color);
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--gray-200);
        }

        .cart-items-summary {
            margin-bottom: 2rem;
            min-height: 50px;
        }
        
        .cart-items-summary:empty::before {
            content: 'Loading...';
            display: block;
            text-align: center;
            color: var(--gray-500);
            padding: 1rem;
        }

        .cart-item-summary {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid var(--gray-200);
        }

        .cart-item-summary:last-child {
            border-bottom: none;
        }

        .cart-item-info h4 {
            margin-bottom: 0.25rem;
            color: var(--dark-color);
        }

        .cart-item-info p {
            color: var(--gray-600);
            font-size: 0.9rem;
        }

        .cart-item-price {
            font-weight: 600;
            color: var(--primary-color);
        }

        .order-total {
            border-top: 2px solid var(--gray-200);
            padding-top: 1rem;
        }

        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            color: var(--gray-700);
        }

        .total-row.final-total {
            font-size: 1.25rem;
            color: var(--dark-color);
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--gray-200);
        }

        .payment-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-top: 1.5rem;
            padding: 1rem;
            background: var(--gray-50);
            border-radius: var(--border-radius);
            color: var(--gray-600);
            font-size: 0.9rem;
        }

        .payment-info i {
            color: var(--primary-color);
            font-size: 1.2rem;
        }

        .booking-details {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
        }

        .booking-details h2 {
            color: var(--dark-color);
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--gray-200);
        }

        .form-section {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--gray-200);
        }

        .form-section:last-child {
            border-bottom: none;
        }

        .form-section h3 {
            color: var(--dark-color);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .form-section h3 i {
            color: var(--primary-color);
        }

        .checkout-form .form-row {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .checkout-form .form-group {
            flex: 1;
        }

        .checkout-form .form-group.full-width {
            flex: 1 1 100%;
        }

        .checkout-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--dark-color);
        }

        .checkout-form input,
        .checkout-form select,
        .checkout-form textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--gray-300);
            border-radius: var(--border-radius);
            font-family: inherit;
            font-size: 1rem;
            transition: var(--transition);
        }

        .checkout-form input:focus,
        .checkout-form select:focus,
        .checkout-form textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .terms-section {
            background: var(--gray-50);
            padding: 1.5rem;
            border-radius: var(--border-radius);
        }

        .terms-checkbox {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .terms-checkbox:last-child {
            margin-bottom: 0;
        }

        .terms-checkbox input[type="checkbox"] {
            margin-top: 0.25rem;
            width: auto;
        }

        .terms-checkbox label {
            font-size: 0.9rem;
            line-height: 1.4;
            color: var(--gray-700);
        }

        .terms-link {
            color: var(--primary-color);
            text-decoration: none;
        }

        .terms-link:hover {
            text-decoration: underline;
        }

        .booking-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }

        .booking-actions .btn {
            flex: 1;
        }

        .empty-cart-section {
            padding: 5rem 0;
            text-align: center;
        }

        .empty-cart-content {
            max-width: 500px;
            margin: 0 auto;
        }

        .empty-cart-icon {
            width: 100px;
            height: 100px;
            background: var(--gray-100);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            font-size: 3rem;
            color: var(--gray-400);
        }

        .empty-cart-content h2 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        .empty-cart-content p {
            color: var(--gray-600);
            margin-bottom: 2rem;
        }

        .empty-cart-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .checkout-section {
            padding-top: 100px;
        }

        @media (max-width: 768px) {
            .checkout-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .order-summary,
            .booking-details {
                padding: 1.5rem;
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
            }

            .booking-actions {
                flex-direction: column;
            }

            .checkout-section {
                padding: 100px 0 3rem;
            }

            .empty-cart-actions {
                flex-direction: column;
            }

            .empty-cart-actions .btn {
                width: 100%;
            }

            .checkout-header h1 {
                font-size: 1.75rem;
            }

            .checkout-header p {
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
});

function displayCartSummary() {
    const cartItemsSummary = document.getElementById('cartItemsSummary');
    const subtotalElement = document.getElementById('subtotal');
    const serviceFeeElement = document.getElementById('serviceFee');
    const finalTotalElement = document.getElementById('finalTotal');
    const orderSummary = document.querySelector('.order-summary');

    // Ensure order summary is visible
    if (orderSummary) {
        orderSummary.style.display = 'block';
        orderSummary.style.visibility = 'visible';
    }

    if (!cartItemsSummary || !subtotalElement || !serviceFeeElement || !finalTotalElement) {
        console.error('Cart summary elements not found:', {
            cartItemsSummary: !!cartItemsSummary,
            subtotalElement: !!subtotalElement,
            serviceFeeElement: !!serviceFeeElement,
            finalTotalElement: !!finalTotalElement
        });
        // Retry after a short delay if elements not found
        setTimeout(() => {
            displayCartSummary();
        }, 200);
        return;
    }

    // Clear previous content
    cartItemsSummary.innerHTML = '';

    const cartData = getCart();
    if (cartData.length === 0) {
        cartItemsSummary.innerHTML = '<p style="text-align: center; color: var(--gray-600); padding: 2rem;">No items in cart</p>';
        subtotalElement.textContent = 'Rp 0';
        serviceFeeElement.textContent = 'Rp 0';
        finalTotalElement.innerHTML = '<strong>Rp 0</strong>';
        return;
    }

    let subtotal = 0;

    cartData.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item-summary';
        const itemTotalFormatted = formatRupiah(itemTotal);
        const priceFormatted = formatRupiah(item.price);
        
        // Build item info HTML
        let itemInfoHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
        `;
        
        // Add rental type if available
        if (item.rentalType) {
            const rentalTypeText = item.rentalType === 'HD' ? 'Half Day (6H)' : 'Full Day (12H)';
            itemInfoHTML += `<p style="color: var(--accent-color); font-size: 0.85rem; margin-top: 0.25rem;">${rentalTypeText}</p>`;
        }
        
        itemInfoHTML += `
            </div>
            <div class="cart-item-price">
                <div style="font-size: 0.9rem; color: var(--gray-600);">${priceFormatted} × ${item.quantity}</div>
                <div style="font-weight: 600; color: var(--primary-color); margin-top: 0.25rem;">${itemTotalFormatted}</div>
            </div>
        `;
        
        itemElement.innerHTML = itemInfoHTML;
        cartItemsSummary.appendChild(itemElement);
    });

    const serviceFee = subtotal * 0.05; // 5% service fee
    const finalTotal = subtotal + serviceFee;

    const subtotalFormatted = formatRupiah(subtotal);
    const serviceFeeFormatted = formatRupiah(serviceFee);
    const finalTotalFormatted = formatRupiah(finalTotal);

    subtotalElement.textContent = subtotalFormatted;
    serviceFeeElement.textContent = serviceFeeFormatted;
    finalTotalElement.innerHTML = `<strong>${finalTotalFormatted}</strong>`;
    
    // Ensure order summary is visible (already declared at function start)
    if (orderSummary) {
        orderSummary.style.display = 'block';
        orderSummary.style.visibility = 'visible';
    }
}

function showEmptyCart() {
    const checkoutSection = document.querySelector('.checkout-section');
    const emptyCartSection = document.getElementById('emptyCartSection');
    if (checkoutSection) {
        checkoutSection.style.display = 'none';
    }
    if (emptyCartSection) {
        emptyCartSection.style.display = 'block';
    }
}

function adjustFormForCheckout(hasCarRental, hasTravel) {
    const travelSection = document.getElementById('travelInfoSection');
    const carRentalSection = document.getElementById('carRentalSection');
    
    if (!travelSection || !carRentalSection) return;
    
    if (hasCarRental && hasTravel) {
        // Show both sections if cart has both types
        travelSection.style.display = 'block';
        carRentalSection.style.display = 'block';
    } else if (hasCarRental) {
        // Show only car rental section
        travelSection.style.display = 'none';
        carRentalSection.style.display = 'block';
    } else if (hasTravel) {
        // Show only travel section
        travelSection.style.display = 'block';
        carRentalSection.style.display = 'none';
    } else {
        // Default: show travel section
        travelSection.style.display = 'block';
        carRentalSection.style.display = 'none';
    }
}

function generateCheckoutMessage(bookingDetails) {
    let message = "🛒 *AR Bali Tour & Travel - Complete Booking Request*\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

    // Get cart to determine what types of items are in cart
    const cartData = getCart();
    const hasCarRental = cartData.some(item => 
        item.name.toLowerCase().includes('rental') || 
        item.name.toLowerCase().includes('car') ||
        item.name.toLowerCase().includes('vehicle')
    );
    const hasTravel = cartData.some(item => 
        !item.name.toLowerCase().includes('rental') && 
        !item.name.toLowerCase().includes('car') &&
        !item.name.toLowerCase().includes('vehicle')
    );

    // ========== PERSONAL INFORMATION ==========
    message += "👤 *PERSONAL INFORMATION*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `Full Name: ${bookingDetails.firstName || ''} ${bookingDetails.lastName || ''}\n`;
    message += `Email: ${bookingDetails.email || 'Not provided'}\n`;
    message += `Phone: ${bookingDetails.phone || 'Not provided'}\n`;
    message += `Country: ${bookingDetails.country || 'Not provided'}\n`;
    message += `Nationality: ${bookingDetails.nationality || 'Not provided'}\n`;
    message += "\n";

    // ========== TRAVEL INFORMATION ==========
    if (hasTravel) {
        message += "✈️ *TRAVEL INFORMATION*\n";
        message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        message += `Arrival Date: ${bookingDetails.arrivalDate ? new Date(bookingDetails.arrivalDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}\n`;
        message += `Departure Date: ${bookingDetails.departureDate ? new Date(bookingDetails.departureDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}\n`;
        message += "\n";
        
        message += "🏨 *ACCOMMODATION INFORMATION*\n";
        message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        message += `Hotel Name: ${bookingDetails.hotelName || 'Not provided'}\n`;
        message += `Hotel Location: ${bookingDetails.hotelLocation || 'Not provided'}\n`;
        message += "\n";
    }

    // ========== CAR RENTAL INFORMATION ==========
    if (hasCarRental) {
        message += "🚗 *CAR RENTAL INFORMATION*\n";
        message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        message += `Pickup Date: ${bookingDetails.pickupDate ? new Date(bookingDetails.pickupDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}\n`;
        if (bookingDetails.pickupDate) {
            const pickupTime = new Date(bookingDetails.pickupDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            message += `Pickup Time: ${pickupTime}\n`;
        }
        message += `Return Date: ${bookingDetails.returnDate ? new Date(bookingDetails.returnDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}\n`;
        if (bookingDetails.returnDate) {
            const returnTime = new Date(bookingDetails.returnDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            message += `Return Time: ${returnTime}\n`;
        }
        message += `Pickup Location: ${bookingDetails.pickupLocation || 'Not provided'}\n`;
        message += `Return Location: ${bookingDetails.returnLocation || 'Not provided'}\n`;
        message += `Number of Passengers: ${bookingDetails.passengers || 'Not provided'}\n`;
        message += `Service Type: ${bookingDetails.serviceType || 'Not provided'}\n`;
        message += "\n";
    }

    // ========== ORDER SUMMARY / BOOKING ITEMS ==========
    message += "🛍️ *ORDER SUMMARY - BOOKING ITEMS*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    if (cartData.length === 0) {
        message += "No items in cart\n";
    } else {
        cartData.forEach((item, index) => {
            const priceFormatted = formatRupiah(item.price);
            const itemTotal = item.price * item.quantity;
            const subtotalFormatted = formatRupiah(itemTotal);
            
            // Extract car name if it's a car rental (remove rental type suffix)
            let itemDisplayName = item.name;
            if (item.carName) {
                itemDisplayName = item.carName;
            } else if (item.name.includes(' - Half Day') || item.name.includes(' - Full Day')) {
                itemDisplayName = item.name.split(' - ')[0];
            }
            
            message += `\n${index + 1}. *${itemDisplayName}*\n`;
            
            // Add rental type information prominently
            if (item.rentalType) {
                const rentalTypeText = item.rentalType === 'HD' ? 'Half Day (6H)' : 'Full Day (12H)';
                message += `   📅 Rental Duration: *${rentalTypeText}*\n`;
            }
            
            message += `   📦 Quantity: ${item.quantity}\n`;
            message += `   💵 Price per unit: ${priceFormatted}\n`;
            message += `   💰 Subtotal: *${subtotalFormatted}*\n`;
        });
    }
    message += "\n";

    // ========== PAYMENT SUMMARY ==========
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = subtotal * 0.05;
    const finalTotal = subtotal + serviceFee;

    const subtotalFormatted = formatRupiah(subtotal);
    const serviceFeeFormatted = formatRupiah(serviceFee);
    const finalTotalFormatted = formatRupiah(finalTotal);

    message += "💰 *PAYMENT SUMMARY*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `Subtotal (${cartData.length} item${cartData.length > 1 ? 's' : ''}): ${subtotalFormatted}\n`;
    message += `Service Fee (5%): ${serviceFeeFormatted}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL AMOUNT: ${finalTotalFormatted}*\n`;
    message += "\n";
    
    // Add rental type breakdown if there are car rentals
    const carRentalItems = cartData.filter(item => 
        item.name.toLowerCase().includes('rental') || 
        item.name.toLowerCase().includes('car') ||
        item.name.toLowerCase().includes('vehicle') ||
        item.rentalType
    );
    
    if (carRentalItems.length > 0) {
        message += "🚗 *CAR RENTAL BREAKDOWN*\n";
        message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        carRentalItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            const itemTotalFormatted = formatRupiah(itemTotal);
            let itemDisplayName = item.name;
            if (item.carName) {
                itemDisplayName = item.carName;
            } else if (item.name.includes(' - Half Day') || item.name.includes(' - Full Day')) {
                itemDisplayName = item.name.split(' - ')[0];
            }
            
            if (item.rentalType) {
                const rentalTypeText = item.rentalType === 'HD' ? 'Half Day (6H)' : 'Full Day (12H)';
                message += `${index + 1}. ${itemDisplayName}\n`;
                message += `   Type: ${rentalTypeText}\n`;
                message += `   Qty: ${item.quantity} × ${formatRupiah(item.price)} = ${itemTotalFormatted}\n`;
                if (index < carRentalItems.length - 1) {
                    message += "\n";
                }
            }
        });
        message += "\n";
    }

    // ========== ADDITIONAL INFORMATION ==========
    message += "📝 *ADDITIONAL INFORMATION*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `Special Requests: ${bookingDetails.specialRequests && bookingDetails.specialRequests.trim() !== '' ? bookingDetails.specialRequests : 'None'}\n`;
    message += "\n";

    // ========== EMERGENCY CONTACT ==========
    message += "🚨 *EMERGENCY CONTACT*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `Emergency Contact: ${bookingDetails.emergencyContact || 'Not provided'}\n`;
    message += "\n";

    // ========== AGREEMENTS ==========
    message += "✅ *AGREEMENTS*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `Terms & Conditions: ${bookingDetails.termsAgree ? 'Agreed ✓' : 'Not agreed'}\n`;
    message += `Newsletter Subscription: ${bookingDetails.newsletterAgree ? 'Yes ✓' : 'No'}\n`;
    message += "\n";

    // ========== FOOTER ==========
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    message += "🎉 *Thank you for choosing AR Bali Tour & Travel!*\n\n";
    message += "We will contact you within 24 hours to confirm your booking.\n\n";
    message += "📞 *Contact Information:*\n";
    message += "WhatsApp: 0813-3774-2281\n";
    message += "Email: arbalitourandtravel@gmail.com\n\n";
    message += "🌴✨ *AR Bali Tour & Travel* ✨🌴";

    return message;
}