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
                        <img src="../../assets/images/blog-dance.jpg" alt="Balinese Traditional Dance" onerror="this.src='https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'">
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
        },
        'ubud-cultural': {
            title: 'Ubud: Bali\'s Cultural Heart and Artistic Soul',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-ubud.jpg" alt="Ubud Cultural Heart of Bali" onerror="this.src='https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 20, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Ubud: Where Art and Culture Flourish</h2>

                        <p>Nestled in the heart of Bali, Ubud has evolved from a small village into the island's cultural and artistic capital. Often called the "soul of Bali," this vibrant town offers a perfect blend of traditional Balinese culture, world-class art galleries, and stunning natural beauty.</p>

                        <h3>Artistic Heritage and Galleries</h3>
                        <p>Ubud is home to some of Bali's most renowned art museums and galleries. The Ubud Art Market buzzes with creativity, while prestigious institutions like the Neka Art Museum and Agung Rai Museum showcase traditional and contemporary Balinese art. Don't miss the Blanco Renaissance Museum, once home to the Dutch painter Arie Smit.</p>

                        <h3>Temple Hopping and Spiritual Sites</h3>
                        <p>The town is dotted with beautiful temples, each with its own unique story. The Saraswati Temple, with its serene lotus pond, is particularly stunning, especially at dusk when the temple lights reflect on the water. Goa Gajah (Elephant Cave) and the nearby Yeh Pulu reliefs offer fascinating glimpses into ancient Balinese civilization.</p>

                        <h3>Rice Terraces and Natural Beauty</h3>
                        <p>The surrounding landscape is equally captivating. The iconic Tegallalang Rice Terraces cascade down hillsides in a mesmerizing pattern of green, while the Campuhan Ridge Walk offers panoramic views of the Petanu River valley. These natural wonders provide the perfect backdrop for photography and contemplation.</p>

                        <h3>Culinary Delights</h3>
                        <p>Ubud's food scene is as diverse as it is delicious. From healthy cafes serving acai bowls and vegan cuisine to traditional warungs offering authentic Balinese dishes, there's something for every palate. The famous Bebek Tepi Sawah (duck on rice with coconut) is a must-try local specialty.</p>

                        <h3>Wellness and Yoga Retreats</h3>
                        <p>Ubud has become a global hub for wellness tourism. Numerous yoga studios, meditation centers, and luxury spas offer everything from beginner yoga classes to advanced spiritual retreats. The peaceful atmosphere and natural surroundings make it ideal for rejuvenation.</p>

                        <h3>Best Time to Visit</h3>
                        <ul>
                            <li><strong>Dry Season (April-October):</strong> Perfect weather for outdoor activities and temple visits</li>
                            <li><strong>Wet Season (November-March):</strong> Fewer crowds and lush green landscapes</li>
                            <li><strong>Festivals:</strong> Check for traditional ceremonies and art festivals throughout the year</li>
                        </ul>

                        <h3>Practical Tips for Visiting Ubud</h3>
                        <ul>
                            <li>Rent a scooter or use ride-hailing apps for exploring surrounding areas</li>
                            <li>Visit early morning or late afternoon to avoid crowds at popular sites</li>
                            <li>Carry cash as many small shops and warungs don't accept cards</li>
                            <li>Respect local customs and dress modestly when visiting temples</li>
                            <li>Try a traditional Balinese massage for ultimate relaxation</li>
                        </ul>

                        <p>Ubud represents the very essence of Bali - a place where ancient traditions meet modern creativity, and natural beauty intertwines with spiritual depth. Whether you're an art lover, wellness seeker, or simply someone looking to experience authentic Balinese culture, Ubud offers an unforgettable journey into the heart of the island.</p>
                    </div>
                </div>
            `
        },
        'uluwatu-temple': {
            title: 'Uluwatu Temple: Where Cliffs Meet the Indian Ocean',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-uluwatu.jpg" alt="Uluwatu Temple Sunset" onerror="this.src='https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 18, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Uluwatu: Bali's Dramatic Cliffside Temple</h2>

                        <p>Perched dramatically on a 70-meter cliff overlooking the Indian Ocean, Uluwatu Temple (Pura Luhur Uluwatu) is one of Bali's most spectacular sights. This ancient temple combines breathtaking natural beauty with rich cultural significance, making it a must-visit destination for any Bali traveler.</p>

                        <h3>A Sacred Site with Ancient Roots</h3>
                        <p>Believed to date back to the 10th century, Uluwatu Temple is one of Bali's six most important directional temples (Sad Kahyangan). Dedicated to Rudra, the god of the elements, the temple serves as a guardian of the southwest tip of Bali. The word "Uluwatu" means "rock at the end" in Balinese, perfectly describing its precarious location.</p>

                        <h3>Spectacular Sunsets and Photo Opportunities</h3>
                        <p>The temple's cliffside location offers unparalleled sunset views, especially during the dry season when the sun dips below the horizon in a blaze of orange and pink. Professional photographers and casual visitors alike are drawn to this natural spectacle. The best viewing spots are along the clifftop paths that surround the temple complex.</p>

                        <h3>The Famous Kecak Dance Performances</h3>
                        <p>No visit to Uluwatu is complete without experiencing the traditional Kecak dance, performed every evening at the temple grounds. This mesmerizing performance features a choir of over 50 men chanting "chak-a-chak-a-chak" while enacting the Ramayana epic. The dramatic cliff backdrop and ocean waves crashing below create an unforgettable atmosphere.</p>

                        <h3>Exploring the Temple Complex</h3>
                        <p>The temple itself consists of several structures connected by stone pathways. The main courtyard features traditional Balinese architecture with thatched roofs and intricate stone carvings. Visitors can walk along the cliff edges (use caution!) to see the waves crashing against the rocks 100 meters below. The temple's guardian statues and ancient shrines add to its mystical ambiance.</p>

                        <h3>The Legend of the Snake Guardian</h3>
                        <p>According to local legend, a snake once guarded the temple and protected it from danger. While you might not see an actual snake today, the story adds to the temple's mystical reputation. The temple priests still perform ceremonies to honor this legendary guardian.</p>

                        <h3>Wildlife and Nature</h3>
                        <p>Uluwatu is also home to a small monkey forest where hundreds of grey long-tailed macaques roam freely. These entertaining creatures are accustomed to human visitors but can be mischievous - keep your belongings secure! The surrounding area features beautiful beaches and coral reefs perfect for snorkeling.</p>

                        <h3>Best Time to Visit and Practical Information</h3>
                        <ul>
                            <li><strong>Sunset Hours:</strong> Arrive 30 minutes before sunset (around 5-6 PM depending on season)</li>
                            <li><strong>Dress Code:</strong> Modest clothing required - sarongs available for rent</li>
                            <li><strong>Entry Fee:</strong> Approximately 50,000 IDR for foreigners</li>
                            <li><strong>Kecak Dance:</strong> Evening performances several times a week</li>
                            <li><strong>Weather:</strong> Can be windy at the cliff edges - hold onto hats and loose items</li>
                        </ul>

                        <h3>Tips for Your Visit</h3>
                        <ul>
                            <li>Arrive early to beat the crowds and secure good sunset viewing spots</li>
                            <li>Bring a light jacket or sarong as it can get chilly at sunset</li>
                            <li>Stay for the Kecak dance performance for a complete cultural experience</li>
                            <li>Use the temple's restrooms before exploring the cliff paths</li>
                            <li>Combine your visit with nearby beaches like Dreamland or Padang Padang</li>
                        </ul>

                        <p>Uluwatu Temple represents the perfect marriage of Bali's natural beauty and spiritual heritage. The dramatic cliffs, crashing waves, and ancient temple create an atmosphere that's both awe-inspiring and deeply spiritual. Whether you come for the sunset, the dance, or simply to feel the power of this sacred place, Uluwatu is sure to leave a lasting impression.</p>
                    </div>
                </div>
            `
        },
        'nusa-penida': {
            title: 'Nusa Penida: An Island Paradise Off Bali\'s Coast',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-nusa-penida.jpg" alt="Nusa Penida Island Paradise" onerror="this.src='https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 16, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Nusa Penida: Bali's Tranquil Island Escape</h2>

                        <p>Just a short boat ride from Bali's mainland, Nusa Penida offers a completely different experience from the bustling tourist areas. This serene island paradise features dramatic limestone cliffs, pristine beaches, and crystal-clear waters that have made it a favorite destination for adventurous travelers and nature lovers.</p>

                        <h3>Kelingking Beach: The Island's Crown Jewel</h3>
                        <p>No visit to Nusa Penida is complete without seeing Kelingking Beach, often called the most photographed beach in Bali. This stunning beach features a unique T-Rex shaped limestone formation that juts dramatically into the turquoise waters below. The steep hike down to the beach rewards you with powdery white sand and incredibly clear waters perfect for swimming and snorkeling.</p>

                        <h3>Angel's Billabong: A Natural Infinity Pool</h3>
                        <p>This natural wonder features a crystal-clear pool connected to the ocean through a narrow channel, creating the illusion of an infinity pool. The vibrant blue waters and surrounding limestone formations make it one of the most Instagram-worthy spots on the island. The best photos are captured from the viewing platforms above.</p>

                        <h3>Crystal Bay and Broken Beach</h3>
                        <p>Crystal Bay offers calm waters perfect for swimming and snorkeling, with excellent visibility for viewing marine life. Nearby Broken Beach features a collapsed cave that has created a natural bridge over the ocean. Both spots showcase Nusa Penida's unique geology and offer opportunities for adventure and relaxation.</p>

                        <h3>Island Culture and Village Life</h3>
                        <p>Nusa Penida offers a glimpse into traditional Balinese life away from the tourist crowds. Visit local villages to see traditional housing, temples, and daily life. The island's main town, Sampalan, features a bustling market and local warungs serving fresh seafood and traditional dishes.</p>

                        <h3>Marine Life and Snorkeling</h3>
                        <p>The waters around Nusa Penida are renowned for their marine biodiversity. Snorkelers can expect to see colorful coral gardens, tropical fish, turtles, and even manta rays. The coral reefs here are some of the healthiest in Bali, offering incredible underwater experiences for both beginners and experienced divers.</p>

                        <h3>Temples and Sacred Sites</h3>
                        <p>The island is home to several important temples, including Pura Dalem Penataran Ped, one of Bali's largest temples dedicated to the dead. The temple complex features unique architecture and is an important site for Hindu ceremonies. Visitors can also explore smaller village temples that dot the landscape.</p>

                        <h3>Getting There and Getting Around</h3>
                        <p>Fast ferries depart regularly from Sanur and Benoa, taking about 45 minutes to reach Buyuk Harbor. Once on the island, rent a scooter or use local bemos (minivans) to explore. The roads can be challenging, so scooter riders should be experienced. Guided tours are also available for those preferring organized transportation.</p>

                        <h3>Best Time to Visit Nusa Penida</h3>
                        <ul>
                            <li><strong>Dry Season (April-October):</strong> Calm seas, clear waters, and reliable weather</li>
                            <li><strong>Peak Season (June-August):</strong> Popular with tourists but can be crowded</li>
                            <li><strong>Off Season (November-March):</strong> Fewer crowds but occasional rough seas</li>
                        </ul>

                        <h3>Practical Tips for Your Trip</h3>
                        <ul>
                            <li>Start your day early to avoid crowds at popular spots like Kelingking Beach</li>
                            <li>Bring plenty of water, sun protection, and sturdy shoes for hiking</li>
                            <li>Respect local customs and dress modestly when visiting temples</li>
                            <li>Try the fresh seafood at local warungs - it's incredibly fresh and affordable</li>
                            <li>Consider staying overnight to experience the island's peaceful atmosphere</li>
                        </ul>

                        <h3>Sustainable Tourism</h3>
                        <p>Nusa Penida is committed to responsible tourism. Support local businesses, minimize your environmental impact, and participate in beach cleanups if available. The island's pristine beauty depends on visitors respecting this fragile ecosystem.</p>

                        <p>Nusa Penida offers a perfect escape from Bali's tourist trail, providing authentic experiences and natural beauty that few other destinations can match. Whether you're seeking adventure, photography opportunities, or simply a peaceful retreat, this island paradise delivers unforgettable memories and a deeper connection with Bali's natural wonders.</p>
                    </div>
                </div>
            `
        },
        'tanah-lot': {
            title: 'Tanah Lot: Bali\'s Iconic Sea Temple',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-tanah-lot.jpg" alt="Tanah Lot Temple" onerror="this.src='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 14, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Tanah Lot: The Temple That Defies the Sea</h2>

                        <p>Tanah Lot, Bali's most photographed temple, stands as a testament to the island's unique blend of natural beauty and spiritual significance. Perched dramatically on a rock formation surrounded by the relentless waves of the Indian Ocean, this iconic temple has become synonymous with Bali itself.</p>

                        <h3>The Legend of Tanah Lot</h3>
                        <p>According to local legend, Tanah Lot was built by the 16th-century priest Dang Hyang Nirartha, who was drawn to the area by its spiritual energy. As he meditated on the rock, it began to grow, creating the foundation for the temple. The name "Tanah Lot" means "land in the sea" in Balinese, referring to the temple's precarious oceanic location.</p>

                        <h3>The Sacred Snake Guardian</h3>
                        <p>One of Tanah Lot's most famous legends involves a sacred snake that once protected the temple. The story goes that a priest transformed into a snake to guard the temple from evil spirits. While the snake is no longer visible, the legend lives on, and visitors can see a small shrine dedicated to this mythical protector.</p>

                        <h3>Architectural Marvel and Design</h3>
                        <p>The temple complex consists of two main structures: the main temple on the rock and a smaller shrine on the cliff above. Connected by a narrow stone bridge, the temple features traditional Balinese architecture with intricate carvings, thatched roofs, and stone pathways. The design reflects Bali's unique adaptation to its coastal environment.</p>

                        <h3>The Dramatic Sunset Experience</h3>
                        <p>Tanah Lot is particularly spectacular at sunset when the temple is silhouetted against the colorful sky. The crashing waves, golden light, and spiritual atmosphere create one of Bali's most memorable experiences. Professional photographers and casual visitors alike are drawn to capture this magical moment.</p>

                        <h3>The Temple Grounds and Surroundings</h3>
                        <p>The area around Tanah Lot features a complex of temples, shrines, and supporting structures. Visitors can explore the upper temple area, which includes a museum showcasing the temple's history and significance. The surrounding cliffs offer stunning views and make for excellent photography opportunities.</p>

                        <h3>Cultural Significance</h3>
                        <p>As one of Bali's directional temples (Sad Kahyangan), Tanah Lot plays a crucial role in the island's spiritual landscape. It represents the element of water and serves as a guardian of the sea. The temple hosts important ceremonies and festivals throughout the year, especially during the full moon.</p>

                        <h3>Best Photography Spots</h3>
                        <ul>
                            <li><strong>The Main Viewpoint:</strong> The classic shot with the temple on the rock and waves crashing</li>
                            <li><strong>Cliffside Angles:</strong> Unique perspectives from the surrounding cliffs</li>
                            <li><strong>Sunset Shots:</strong> Capture the temple silhouetted against the colorful sky</li>
                            <li><strong>Detail Shots:</strong> Focus on the intricate carvings and temple architecture</li>
                        </ul>

                        <h3>Practical Information for Visitors</h3>
                        <ul>
                            <li><strong>Opening Hours:</strong> 6:00 AM to 7:00 PM daily</li>
                            <li><strong>Entry Fee:</strong> Approximately 60,000 IDR for foreigners</li>
                            <li><strong>Dress Code:</strong> Modest clothing required (sarongs available for rent)</li>
                            <li><strong>Best Time to Visit:</strong> Early morning or late afternoon to avoid crowds</li>
                        </ul>

                        <h3>Tips for Your Visit</h3>
                        <ul>
                            <li>Arrive early to beat the crowds and enjoy the peaceful morning atmosphere</li>
                            <li>Visit during sunset for the most dramatic and photogenic experience</li>
                            <li>Bring a light jacket as it can get breezy near the ocean</li>
                            <li>Explore the surrounding area with its many shops and cafes</li>
                            <li>Consider combining your visit with nearby attractions like Canggu or Seminyak</li>
                        </ul>

                        <h3>Responsible Tourism at Tanah Lot</h3>
                        <p>As one of Bali's most popular sites, Tanah Lot receives thousands of visitors daily. Help preserve this sacred site by respecting the temple's sanctity, following local guidelines, and supporting conservation efforts. Remember that you're visiting a place of worship, not just a tourist attraction.</p>

                        <p>Tanah Lot represents the perfect harmony between Bali's natural beauty and spiritual heritage. Its dramatic location and rich history make it more than just a pretty picture - it's a living testament to Bali's enduring cultural and spiritual traditions. Whether viewed from afar or explored up close, Tanah Lot captures the very essence of what makes Bali so magical.</p>
                    </div>
                </div>
            `
        },
        'danau-batur': {
            title: 'Lake Batur: Trekking to Bali\'s Volcanic Heart',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-danau-batur.jpg" alt="Danau Batur Volcano Lake" onerror="this.src='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 12, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Lake Batur: Bali's Volcanic Wonderland</h2>

                        <p>Nestled in the massive crater of Mount Batur, Lake Batur offers one of Bali's most spectacular natural wonders. This volcanic lake, surrounded by dramatic mountains and traditional villages, provides an unforgettable experience for adventurers and nature lovers alike.</p>

                        <h3>The Volcanic Landscape</h3>
                        <p>Mount Batur is Bali's most active volcano, last erupting in 2000. The lake sits at an elevation of about 1,031 meters above sea level, created by ancient volcanic activity. The surrounding crater walls rise dramatically, creating a unique microclimate and stunning visual backdrop. The lake itself covers approximately 16 square kilometers and is one of Bali's main sources of irrigation water.</p>

                        <h3>Sunrise Treks and Adventure</h3>
                        <p>The most popular way to experience Lake Batur is through a sunrise trek up Mount Batur. Starting around 2-3 AM, hikers climb for 1.5-2 hours to reach the summit in time for sunrise. The reward is breathtaking views of the lake below, shrouded in mist, as the first light of dawn illuminates the volcanic landscape. Guided treks are highly recommended for safety and cultural insights.</p>

                        <h3>Traditional Villages and Culture</h3>
                        <p>Several traditional villages dot the crater's edge, offering a glimpse into rural Balinese life. Toya Bungkah village features unique boat-shaped houses and hot springs, while Songan and Batur villages showcase traditional architecture and farming practices. The area is known for its organic coffee plantations and fresh produce grown in the fertile volcanic soil.</p>

                        <h3>Hot Springs and Relaxation</h3>
                        <p>The volcanic activity has created natural hot springs around the lake. Toya Devasya Hot Springs offers luxurious bathing pools fed by geothermal water, perfect for relaxing after a trek. The mineral-rich waters are believed to have healing properties and provide a soothing contrast to the area's rugged terrain.</p>

                        <h3>Boating and Lake Activities</h3>
                        <p>For those preferring a more relaxed experience, traditional boats (perahu) offer scenic tours of the lake. Fishermen still use these wooden boats for their daily catch, and visitors can arrange private tours to explore hidden coves and learn about local fishing traditions. The lake's calm waters reflect the surrounding mountains beautifully.</p>

                        <h3>Flora and Fauna</h3>
                        <p>The volcanic soil creates incredibly fertile ground for agriculture, and the area is famous for its organic vegetables and fruits. Bird watchers will appreciate the diverse avian population, including the rare Bali starling. The surrounding forests feature unique volcanic flora adapted to the harsh environment.</p>

                        <h3>The Legend and Spiritual Significance</h3>
                        <p>According to local legend, the lake was formed when the gods flooded the crater to stop Mount Batur's eruptions. The area holds spiritual significance for Balinese Hindus, with several temples around the lake serving as places of worship and ceremony. The most notable is Pura Ulun Danu Batur, dedicated to the goddess of lakes and mountains.</p>

                        <h3>Best Time to Visit</h3>
                        <ul>
                            <li><strong>Dry Season (April-October):</strong> Clear skies perfect for sunrise treks and lake views</li>
                            <li><strong>Wet Season (November-March):</strong> Fewer crowds and lush green landscapes</li>
                            <li><strong>Sunrise Treks:</strong> Available year-round but best during dry season</li>
                        </ul>

                        <h3>Trek Preparation and Safety</h3>
                        <ul>
                            <li><strong>Physical Fitness:</strong> Treks involve 1.5-2 hours of steep climbing - good fitness required</li>
                            <li><strong>Guided Tours:</strong> Always use certified guides for safety and cultural insights</li>
                            <li><strong>Gear:</strong> Bring warm clothing, good shoes, headlamp, and rain jacket</li>
                            <li><strong>Health:</strong> Acclimatize to altitude and stay hydrated</li>
                        </ul>

                        <h3>Accommodation and Dining</h3>
                        <p>The area offers various accommodation options from luxury resorts to traditional homestays. Local restaurants serve fresh lake fish, organic vegetables, and traditional Balinese cuisine. The volcanic soil produces some of Bali's best coffee, so don't miss trying the local brew.</p>

                        <h3>Sustainable Tourism</h3>
                        <p>Lake Batur's ecosystem is fragile and depends on responsible tourism. Choose eco-friendly operators, support local communities, and follow Leave No Trace principles. The area's preservation ensures that future generations can enjoy this natural wonder.</p>

                        <p>Lake Batur represents Bali's raw natural power and beauty. Whether you choose to trek to the summit for sunrise or explore the traditional villages around the lake, the experience offers a profound connection with Bali's volcanic origins and the enduring spirit of its people. It's not just a destination - it's a journey into the heart of Bali's natural and cultural heritage.</p>
                    </div>
                </div>
            `
        },
        'kuta-beach': {
            title: 'Kuta Beach: Bali\'s Surfing Paradise and Nightlife Hub',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-kuta.jpg" alt="Kuta Beach Surf Paradise" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 10, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Kuta Beach: Where Bali's Adventure Begins</h2>

                        <p>Kuta Beach, Bali's most famous stretch of sand, has been a gateway to the island for generations of travelers. From world-class surfing waves to vibrant nightlife, this legendary beach offers everything that put Bali on the global tourist map.</p>

                        <h3>Surfing Capital of Bali</h3>
                        <p>Kuta's reputation as a surfing paradise is legendary. The beach's consistent waves make it perfect for surfers of all levels. Professional surf schools offer lessons for beginners, while experienced riders flock here for the challenging breaks. The most famous wave is "Kuta Beach Break," which can reach up to 6 feet during the dry season.</p>

                        <h3>The Beach Experience</h3>
                        <p>Stretching for about 5 kilometers, Kuta Beach features golden sand and the rhythmic crash of waves. The beach is lined with beach clubs, restaurants, and bars, creating a lively atmosphere. Early morning finds locals practicing yoga and tai chi, while afternoons bring families and picnickers. Evenings transform the beach into a social hub with beach volleyball and sunset gatherings.</p>

                        <h3>Nightlife and Entertainment</h3>
                        <p>Kuta is synonymous with Bali's legendary nightlife. The area features hundreds of bars, clubs, and restaurants catering to every taste. Beachfront clubs offer live music and DJs, while the famous "Kuta Beachwalk" provides shopping and dining options. The nightlife here is energetic and welcoming, attracting party-goers from around the world.</p>

                        <h3>Cultural and Historical Significance</h3>
                        <p>While Kuta is known for tourism, it has deep cultural roots. The area was once a fishing village, and you can still see traditional fishing boats (jukung) dotting the shore. Several temples, including the important Pura Petitenget, reflect the area's Hindu heritage. The name "Kuta" itself comes from the Balinese word for "kite," referring to the kite-flying tradition.</p>

                        <h3>Shopping and Commerce</h3>
                        <p>Kuta has evolved into Bali's shopping capital. From street markets selling souvenirs to modern malls, the area offers everything from local handicrafts to international brands. The traditional markets (pasar) are great for experiencing local commerce and bargaining culture.</p>

                        <h3>Water Sports and Activities</h3>
                        <p>Beyond surfing, Kuta offers numerous water activities including parasailing, jet skiing, and banana boat rides. The clear waters are also excellent for swimming, especially during calm periods. Beach volleyball courts and other recreational facilities add to the fun.</p>

                        <h3>Accommodation Options</h3>
                        <p>Kuta offers every type of accommodation imaginable, from budget guesthouses to luxury resorts. Many properties feature beachfront locations with stunning sunset views. The variety of options makes Kuta accessible to travelers with different budgets and preferences.</p>

                        <h3>Best Time to Visit Kuta</h3>
                        <ul>
                            <li><strong>Dry Season (April-October):</strong> Perfect surfing conditions and sunny weather</li>
                            <li><strong>Peak Season (June-August):</strong> Maximum crowds and highest energy</li>
                            <li><strong>Shoulder Season:</strong> Good weather with fewer tourists</li>
                        </ul>

                        <h3>Practical Tips for Kuta Visitors</h3>
                        <ul>
                            <li>Learn to surf - it's the ultimate Kuta experience</li>
                            <li>Use reef-safe sunscreen to protect the marine environment</li>
                            <li>Stay aware of currents when swimming, especially during rough surf</li>
                            <li>Try local street food for authentic Balinese flavors</li>
                            <li>Visit early morning or late evening to experience the beach's different moods</li>
                        </ul>

                        <h3>The Changing Face of Kuta</h3>
                        <p>While Kuta has transformed significantly since the 1970s, it still retains its pioneering spirit. The beach that launched Bali's tourism industry continues to evolve, balancing its party reputation with growing environmental consciousness and cultural preservation.</p>

                        <p>Kuta Beach represents the vibrant, adventurous spirit that first made Bali famous. Whether you're chasing waves, exploring nightlife, or simply enjoying the beach atmosphere, Kuta offers an authentic taste of Bali's dynamic energy. It's more than a destination - it's where countless Bali stories begin.</p>
                    </div>
                </div>
            `
        },
        'seminyak': {
            title: 'Seminyak: Where Luxury Meets Beach Culture',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-seminyak.jpg" alt="Seminyak Beach Lifestyle" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 8, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Seminyak: Bali's Sophisticated Beach Destination</h2>

                        <p>Seminyak has emerged as Bali's most stylish and sophisticated beach destination, offering a perfect blend of luxury, culture, and beach lifestyle. This trendy area attracts fashion designers, digital nomads, and luxury travelers seeking the finer things in life.</p>

                        <h3>Luxury Beachfront Living</h3>
                        <p>Seminyak's beachfront is lined with high-end resorts, boutique hotels, and luxury villas. The area features some of Bali's most exclusive properties, offering stunning ocean views, infinity pools, and world-class service. Beach clubs like Potato Head and Ku De Ta have become global destinations in themselves.</p>

                        <h3>Culinary Excellence</h3>
                        <p>Seminyak boasts one of Bali's most diverse and sophisticated food scenes. From celebrity-chef restaurants to trendy cafes, the area offers everything from fine dining to casual beach eateries. Popular spots include Sarong for traditional Balinese food, Ultimo for Italian cuisine, and The Sardine for fresh seafood.</p>

                        <h3>Shopping Paradise</h3>
                        <p>The area is famous for its high-end shopping. Seminyak Square offers luxury brands, while the surrounding streets feature boutique shops, art galleries, and designer stores. The famous "Eat Street" (Jalan Laksmana) combines shopping with dining, creating a vibrant street culture.</p>

                        <h3>Art and Culture Scene</h3>
                        <p>Seminyak has become Bali's art district, with numerous galleries showcasing contemporary and traditional art. The area hosts regular art markets, exhibitions, and cultural events. Many international artists and designers have made Seminyak their home, contributing to its creative atmosphere.</p>

                        <h3>Beach Lifestyle and Activities</h3>
                        <p>While luxurious, Seminyak maintains a relaxed beach vibe. Morning yoga sessions, sunset beach walks, and water sports are popular activities. The beach itself offers calm waters perfect for swimming and paddleboarding. The area is also known for its spa scene, with world-class wellness centers offering traditional and modern treatments.</p>

                        <h3>Nightlife and Entertainment</h3>
                        <p>Seminyak's nightlife is sophisticated rather than raucous. Trendy bars, wine lounges, and beach clubs offer a more refined evening experience compared to nearby Kuta. Live music venues and art house cinemas add to the cultural entertainment options.</p>

                        <h3>Digital Nomad Hub</h3>
                        <p>The area has become a favorite for digital nomads and remote workers. Fast internet, co-working spaces, and a cosmopolitan atmosphere make it ideal for those working while traveling. Many cafes offer long-term work spaces with reliable WiFi.</p>

                        <h3>Architecture and Design</h3>
                        <p>Seminyak showcases stunning modern architecture alongside traditional Balinese design. Luxury villas, boutique hotels, and private residences feature innovative designs that blend seamlessly with the tropical environment. The area has become a showcase for contemporary Balinese architecture.</p>

                        <h3>Wellness and Fitness</h3>
                        <p>The area offers numerous wellness options from yoga studios to luxury spas. Popular studios include The Yoga Barn and numerous boutique fitness centers. The healthy lifestyle culture is evident in the abundance of organic cafes and wellness-focused businesses.</p>

                        <h3>Best Time to Visit Seminyak</h3>
                        <ul>
                            <li><strong>Year-round:</strong> Seminyak's appeal extends beyond typical tourist seasons</li>
                            <li><strong>Dry Season:</strong> Perfect for beach activities and outdoor dining</li>
                            <li><strong>Festivals:</strong> Check for art festivals and cultural events</li>
                        </ul>

                        <h3>Lifestyle Tips for Seminyak</h3>
                        <ul>
                            <li>Rent a scooter or use ride-hailing services for exploring</li>
                            <li>Book beach clubs in advance during peak times</li>
                            <li>Try the local fashion boutiques for unique finds</li>
                            <li>Experience the art scene by visiting galleries and markets</li>
                            <li>Join a yoga class for a truly local experience</li>
                        </ul>

                        <p>Seminyak represents the evolution of Bali's tourism industry - sophisticated, cultured, and luxurious while maintaining the island's relaxed charm. It's a destination that appeals to those seeking quality over quantity, style over simplicity, and culture over crowds. In Seminyak, Bali meets the world on its own terms.</p>
                    </div>
                </div>
            `
        },
        'munduk': {
            title: 'Munduk: Bali\'s Hidden Waterfall Paradise',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-munduk.jpg" alt="Munduk Waterfalls Paradise" onerror="this.src='https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 6, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Munduk: Bali's Serene Mountain Escape</h2>

                        <p>Tucked away in Bali's northern mountains, Munduk offers a tranquil escape from the island's tourist crowds. This small village, surrounded by lush coffee plantations and cascading waterfalls, provides an authentic glimpse into rural Balinese life and natural beauty.</p>

                        <h3>Waterfall Wonderland</h3>
                        <p>Munduk is famous for its spectacular waterfalls, each offering a unique experience. The most popular are Banyu Wana and Tamblingan, featuring crystal-clear pools perfect for swimming. The 7-roof waterfall and nearby hot springs add to the area's natural attractions. Each waterfall has its own character, from powerful cascades to serene pools.</p>

                        <h3>Coffee and Spice Plantations</h3>
                        <p>The fertile volcanic soil produces some of Bali's finest coffee and spices. Visit working plantations to learn about the traditional farming methods and taste freshly roasted coffee. The area is particularly known for its organic arabica coffee and vanilla production. Many plantations offer tours and tastings.</p>

                        <h3>Traditional Village Life</h3>
                        <p>Munduk provides an authentic look at rural Balinese life. Traditional villages with thatched roofs, terraced rice fields, and communal temples dot the landscape. The local community maintains strong traditional customs, offering visitors a genuine cultural experience away from tourist areas.</p>

                        <h3>Mountain Views and Hiking</h3>
                        <p>The area offers stunning panoramic views of Bali's central mountains and volcanoes. Hiking trails wind through coffee plantations and rice terraces, leading to hidden viewpoints. The cooler mountain climate makes hiking comfortable year-round. Popular trails include paths to Munduk Ridge and nearby villages.</p>

                        <h3>Homestays and Local Hospitality</h3>
                        <p>Munduk is ideal for those seeking authentic accommodation. Family-run homestays and small guesthouses offer personal service and cultural immersion. Many places provide traditional Balinese meals made with local ingredients. The hospitality here is genuine and welcoming.</p>

                        <h3>Flora and Biodiversity</h3>
                        <p>The region's biodiversity is remarkable, with numerous orchid species, exotic birds, and butterflies. The Munduk Botanical Gardens showcase local and introduced plant species. Nature lovers will appreciate the diverse ecosystems, from misty cloud forests to fertile agricultural lands.</p>

                        <h3>Spiritual and Cultural Sites</h3>
                        <p>Several small temples and sacred sites dot the landscape, reflecting the area's spiritual significance. The Pura Puncak Munduk offers panoramic views and serves as an important local temple. Traditional ceremonies and festivals maintain the area's cultural heritage.</p>

                        <h3>Adventure Activities</h3>
                        <p>Beyond relaxation, Munduk offers adventure opportunities including canyoning, white-water tubing, and mountain biking. The nearby Gitgit waterfall area provides additional hiking and swimming options. Guided tours can combine multiple activities for a full day of adventure.</p>

                        <h3>Best Time to Visit Munduk</h3>
                        <ul>
                            <li><strong>Dry Season (April-October):</strong> Clear skies and accessible trails</li>
                            <li><strong>Wet Season (November-March):</strong> Lush landscapes and fewer tourists</li>
                            <li><strong>Shoulder Seasons:</strong> Comfortable temperatures and moderate crowds</li>
                        </ul>

                        <h3>Practical Tips for Munduk</h3>
                        <ul>
                            <li>The drive from south Bali takes 2-3 hours - consider an overnight stay</li>
                            <li>Bring warm clothing as mountain evenings can be cool</li>
                            <li>Respect local customs and dress modestly when visiting temples</li>
                            <li>Try the local coffee and spices at plantation visits</li>
                            <li>Use mosquito repellent, especially in wet season</li>
                        </ul>

                        <h3>Sustainable Tourism in Munduk</h3>
                        <p>Munduk's appeal lies in its untouched beauty. Support local businesses, minimize environmental impact, and choose eco-friendly operators. The community's commitment to preservation ensures Munduk remains a peaceful retreat.</p>

                        <p>Munduk offers a perfect counterpoint to Bali's beach resorts, providing natural beauty, cultural authenticity, and peaceful surroundings. Whether seeking adventure, relaxation, or cultural immersion, Munduk delivers an unforgettable experience that captures the true spirit of rural Bali.</p>
                    </div>
                </div>
            `
        },
        'jimbaran': {
            title: 'Jimbaran: Sunset Seafood and Beach Perfection',
            content: `
                <div class="blog-post-content">
                    <div class="blog-post-image">
                        <img src="../../assets/images/blog-jimbaran.jpg" alt="Jimbaran Seafood Paradise" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'">
                    </div>

                    <div class="blog-post-meta">
                        <span class="date"><i class="fas fa-calendar"></i> January 4, 2025</span>
                        <span class="author"><i class="fas fa-user"></i> AR Bali Team</span>
                        <span class="category"><i class="fas fa-tag"></i> Destinations</span>
                    </div>

                    <div class="blog-post-body">
                        <h2>Jimbaran: Bali's Seafood Paradise</h2>

                        <p>Jimbaran, a charming fishing village on Bali's southwest coast, has become world-famous for its beachfront seafood restaurants and spectacular sunsets. This traditional village offers the perfect blend of authentic local culture, fresh seafood, and stunning beach scenery.</p>

                        <h3>The Seafood Experience</h3>
                        <p>Jimbaran is synonymous with fresh seafood dining. Over 20 beachfront restaurants line the shore, offering an incredible variety of grilled fish, prawns, squid, and lobster. The seafood is incredibly fresh, sourced directly from local fishermen. Dining barefoot on the beach as the sun sets has become a Jimbaran tradition.</p>

                        <h3>Spectacular Sunsets</h3>
                        <p>The sunsets in Jimbaran are legendary. The western exposure and clear horizon create breathtaking displays of color as the sun dips below the Indian Ocean. Many restaurants time their service around sunset, making it the perfect time for dining. The combination of good food and stunning views is unbeatable.</p>

                        <h3>Fishing Village Heritage</h3>
                        <p>Despite its tourist fame, Jimbaran maintains its identity as a working fishing village. Traditional jukung boats dot the shore, and you can watch fishermen bringing in their daily catch. The village's history dates back centuries, with evidence of maritime activity long before tourism arrived.</p>

                        <h3>Beach and Coastal Beauty</h3>
                        <p>The beach itself is beautiful, with soft white sand and calm waters perfect for swimming. The coastline features rocky outcrops and small coves, creating natural divisions between restaurant areas. Early morning beach walks offer a peaceful experience away from the dinner crowds.</p>

                        <h3>Cultural and Temple Sites</h3>
                        <p>Jimbaran is home to several important temples, including Pura Ulun Siwi and Pura Luhur Uluwatu (nearby). The village maintains strong Hindu traditions, with regular ceremonies and festivals. Visitors can observe traditional fishing rituals and community events.</p>

                        <h3>Water Sports and Activities</h3>
                        <p>The calm waters make Jimbaran ideal for various water activities including snorkeling, paddleboarding, and glass-bottom boat tours. Several operators offer dolphin-watching tours and fishing trips. The area is also popular for stand-up paddleboarding and kayaking.</p>

                        <h3>Markets and Local Life</h3>
                        <p>The traditional market offers fresh produce, spices, and local delicacies. Exploring the village streets reveals traditional Balinese architecture and daily life. The area balances tourism with authentic local culture remarkably well.</p>

                        <h3>Accommodation Options</h3>
                        <p>Jimbaran offers everything from luxury beach resorts to budget guesthouses. Many properties feature ocean views and easy access to the seafood restaurants. The area is particularly popular for short stays focused on dining and relaxation.</p>

                        <h3>Best Time to Visit Jimbaran</h3>
                        <ul>
                            <li><strong>Sunset Dining:</strong> Year-round, but especially magical during dry season</li>
                            <li><strong>Low Season:</strong> Fewer crowds and more authentic experience</li>
                            <li><strong>Festivals:</strong> Check for local temple ceremonies and fishing festivals</li>
                        </ul>

                        <h3>Dining Tips for Jimbaran</h3>
                        <ul>
                            <li>Arrive early for sunset reservations - popular restaurants book up</li>
                            <li>Fresh seafood is the specialty - try the mixed grill platters</li>
                            <li>Many restaurants offer similar menus - compare prices and ambiance</li>
                            <li>Bring mosquito repellent for evening dining</li>
                            <li>Try local Bintang beer or tropical cocktails with your meal</li>
                        </ul>

                        <h3>Sustainable Seafood Practices</h3>
                        <p>Jimbaran's seafood industry supports sustainable fishing practices. Many restaurants work with local fishermen who use traditional, environmentally friendly methods. Supporting these businesses helps preserve both the marine ecosystem and local livelihoods.</p>

                        <p>Jimbaran represents the perfect marriage of Bali's natural beauty, culinary excellence, and cultural authenticity. The combination of fresh seafood, stunning sunsets, and genuine hospitality makes it more than just a dining destination - it's an experience that captures the essence of coastal Bali. Whether you're a food lover, sunset chaser, or culture seeker, Jimbaran offers unforgettable memories on Bali's beautiful southwest coast.</p>
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

        .blog-card:hover .read-more-btn {
            transform: none;
            opacity: 1;
            visibility: visible;
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
            background: var(--secondary-color);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
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