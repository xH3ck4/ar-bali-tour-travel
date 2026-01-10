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