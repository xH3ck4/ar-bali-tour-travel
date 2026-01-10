// Activities page specific functionality

document.addEventListener('DOMContentLoaded', () => {
    const activityCards = document.querySelectorAll('.activity-card');
    const categoryCards = document.querySelectorAll('.category-card');

    // Category filtering
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');

            // Remove active class from all categories
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            card.classList.add('active');

            filterActivities({ category: category });
        });
    });

    // Activity booking form handling
    const activityBookingForm = document.getElementById('activityBookingForm');
    if (activityBookingForm) {
        activityBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(activityBookingForm);
            const bookingDetails = {
                activitySelect: formData.get('activitySelect'),
                activityDate: formData.get('activityDate'),
                participants: formData.get('participants'),
                activityTime: formData.get('activityTime'),
                experienceLevel: formData.get('experienceLevel'),
                pickupLocation: formData.get('pickupLocation'),
                specialRequirements: formData.get('specialRequirements'),
                additionalNotes: formData.get('additionalNotes')
            };

            // Validate date
            const selectedDate = new Date(bookingDetails.activityDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showNotification('Please select a future date', 'error');
                return;
            }

            // Generate WhatsApp message
            const whatsappMessage = generateActivityBookingMessage(bookingDetails);

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/6281337742281?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            showNotification('Booking request sent successfully!', 'success');
            activityBookingForm.reset();
        });
    }

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .activity-categories {
            padding: 5rem 0;
            background: var(--gray-100);
        }

        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

        .activities-section {
            padding: 3rem 0;
        }

        .activities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .activity-card {
            background: white;
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .activity-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .activity-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }

        .activity-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .activity-card:hover .activity-image img {
            transform: scale(1.1);
        }

        .activity-badge {
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

        .activity-price {
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

        .activity-content {
            padding: 1.5rem;
        }

        .activity-meta {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .activity-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .activity-features span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .activity-features span::before {
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
                        url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920') center/cover;
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

            .categories-grid {
                grid-template-columns: 1fr;
            }

            .activities-grid {
                grid-template-columns: 1fr;
            }

            .activity-features {
                grid-template-columns: 1fr;
            }

            .activity-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .form-row {
                flex-direction: column;
                gap: 1rem;
            }

            .booking-form-container {
                padding: 2rem;
            }

            .activity-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }

            .activity-actions .btn {
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
                .activity-actions {
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
});

function filterActivities(filters = {}) {
    const activityCards = document.querySelectorAll('.activity-card');

    activityCards.forEach(card => {
        let show = true;

        // Category filter
        if (filters.category && card.getAttribute('data-category') !== filters.category) {
            show = false;
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

function generateActivityBookingMessage(bookingDetails) {
    const activityNames = {
        'scuba-diving': 'Scuba Diving - Nusa Penida',
        'atv-tour': 'ATV Adventure Tour',
        'painting-workshop': 'Traditional Painting Workshop',
        'balinese-spa': 'Balinese Traditional Spa',
        'helicopter-tour': 'Helicopter Sightseeing Tour',
        'snorkeling': 'Snorkeling in Menjangan Island',
        'zipline': 'Zip Line & Jungle Adventure',
        'sunset-cruise': 'Sunset Catamaran Cruise',
        'dance-performance': 'Traditional Dance Performance'
    };

    const timeSlots = {
        'morning': 'Morning (8:00 AM - 12:00 PM)',
        'afternoon': 'Afternoon (12:00 PM - 5:00 PM)',
        'evening': 'Evening (5:00 PM - 9:00 PM)',
        'custom': 'Custom Time'
    };

    const experienceLevels = {
        'beginner': 'Beginner (First time)',
        'intermediate': 'Intermediate (Some experience)',
        'advanced': 'Advanced (Experienced)'
    };

    const pickupLocations = {
        'hotel': 'Hotel Pickup',
        'activity-location': 'Direct at Activity Location',
        'central-point': 'Central Meeting Point',
        'custom': 'Custom Location'
    };

    let message = "🎯 *AR Bali Tour & Travel - Activity Booking*\n\n";
    message += "Hello! I'd like to book the following activity:\n\n";
    message += `🏄‍♂️ Activity: ${activityNames[bookingDetails.activitySelect]}\n`;
    message += `📅 Date: ${new Date(bookingDetails.activityDate).toLocaleDateString()}\n`;
    message += `👥 Participants: ${bookingDetails.participants}\n`;
    message += `⏰ Preferred Time: ${timeSlots[bookingDetails.activityTime]}\n`;
    message += `🎓 Experience Level: ${experienceLevels[bookingDetails.experienceLevel]}\n`;
    message += `📍 Meeting Point: ${pickupLocations[bookingDetails.pickupLocation]}\n`;

    if (bookingDetails.specialRequirements) {
        message += `\n⚕️ Special Requirements/Medical Conditions: ${bookingDetails.specialRequirements}\n`;
    }

    if (bookingDetails.additionalNotes) {
        message += `\n📝 Additional Notes: ${bookingDetails.additionalNotes}\n`;
    }

    message += "\nPlease provide availability and confirm the booking details.\n";
    message += "Contact: [Your Name]\n";
    message += "Phone: [Your Phone]\n";
    message += "Email: [Your Email]\n\n";
    message += "Thank you! 🌴✨";

    return message;
}

// Activity details data
const activityDetailsData = {
    'Scuba Diving - Nusa Penida': {
        title: 'Scuba Diving - Nusa Penida',
        itinerary: [
            '07:00 AM → Hotel pickup',
            '08:30 AM → Arrive at Sanur harbor',
            '09:00 AM → Boat transfer to Nusa Penida',
            '10:00 AM → First dive site briefing and dive',
            '11:30 AM → Surface interval and refreshments',
            '12:30 PM → Second dive site',
            '02:00 PM → Return to Sanur',
            '03:00 PM → Hotel drop-off'
        ],
        included: [
            'Professional PADI certified instructor',
            'Full scuba diving equipment',
            'Boat transfer to dive sites',
            'Two dives at different locations',
            'Underwater photos (if available)',
            'Refreshments between dives',
            'Hotel pickup and drop-off',
            'Insurance coverage'
        ],
        notIncluded: [
            'Transport from and to Hotel to Meeting Point (if not included)',
            'Personal expenses',
            'Tips and gratuities',
            'Additional dives',
            'Underwater camera rental'
        ],
        importantNotes: 'Requires PADI Open Water certification or equivalent. Minimum age: 12 years. Medical clearance may be required. Duration: Approximately 6 hours. Bring swimwear, towel, and change of clothes. Weather dependent - may be rescheduled in case of rough sea conditions.'
    },
    'ATV Adventure Tour': {
        title: 'ATV Adventure Tour',
        itinerary: [
            '08:00 AM → Hotel pickup',
            '09:00 AM → Arrive at ATV base camp',
            '09:30 AM → Safety briefing and equipment fitting',
            '10:00 AM → ATV ride through rice terraces and jungle',
            '11:30 AM → Break at scenic viewpoint',
            '12:00 PM → Continue ATV adventure',
            '01:00 PM → Return to base camp and refreshments',
            '02:00 PM → Hotel drop-off'
        ],
        included: [
            'ATV vehicle rental',
            'Safety equipment (helmet, gloves)',
            'Professional guide',
            'Safety briefing',
            'Refreshments',
            'Hotel pickup and drop-off',
            'Insurance coverage'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional activities',
            'Food and beverages (except refreshments)'
        ],
        importantNotes: 'No experience required. Minimum age: 12 years (with adult supervision). Wear comfortable clothes that can get dirty. Closed-toe shoes mandatory. Duration: Approximately 4 hours. Weather dependent - may be rescheduled in case of heavy rain.'
    },
    'Traditional Painting Workshop': {
        title: 'Traditional Painting Workshop',
        itinerary: [
            '09:00 AM → Hotel pickup',
            '10:00 AM → Arrive at art studio',
            '10:30 AM → Introduction to Balinese painting techniques',
            '11:00 AM → Hands-on painting session',
            '12:30 PM → Break for lunch',
            '01:30 PM → Continue painting and finishing touches',
            '03:00 PM → Receive certificate and take home artwork',
            '04:00 PM → Hotel drop-off'
        ],
        included: [
            'Local artist instructor',
            'All painting materials and canvas',
            'Traditional painting techniques lesson',
            'Your completed artwork to take home',
            'Certificate of completion',
            'Lunch',
            'Hotel pickup and drop-off'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional materials',
            'Frame for artwork'
        ],
        importantNotes: 'Duration: Approximately 3 hours. Suitable for all skill levels. Wear clothes that can get paint on them. Your artwork will need time to dry before taking home. All ages welcome.'
    },
    'Balinese Traditional Spa': {
        title: 'Balinese Traditional Spa',
        itinerary: [
            '10:00 AM → Hotel pickup',
            '10:30 AM → Arrive at spa',
            '11:00 AM → Welcome drink and consultation',
            '11:15 AM → Traditional Balinese massage',
            '12:15 PM → Herbal body scrub',
            '12:45 PM → Flower bath',
            '01:15 PM → Herbal tea and relaxation',
            '02:00 PM → Hotel drop-off'
        ],
        included: [
            'Traditional Balinese massage (60 minutes)',
            'Herbal body scrub',
            'Flower bath',
            'Herbal tea',
            'All spa facilities',
            'Hotel pickup and drop-off'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional treatments',
            'Food and beverages (except herbal tea)'
        ],
        importantNotes: 'Duration: Approximately 2 hours. Please inform about any medical conditions or allergies. Pregnant women should consult before booking. Minimum age: 16 years. Arrive 15 minutes early for consultation.'
    },
    'Helicopter Sightseeing Tour': {
        title: 'Helicopter Sightseeing Tour',
        itinerary: [
            '09:00 AM → Hotel pickup',
            '09:30 AM → Arrive at helipad',
            '09:45 AM → Safety briefing',
            '10:00 AM → Helicopter flight over Bali',
            '10:30 AM → Landing and photo session',
            '11:00 AM → Refreshments',
            '11:30 AM → Hotel drop-off'
        ],
        included: [
            'Professional licensed pilot',
            'Helicopter flight (duration varies by package)',
            'Safety briefing and equipment',
            'Photo opportunities',
            'Refreshments',
            'Luxury transport to/from helipad',
            'Hotel pickup and drop-off',
            'Insurance coverage'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional flight time',
            'Professional photography services'
        ],
        importantNotes: 'Duration: Approximately 2 hours (flight time varies). Weather dependent - may be rescheduled in case of poor visibility or bad weather. Weight restrictions apply. Minimum age: 2 years. Advance booking recommended.'
    },
    'Snorkeling in Menjangan Island': {
        title: 'Snorkeling in Menjangan Island',
        itinerary: [
            '06:00 AM → Hotel pickup',
            '08:30 AM → Arrive at Pemuteran harbor',
            '09:00 AM → Boat transfer to Menjangan Island',
            '09:30 AM → First snorkeling session',
            '11:00 AM → Break and refreshments',
            '11:30 AM → Second snorkeling session',
            '01:00 PM → Lunch on boat',
            '02:00 PM → Return to harbor',
            '04:30 PM → Hotel drop-off'
        ],
        included: [
            'Professional marine guide',
            'Full snorkeling equipment',
            'Boat transfer to Menjangan Island',
            'Multiple snorkeling sites',
            'Lunch',
            'Refreshments',
            'Hotel pickup and drop-off',
            'Insurance coverage'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional activities',
            'Underwater camera rental'
        ],
        importantNotes: 'Duration: Approximately 5 hours. Suitable for all swimming levels. Bring swimwear, towel, sunscreen, and waterproof camera. Weather dependent - may be rescheduled in case of rough sea conditions. Menjangan Island is part of West Bali National Park.'
    },
    'Zip Line & Jungle Adventure': {
        title: 'Zip Line & Jungle Adventure',
        itinerary: [
            '08:00 AM → Hotel pickup',
            '09:00 AM → Arrive at adventure park',
            '09:30 AM → Safety briefing and equipment fitting',
            '10:00 AM → First zip line course',
            '11:00 AM → Jungle trekking',
            '12:00 PM → Lunch',
            '01:00 PM → Additional zip line courses',
            '02:30 PM → Return journey',
            '04:00 PM → Hotel drop-off'
        ],
        included: [
            'Multiple zip line courses',
            'Jungle trekking with guide',
            'Safety equipment and harness',
            'Professional guides',
            'Lunch',
            'Hotel pickup and drop-off',
            'Insurance coverage'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional activities',
            'Food and beverages (except lunch)'
        ],
        importantNotes: 'Duration: Approximately 6 hours. Requires moderate fitness level. Minimum age: 8 years (with adult supervision). Maximum weight: 120kg. Wear comfortable clothes and closed-toe shoes. Weather dependent - may be rescheduled in case of heavy rain or strong winds.'
    },
    'Sunset Catamaran Cruise': {
        title: 'Sunset Catamaran Cruise',
        itinerary: [
            '04:00 PM → Hotel pickup',
            '05:00 PM → Arrive at harbor',
            '05:30 PM → Board catamaran and welcome drink',
            '06:00 PM → Cruise begins',
            '06:30 PM → Sunset viewing',
            '07:00 PM → Dinner and live music',
            '08:30 PM → Return to harbor',
            '09:00 PM → Hotel drop-off'
        ],
        included: [
            'Luxury catamaran cruise',
            'Welcome drink',
            'Champagne and canapés',
            'Dinner',
            'Live music entertainment',
            'Photo service',
            'Hotel pickup and drop-off'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Additional beverages',
            'Professional photography'
        ],
        importantNotes: 'Duration: Approximately 3 hours. Romantic experience perfect for couples. Dress code: Smart casual. Minimum age: All ages welcome. Weather dependent - may be rescheduled in case of rough sea conditions. Advance booking recommended, especially during peak season.'
    },
    'Traditional Dance Performance': {
        title: 'Traditional Dance Performance',
        itinerary: [
            '06:00 PM → Hotel pickup',
            '06:30 PM → Arrive at performance venue',
            '07:00 PM → Traditional dance performance begins',
            '08:30 PM → Performance ends',
            '09:00 PM → Hotel drop-off'
        ],
        included: [
            'Traditional Balinese dance performance',
            'Live Gamelan music',
            'Cultural explanation',
            'Traditional costumes showcase',
            'Photo opportunities',
            'Hotel pickup and drop-off'
        ],
        notIncluded: [
            'Personal expenses',
            'Tips and gratuities',
            'Food and beverages',
            'Additional activities'
        ],
        importantNotes: 'Duration: Approximately 2 hours. Family-friendly cultural experience. Performance includes various traditional dances such as Kecak, Legong, and Barong. Photography allowed but flash photography may be restricted. Arrive early for best seating.'
    },
    'Bali Safari & Marine Park Tickets': {
        title: 'Bali Safari & Marine Park Tickets',
        itinerary: [
            '🗓️ Itinerary & Package Options (No Hotel Transport Service)',
            '(Visit park by yourself; hotel pick-up/drop-off not included.)',
            '',
            'Safari Explorer → Basic daytime package: includes Safari Journey + Animal Educational Shows / Edutainment Presentations + Park entry + access to Fun Zone & Water Play',
            'Adult: IDR 650,000 | Child (3–12): IDR 520,000 | Infant (<3): Free',
            '',
            'Safari Legend → Same as Safari Explorer + Bali Agung Show + more premium seating or enhanced show experience',
            'Adult: IDR 750,000 | Child (3–12): IDR 620,000 | Infant (<3): Free',
            '',
            'Jungle Hopper → More inclusive: Safari Journey + shows + Fun Zone & Water Play + Bali Agung Show',
            'Adult: IDR 820,000 | Child (3–12): IDR 660,000',
            '',
            'Elephant Safari → Includes Elephant Ride / Safari among elephants + Safari Journey + other show/presentation inclusions',
            'Adult: IDR 1,050,000 | Child (3–12): IDR 840,000',
            '',
            'Night Safari → Evening experience: Walking Safari, Night Safari tram/journey + Dinner + Night Shows + Welcome Drink',
            'Adult: IDR 1,100,000 | Child (3–12): IDR 880,000',
            '',
            'Feed The Predator → Opportunity to feed predator animals + Safari & show inclusions',
            'Adult: IDR 1,200,000 | Child (3–12): IDR 1,000,000',
            '',
            'Jeep 4×4 Safari → Safari in 4×4 Jeep (off-road) + standard park & show inclusions',
            'Adult: IDR 1,500,000 | Child (3–12): IDR 1,200,000',
            '',
            'Varuna Underwater Dining → Underwater/theatrical dining experience + Safari/show/park entry',
            'Adult: IDR 1,250,000 | Child (3–12): IDR 1,000,000',
            '',
            'Rhino Package → Premium daytime package with animal rides, lunch at Tsavo Lion Restaurant, enhanced seating',
            'Adult: IDR 1,750,000 | Child (3–12): IDR 1,350,000',
            '',
            'Leopard Package → Premium inclusions: safari, shows, animal interactions, meal at Tsavo Restaurant',
            'Adult: IDR 1,350,000 | Child (3–12): IDR 1,050,000',
            '',
            'Dragon Package → Higher tier premium experience: full safari, animal encounters, deluxe meals, cultural show priority seating',
            'Adult: IDR 1,550,000 | Child (3–12): IDR 1,200,000'
        ],
        included: [
            'Entry to Bali Safari & Marine Park',
            'Safari Journey (day or night depending on package)',
            'Animal shows / presentations (predator presentations, edutainment, educational shows)',
            'Access to Fun Zone & Water Play Zone (if included in the chosen package)',
            'Cultural shows such as Bali Agung, Fire Dance, Rhythm of Africa (where included)',
            'Elephant safari / ride (for packages that include Elephant Safari)',
            'Meals / Dining when specified (e.g. dinner in Night Safari, or lunch in Rhino / Premium packages)',
            'Welcome drink (for Night Safari)'
        ],
        notIncluded: [
            'Hotel transfers / pick-up & drop-off',
            'Personal expenses (souvenirs, drinks not included, tipping etc.)',
            'Any shows or features not explicitly stated in the package',
            'Age / height / eligibility restrictions for some animal interactions or rides',
            'Meals or services not mentioned in the package details'
        ],
        importantNotes: 'Show schedules (Bali Agung, Rhythm of Africa, Fire Dance etc.) have fixed times; check when booking to ensure availability. Night Safari begins after dusk; walking safari part may have different terms. Some packages (premium / Rhino / Leopard / Dragon) may include special seatings or priority access — may have limited availability. Children under certain age (often below 3 years) may enter free; other children may have discounted rates depending on height or age. Advanced booking recommended for premium / dining / underwater show packages to ensure reservation.'
    }
};

// Show activity details modal
function showActivityDetails(activityName) {
    const details = activityDetailsData[activityName];
    if (!details) {
        showNotification('Details not found for this activity', 'error');
        return;
    }

    let html = '';

    if (details.itinerary) {
        html += '<div class="modal-section">';
        html += '<h4>Itinerary</h4>';
        html += '<div class="modal-itinerary">';
        details.itinerary.forEach(item => {
            if (item.trim() === '') {
                html += '<br>';
            } else {
                html += `<p>${item}</p>`;
            }
        });
        html += '</div>';
        html += '</div>';
    }

    let includedList = '';
    details.included.forEach(item => {
        includedList += `<li><i class="fas fa-check-circle"></i> ${item}</li>`;
    });

    let notIncludedList = '';
    details.notIncluded.forEach(item => {
        notIncludedList += `<li><i class="fas fa-times-circle"></i> ${item}</li>`;
    });

    html += `
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
    `;

    const modal = document.getElementById('activityDetailsModal');
    const title = document.getElementById('activityDetailsTitle');
    const content = document.getElementById('activityDetailsContent');

    // Check if modal elements exist
    if (!modal || !title || !content) {
        console.warn('Activity details modal not found on this page');
        return;
    }

    title.textContent = details.title;
    content.innerHTML = html;
    modal.style.display = 'block';

    // Add event listeners for modal
    const overlay = document.getElementById('activityDetailsOverlay');
    const closeBtn = document.getElementById('activityDetailsClose');

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

// Close details modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('detailsModal');
    const overlay = document.getElementById('detailsOverlay');
    const closeBtn = document.getElementById('detailsClose');

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});