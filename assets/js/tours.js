// Tours page specific functionality

document.addEventListener('DOMContentLoaded', () => {
    const tourCards = document.querySelectorAll('.tour-card');
    const searchInput = document.getElementById('tourSearch');
    const durationFilter = document.getElementById('durationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const groupFilter = document.getElementById('groupFilter');
    const categoryCards = document.querySelectorAll('.category-card');

    // Category filtering
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');

            // Remove active class from all categories
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            card.classList.add('active');

            filterTours({ category: category });
        });
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        filterTours({ search: searchInput.value.toLowerCase() });
    });

    // Filter dropdowns
    durationFilter.addEventListener('change', () => {
        filterTours({ duration: durationFilter.value });
    });

    priceFilter.addEventListener('change', () => {
        filterTours({ price: priceFilter.value });
    });

    groupFilter.addEventListener('change', () => {
        filterTours({ group: groupFilter.value });
    });

    // Combined filtering function
    function filterTours(filters = {}) {
        tourCards.forEach(card => {
            let show = true;

            // Search filter
            if (filters.search) {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const features = Array.from(card.querySelectorAll('.tour-features span')).map(span => span.textContent.toLowerCase());

                const searchMatch = title.includes(filters.search) ||
                                  description.includes(filters.search) ||
                                  features.some(feature => feature.includes(filters.search));

                if (!searchMatch) show = false;
            }

            // Category filter
            if (filters.category && card.getAttribute('data-category') !== filters.category) {
                show = false;
            }

            // Duration filter
            if (filters.duration && card.getAttribute('data-duration') !== filters.duration) {
                show = false;
            }

            // Price filter
            if (filters.price) {
                const price = parseInt(card.querySelector('.tour-price').textContent.replace('$', ''));
                switch (filters.price) {
                    case 'budget':
                        if (price >= 50) show = false;
                        break;
                    case 'mid':
                        if (price < 50 || price >= 100) show = false;
                        break;
                    case 'premium':
                        if (price < 100) show = false;
                        break;
                }
            }

            // Group filter
            if (filters.group) {
                const groups = card.getAttribute('data-group').split(',');
                if (!groups.includes(filters.group)) {
                    show = false;
                }
            }

            // Show/hide card with animation
            if (show) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Tour booking form handling
    const tourBookingForm = document.getElementById('tourBookingForm');
    if (tourBookingForm) {
        tourBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(tourBookingForm);
            const bookingDetails = {
                tourSelect: formData.get('tourSelect'),
                tourDate: formData.get('tourDate'),
                participants: formData.get('participants'),
                tourTime: formData.get('tourTime'),
                pickupLocation: formData.get('pickupLocation'),
                dietary: formData.get('dietary'),
                specialRequests: formData.get('specialRequests')
            };

            // Validate date
            const selectedDate = new Date(bookingDetails.tourDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showNotification('Please select a future date', 'error');
                return;
            }

            // Generate WhatsApp message
            const whatsappMessage = generateTourBookingMessage(bookingDetails);

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/6281337742281?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            showNotification('Booking request sent successfully!', 'success');
            tourBookingForm.reset();
        });
    }

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .tour-categories {
            padding: 5rem 0;
            background: var(--gray-100);
        }

        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .category-card {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            text-align: center;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }

        .category-card:hover,
        .category-card.active {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
            border: 2px solid var(--primary-color);
        }

        .category-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: white;
        }

        .tour-filters {
            padding: 2rem 0;
            background: white;
            border-bottom: 1px solid var(--gray-200);
        }

        .filters-container {
            display: flex;
            gap: 2rem;
            align-items: center;
            flex-wrap: wrap;
        }

        .search-box {
            display: flex;
            flex: 1;
            min-width: 250px;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--gray-300);
            border-radius: var(--border-radius);
            font-family: inherit;
            font-size: 1rem;
            transition: var(--transition);
        }

        .search-box input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .search-btn {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: var(--border-radius);
            cursor: pointer;
        }

        .filter-options {
            display: flex;
            gap: 1rem;
        }

        .filter-options select {
            padding: 12px 16px;
            border: 2px solid var(--gray-300);
            border-radius: var(--border-radius);
            font-family: inherit;
            font-size: 1rem;
            background: white;
            cursor: pointer;
            transition: var(--transition);
        }

        .filter-options select:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .tours-section {
            padding: 3rem 0;
        }

        .tours-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .tour-card {
            background: white;
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .tour-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .tour-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }

        .tour-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .tour-card:hover .tour-image img {
            transform: scale(1.1);
        }

        .tour-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: var(--primary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: var(--border-radius);
            font-size: 0.8rem;
            font-weight: 500;
        }

        .tour-price {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.9);
            color: var(--primary-color);
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            font-size: 1.25rem;
            font-weight: 600;
        }

        .tour-content {
            padding: 1.5rem;
        }

        .tour-meta {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .tour-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .tour-features span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .tour-features span::before {
            content: '✓';
            color: var(--primary-color);
            font-weight: bold;
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

        .page-hero {
            height: 50vh;
            min-height: 400px;
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                        url('https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1920') center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
            padding-top: 80px;
            margin-top: 0;
        }

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

        @media (max-width: 768px) {
            .page-hero {
                padding-top: 70px;
                min-height: 300px;
                height: 40vh;
            }

            .filters-container {
                flex-direction: column;
                align-items: stretch;
            }

            .search-box {
                min-width: auto;
            }

            .filter-options {
                justify-content: center;
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
            }

            .tours-grid {
                grid-template-columns: 1fr;
            }

            .categories-grid {
                grid-template-columns: 1fr;
            }

            .tour-features {
                grid-template-columns: 1fr;
            }

            .tour-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .booking-form-container {
                padding: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
});

function generateTourBookingMessage(bookingDetails) {
    const tourNames = {
        'ubud-cultural': 'Ubud Cultural Tour',
        'batur-sunrise': 'Mount Batur Sunrise Trek',
        'south-beach': 'South Bali Beach Tour',
        'tanah-lot': 'Tanah Lot Temple Tour',
        'cooking-class': 'Traditional Cooking Class',
        'east-bali': 'East Bali Cultural Journey',
        'waterfalls': 'Hidden Waterfalls Adventure',
        'nusa-dua': 'Nusa Dua Beach Experience'
    };

    const timeSlots = {
        'early-morning': 'Early Morning (6:00 AM)',
        'morning': 'Morning (9:00 AM)',
        'afternoon': 'Afternoon (1:00 PM)',
        'custom': 'Custom Time'
    };

    const pickupLocations = {
        'hotel': 'Hotel/Resort',
        'airport': 'Airport',
        'central-location': 'Central Location',
        'custom': 'Custom Location'
    };

    let message = "🎯 *AR Bali Tour & Travel - Tour Booking*\n\n";
    message += "Hello! I'd like to book the following tour:\n\n";
    message += `🏝️ Tour: ${tourNames[bookingDetails.tourSelect]}\n`;
    message += `📅 Date: ${new Date(bookingDetails.tourDate).toLocaleDateString()}\n`;
    message += `👥 Participants: ${bookingDetails.participants}\n`;
    message += `⏰ Preferred Time: ${timeSlots[bookingDetails.tourTime]}\n`;
    message += `📍 Pickup Location: ${pickupLocations[bookingDetails.pickupLocation]}\n`;

    if (bookingDetails.dietary) {
        message += `🍽️ Dietary Requirements: ${bookingDetails.dietary}\n`;
    }

    if (bookingDetails.specialRequests) {
        message += `\n📝 Special Requests: ${bookingDetails.specialRequests}\n`;
    }

    message += "\nPlease provide availability and confirm the booking details.\n";
    message += "Contact: [Your Name]\n";
    message += "Phone: [Your Phone]\n";
    message += "Email: [Your Email]\n\n";
    message += "Thank you! 🌴✨";

    return message;
}