// Blog page specific functionality

document.addEventListener('DOMContentLoaded', () => {
    // Blog filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Blog modal functionality
    const modal = document.getElementById('blogModal');
    const overlay = document.getElementById('blogOverlay');
    const closeBtn = document.getElementById('blogModalClose');
    const modalTitle = document.getElementById('blogModalTitle');
    const modalContent = document.getElementById('blogModalContent');

    // Blog post data
    const blogPosts = {
        'batur-sunrise': {
            title: 'Mount Batur: Bali\'s Volcanic Sunrise Experience',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/tour-batur.jpg" alt="Mount Batur Sunrise" onerror="this.src='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 15, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Discover the breathtaking beauty of Mount Batur, Bali's most active volcano</h2>

                        <p>Mount Batur stands as one of Bali's most iconic natural wonders, offering adventurers an unforgettable sunrise experience atop an active volcano. Located in the Kintamani district, this majestic peak has been a favorite destination for trekkers and nature lovers for decades.</p>

                        <h3>Why Choose Mount Batur?</h3>
                        <ul>
                            <li><strong>Active Volcano:</strong> Experience the raw power of nature with steam vents and volcanic landscapes</li>
                            <li><strong>Stunning Sunrise:</strong> Witness one of Bali's most spectacular sunrises from 1,717 meters above sea level</li>
                            <li><strong>Accessible Trek:</strong> Suitable for various fitness levels with experienced guides</li>
                            <li><strong>Cultural Experience:</strong> Learn about Balinese Hinduism and volcanic mythology</li>
                        </ul>

                        <h3>Best Time to Visit</h3>
                        <p>The best time to trek Mount Batur is during the dry season (April to September) when weather conditions are optimal. Sunrise treks typically start around 2:00 AM to reach the summit by sunrise.</p>

                        <h3>What to Expect</h3>
                        <p>Your Mount Batur adventure begins with a pickup from your hotel in the early hours. Professional guides and porters will accompany you throughout the 2-hour trek. At the summit, enjoy a traditional breakfast while watching the sun rise over the island.</p>

                        <h3>Essential Tips</h3>
                        <ul>
                            <li>Wear comfortable hiking shoes and warm clothing</li>
                            <li>Bring a flashlight/headlamp for the early start</li>
                            <li>Stay hydrated and bring snacks</li>
                            <li>Respect the sacred nature of the mountain</li>
                            <li>Book with experienced local guides for safety</li>
                        </ul>

                        <p>Mount Batur offers more than just a physical challenge – it's a spiritual journey that connects you with Bali's ancient volcanic heritage. The combination of natural beauty, cultural significance, and breathtaking views makes it an essential part of any Bali adventure.</p>
                    </div>
                </div>
            `
        },
        'balinese-dance': {
            title: 'The Art of Balinese Traditional Dance',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/activity-dance.jpg" alt="Balinese Traditional Dance" onerror="this.src='https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 10, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Culture</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Immerse yourself in Bali's rich cultural heritage through traditional dance performances</h2>

                        <p>Balinese traditional dance is more than entertainment – it's a living expression of the island's Hindu culture, mythology, and spiritual beliefs. Each movement, costume, and musical accompaniment tells stories passed down through generations.</p>

                        <h3>Popular Balinese Dances</h3>

                        <h4>Kecak Dance</h4>
                        <p>Also known as the "Monkey Dance," this mesmerizing performance features a large ensemble of men chanting "cak-cak-cak" while creating hypnotic circular movements. The dance depicts scenes from the Ramayana epic.</p>

                        <h4>Legong Dance</h4>
                        <p>A graceful dance performed by young girls, Legong represents the beauty and elegance of Balinese women. The intricate hand movements and facial expressions require years of training to master.</p>

                        <h4>Barong Dance</h4>
                        <p>This dramatic dance features the Barong (a mythical lion-like creature) battling the evil Rangda. It symbolizes the eternal struggle between good and evil in Balinese Hinduism.</p>

                        <h3>The Cultural Significance</h3>
                        <p>Traditional dance in Bali serves multiple purposes:</p>
                        <ul>
                            <li><strong>Religious Ceremonies:</strong> Dances are performed during temple ceremonies and festivals</li>
                            <li><strong>Storytelling:</strong> Each dance narrates ancient legends and moral lessons</li>
                            <li><strong>Community Bonding:</strong> Large ensemble dances strengthen village relationships</li>
                            <li><strong>Tourist Entertainment:</strong> Modified versions are performed for visitors</li>
                        </ul>

                        <h3>The Training Process</h3>
                        <p>Becoming a traditional dancer requires dedication and discipline. Children often begin training as young as 5 years old at local dance schools. The training includes:</p>
                        <ul>
                            <li>Physical conditioning and flexibility</li>
                            <li>Learning precise hand gestures (mudras)</li>
                            <li>Facial expression control</li>
                            <li>Understanding the spiritual significance</li>
                        </ul>

                        <h3>Where to Experience Balinese Dance</h3>
                        <p>You can witness authentic Balinese dance performances at:</p>
                        <ul>
                            <li>Ubud Palace and Ubud Art Market</li>
                            <li>Tanah Lot Temple</li>
                            <li>Various cultural centers across the island</li>
                            <li>Traditional ceremonies and festivals</li>
                        </ul>

                        <p>Experiencing Balinese traditional dance is like stepping into a living museum of culture and spirituality. It's a reminder that art and religion are inseparable in Balinese life, creating performances that are both visually stunning and deeply meaningful.</p>
                    </div>
                </div>
            `
        },
        'bali-beaches': {
            title: 'Essential Guide to Bali\'s Best Beaches',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/tour-beaches.jpg" alt="Bali Beaches" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 5, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Travel Tips</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>From hidden coves to luxury resorts, Bali offers beaches for every traveler</h2>

                        <p>Bali's coastline stretches over 500 kilometers, offering an incredible variety of beaches for every type of traveler. Whether you're seeking adventure, relaxation, or luxury, the island has something to offer.</p>

                        <h3>Popular Beach Categories</h3>

                        <h4>Luxury Beach Resorts</h4>
                        <p><strong>Nusa Dua:</strong> Known for its pristine white sand and luxury resorts, this area offers calm waters perfect for swimming and water sports.</p>
                        <p><strong>Seminyak:</strong> Bali's upscale beach destination with trendy cafes, boutique hotels, and vibrant nightlife.</p>

                        <h4>Adventure Beaches</h4>
                        <p><strong>Uluwatu:</strong> Famous for its dramatic cliffs and excellent surfing. Watch the sunset from the temple while surfers ride the waves.</p>
                        <p><strong>Padang Padang:</strong> A surfer's paradise with challenging waves and beautiful hidden beach coves.</p>

                        <h4>Hidden Gems</h4>
                        <p><strong>Virgin Beach (East Bali):</strong> Crystal-clear waters and untouched natural beauty, accessible only by boat or a short hike.</p>
                        <p><strong>Blue Lagoon (Nusa Penida):</strong> Stunning turquoise waters and unique rock formations make this a photographer's dream.</p>

                        <h3>Beach Activities</h3>
                        <ul>
                            <li><strong>Surfing:</strong> Best at Kuta, Uluwatu, and Canggu</li>
                            <li><strong>Snorkeling:</strong> Excellent at Menjangan Island and Nusa Penida</li>
                            <li><strong>Diving:</strong> World-class sites around the island</li>
                            <li><strong>Beach Clubs:</strong> Social scene at Seminyak and Canggu</li>
                            <li><strong>Yoga:</strong> Morning sessions at various beaches</li>
                        </ul>

                        <h3>Best Time to Visit Beaches</h3>
                        <p>Bali's beaches are beautiful year-round, but the best time depends on your interests:</p>
                        <ul>
                            <li><strong>April-September (Dry Season):</strong> Perfect for water sports and swimming</li>
                            <li><strong>December-March (Wet Season):</strong> Fewer crowds and lush green landscapes</li>
                        </ul>

                        <h3>Beach Safety Tips</h3>
                        <ul>
                            <li>Check local surf conditions and heed lifeguard warnings</li>
                            <li>Use reef-safe sunscreen to protect marine life</li>
                            <li>Respect local customs and beach etiquette</li>
                            <li>Stay hydrated and protect yourself from the sun</li>
                            <li>Be aware of strong currents, especially during rainy season</li>
                        </ul>

                        <p>Bali's beaches offer more than just beautiful scenery – they provide opportunities for adventure, relaxation, and cultural experiences. Whether you're planning a romantic getaway or an action-packed vacation, the island's diverse coastline has something special for everyone.</p>
                    </div>
                </div>
            `
        },
        'bali-food': {
            title: 'A Culinary Journey Through Bali',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/tour-cooking.jpg" alt="Balinese Cuisine" onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> December 28, 2024</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Food & Dining</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Explore Bali's vibrant food scene from traditional warungs to fine dining restaurants</h2>

                        <p>Bali's culinary landscape is as diverse as its landscapes, offering everything from street food stalls to world-class restaurants. The island's cuisine reflects its rich cultural heritage and international influences.</p>

                        <h3>Traditional Balinese Dishes</h3>

                        <h4>Babi Guling</h4>
                        <p>The signature Balinese dish – suckling pig stuffed with spices and slowly roasted until tender and crispy. A must-try during celebrations.</p>

                        <h4>Nasi Campur</h4>
                        <p>A complete meal featuring rice with various side dishes like chicken, fish, vegetables, and sambal. Each region has its own variation.</p>

                        <h4>Ayam Betutu</h4>
                        <p>Chicken wrapped in banana leaves and cooked with traditional Balinese spices. The Gilimanuk version is particularly famous.</p>

                        <h3>Local Food Culture</h3>
                        <p>Dining in Bali is more than just eating – it's a cultural experience:</p>
                        <ul>
                            <li><strong>Warungs:</strong> Local eateries offering authentic, inexpensive meals</li>
                            <li><strong>Babi Guling Stalls:</strong> Specialize in roasted pig dishes</li>
                            <li><strong>Food Markets:</strong> Fresh produce and ready-to-eat meals</li>
                            <li><strong>Beachside Restaurants:</strong> Seafood with ocean views</li>
                        </ul>

                        <h3>International Influences</h3>
                        <p>Bali's food scene has evolved with global influences:</p>
                        <ul>
                            <li><strong>Canggu:</strong> Health food cafes and vegan restaurants</li>
                            <li><strong>Seminyak:</strong> Trendy fusion cuisine and fine dining</li>
                            <li><strong>Ubud:</strong> Organic cafes and international cuisine</li>
                            <li><strong>Jimbaran:</strong> Famous seafood markets and beachfront dining</li>
                        </ul>

                        <h3>Cooking Classes and Experiences</h3>
                        <p>Learn to prepare traditional Balinese dishes:</p>
                        <ul>
                            <li>Visit local markets to select fresh ingredients</li>
                            <li>Learn traditional cooking techniques</li>
                            <li>Understand the spiritual significance of Balinese cuisine</li>
                            <li>Take home recipes and culinary memories</li>
                        </ul>

                        <h3>Dining Etiquette</h3>
                        <ul>
                            <li>Eat with your right hand or utensils (never left hand)</li>
                            <li>Try a bit of everything offered</li>
                            <li>Be respectful during prayers before meals</li>
                            <li>Leave a small amount of food to show satisfaction</li>
                        </ul>

                        <p>Bali's food scene is a delicious reflection of its cultural diversity and welcoming spirit. Whether you're seeking authentic local flavors or international cuisine, the island offers culinary experiences that will delight your senses and create lasting memories.</p>
                    </div>
                </div>
            `
        },
        'bali-transport': {
            title: 'Getting Around Bali: Transportation Guide',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/tour-nusa-dua.jpg" alt="Bali Transportation" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> December 20, 2024</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Travel Tips</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Navigate Bali like a local with our comprehensive transportation guide</h2>

                        <p>Getting around Bali can be both exciting and challenging. With proper planning and the right transportation choices, you'll discover that the island is actually quite accessible and enjoyable to explore.</p>

                        <h3>Transportation Options</h3>

                        <h4>Private Driver and Car Rental</h4>
                        <p>The most comfortable and reliable option for tourists:</p>
                        <ul>
                            <li>Air-conditioned vehicles with professional drivers</li>
                            <li>Flexible itineraries and door-to-door service</li>
                            <li>Safe and stress-free travel</li>
                            <li>Perfect for families and groups</li>
                        </ul>

                        <h4>Motorcycle Rental (Scooter)</h4>
                        <p>Popular among adventurous travelers:</p>
                        <ul>
                            <li>Freedom to explore at your own pace</li>
                            <li>Easy to park and maneuver in traffic</li>
                            <li>Relatively inexpensive</li>
                            <li>Requires international driving permit</li>
                        </ul>

                        <h4>Public Transportation</h4>
                        <p><strong>Bemos:</strong> Colorful minivans that serve as local buses</p>
                        <p><strong>Angkot:</strong> Shared minibuses for shorter distances</p>
                        <p><strong>Taxis and Ride-hailing:</strong> Grab and Gojek apps available</p>

                        <h4>Airport Transfers</h4>
                        <p>Essential for your arrival and departure:</p>
                        <ul>
                            <li>Pre-arranged pickup from Ngurah Rai Airport</li>
                            <li>Meet and greet service</li>
                            <li>Fixed rates with no surprises</li>
                            <li>Available 24/7</li>
                        </ul>

                        <h3>Traffic and Road Conditions</h3>
                        <p>Understanding Bali's traffic patterns:</p>
                        <ul>
                            <li>Rush hours: 7-9 AM and 4-7 PM</li>
                            <li>Monsoon season affects road conditions</li>
                            <li>Motorcycles are the dominant traffic</li>
                            <li>Always drive defensively</li>
                        </ul>

                        <h3>Safety Considerations</h3>
                        <ul>
                            <li>Wear helmets when riding motorcycles</li>
                            <li>Choose reputable rental companies</li>
                            <li>Keep important documents secure</li>
                            <li>Have emergency contact numbers</li>
                            <li>Stay hydrated during long journeys</li>
                        </ul>

                        <h3>Best Transportation by Region</h3>
                        <ul>
                            <li><strong>South Bali (Kuta/Seminyak):</strong> Walking, taxis, or scooters</li>
                            <li><strong>Ubud:</strong> Private driver for rice terrace visits</li>
                            <li><strong>East Bali:</strong> Full-day tours with private transport</li>
                            <li><strong>Nusa Penida:</strong> Fast boat transfers</li>
                        </ul>

                        <h3>Cost Comparison</h3>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <thead>
                                <tr style="background: #f8f9fa;">
                                    <th style="padding: 12px; border: 1px solid #ddd;">Option</th>
                                    <th style="padding: 12px; border: 1px solid #ddd;">Cost Range</th>
                                    <th style="padding: 12px; border: 1px solid #ddd;">Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Private Driver</td>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Rp 800,000-2,000,000/day</td>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Comfort & convenience</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Scooter Rental</td>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Rp 50,000-75,000/day</td>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Adventure & flexibility</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Taxi/Ride-hailing</td>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Rp 50,000-200,000/trip</td>
                                    <td style="padding: 12px; border: 1px solid #ddd;">Short distances</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>Choosing the right transportation can make or break your Bali experience. Consider your group size, planned activities, and comfort preferences when making your decision. A good transportation choice ensures you can focus on enjoying Bali rather than worrying about logistics.</p>
                    </div>
                </div>
            `
        },
        'east-bali': {
            title: 'Hidden Gems of East Bali',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/tour-east-bali.jpg" alt="East Bali" onerror="this.src='https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> December 15, 2024</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Venture beyond the tourist crowds to discover East Bali's pristine beaches and cultural treasures</h2>

                        <p>While most visitors flock to Bali's southern beaches and central highlands, East Bali remains a well-kept secret offering authentic experiences away from the tourist crowds. This region preserves traditional Balinese culture and boasts some of the island's most beautiful natural landscapes.</p>

                        <h3>Why Visit East Bali?</h3>
                        <ul>
                            <li><strong>Authentic Culture:</strong> Traditional villages untouched by mass tourism</li>
                            <li><strong>Stunning Beaches:</strong> Pristine shores with crystal-clear waters</li>
                            <li><strong>Ancient Temples:</strong> Sacred sites dating back centuries</li>
                            <li><strong>Peaceful Atmosphere:</strong> Relaxed pace away from tourist hustle</li>
                        </ul>

                        <h3>Key Destinations</h3>

                        <h4>Tenganan Ancient Village</h4>
                        <p>One of Bali's oldest traditional villages, famous for its unique double-ikat weaving and ancient gamelan orchestras. The village maintains traditional customs and architecture that date back over 700 years.</p>

                        <h4>Tirta Gangga Water Palace</h4>
                        <p>A royal water palace featuring beautiful pools, fountains, and sculptures. Built in 1948 by the last Raja of Karangasem, it combines Balinese and Western architectural styles.</p>

                        <h4>Virgin Beach</h4>
                        <p>A hidden paradise accessible only by boat or a short hike. This secluded beach offers turquoise waters, white sand, and the chance to swim in natural pools formed by volcanic rocks.</p>

                        <h4>Mount Agung</h4>
                        <p>Bali's highest mountain and spiritual center. The active volcano is considered sacred by Hindus and offers trekking opportunities for those seeking spiritual experiences.</p>

                        <h3>Cultural Experiences</h3>
                        <p>East Bali preserves traditional Balinese culture:</p>
                        <ul>
                            <li><strong>Traditional Weaving:</strong> Learn about the ancient art of double-ikat at Tenganan</li>
                            <li><strong>Gamelan Music:</strong> Experience traditional orchestras unique to the region</li>
                            <li><strong>Temple Festivals:</strong> Participate in authentic religious ceremonies</li>
                            <li><strong>Homestays:</strong> Stay with local families and experience village life</li>
                        </ul>

                        <h3>Adventure Activities</h3>
                        <ul>
                            <li><strong>Trekking:</strong> Explore rice terraces and volcanic landscapes</li>
                            <li><strong>Cycling:</strong> Scenic routes through traditional villages</li>
                            <li><strong>Diving:</strong> Excellent marine life around the coastal areas</li>
                            <li><strong>Cultural Tours:</strong> Visit ancient temples and traditional markets</li>
                        </ul>

                        <h3>Best Time to Visit</h3>
                        <p>East Bali is beautiful year-round, but the best time to visit is during the dry season (April to September) when roads are in good condition and the weather is perfect for outdoor activities.</p>

                        <h3>How to Get There</h3>
                        <p>East Bali is about 2-3 hours drive from South Bali. Options include:</p>
                        <ul>
                            <li>Private driver or car rental (recommended)</li>
                            <li>Organized tours with local operators</li>
                            <li>Public buses or bemos (more adventurous)</li>
                        </ul>

                        <h3>Travel Tips</h3>
                        <ul>
                            <li>Bring cash for small purchases in rural areas</li>
                            <li>Respect local customs and dress modestly for temple visits</li>
                            <li>Try local food at traditional warungs</li>
                            <li>Stay hydrated and use sun protection</li>
                            <li>Consider a multi-day trip to fully experience the region</li>
                        </ul>

                        <p>East Bali offers a genuine Balinese experience that few tourists discover. Away from the tourist trail, you'll find warm hospitality, stunning natural beauty, and cultural authenticity that makes the journey worthwhile. It's the perfect destination for travelers seeking meaningful connections with Bali's true spirit.</p>
                    </div>
                </div>
            `
        }
    };

    // Read more button functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more-btn')) {
            e.preventDefault();
            const postId = e.target.getAttribute('data-post');
            const post = blogPosts[postId];

            if (post) {
                modalTitle.textContent = post.title;
                modalContent.innerHTML = post.content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Modal close functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Add CSS styles for blog page
    const style = document.createElement('style');
    style.textContent = `
        .blog-hero {
            padding: 120px 0 80px;
        }

        .blog-section {
            padding: 80px 0;
            background: var(--gray-100);
        }

        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .blog-card {
            background: white;
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .blog-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }

        .blog-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .blog-card:hover .blog-image img {
            transform: scale(1.1);
        }

        .blog-category {
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

        .blog-content {
            padding: 1.5rem;
        }

        .blog-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: var(--gray-600);
        }

        .blog-meta span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .blog-content h3 {
            color: var(--dark-color);
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }

        .blog-content p {
            color: var(--gray-700);
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .read-more-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }

        .read-more-btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }

        .blog-filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            background: white;
            border: 2px solid var(--gray-300);
            color: var(--gray-700);
            padding: 0.75rem 1.5rem;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }

        .filter-btn:hover,
        .filter-btn.active {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: white;
        }

        .blog-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            overflow-y: auto;
        }

        .blog-modal .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }

        .blog-modal .modal-content {
            position: relative;
            max-width: 900px;
            margin: 2rem auto;
            background: white;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg);
            max-height: 90vh;
            overflow-y: auto;
            z-index: 10001;
        }

        .blog-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 2px solid var(--gray-200);
            position: sticky;
            top: 0;
            background: white;
            z-index: 10;
        }

        .blog-modal .modal-header h3 {
            margin: 0;
            color: var(--dark-color);
            font-size: 1.5rem;
        }

        .blog-modal .modal-close {
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

        .blog-modal .modal-close:hover {
            color: var(--primary-color);
            transform: rotate(90deg);
        }

        .blog-modal .modal-body {
            padding: 2rem;
        }

        .blog-post-content {
            max-width: 100%;
        }

        .blog-post-image {
            margin-bottom: 2rem;
            border-radius: var(--border-radius);
            overflow: hidden;
        }

        .blog-post-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }

        .blog-post-meta {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
            padding: 1rem 0;
            border-top: 1px solid var(--gray-200);
            border-bottom: 1px solid var(--gray-200);
            flex-wrap: wrap;
        }

        .blog-post-meta span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray-600);
            font-size: 0.9rem;
        }

        .blog-post-body {
            line-height: 1.8;
        }

        .blog-post-body h2 {
            color: var(--dark-color);
            margin: 2rem 0 1.5rem 0;
            font-size: 2rem;
        }

        .blog-post-body h3 {
            color: var(--primary-color);
            margin: 2rem 0 1rem 0;
            font-size: 1.5rem;
        }

        .blog-post-body h4 {
            color: var(--dark-color);
            margin: 1.5rem 0 1rem 0;
            font-size: 1.25rem;
        }

        .blog-post-body p {
            margin-bottom: 1.5rem;
            color: var(--gray-700);
        }

        .blog-post-body ul {
            margin: 1rem 0 1.5rem 2rem;
            padding: 0;
        }

        .blog-post-body li {
            margin-bottom: 0.5rem;
            color: var(--gray-700);
        }

        .blog-post-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: white;
            box-shadow: var(--shadow);
            border-radius: var(--border-radius);
            overflow: hidden;
        }

        .blog-post-body th,
        .blog-post-body td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--gray-200);
        }

        .blog-post-body th {
            background: var(--gray-50);
            font-weight: 600;
            color: var(--dark-color);
        }

        @media (max-width: 768px) {
            .blog-grid {
                grid-template-columns: 1fr;
            }

            .blog-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .blog-post-meta {
                flex-direction: column;
                gap: 1rem;
            }

            .blog-modal .modal-content {
                margin: 1rem;
                max-height: 95vh;
            }

            .blog-modal .modal-header,
            .blog-modal .modal-body {
                padding: 1.5rem;
            }

            .blog-post-image img {
                height: 250px;
            }

            .blog-post-body h2 {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
});