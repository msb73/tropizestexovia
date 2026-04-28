// ==================== Hamburger Menu Toggle ==================== //
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-active');
        }
    });
}

// ==================== Smooth Scrolling ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Navigation Active Link ==================== //
const navLinksWithActive = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksWithActive.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== Form Submission ==================== //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Here you can add form submission logic
        // For now, we'll show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// ==================== Scroll Animation ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and feature items
document.querySelectorAll('.product-card, .feature-item, .quality-item, .cert-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Parallax Effect ==================== //
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ==================== Navbar Scroll Effect ==================== //
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== Counter Animation ==================== //
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe hero stats for animation
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector('h3');
            if (stat && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

console.log('Website loaded successfully!');
