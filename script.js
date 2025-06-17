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