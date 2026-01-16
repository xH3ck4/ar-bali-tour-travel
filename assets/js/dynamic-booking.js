// Dynamic booking page functionality

document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters to determine booking type and ID
    const urlParams = new URLSearchParams(window.location.search);
    const bookingType = urlParams.get('type'); // 'tour', 'activity', 'rental'
    const bookingId = urlParams.get('id');

    if (!bookingType || !bookingId) {
        showError('Invalid booking parameters');
        return;
    }

    // Load booking data based on type and ID
    loadBookingData(bookingType, bookingId);

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .booking-page-section {
            padding: 2rem 0 5rem;
            background: var(--gray-100);
        }

        .booking-container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .booking-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .booking-header h1 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        .booking-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }

        .service-details {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
        }

        .service-image {
            width: 100%;
            height: 200px;
            border-radius: var(--border-radius);
            overflow: hidden;
            margin-bottom: 1.5rem;
        }

        .service-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .service-info h2 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        .service-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray-600);
        }

        .service-description {
            color: var(--gray-700);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .service-price {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .service-features {
            list-style: none;
            padding: 0;
        }

        .service-features li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.5rem;
            color: var(--gray-700);
        }

        .service-features li::before {
            content: '✓';
            color: var(--primary-color);
            font-weight: bold;
        }

        .booking-form-container {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
        }

        .booking-form-container h2 {
            color: var(--dark-color);
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--gray-200);
        }

        .dynamic-booking-form .form-section {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--gray-200);
        }

        .dynamic-booking-form .form-section:last-child {
            border-bottom: none;
        }

        .dynamic-booking-form .form-row {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .dynamic-booking-form .form-group {
            flex: 1;
        }

        .dynamic-booking-form .form-group.full-width {
            flex: 1 1 100%;
        }

        .dynamic-booking-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--dark-color);
        }

        .dynamic-booking-form input,
        .dynamic-booking-form select,
        .dynamic-booking-form textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--gray-300);
            border-radius: var(--border-radius);
            font-family: inherit;
            font-size: 1rem;
            transition: var(--transition);
        }

        .dynamic-booking-form input:focus,
        .dynamic-booking-form select:focus,
        .dynamic-booking-form textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .error-message {
            text-align: center;
            padding: 3rem;
            color: var(--gray-600);
        }

        .error-message h2 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
            .booking-content {
                grid-template-columns: 1fr;
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
            }

            .service-meta {
                grid-template-columns: 1fr;
            }

            .booking-page-section {
                padding: 1rem 0 3rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Mock data for different services (in a real application, this would come from a database)
const mockData = {
    tours: {
        1: {
            title: 'Ubud Cultural Tour',
            image: '../../assets/images/tour-ubud.jpg',
            price: 85,
            duration: '8 Hours',
            groupSize: 'Max 8',
            description: 'Explore the artistic heart of Bali with traditional dance performances, monkey forest visits, and sacred temples.',
            features: [
                'Traditional Dance Performance',
                'Monkey Forest Sanctuary',
                'Rice Terrace Views',
                'Local Artisan Villages'
            ]
        },
        2: {
            title: 'Mount Batur Sunrise Trek',
            image: '../../assets/images/tour-batur-trek.jpg',
            price: 65,
            duration: '6 Hours',
            groupSize: 'Max 6',
            description: 'Witness breathtaking sunrise views while trekking Bali\'s most active volcano with experienced local guides.',
            features: [
                'Professional Mountain Guide',
                'Sunrise Breakfast',
                'Hot Spring Visit',
                'Scenic Views'
            ]
        },
        3: {
            title: 'South Bali Beach Tour',
            image: '../../assets/images/tour-beaches.jpg',
            price: 95,
            duration: '10 Hours',
            groupSize: 'Max 8',
            description: 'Visit pristine beaches, luxury resorts, and hidden coves for the perfect tropical beach experience.',
            features: [
                'Jimbaran Beach',
                'Luxury Resort Visit',
                'Seafood Lunch',
                'Water Sports'
            ]
        },
        4: {
            title: 'East Bali Cultural Journey',
            image: '../../assets/images/tour-east-bali.jpg',
            price: 250,
            duration: '2 Days',
            groupSize: 'Private',
            description: 'A 2-day exploration of Bali\'s eastern region, featuring ancient villages, pristine beaches, and cultural experiences.',
            features: [
                'Traditional Villages',
                'Tirta Gangga Water Palace',
                'Virgin Beaches',
                'Local Homestay'
            ]
        }
    },
    activities: {
        17: {
            title: 'Scuba Diving - Nusa Penida',
            image: '../../assets/images/activity-diving.jpg',
            price: 120,
            duration: '6 Hours',
            groupSize: 'Max 4',
            description: 'Explore Bali\'s underwater paradise with crystal-clear waters and abundant marine life. Perfect for both beginners and experienced divers.',
            features: [
                'Professional Instructor',
                'Full Equipment',
                'Marine Life Guarantee',
                'Underwater Photos'
            ]
        }
    },
    rentals: {
        1: {
            title: 'Toyota Camry - Daily Rental',
            image: '../../assets/images/car-sedan.jpg',
            price: 45,
            duration: '24 Hours',
            groupSize: 'Max 4',
            description: 'Comfortable sedan perfect for city driving and airport transfers with professional driver included.',
            features: [
                'Air Conditioning',
                'Professional Driver',
                'GPS Navigation',
                '24/7 Support'
            ]
        }
    }
};

function loadBookingData(type, id) {
    const data = mockData[type]?.[id];

    if (!data) {
        showError('Service not found');
        return;
    }

    // Update page title
    document.getElementById('bookingTitle').textContent = `Book ${data.title}`;
    document.getElementById('bookingSubtitle').textContent = 'Complete your booking details below';

    // Populate service details
    const serviceDetails = document.getElementById('serviceDetails');
    serviceDetails.innerHTML = `
        <div class="service-image">
            <img src="${data.image}" alt="${data.title}" onerror="this.src='https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'">
        </div>
        <div class="service-info">
            <h2>${data.title}</h2>
            <div class="service-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${data.duration}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>${data.groupSize}</span>
                </div>
            </div>
            <div class="service-price">$${data.price}</div>
            <p class="service-description">${data.description}</p>
            <ul class="service-features">
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `;

    // Generate appropriate booking form based on type
    generateBookingForm(type, data);

    // Add to cart functionality
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(data.title, data.price);
            showNotification(`${data.title} added to cart!`, 'success');
        });
    }
}

function generateBookingForm(type, data) {
    const formContainer = document.getElementById('dynamicBookingForm');

    let formHTML = '';

    if (type === 'tours') {
        formHTML = generateTourBookingForm(data);
    } else if (type === 'activities') {
        formHTML = generateActivityBookingForm(data);
    } else if (type === 'rentals') {
        formHTML = generateRentalBookingForm(data);
    }

    formContainer.innerHTML = formHTML;

    // Add form submission handler
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        handleBookingSubmission(type, data);
    });
}

function generateTourBookingForm(data) {
    return `
        <div class="form-section">
            <h3><i class="fas fa-calendar-alt"></i> Booking Details</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="tourDate">Preferred Date *</label>
                    <input type="date" id="tourDate" name="tourDate" required>
                </div>
                <div class="form-group">
                    <label for="participants">Number of Participants *</label>
                    <select id="participants" name="participants" required>
                        <option value="">Select participants</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5+ People (Contact for pricing)</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="pickupLocation">Pickup Location</label>
                    <select id="pickupLocation" name="pickupLocation">
                        <option value="">Select pickup location</option>
                        <option value="hotel">Hotel/Resort</option>
                        <option value="central">Central Location</option>
                        <option value="custom">Custom Location</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dietary">Dietary Requirements</label>
                    <input type="text" id="dietary" name="dietary" placeholder="Vegetarian, allergies, etc.">
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3><i class="fas fa-user"></i> Personal Information</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3><i class="fas fa-info-circle"></i> Additional Information</h3>
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="specialRequests">Special Requests</label>
                    <textarea id="specialRequests" name="specialRequests" rows="3" placeholder="Any special requirements or preferences..."></textarea>
                </div>
            </div>
        </div>

        <div class="form-actions">
            <button type="button" class="btn btn-outline" id="addToCartBtn">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button type="submit" class="btn btn-primary">
                <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </button>
        </div>
    `;
}

function generateActivityBookingForm(data) {
    return `
        <div class="form-section">
            <h3><i class="fas fa-calendar-alt"></i> Activity Details</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="activityDate">Preferred Date *</label>
                    <input type="date" id="activityDate" name="activityDate" required>
                </div>
                <div class="form-group">
                    <label for="participants">Number of Participants *</label>
                    <select id="participants" name="participants" required>
                        <option value="">Select participants</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="experienceLevel">Experience Level *</label>
                    <select id="experienceLevel" name="experienceLevel" required>
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner (First time)</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="meetingPoint">Meeting Point</label>
                    <select id="meetingPoint" name="meetingPoint">
                        <option value="">Select meeting point</option>
                        <option value="location">At Activity Location</option>
                        <option value="hotel">Hotel Pickup</option>
                        <option value="central">Central Point</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3><i class="fas fa-user"></i> Personal Information</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3><i class="fas fa-info-circle"></i> Additional Information</h3>
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="specialRequirements">Special Requirements</label>
                    <textarea id="specialRequirements" name="specialRequirements" rows="3" placeholder="Medical conditions, allergies, or special accommodations..."></textarea>
                </div>
            </div>
        </div>

        <div class="form-actions">
            <button type="button" class="btn btn-outline" id="addToCartBtn">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button type="submit" class="btn btn-primary">
                <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </button>
        </div>
    `;
}

function generateRentalBookingForm(data) {
    return `
        <div class="form-section">
            <h3><i class="fas fa-car"></i> Rental Details</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="pickupDate">Pickup Date & Time *</label>
                    <input type="datetime-local" id="pickupDate" name="pickupDate" required>
                </div>
                <div class="form-group">
                    <label for="returnDate">Return Date & Time *</label>
                    <input type="datetime-local" id="returnDate" name="returnDate" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="pickupLocation">Pickup Location *</label>
                    <select id="pickupLocation" name="pickupLocation" required>
                        <option value="">Select pickup location</option>
                        <option value="airport">Airport</option>
                        <option value="hotel">Hotel</option>
                        <option value="office">Our Office</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="serviceType">Service Type *</label>
                    <select id="serviceType" name="serviceType" required>
                        <option value="">Select service type</option>
                        <option value="with-driver">With Driver</option>
                        <option value="self-drive">Self-Drive</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3><i class="fas fa-user"></i> Personal Information</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3><i class="fas fa-info-circle"></i> Additional Information</h3>
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="specialRequests">Special Requests</label>
                    <textarea id="specialRequests" name="specialRequests" rows="3" placeholder="Any special requirements or preferences..."></textarea>
                </div>
            </div>
        </div>

        <div class="form-actions">
            <button type="button" class="btn btn-outline" id="addToCartBtn">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button type="submit" class="btn btn-primary">
                <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </button>
        </div>
    `;
}

function handleBookingSubmission(type, data) {
    const formData = new FormData(document.getElementById('dynamicBookingForm'));
    const bookingDetails = Object.fromEntries(formData);

    // Generate WhatsApp message based on type
    let whatsappMessage = '';

    if (type === 'tours') {
        whatsappMessage = generateTourBookingMessage(data, bookingDetails);
    } else if (type === 'activities') {
        whatsappMessage = generateActivityBookingMessage(data, bookingDetails);
    } else if (type === 'rentals') {
        whatsappMessage = generateRentalBookingMessage(data, bookingDetails);
    }

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/6281337742281?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    showNotification('Booking request sent successfully!', 'success');
}

function generateTourBookingMessage(data, details) {
    let message = `🛤️ *AR Bali Tour & Travel - Tour Booking*\n\n`;
    message += `🏝️ Tour: ${data.title}\n`;
    message += `📅 Date: ${new Date(details.tourDate).toLocaleDateString()}\n`;
    message += `👥 Participants: ${details.participants}\n`;
    message += `📍 Pickup: ${details.pickupLocation}\n`;
    if (details.dietary) message += `🍽️ Dietary: ${details.dietary}\n`;
    message += `\n👤 Customer: ${details.firstName} ${details.lastName}\n`;
    message += `📧 Email: ${details.email}\n`;
    message += `📱 Phone: ${details.phone}\n`;
    if (details.specialRequests) message += `\n📝 Requests: ${details.specialRequests}\n`;
    message += `\n💰 Price: $${data.price} per person\n`;
    message += `\n🌴 Thank you for choosing AR Bali Tour & Travel!`;

    return message;
}

function generateActivityBookingMessage(data, details) {
    let message = `🏄‍♂️ *AR Bali Tour & Travel - Activity Booking*\n\n`;
    message += `🏃‍♂️ Activity: ${data.title}\n`;
    message += `📅 Date: ${new Date(details.activityDate).toLocaleDateString()}\n`;
    message += `👥 Participants: ${details.participants}\n`;
    message += `🎓 Experience: ${details.experienceLevel}\n`;
    message += `📍 Meeting Point: ${details.meetingPoint}\n`;
    message += `\n👤 Customer: ${details.firstName} ${details.lastName}\n`;
    message += `📧 Email: ${details.email}\n`;
    message += `📱 Phone: ${details.phone}\n`;
    if (details.specialRequirements) message += `\n⚕️ Requirements: ${details.specialRequirements}\n`;
    message += `\n💰 Price: $${data.price} per person\n`;
    message += `\n🌴 Thank you for choosing AR Bali Tour & Travel!`;

    return message;
}

function generateRentalBookingMessage(data, details) {
    let message = `🚗 *AR Bali Tour & Travel - Car Rental Booking*\n\n`;
    message += `🚙 Vehicle: ${data.title}\n`;
    message += `📅 Pickup: ${new Date(details.pickupDate).toLocaleString()}\n`;
    message += `📅 Return: ${new Date(details.returnDate).toLocaleString()}\n`;
    message += `📍 Location: ${details.pickupLocation}\n`;
    message += `🚗 Service: ${details.serviceType}\n`;
    message += `\n👤 Customer: ${details.firstName} ${details.lastName}\n`;
    message += `📧 Email: ${details.email}\n`;
    message += `📱 Phone: ${details.phone}\n`;
    if (details.specialRequests) message += `\n📝 Requests: ${details.specialRequests}\n`;
    message += `\n💰 Price: $${data.price} per day\n`;
    message += `\n🌴 Thank you for choosing AR Bali Tour & Travel!`;

    return message;
}

function showError(message) {
    const container = document.querySelector('.booking-container');
    container.innerHTML = `
        <div class="error-message">
            <h2>Booking Not Found</h2>
            <p>${message}</p>
            <a href="../../index.html" class="btn btn-primary">Return to Home</a>
        </div>
    `;
}