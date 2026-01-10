// Car rental page specific functionality

// Car filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            carCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Car booking form handling
    const bookingForm = document.getElementById('carBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const bookingDetails = {
                pickupDate: formData.get('pickupDate'),
                returnDate: formData.get('returnDate'),
                pickupLocation: formData.get('pickupLocation'),
                returnLocation: formData.get('returnLocation'),
                passengers: formData.get('passengers'),
                serviceType: formData.get('serviceType'),
                specialRequests: formData.get('specialRequests')
            };

            // Validate dates
            const pickupDate = new Date(bookingDetails.pickupDate);
            const returnDate = new Date(bookingDetails.returnDate);
            const now = new Date();

            if (pickupDate < now) {
                showNotification('Pickup date cannot be in the past', 'error');
                return;
            }

            if (returnDate <= pickupDate) {
                showNotification('Return date must be after pickup date', 'error');
                return;
            }

            // Calculate duration
            const durationMs = returnDate - pickupDate;
            const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));

            // Generate WhatsApp message
            const whatsappMessage = generateCarBookingMessage(bookingDetails, durationDays);

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/6281337742281?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            showNotification('Booking request sent successfully!', 'success');
            bookingForm.reset();
        });
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            padding: 10px 20px;
            border: 2px solid var(--primary-color);
            background: white;
            color: var(--primary-color);
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }

        .filter-btn.active,
        .filter-btn:hover {
            background: var(--primary-color);
            color: white;
        }

        .cars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .car-card {
            background: white;
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .car-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .car-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }

        .car-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .car-card:hover .car-image img {
            transform: scale(1.1);
        }

        .car-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--primary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: var(--border-radius);
            font-size: 0.8rem;
            font-weight: 500;
        }

        .car-content {
            padding: 1.5rem;
        }

        .car-content h3 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        .car-specs {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .car-specs span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray-600);
            font-size: 0.9rem;
        }

        .car-pricing {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
        }

        .price-option {
            text-align: center;
        }

        .price-option .duration {
            display: block;
            color: var(--gray-600);
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }

        .price-option .price {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--primary-color);
        }

        .booking-form-container {
            background: white;
            padding: 3rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
        }

        .booking-form .form-row {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
        }

        .booking-form .form-group {
            flex: 1;
        }

        .booking-form .form-group.full-width {
            flex: 1 1 100%;
        }

        .booking-form label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--dark-color);
        }

        .booking-form input,
        .booking-form select,
        .booking-form textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--gray-300);
            border-radius: var(--border-radius);
            font-family: inherit;
            font-size: 1rem;
            transition: var(--transition);
        }

        .booking-form input:focus,
        .booking-form select:focus,
        .booking-form textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .btn-large {
            width: 100%;
            padding: 16px;
            font-size: 1.1rem;
            font-weight: 600;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-item {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
        }

        .feature-item .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
        }

        .feature-item h4 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        .page-hero {
            height: 50vh;
            min-height: 400px;
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                        url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920') center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
            padding-top: 80px;
            margin-top: 0;
        }

        .services-section {
            padding: 5rem 0;
            background: var(--gray-100);
        }

        .booking-section {
            padding: 5rem 0;
            background: white;
        }

        @media (max-width: 768px) {
            .page-hero {
                padding-top: 70px;
                min-height: 300px;
                height: 40vh;
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
            }

            .car-pricing {
                flex-direction: column;
                gap: 1rem;
            }

            .filter-buttons {
                gap: 0.5rem;
            }

            .filter-btn {
                padding: 8px 16px;
                font-size: 0.9rem;
            }

            .cars-grid {
                grid-template-columns: 1fr;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }

            .booking-form-container {
                padding: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
});

function generateCarBookingMessage(bookingDetails, duration) {
    const locations = {
        'ngurah-rai-airport': 'Ngurah Rai International Airport',
        'denpasar': 'Denpasar City',
        'sanur': 'Sanur',
        'kuta': 'Kuta',
        'seminyak': 'Seminyak',
        'ubud': 'Ubud'
    };

    const serviceTypes = {
        'self-drive': 'Self-Drive Rental',
        'with-driver': 'With Driver/Chauffeur',
        'airport-transfer': 'Airport Transfer'
    };

    let message = "🚗 *AR Bali Tour & Travel - Car Rental Booking*\n\n";
    message += "Hello! I'd like to book a car rental:\n\n";
    message += `📅 Pickup Date & Time: ${new Date(bookingDetails.pickupDate).toLocaleString()}\n`;
    message += `📅 Return Date & Time: ${new Date(bookingDetails.returnDate).toLocaleString()}\n`;
    message += `📍 Pickup Location: ${locations[bookingDetails.pickupLocation]}\n`;
    message += `📍 Return Location: ${locations[bookingDetails.returnLocation]}\n`;
    message += `👥 Passengers: ${bookingDetails.passengers}\n`;
    message += `🚙 Service Type: ${serviceTypes[bookingDetails.serviceType]}\n`;
    message += `⏱️ Duration: ${duration} day${duration > 1 ? 's' : ''}\n`;

    if (bookingDetails.specialRequests) {
        message += `\n📝 Special Requests: ${bookingDetails.specialRequests}\n`;
    }

    message += "\nPlease provide availability and pricing details.\n";
    message += "Contact: [Your Name]\n";
    message += "Phone: [Your Phone]\n";
    message += "Email: [Your Email]\n\n";
    message += "Thank you! 🌴✨";

    return message;
}