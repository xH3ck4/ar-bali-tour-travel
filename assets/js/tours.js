// Tours page specific functionality

document.addEventListener('DOMContentLoaded', () => {
    // Only run tours page specific code if elements exist
    const searchInput = document.getElementById('tourSearch');
    const durationFilter = document.getElementById('durationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const groupFilter = document.getElementById('groupFilter');
    const categoryCards = document.querySelectorAll('.category-card');

    // Check if we're on tours page (only run if search/filter elements exist)
    if (searchInput && durationFilter && priceFilter && groupFilter) {
        const tourCards = document.querySelectorAll('.tour-card');

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

            .tour-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }

            .tour-actions .btn {
                flex: 1;
            }

            .details-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                align-items: center;
                justify-content: center;
                padding: 20px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .details-modal.show {
                display: flex !important;
                opacity: 1;
            }

            .details-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }

            .details-content {
                position: relative;
                background: white;
                border-radius: var(--border-radius-lg);
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
                z-index: 10001;
            }

            .details-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 2px solid var(--gray-200);
                position: sticky;
                top: 0;
                background: white;
                z-index: 10;
            }

            .details-header h3 {
                margin: 0;
                color: var(--dark-color);
                font-size: 1.5rem;
            }

            .details-close {
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--gray-600);
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
            }

            .details-close:hover {
                color: var(--primary-color);
                transform: rotate(90deg);
            }

            .details-body {
                padding: 1.5rem;
            }

            .details-section {
                margin-bottom: 2rem;
            }

            .details-section h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.25rem;
                font-weight: 600;
            }

            .itinerary-list {
                background: var(--gray-100);
                padding: 1rem;
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
            }

            .itinerary-item {
                margin: 0.5rem 0;
                color: var(--gray-700);
                padding-left: 1rem;
                position: relative;
            }

            .itinerary-item::before {
                content: '→';
                position: absolute;
                left: 0;
                color: var(--primary-color);
                font-weight: bold;
            }

            .details-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .details-list li {
                padding: 0.75rem 0;
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                color: var(--gray-700);
                border-bottom: 1px solid var(--gray-200);
            }

            .details-list li:last-child {
                border-bottom: none;
            }

            .details-list li i {
                margin-top: 0.25rem;
                flex-shrink: 0;
            }

            .included-list li i {
                color: #28a745;
            }

            .not-included-list li i {
                color: #dc3545;
            }

            .important-notes {
                background: #fff3cd;
                border-left: 4px solid var(--secondary-color);
                padding: 1rem;
                border-radius: var(--border-radius);
                color: var(--gray-800);
                margin: 0;
            }

            @media (max-width: 768px) {
                .tour-actions {
                    flex-direction: column;
                }

                .details-content {
                    max-height: 95vh;
                }

                .details-header {
                    padding: 1rem;
                }

                .details-header h3 {
                    font-size: 1.25rem;
                }

                .details-body {
                    padding: 1rem;
                }
            }
        }
    `;
    document.head.appendChild(style);
    }
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

// Tour details data
const tourDetailsData = {
    'Ubud Cultural Tour': {
        title: 'Ubud Cultural Tour',
        itinerary: [
            '08:00 AM → Hotel pickup from your accommodation',
            '09:00 AM → Visit Tegalalang Rice Terrace for stunning views',
            '10:30 AM → Explore Ubud Monkey Forest Sanctuary',
            '12:00 PM → Traditional Balinese lunch at local restaurant',
            '01:30 PM → Visit local artisan villages (silver, wood carving)',
            '03:00 PM → Watch traditional Balinese dance performance',
            '04:00 PM → Visit Ubud Palace and Ubud Market',
            '05:00 PM → Return to hotel'
        ],
        included: [
            'Professional English-speaking guide',
            'Air-conditioned vehicle with driver',
            'Hotel pickup and drop-off',
            'Entrance fees to all attractions',
            'Traditional dance performance ticket',
            'Lunch at local restaurant'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional food and beverages',
 'Optional activities not mentioned'
        ],
        importantNotes: 'Duration: Approximately 8 hours. Comfortable walking shoes recommended. Please bring camera, sunscreen, and hat. Traditional dress code may apply for temple visits.'
    },
    'Mount Batur Sunrise Trek': {
        title: 'Mount Batur Sunrise Trek',
        itinerary: [
            '02:00 AM → Hotel pickup (time may vary based on location)',
            '03:30 AM → Arrive at Mount Batur base camp',
            '04:00 AM → Begin trekking with professional guide',
            '06:00 AM → Reach summit and enjoy sunrise',
            '06:30 AM → Breakfast at the summit',
            '07:30 AM → Begin descent',
            '09:00 AM → Visit hot springs (optional)',
            '10:30 AM → Return to hotel'
        ],
        included: [
            'Professional mountain guide',
            'Hotel pickup and drop-off',
            'Breakfast at summit',
            'Flashlight/headlamp',
            'Trekking poles (if needed)',
            'Entrance fees'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Hot springs entrance (optional)',
            'Additional food and beverages'
        ],
        importantNotes: 'Requires moderate fitness level. Wear proper hiking shoes and warm layers. Minimum age: 10 years. Duration: Approximately 6-8 hours. Weather dependent - may be rescheduled in case of extreme conditions.'
    },
    'South Bali Beach Tour': {
        title: 'South Bali Beach Tour',
        itinerary: [
            '09:00 AM → Hotel pickup',
            '10:00 AM → Visit Jimbaran Beach',
            '11:30 AM → Explore Nusa Dua Beach area',
            '01:00 PM → Seafood lunch at Jimbaran',
            '02:30 PM → Visit Padang Padang Beach',
            '04:00 PM → Uluwatu Temple and Kecak dance show',
            '06:00 PM → Sunset viewing',
            '07:00 PM → Return to hotel'
        ],
        included: [
            'Professional guide',
            'Air-conditioned vehicle',
            'Hotel pickup and drop-off',
            'Entrance fees',
            'Seafood lunch',
            'Kecak dance performance ticket'
        ],
        notIncluded: [
            'Water sports activities',
            'Personal expenses',
            'Tips and gratuities',
            'Additional food and beverages'
        ],
        importantNotes: 'Duration: Approximately 10 hours. Bring swimwear, towel, sunscreen, and camera. Temple visit requires proper attire (sarong provided).'
    },
    'Tanah Lot Temple Tour': {
        title: 'Tanah Lot Temple Tour',
        itinerary: [
            '03:00 PM → Hotel pickup',
            '04:00 PM → Arrive at Tanah Lot Temple',
            '04:30 PM → Explore temple and surrounding area',
            '05:30 PM → Witness traditional ceremonies',
            '06:30 PM → Sunset viewing',
            '07:30 PM → Return to hotel'
        ],
        included: [
            'Professional guide',
            'Air-conditioned vehicle',
            'Hotel pickup and drop-off',
            'Entrance fees',
            'Sarong rental'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Food and beverages',
            'Additional activities'
        ],
        importantNotes: 'Duration: Approximately 4 hours. Best time to visit is during sunset. Proper attire required for temple visit. High tide may limit access to temple.'
    },
    'Traditional Cooking Class': {
        title: 'Traditional Cooking Class',
        itinerary: [
            '08:00 AM → Hotel pickup',
            '09:00 AM → Visit local market for ingredients',
            '10:00 AM → Arrive at cooking class location',
            '10:30 AM → Introduction and traditional cooking methods',
            '11:00 AM → Hands-on cooking session',
            '01:00 PM → Enjoy your prepared meal',
            '02:00 PM → Receive recipe booklet and certificate',
            '03:00 PM → Return to hotel'
        ],
        included: [
            'Professional cooking instructor',
            'All ingredients and cooking equipment',
            'Market tour',
            'Recipe booklet',
            'Certificate of completion',
            'Lunch with prepared dishes',
            'Hotel pickup and drop-off'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional food and beverages',
            'Transportation beyond included areas'
        ],
        importantNotes: 'Duration: Approximately 5 hours. Suitable for all skill levels. Please inform about dietary restrictions or allergies in advance. Vegetarian options available.'
    },
    'East Bali Cultural Journey - 2 Days': {
        title: 'East Bali Cultural Journey - 2 Days',
        itinerary: [
            'Day 1:',
            '08:00 AM → Hotel pickup',
            '10:00 AM → Visit Tenganan Ancient Village',
            '12:00 PM → Lunch at local restaurant',
            '02:00 PM → Explore Tirta Gangga Water Palace',
            '04:00 PM → Check-in at local homestay',
            '06:00 PM → Traditional dinner',
            '',
            'Day 2:',
            '08:00 AM → Breakfast at homestay',
            '09:00 AM → Visit Virgin Beach',
            '11:00 AM → Explore traditional villages',
            '01:00 PM → Lunch',
            '03:00 PM → Return journey',
            '05:00 PM → Hotel drop-off'
        ],
        included: [
            'Professional guide',
            'Air-conditioned vehicle',
            'Hotel pickup and drop-off',
            '1 night accommodation at local homestay',
            'All meals (breakfast, lunch, dinner)',
            'Entrance fees to all attractions',
            'Cultural activities'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional food and beverages',
            'Optional activities'
        ],
        importantNotes: 'Duration: 2 days, 1 night. Accommodation is basic but comfortable. Bring comfortable walking shoes, camera, and light clothing. Cultural sensitivity required when visiting traditional villages.'
    },
    'Hidden Waterfalls Adventure': {
        title: 'Hidden Waterfalls Adventure',
        itinerary: [
            '08:00 AM → Hotel pickup',
            '09:30 AM → Arrive at first waterfall location',
            '10:00 AM → Jungle trekking to waterfalls',
            '12:00 PM → Picnic lunch at natural pool',
            '01:00 PM → Continue to additional waterfalls',
            '03:00 PM → Swimming and relaxation',
            '04:30 PM → Return journey',
            '06:00 PM → Hotel drop-off'
        ],
        included: [
            'Professional local guide',
            'Air-conditioned vehicle',
            'Hotel pickup and drop-off',
            'Entrance fees',
            'Picnic lunch',
            'Safety equipment'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional food and beverages',
            'Swimming gear (bring your own)'
        ],
        importantNotes: 'Duration: Approximately 8 hours. Requires moderate fitness level. Wear proper hiking shoes and swimwear. Bring towel, change of clothes, and waterproof camera. Some areas may be slippery.'
    },
    'Nusa Dua Beach Experience': {
        title: 'Nusa Dua Beach Experience',
        itinerary: [
            '09:00 AM → Hotel pickup',
            '10:00 AM → Arrive at Nusa Dua Beach',
            '10:30 AM → Beach activities and relaxation',
            '12:30 PM → Lunch at beachside restaurant',
            '02:00 PM → Water sports (optional)',
            '04:00 PM → Explore resort area',
            '05:00 PM → Return to hotel'
        ],
        included: [
            'Professional guide',
            'Air-conditioned vehicle',
            'Hotel pickup and drop-off',
            'Beach access',
            'Lunch',
            'Beach facilities'
        ],
        notIncluded: [
            'Water sports activities',
            'Personal expenses',
            'Tips and gratuities',
            'Additional food and beverages'
        ],
        importantNotes: 'Duration: Approximately 4 hours. Family-friendly activity. Bring swimwear, towel, sunscreen, and camera. Water sports available at additional cost.'
    }
};

// Show tour details modal
function showTourDetails(tourName) {
    const details = tourDetailsData[tourName];
    if (!details) {
        showNotification('Details not found for this tour', 'error');
        return;
    }

    let html = '';

    if (details.itinerary) {
        html += '<div style="margin-bottom: 20px;">';
        html += '<h4 style="color: #FF6B35; margin-bottom: 15px; font-size: 1.1em;">Itinerary</h4>';
        html += '<div style="line-height: 1.6;">';
        details.itinerary.forEach(item => {
            if (item.trim() === '') {
                html += '<br>';
            } else {
                html += `<p style="margin-bottom: 10px; color: #666;">${item}</p>`;
            }
        });
        html += '</div>';
        html += '</div>';
    }

    let includedList = '';
    details.included.forEach(item => {
        includedList += `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 10px;"><i class="fas fa-check-circle" style="color: #28a745; margin-top: 2px;"></i> ${item}</li>`;
    });

    let notIncludedList = '';
    details.notIncluded.forEach(item => {
        notIncludedList += `<li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 10px;"><i class="fas fa-times-circle" style="color: #dc3545; margin-top: 2px;"></i> ${item}</li>`;
    });

    html += `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #FF6B35; margin-bottom: 15px; font-size: 1.1em;">What's Included</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${includedList}
            </ul>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #FF6B35; margin-bottom: 15px; font-size: 1.1em;">Not Included</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${notIncludedList}
            </ul>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #FF6B35; margin-bottom: 15px; font-size: 1.1em;">Important Notes</h4>
            <p style="background: #fff3cd; border-left: 4px solid #FF6B35; padding: 15px; border-radius: 5px; color: #856404; margin: 0; font-size: 0.95em;">
                ${details.importantNotes}
            </p>
        </div>
    `;

    Swal.fire({
        title: details.title,
        html: html,
        width: 800,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            popup: 'tour-details-popup',
            title: 'tour-details-title'
        },
        didOpen: () => {
            const popup = document.querySelector('.tour-details-popup');
            if (popup) {
                popup.style.fontFamily = "'Poppins', sans-serif";
                popup.style.borderRadius = '15px';
            }

            const title = document.querySelector('.tour-details-title');
            if (title) {
                title.style.color = '#FF6B35';
                title.style.fontSize = '1.5em';
                title.style.fontWeight = '600';
            }
        }
    });
}

// Modal functionality replaced with SweetAlert
//     const overlay = document.getElementById('detailsOverlay');
//     const closeBtn = document.getElementById('detailsClose');

//     function closeModal() {
//         modal.classList.remove('show');
//         setTimeout(() => {
//             modal.style.display = 'none';
//             document.body.style.overflow = 'auto';
//         }, 300);
//     }
//
//     if (overlay) {
//         overlay.addEventListener('click', closeModal);
//     }
//
//     if (closeBtn) {
//         closeBtn.addEventListener('click', closeModal);
//     }
//
//     // Close on ESC key
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape' && modal.classList.contains('show')) {
//             closeModal();
//         }
//     });
// });