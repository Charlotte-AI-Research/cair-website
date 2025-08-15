// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const importantLinksSection = document.querySelector('.important-links');
            if (importantLinksSection) {
                const offsetTop = importantLinksSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const animatedSections = document.querySelectorAll('section:not(.hero)');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Staggered animation for cards
    const cardSections = ['.events-grid', '.initiatives-grid', '.exec-grid', '.links-grid'];
    cardSections.forEach(sectionSelector => {
        const section = document.querySelector(sectionSelector);
        if (section) {
            const cards = section.children;
            Array.from(cards).forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
                
                const cardObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);
                
                cardObserver.observe(card);
            });
        }
    });

    // Enhanced hover effects for initiative cards
    const initiativeCards = document.querySelectorAll('.initiative-card');
    initiativeCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            if (learnMoreBtn) {
                learnMoreBtn.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (learnMoreBtn) {
                learnMoreBtn.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Enhanced hover effects for exec cards
    const execCards = document.querySelectorAll('.exec-card');
    execCards.forEach(card => {
        const avatar = card.querySelector('.exec-avatar');
        
        card.addEventListener('mouseenter', function() {
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
                avatar.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
                avatar.style.boxShadow = 'none';
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent && scrolled <= hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = Math.max(0, 1 - scrolled / hero.offsetHeight);
        }
    });

    // Active navigation highlighting
    const scrollSections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navigationLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid #8b5cf6';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Mouse cursor trail effect (optional enhancement)
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function createTrail() {
        trail.push({x: mouseX, y: mouseY});
        if (trail.length > 5) {
            trail.shift();
        }
    }

    setInterval(createTrail, 50);

    // Logo hover animation enhancement
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    if (logoPlaceholder) {
        logoPlaceholder.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.5)';
            this.style.background = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
        });
        
        logoPlaceholder.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
            this.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
        });
    }

    // Gallery Auto-Scroll - Pure CSS Transform Approach
    console.log('Script loaded!');
    
    setTimeout(() => {
        console.log('Setting up gallery animation...');
        
        const galleryTrack = document.querySelector('.gallery-track');
        
        if (galleryTrack) {
            console.log('Gallery track found');
            
            const galleryItems = galleryTrack.querySelectorAll('.gallery-item');
            console.log('Found', galleryItems.length, 'gallery items');
            
            // Create CSS animation for infinite scroll
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .gallery-track {
                    animation: infiniteScroll 25s linear infinite;
                }
                
                @keyframes infiniteScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `;
            document.head.appendChild(styleSheet);
            
            console.log('Applied pure CSS infinite scroll animation');
            console.log('Gallery will scroll continuously at faster speed');
            
        } else {
            console.log('Gallery track not found');
        }
    }, 1000);

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('mediaModal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Stop any playing videos
                const videos = document.querySelectorAll('#modalMediaContainer video');
                videos.forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        }
    });

    // Try to load calendar events, but fall back to static events if it fails
    calendarManager.init();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: #8b5cf6 !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Modal functionality for media preview (must be global for onclick handlers)
function openModal(src, type) {
    const modal = document.getElementById('mediaModal');
    const container = document.getElementById('modalMediaContainer');
    
    // Clear previous content
    container.innerHTML = '';
    
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Preview';
        container.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        
        // Add multiple source formats
        const sourceWebm = document.createElement('source');
        sourceWebm.src = src.replace('.mov', '.webm');
        sourceWebm.type = 'video/webm';
        
        const sourceMp4 = document.createElement('source');
        sourceMp4.src = src.replace('.mov', '.mp4');
        sourceMp4.type = 'video/mp4';
        
        const sourceMov = document.createElement('source');
        sourceMov.src = src;
        sourceMov.type = 'video/quicktime';
        
        video.appendChild(sourceWebm);
        video.appendChild(sourceMp4);
        video.appendChild(sourceMov);
        
        container.appendChild(video);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(event) {
    const modal = document.getElementById('mediaModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Close if clicking outside modal content or on close button
    if (event.target === modal || event.target.classList.contains('modal-close')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Stop any playing videos
        const videos = document.querySelectorAll('#modalMediaContainer video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }
}

// Google Calendar Integration
class CalendarManager {
    constructor() {
        this.config = typeof CALENDAR_CONFIG !== 'undefined' ? CALENDAR_CONFIG : {
            CALENDAR_ID: 'c_d50ea02d93d3f4550a3851ca08882e347c006117d02f302c4f2010cb86aa9f89@group.calendar.google.com',
            API_KEY: 'AIzaSyBYBTzUSpumIfrOK4QGMl2DRX4wrGL_5w4',
            MAX_RESULTS: 6,
            SHOW_PAST_EVENTS: false
        };
        
        this.eventsGrid = null;
        this.eventsLoading = null;
        this.eventsError = null;

        try {
            const maskedKey = this.config.API_KEY ? `${this.config.API_KEY.slice(0, 6)}...${this.config.API_KEY.slice(-4)}` : '(none)';
            console.log('[Calendar] Constructor config:', {
                calendarId: this.config.CALENDAR_ID,
                apiKey: maskedKey,
                maxResults: this.config.MAX_RESULTS,
                showPastEvents: this.config.SHOW_PAST_EVENTS
            });
        } catch (_) {}
    }
    
    init() {
        console.log('[Calendar] init() called');
        this.eventsGrid = document.getElementById('events-grid');
        this.eventsLoading = document.getElementById('events-loading');
        this.eventsError = document.getElementById('events-error');
        
        console.log('[Calendar] Elements found:', {
            hasGrid: !!this.eventsGrid,
            hasLoading: !!this.eventsLoading,
            hasError: !!this.eventsError
        });
        
        if (!this.eventsGrid) {
            console.error('[Calendar] Events grid element not found');
            return;
        }
        
        this.loadEvents();
    }
    
    async loadEvents() {
        console.log('[Calendar] loadEvents() starting');
        this.showLoading();
        
        try {
            // Check if API key is configured
            const hasApiKey = !!this.config.API_KEY && this.config.API_KEY !== '';
            console.log('[Calendar] API key present?', hasApiKey);
            if (!hasApiKey) {
                console.log('[Calendar] Google Calendar API key not configured');
                this.showError('Calendar integration not configured. Please check back later.');
                return;
            }
            
            const events = await this.fetchCalendarEvents();
            console.log('[Calendar] fetchCalendarEvents() returned', events ? events.length : 0, 'items');
            
            if (events && events.length > 0) {
                this.displayEvents(events);
                console.log(`[Calendar] Loaded ${events.length} events from Google Calendar`);
            } else {
                console.log('[Calendar] No upcoming events found');
                this.showError('No upcoming events scheduled at this time. Check back soon for new events!');
            }
            
        } catch (error) {
            console.error('[Calendar] Error loading calendar events:', error);
            this.showError('Unable to load events at this time. Please try refreshing the page.');
        }
    }
    
    async fetchCalendarEvents() {
        const now = new Date();
        const startOfDayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const userTimeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC';
        
        // Move timeMin back 12 hours to avoid excluding ongoing/all-day events due to timezone offsets
        const timeMinDate = new Date(startOfDayLocal.getTime() - 12 * 60 * 60 * 1000);
        const timeMin = this.config.SHOW_PAST_EVENTS ? '' : `&timeMin=${encodeURIComponent(timeMinDate.toISOString())}`;
        
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.config.CALENDAR_ID)}/events?key=${this.config.API_KEY}${timeMin}&maxResults=${this.config.MAX_RESULTS}&singleEvents=true&orderBy=startTime&timeZone=${encodeURIComponent(userTimeZone)}`;
        
        try {
            console.log('[Calendar] Fetching events with params:', {
                calendarId: this.config.CALENDAR_ID,
                timeMin: this.config.SHOW_PAST_EVENTS ? '(disabled)' : timeMinDate.toISOString(),
                timeZone: userTimeZone,
                maxResults: this.config.MAX_RESULTS,
                urlPreview: url.replace(this.config.API_KEY, 'REDACTED')
            });
        } catch (_) {}
        
        const response = await fetch(url);
        console.log('[Calendar] Fetch response:', { ok: response.ok, status: response.status, statusText: response.statusText });
        
        if (!response.ok) {
            throw new Error(`Calendar API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const items = data.items || [];
        try {
            console.debug('[Calendar] Raw items length:', items.length);
            console.debug('[Calendar] First items (up to 3):', items.slice(0, 3).map(e => ({
                summary: e.summary,
                start: e.start,
                end: e.end
            })));
        } catch (_) {}
        return items;
    }
    
    displayEvents(events) {
        console.log('[Calendar] displayEvents() with', events.length, 'events');
        this.eventsGrid.innerHTML = '';
        
        events.forEach(event => {
            const eventCard = this.createEventCard(event);
            this.eventsGrid.appendChild(eventCard);
        });
        
        this.hideLoading();
        this.eventsGrid.style.display = 'grid';
        console.log('[Calendar] Events rendered. Grid visible:', this.eventsGrid.style.display);
    }
    
    createEventCard(event) {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card clickable-event';
        
        // Parse event date
        const startTime = event.start.dateTime || event.start.date;
        const eventDate = new Date(startTime);
        const isAllDay = !event.start.dateTime;
        
        // Parse end time if available
        const endTime = event.end ? (event.end.dateTime || event.end.date) : null;
        const endDate = endTime ? new Date(endTime) : null;
        
        // Format date
        const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
        const day = eventDate.getDate();
        
        // Format time
        let timeString = '';
        if (!isAllDay) {
            timeString = eventDate.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        } else {
            timeString = 'All day';
        }
        
        // Extract location from event
        let location = event.location || '';
        
        // Clean up description (remove HTML tags and limit length)
        let description = event.description || '';
        description = description.replace(/<[^>]*>/g, ''); // Remove HTML tags
        description = description.trim(); // Remove whitespace
        
        // If no location in the location field, try to extract from description
        if (!location || location === '') {
            // Look for common location patterns in description
            const locationPatterns = [
                /(?:at|in|location:?\s*)([\w\s\d]+(?:hall|room|building|center|auditorium|lab|classroom)\s*\d*)/i,
                /(?:room|rm\.?\s*)(\d+\w*)/i,
                /(?:woodward|student union|library|gym|cafeteria|dining|parking)\s*(\d+\w*)?/i
            ];
            
            for (const pattern of locationPatterns) {
                const match = description.match(pattern);
                if (match) {
                    location = match[0].replace(/^(at|in|location:?\s*)/i, '').trim();
                    // Remove the location from description to avoid duplication
                    description = description.replace(match[0], '').replace(/\s+/g, ' ').trim();
                    break;
                }
            }
        }
        
        // Set default if still no location found
        if (!location || location === '') {
            location = 'Location TBD';
        }
        
        // Truncate description if too long
        let hasDescription = description && description.length > 0;
        if (hasDescription && description.length > 150) {
            description = description.substring(0, 150) + '...';
        }
        
        // Create description HTML only if there's actual content
        const descriptionHTML = hasDescription ? `<p class="event-description">${description}</p>` : '';
        
        // Create event card HTML with click indicator
        eventCard.innerHTML = `
            <div class="event-date">
                <span class="month">${month}</span>
                <span class="day">${day}</span>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.summary || 'Untitled Event'}</h3>
                ${descriptionHTML}
                <div class="event-details">
                    <span class="event-time"><i class="fas fa-clock"></i> ${timeString}</span>
                    <span class="event-location"><i class="fas fa-map-marker-alt"></i> ${location}</span>
                </div>
                <div class="event-click-hint">
                    <i class="fas fa-calendar-plus"></i> Click to add to your calendar
                </div>
            </div>
        `;
        
        // Add click event listener to open Google Calendar
        eventCard.addEventListener('click', () => {
            const calendarUrl = this.createGoogleCalendarUrl(event);
            console.log('[Calendar] Opening Google Calendar URL:', calendarUrl);
            window.open(calendarUrl, '_blank');
        });
        
        // Add hover effect
        eventCard.addEventListener('mouseenter', () => {
            eventCard.style.cursor = 'pointer';
        });
        
        return eventCard;
    }
    
    createGoogleCalendarUrl(event) {
        // Parse event dates
        const startTime = event.start.dateTime || event.start.date;
        const endTime = event.end ? (event.end.dateTime || event.end.date) : null;
        
        const startDate = new Date(startTime);
        let endDate = endTime ? new Date(endTime) : new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour duration
        
        // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ format)
        const formatDateForGoogle = (date) => {
            return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        };
        
        const formattedStart = formatDateForGoogle(startDate);
        const formattedEnd = formatDateForGoogle(endDate);
        
        // Get event details - don't double encode
        const title = event.summary || 'Event';
        const description = (event.description || '').replace(/<[^>]*>/g, ''); // Remove HTML tags
        const location = event.location || '';
        
        // Construct Google Calendar URL with proper encoding
        const baseUrl = 'https://calendar.google.com/calendar/render';
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: title,
            dates: `${formattedStart}/${formattedEnd}`,
            details: description,
            location: location,
            sf: 'true',
            output: 'xml'
        });
        
        return `${baseUrl}?${params.toString()}`;
    }
    
    showLoading() {
        console.log('[Calendar] showLoading()');
        if (this.eventsLoading) {
            this.eventsLoading.style.display = 'block';
        }
        if (this.eventsGrid) {
            this.eventsGrid.style.display = 'none';
        }
        if (this.eventsError) {
            this.eventsError.style.display = 'none';
        }
    }
    
    hideLoading() {
        console.log('[Calendar] hideLoading()');
        if (this.eventsLoading) {
            this.eventsLoading.style.display = 'none';
        }
    }
    
    showStaticEvents() {
        console.log('[Calendar] showStaticEvents() - deprecated, showing error instead');
        this.showError('No events available at this time.');
    }
    
    showError(message) {
        console.log('[Calendar] showError()', message);
        this.hideLoading();
        if (this.eventsError) {
            this.eventsError.innerHTML = `<p>${message}</p>`;
            this.eventsError.style.display = 'block';
        }
    }
}

// Initialize calendar manager
const calendarManager = new CalendarManager();

// Global function for static event clicks (must be global for onclick handlers)
function addStaticEventToCalendar(title, description, startTime, endTime, location) {
    // Parse dates
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ format)
    const formatDateForGoogle = (date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    
    const formattedStart = formatDateForGoogle(startDate);
    const formattedEnd = formatDateForGoogle(endDate);
    
    // Construct Google Calendar URL with proper encoding
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${formattedStart}/${formattedEnd}`,
        details: description,
        location: location,
        sf: 'true',
        output: 'xml'
    });
    
    const calendarUrl = `${baseUrl}?${params.toString()}`;
    window.open(calendarUrl, '_blank');
} 