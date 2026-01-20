// ============================================
// PORTFOLIO WEBSITE JAVASCRIPT
// Scroll animations and interactive features
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize dark mode
    initDarkMode();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize navbar scroll effect (optional)
    initNavbarScroll();
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize mobile menu
    initMobileMenu();
});

// ============================================
// Scroll Reveal Animation using IntersectionObserver
// ============================================
function initScrollReveal() {
    // Get all elements with the 'reveal-on-scroll' class
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately if IntersectionObserver is not supported
        revealElements.forEach(element => {
            element.classList.add('in-view');
        });
        console.log('IntersectionObserver not supported - showing all elements');
        return;
    }
    
    // Create IntersectionObserver options
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -100px 0px', // Trigger when element is 100px from bottom of viewport
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If element is intersecting (visible in viewport)
            if (entry.isIntersecting) {
                // Add 'in-view' class to trigger CSS animation
                entry.target.classList.add('in-view');
                
                // Optional: Stop observing this element after it's been revealed
                // (uncomment the line below if you want to stop observing)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log(`Observing ${revealElements.length} elements for scroll reveal`);
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
function initSmoothScrolling() {
    // Get all anchor links that start with # or contain #lets-work-together
    const anchorLinks = document.querySelectorAll('a[href^="#"], a[href*="#lets-work-together"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            // Check if link contains hash (could be from different page)
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;
            
            const hash = href.substring(hashIndex);
            
            // If link contains a full path (not just hash), let browser navigate normally
            // The hash will be handled on page load
            if (hashIndex > 0) {
                // Let the browser navigate, hash scrolling will happen on page load
                return; // Don't prevent default, let browser handle navigation
            }
            
            // For same-page hash links, handle smooth scrolling
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle hash in URL on page load (for direct navigation or cross-page links)
    function scrollToHash() {
        if (window.location.hash) {
            setTimeout(function() {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }
    
    // Scroll on page load
    if (document.readyState === 'loading') {
        window.addEventListener('load', scrollToHash);
    } else {
        scrollToHash();
    }
}

// ============================================
// Navbar Scroll Effect - Collapse/Expand
// ============================================
function initNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    
    const heroSection = document.querySelector('.hero-section-portavia');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Scroll distance before navbar collapses
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // Collapse navbar when scrolling down past threshold
        if (scrollTop > scrollThreshold && scrollDirection === 'down') {
            navbar.classList.add('scrolled');
        } 
        // Expand navbar when scrolling up
        else if (scrollDirection === 'up' || scrollTop <= scrollThreshold) {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide footer only when scrolled to the very bottom of the page
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = scrollTop + windowHeight;
        
        // Show footer only when user is near the bottom (within 100px)
        if (scrollPosition >= documentHeight - 100) {
            document.body.classList.add('scrolled-past-hero');
        } else {
            document.body.classList.remove('scrolled-past-hero');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
}

// ============================================
// Contact Form Handler - Web3Forms Integration
// ============================================
// Replace 'YOUR_WEB3FORMS_ACCESS_KEY' with your actual access key from web3forms.com
const WEB3FORMS_ACCESS_KEY = '34dbdeda-1832-461b-80dd-7ae6ed618241';

function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameField = document.getElementById('cta-name') || document.getElementById('name');
            const emailField = document.getElementById('cta-email') || document.getElementById('email');
            const serviceField = document.getElementById('cta-service');
            const messageField = document.getElementById('cta-message') || document.getElementById('message');
            const formMessage = document.getElementById('cta-form-message') || document.getElementById('formMessage');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Validate access key
            if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
                if (formMessage) {
                    formMessage.style.display = 'block';
                    formMessage.textContent = 'Error: Please configure your Web3Forms access key in js/site.js';
                    formMessage.className = 'form-message mt-3 alert alert-danger';
                }
                console.error('Web3Forms access key not configured. Please add your access key to js/site.js');
                return;
            }
            
            // Get form data
            const name = nameField ? nameField.value.trim() : '';
            const email = emailField ? emailField.value.trim() : '';
            const service = serviceField ? serviceField.value : '';
            const message = messageField ? messageField.value.trim() : '';
            
            // Basic validation
            if (!name || !email || !message) {
                if (formMessage) {
                    formMessage.style.display = 'block';
                    formMessage.textContent = 'Please fill in all required fields.';
                    formMessage.className = 'form-message mt-3 alert alert-warning';
                }
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (formMessage) {
                    formMessage.style.display = 'block';
                    formMessage.textContent = 'Please enter a valid email address.';
                    formMessage.className = 'form-message mt-3 alert alert-warning';
                }
                return;
            }
            
            // Disable submit button and show loading state
            const originalButtonText = submitButton ? submitButton.textContent : '';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                submitButton.style.opacity = '0.7';
            }
            
            // Hide previous messages
            if (formMessage) {
                formMessage.style.display = 'none';
            }
            
            // Prepare data for Web3Forms
            const subject = service 
                ? `Contact Form: ${service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ')}`
                : 'Contact Form Submission';
            
            const fullMessage = service 
                ? `Service: ${service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ')}\n\nMessage:\n${message}`
                : message;
            
            const web3formsData = {
                access_key: WEB3FORMS_ACCESS_KEY,
                name: name,
                email: email,
                subject: subject,
                message: fullMessage,
                from_name: name,
                // Optional: Add honeypot field for spam protection
                _honeypot: '',
                // Optional: Add redirect URL (leave empty to use default)
                _redirect: '',
                // Optional: Add custom reply-to
                _replyto: email
            };
            
            try {
                // Send data to Web3Forms API
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(web3formsData)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Success - show success message
                    if (formMessage) {
                        formMessage.style.display = 'block';
                        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                        formMessage.className = 'form-message mt-3 alert alert-success';
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Scroll to message if needed
                    if (formMessage) {
                        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                } else {
                    // API returned an error
                    throw new Error(result.message || 'Failed to send message. Please try again.');
                }
            } catch (error) {
                // Network error or other exception
                console.error('Form submission error:', error);
                
                if (formMessage) {
                    formMessage.style.display = 'block';
                    formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later or contact me directly at sahil02.jp@gmail.com';
                    formMessage.className = 'form-message mt-3 alert alert-danger';
                }
            } finally {
                // Re-enable submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                }
            }
        });
    }
}

// Initialize contact form handler if form exists
document.addEventListener('DOMContentLoaded', function() {
    handleContactForm();
    
    // Initialize project cards (modal functionality only, no scroll animation)
    initProjectCards();
});

// ============================================
// FAQ Accordion Handler
// ============================================
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            const icon = this.querySelector('.faq-icon');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Update aria-expanded attribute
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Rotate icon
            if (icon) {
                if (!isExpanded) {
                    icon.style.transform = 'rotate(45deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Listen for Bootstrap collapse events
        const targetId = question.getAttribute('data-bs-target');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.addEventListener('show.bs.collapse', function() {
                question.setAttribute('aria-expanded', 'true');
                const icon = question.querySelector('.faq-icon');
                if (icon) {
                    icon.style.transform = 'rotate(45deg)';
                }
            });
            
            targetElement.addEventListener('hide.bs.collapse', function() {
                question.setAttribute('aria-expanded', 'false');
                const icon = question.querySelector('.faq-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
}

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // CSS handles the icon animations automatically
    }
    
    // Hide toggle when modals are open or near footer
    function updateToggleVisibility() {
        const projectModal = document.getElementById('projectModal');
        const imageGalleryModal = document.getElementById('imageGalleryModal');
        const footer = document.querySelector('.footer');
        
        // Check if modals are open
        if (projectModal && projectModal.classList.contains('active')) {
            darkModeToggle.classList.add('hidden');
            return;
        }
        
        if (imageGalleryModal && imageGalleryModal.classList.contains('active')) {
            darkModeToggle.classList.add('hidden');
            return;
        }
        
        // Check if toggle is near or overlapping footer
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            const toggleRect = darkModeToggle.getBoundingClientRect();
            const toggleBottom = toggleRect.bottom;
            const footerTop = footerRect.top;
            
            // Hide toggle if it's within 20px of the footer or overlapping
            if (toggleBottom >= footerTop - 20) {
                darkModeToggle.classList.add('hidden');
            } else {
                darkModeToggle.classList.remove('hidden');
            }
        } else {
            darkModeToggle.classList.remove('hidden');
        }
    }
    
    // Watch for modal changes
    const modalObserver = new MutationObserver(updateToggleVisibility);
    const projectModal = document.getElementById('projectModal');
    const imageGalleryModal = document.getElementById('imageGalleryModal');
    
    if (projectModal) {
        modalObserver.observe(projectModal, { attributes: true, attributeFilter: ['class'] });
    }
    if (imageGalleryModal) {
        modalObserver.observe(imageGalleryModal, { attributes: true, attributeFilter: ['class'] });
    }
    
    // Watch for scroll and resize to check footer proximity
    let scrollTimeout;
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateToggleVisibility, 10);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateToggleVisibility);
    
    // Initial check
    updateToggleVisibility();
}

// ============================================
// Stacked Projects Scroll Animation
// ============================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-stack-card');
    if (projectCards.length === 0) return;
    
    // Project data for modal
    const projectData = {
        1: {
            title: "Choir & Volunteer Management System",
            category: "Web Development",
            description: "Engineered a full-stack .NET MVC web application for managing singers, choirs, and volunteer data. Implemented advanced features including archival system and bulk data upload via Excel integration. Features include volunteer tracking, choir management, archival data system, Excel bulk upload, and role-based access control.",
            images: [
                "assets/images/TVLoginPage.png",
                "assets/images/TVLoginScreen.png",
                "assets/images/TvEvents.png",
                "assets/images/TvVolImport.png",
                "assets/images/TVVolMain.png",
                "assets/images/TvQRCheckIn.png",
                "assets/images/TvVolEvent.png",
                "assets/images/TvQRScanning.png",
                "assets/images/TvEventAttended.png"
            ],
            technologies: ["C#", "Entity Framework", "SQLite", "MVC Design Pattern", "Bootstrap", "ASP.NET"],
            skills: [
                "Full-Stack Web Development",
                "MVC Architecture",
                "Database Design",
                "Role-Based Authentication",
                "Excel Data Import",
                "User Management Systems"
            ],
            link: "https://tomorrowsvoices.azurewebsites.net/"
        },
        2: {
            title: "2D Game (UWP)",
            category: "Desktop Application",
            description: "Developed an interactive 2D game application featuring physics engine, collision detection, and dynamic difficulty progression. Implemented OOP design patterns, state management, and real-time UI rendering. Applied event-driven programming and optimized algorithms for smooth gameplay.",
            images: [
                "assets/images/UWPGameMainPage.png",
                "assets/images/UWPProfil.png",
                "assets/images/UWPDifTile.png"
            ],
            technologies: ["C#", "UWP", "XAML"],
            skills: [
                "Object-Oriented Design",
                "Event-driven Programming",
                "State Management",
                "Physics Engine Integration",
                "Game Loop Implementation",
                "Collision Detection"
            ],
            link: null
        },
        3: {
            title: "Business Intelligence Dashboard",
            category: "Data Visualization",
            description: "Created a comprehensive Power BI dashboard for Conteso Retailers, featuring interactive data visualizations including profit analysis by month, product category performance, sales channel breakdowns, and top/bottom selling products. Implemented dynamic filters for year and quarter selection with real-time KPI tracking.",
            images: [
                "assets/images/PowerBI.png"
            ],
            technologies: ["Power BI", "Data Visualization", "Business Intelligence", "Data Analysis", "Dashboard Design"],
            skills: [
                "Data Analysis and Visualization",
                "Business Intelligence",
                "Dashboard Design",
                "KPI Tracking",
                "Interactive Reports",
                "Data Modeling"
            ],
            link: null
        }
    };
    
    // Click handlers for opening modal
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project'));
            openProjectModal(projectId, projectData[projectId]);
        });
    });
    
    // Close modal handlers
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');
    const overlay = document.querySelector('.project-modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeProjectModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
    function openProjectModal(projectId, data) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody || !data) return;
        
        // Build modal content
        let imagesHtml = '';
        data.images.forEach((img, index) => {
            imagesHtml += `<img src="${img}" alt="${data.title}" data-image-index="${index}" class="modal-gallery-image" />`;
        });
        
        let techHtml = '';
        data.technologies.forEach(tech => {
            techHtml += `<span class="project-modal-tech-item">${tech}</span>`;
        });
        
        let skillsHtml = '';
        data.skills.forEach(skill => {
            skillsHtml += `<li>${skill}</li>`;
        });
        
        let linkHtml = '';
        if (data.link) {
            linkHtml = `<a href="${data.link}" class="project-modal-link" target="_blank">view live project</a>`;
        }
        
        modalBody.innerHTML = `
            <div class="project-modal-header">
                <span class="project-modal-category">${data.category}</span>
                <h1 class="project-modal-title">${data.title}</h1>
            </div>
            
            <div class="project-modal-gallery">
                ${imagesHtml}
            </div>
            
            <div class="project-modal-section">
                <p class="project-modal-description">${data.description}</p>
            </div>
            
            <div class="project-modal-section">
                <h3>Technologies Used</h3>
                <div class="project-modal-tech-list">
                    ${techHtml}
                </div>
            </div>
            
            <div class="project-modal-section">
                <h3>Skills Highlighted</h3>
                <ul class="project-modal-skills">
                    ${skillsHtml}
                </ul>
            </div>
            
            ${linkHtml}
        `;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Hide navbar when modal is open
        const navbar = document.getElementById('mainNavbar');
        if (navbar) {
            navbar.style.display = 'none';
        }
        // Hide dark mode toggle when modal is open
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.classList.add('hidden');
        }
        
        // Add click handlers to gallery images
        const galleryImages = modalBody.querySelectorAll('.modal-gallery-image');
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                openImageGallery(data.images, index);
            });
        });
    }
    
    function closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Show navbar when modal is closed
            const navbar = document.getElementById('mainNavbar');
            if (navbar) {
                navbar.style.display = '';
            }
            // Show dark mode toggle when modal is closed
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
                darkModeToggle.classList.remove('hidden');
            }
        }
    }
}

// ============================================
// Image Gallery Functionality
// ============================================
let currentImageGallery = {
    images: [],
    currentIndex: 0
};

function openImageGallery(images, startIndex = 0) {
    const galleryModal = document.getElementById('imageGalleryModal');
    const galleryImage = document.getElementById('galleryImage');
    const galleryCounter = document.getElementById('galleryCounter');
    
    if (!galleryModal || !galleryImage) return;
    
    currentImageGallery.images = images;
    currentImageGallery.currentIndex = startIndex;
    
    updateGalleryImage();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Hide navbar when gallery is open
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        navbar.style.display = 'none';
    }
    // Hide dark mode toggle when gallery is open
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.classList.add('hidden');
    }
}

function updateGalleryImage() {
    const galleryImage = document.getElementById('galleryImage');
    const galleryCounter = document.getElementById('galleryCounter');
    
    if (!galleryImage || currentImageGallery.images.length === 0) return;
    
    galleryImage.src = currentImageGallery.images[currentImageGallery.currentIndex];
    if (galleryCounter) {
        galleryCounter.textContent = `${currentImageGallery.currentIndex + 1} / ${currentImageGallery.images.length}`;
    }
}

function closeImageGallery() {
    const galleryModal = document.getElementById('imageGalleryModal');
    if (galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
        // Show navbar when gallery is closed
        const navbar = document.getElementById('mainNavbar');
        if (navbar) {
            navbar.style.display = '';
        }
        // Show dark mode toggle when gallery is closed
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.classList.remove('hidden');
        }
    }
}

function nextGalleryImage() {
    if (currentImageGallery.images.length === 0) return;
    currentImageGallery.currentIndex = (currentImageGallery.currentIndex + 1) % currentImageGallery.images.length;
    updateGalleryImage();
}

function prevGalleryImage() {
    if (currentImageGallery.images.length === 0) return;
    currentImageGallery.currentIndex = (currentImageGallery.currentIndex - 1 + currentImageGallery.images.length) % currentImageGallery.images.length;
    updateGalleryImage();
}

// Initialize image gallery handlers
document.addEventListener('DOMContentLoaded', function() {
    const closeGalleryBtn = document.getElementById('closeGallery');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');
    const galleryModal = document.getElementById('imageGalleryModal');
    
    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', closeImageGallery);
    }
    
    if (prevImageBtn) {
        prevImageBtn.addEventListener('click', prevGalleryImage);
    }
    
    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', nextGalleryImage);
    }
    
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeImageGallery();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const galleryModal = document.getElementById('imageGalleryModal');
        if (galleryModal && galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeImageGallery();
            } else if (e.key === 'ArrowLeft') {
                prevGalleryImage();
            } else if (e.key === 'ArrowRight') {
                nextGalleryImage();
            }
        }
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavbarContainer = document.getElementById('mobileNavbarContainer');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-contact-btn');
    
    function openMobileMenu() {
        if (!mobileNavbarContainer) return;
        
        mobileNavbarContainer.classList.add('active');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.add('active');
        }
    }
    
    function closeMobileMenu() {
        if (!mobileNavbarContainer) return;
        
        mobileNavbarContainer.classList.remove('active');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
    
    // Open menu on hamburger button click
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    
    // Close menu on X button click
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation
            setTimeout(closeMobileMenu, 100);
        });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavbarContainer && mobileNavbarContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle smooth scrolling for anchor links in mobile menu
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.includes('#')) {
                const hashIndex = href.indexOf('#');
                if (hashIndex !== -1) {
                    const hash = href.substring(hashIndex);
                    const targetElement = document.querySelector(hash);
                    
                    if (targetElement) {
                        e.preventDefault();
                        closeMobileMenu();
                        
                        // Navigate to page if needed
                        const path = href.substring(0, hashIndex);
                        if (path && path !== window.location.pathname) {
                            window.location.href = href;
                            return;
                        }
                        
                        // Smooth scroll to target
                        setTimeout(function() {
                            const navbarHeight = document.querySelector('.mobile-navbar')?.offsetHeight || 0;
                            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
            }
        });
    });
}

// ============================================
// Footer Scroll to Top Button
// ============================================
function initFooterScrollToTop() {
    const scrollToTopBtn = document.getElementById('footerScrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize footer scroll to top on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterScrollToTop);
} else {
    initFooterScrollToTop();
}
