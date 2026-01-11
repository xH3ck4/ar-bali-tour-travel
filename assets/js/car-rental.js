// Car rental page specific functionality

// Car filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    // Check if we're on car rental page (only run if search/filter elements exist)
    const searchInput = document.getElementById('carSearch');
    const durationFilter = document.getElementById('durationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const seatsFilter = document.getElementById('seatsFilter');

    if (searchInput && durationFilter && priceFilter && seatsFilter) {
        // Search functionality
        searchInput.addEventListener('input', () => {
            filterCars({ search: searchInput.value.toLowerCase() });
        });

        // Filter dropdowns
        durationFilter.addEventListener('change', () => {
            filterCars({ duration: durationFilter.value });
        });

        priceFilter.addEventListener('change', () => {
            filterCars({ price: priceFilter.value });
        });

        seatsFilter.addEventListener('change', () => {
            filterCars({ seats: seatsFilter.value });
        });

        // Combined filtering function
        function filterCars(filters = {}) {
            const carCards = document.querySelectorAll('.car-card');

            carCards.forEach(card => {
                let show = true;

                // Search filter
                if (filters.search) {
                    const titleElement = card.querySelector('h3');
                    const descriptionElement = card.querySelector('p');
                    const specsElements = card.querySelectorAll('.car-specs span');

                    const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                    const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';
                    const specs = Array.from(specsElements).map(span => span.textContent.toLowerCase());

                    const searchMatch = title.includes(filters.search) ||
                                      description.includes(filters.search) ||
                                      specs.some(spec => spec.includes(filters.search));

                    if (!searchMatch) show = false;
                }

                // Category filter (existing filter buttons)
                if (filters.category && card.getAttribute('data-category') !== filters.category) {
                    show = false;
                }

                // Duration filter
                if (filters.duration) {
                    const durationElement = card.querySelector('.price-option[data-type="' + filters.duration + '"] .duration');
                    if (durationElement) {
                        const durationText = durationElement.textContent;
                        if (!durationText.includes(filters.duration === 'half-day' ? 'Half Day' : 'Full Day')) {
                            show = false;
                        }
                    }
                }

                // Price filter
                if (filters.price) {
                    const priceElement = card.querySelector('.price-option[data-type="FD"] .price');
                    if (priceElement) {
                        const priceText = priceElement.textContent;
                        const price = parseInt(priceText.replace(/[^\d]/g, ''));
                        switch (filters.price) {
                            case 'budget':
                                if (price >= 1000000) show = false;
                                break;
                            case 'mid':
                                if (price < 1000000 || price >= 2500000) show = false;
                                break;
                            case 'premium':
                                if (price < 2500000) show = false;
                                break;
                        }
                    }
                }

                // Seats filter
                if (filters.seats) {
                    const specsElement = card.querySelector('.car-specs');
                    if (specsElement) {
                        const specsText = specsElement.textContent;
                        const seatsMatch = specsText.includes(filters.seats.replace('-seats', ' Seats'));
                        if (!seatsMatch) show = false;
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
    }

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
});

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

        .car-filters {
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

        /* Car actions styling moved to style.css */

        /* Book button styling moved to style.css */

        /* Modal CSS replaced with SweetAlert implementation */

        @media (max-width: 768px) {
            /* Mobile car actions styling moved to style.css */

            /* Mobile modal styling replaced with SweetAlert responsive */
        }

        @media (max-width: 480px) {
            .car-actions {
                flex-direction: row !important;
                gap: 1.5rem !important;
            }

            /* Small mobile car actions styling moved to style.css */

            .car-actions .btn i {
                font-size: 0.8rem;
            }
        }
    }
    `;
    document.head.appendChild(style);

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

// Car details data
const carDetailsData = {
    'Avanza/Xenia/APV/Mobilio/Ertiga/Sigra': {
        title: 'Avanza / Xenia / APV / Mobilio / Ertiga / Sigra',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Toyota Grand Innova': {
        title: 'Toyota Grand Innova',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Toyota Avanza - Nusa Penida Island': {
        title: 'Toyota Avanza - Nusa Penida Island',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for Nusa Penida Island area only (8 Hours)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'This package is specifically for Nusa Penida Island tour only. Duration is 8 hours maximum. For mainland Bali, please select other car options.'
    },
    'Toyota Avanza/Xenia/SPV - Nusa Penida Island': {
        title: 'Toyota Avanza/Xenia/SPV - Nusa Penida Island',
        included: [
            'Car (Avanza, Xenia, or SPV model)',
            'Professional driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for Nusa Penida Island area only (8 Hours)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'This package is specifically for Nusa Penida Island tour only. Duration is 8 hours maximum. Vehicle model (Avanza/Xenia/SPV) will be assigned based on availability. For mainland Bali, please select other car options.'
    },
    'Toyota Innova Reborn': {
        title: 'Toyota Innova Reborn',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Toyota Hiace': {
        title: 'Toyota Hiace',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Toyota Hiace Premio': {
        title: 'Toyota Hiace Premio',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Elf Giga Long': {
        title: 'Elf Giga Long',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Premio Luxury': {
        title: 'Premio Luxury',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)',
            'Premium comfort features',
            'Luxury amenities'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    },
    'Bus 22, 28, 33, 35, 48, 54 Seats': {
        title: 'Bus 22, 28, 33, 35, 48, 54 Seats',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email. Bus size will be determined based on group size.'
    },
    'Toyota Alphard 2024/2025': {
        title: 'Toyota Alphard 2024/2025',
        included: [
            'Car',
            'Driver',
            'Fuel',
            'Parking fees',
            'Toll fees',
            'Driver personal expenses',
            'Driver as a guide (Travel Guide)',
            'Service for South Bali area (Max Ubud)',
            'Free Tailor Made Itinerary (Please Chat Admin on WhatsApp or Email)',
            'Premium luxury features',
            'VIP amenities'
        ],
        notIncluded: [
            'Any food',
            'Any tickets',
            'Personal expenses',
            'Overtime Price 10% from Fullday Rate Per Hour',
            'Driver accomodation if required to stay overnight',
            'Tip',
            'Anything not mentioned'
        ],
        importantNotes: 'Another area will be charged for extra fuel cost depend on the area, from 50k-200K, For Custom Area Please Chat Us on WhatsApp or Email'
    }
};

// Show car details modal using SweetAlert
function showCarDetails(carName) {
    const details = carDetailsData[carName];
    if (!details) {
        console.error('Details not found for:', carName);
        if (typeof showNotification !== 'undefined') {
            showNotification('Details not found for this car', 'error');
        } else {
            alert('Details not found for this car');
        }
        return;
    }

    let includedList = '';
    details.included.forEach(item => {
        includedList += `<li><i class="fas fa-check-circle"></i> ${item}</li>`;
    });

    let notIncludedList = '';
    details.notIncluded.forEach(item => {
        notIncludedList += `<li><i class="fas fa-times-circle"></i> ${item}</li>`;
    });

    const html = `
        <div style="text-align: left; max-height: 60vh; overflow-y: auto;">
            <div class="modal-section">
                <h4>What's Included</h4>
                <ul class="modal-list">
                    ${includedList}
                </ul>
            </div>

            <div class="modal-section">
                <h4>Not Included</h4>
                <ul class="modal-list">
                    ${notIncludedList}
                </ul>
            </div>

            <div class="modal-section">
                <h4>Important Notes</h4>
                <p class="modal-important-notes">
                    ${details.importantNotes}
                </p>
            </div>
        </div>
    `;

    const modal = document.getElementById('carDetailsModal');
    const title = document.getElementById('carDetailsTitle');
    const content = document.getElementById('carDetailsContent');

    // Check if modal elements exist
    if (!modal || !title || !content) {
        console.warn('Car details modal not found on this page');
        return;
    }

    title.textContent = details.title;
    content.innerHTML = html;
    modal.style.display = 'block';

    // Add event listeners for modal
    const overlay = document.getElementById('carDetailsOverlay');
    const closeBtn = document.getElementById('carDetailsClose');

    const closeModal = () => {
        modal.style.display = 'none';
    };

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Modal functionality replaced with SweetAlert
