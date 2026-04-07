// ==========================================
// PROJECT TOGGLE / SHOW MORE
// ==========================================

function toggleProjectDetails(button) {
    // Find the parent project section
    const projectSection = button.closest('.project-section');
    const projectContent = projectSection.querySelector('.project-content');
    
    // Toggle the hidden class
    projectContent.classList.toggle('hidden');
    
    // Update button text and display style
    if (projectContent.classList.contains('hidden')) {
        button.textContent = 'Show More ▼';
        button.classList.remove('active');
        projectContent.style.display = 'none';
    } else {
        button.textContent = 'Show Less ▲';
        button.classList.add('active');
        projectContent.style.display = 'grid';
        // Re-initialize lazy loading for newly visible images
        initLazyLoading();
    }
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    initLazyLoading();
    
    // Update active navigation link on page load
    updateActiveNavLink();
});

function initLazyLoading() {
    // Get all images with data-src attribute
    const images = document.querySelectorAll('img.lazy-image');
    
    // Create an Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                // Load the image
                img.src = src;
                
                // Remove the lazy-image class and data-src attribute
                img.classList.remove('lazy-image');
                img.removeAttribute('data-src');
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        // Start loading 50px before the image enters viewport
        rootMargin: '50px'
    });
    
    // Observe each image
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// NAVIGATION LINK ACTIVE STATE
// ==========================================

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Get the href from the link
        const href = link.getAttribute('href');
        
        // Compare with current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

document.addEventListener('click', function(e) {
    // Check if the clicked element is a link with an anchor
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// ==========================================
// MOBILE MENU HANDLING (Optional)
// ==========================================

// Add a hamburger menu for mobile if needed
// This is a placeholder for future enhancement

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if we're on mobile (optional - only if you want to add a hamburger)
    if (window.innerWidth <= 768) {
        // You could add hamburger menu logic here in the future
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// ==========================================
// SCROLL ANIMATIONS (Optional Enhancement)
// ==========================================

function initScrollAnimations() {
    const elements = document.querySelectorAll('.skill-card, .project-card-preview, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Run scroll animations after page load
window.addEventListener('load', function() {
    initScrollAnimations();
});

// ==========================================
// BACK TO TOP BUTTON (Optional)
// ==========================================

function initBackToTop() {
    // Check if we need to add a back-to-top button
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #0066cc;
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: bold;
            display: none;
            z-index: 999;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#0052a3';
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = '#0066cc';
            button.style.transform = 'scale(1)';
        });
    };
    
    // Uncomment the line below to enable back-to-top button
    // createBackToTopButton();
}

initBackToTop();

// ==========================================
// UTILITY: Log initialization complete
// ==========================================

console.log('Portfolio initialized successfully');
