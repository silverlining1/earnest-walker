// Main JavaScript for Personal Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        // Default to light mode if no theme is saved or it's set to light-mode
        body.classList.add('light-mode');
        themeToggle.checked = false;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Try both DOMContentLoaded and load events to ensure preloader is removed
        const hidePreloader = function() {
            preloader.classList.add('preloader-finish');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        };
        
        // If page is already loaded, hide preloader immediately
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
            // Fallback - hide preloader after 3 seconds regardless
            setTimeout(hidePreloader, 3000);
        }
    }
    
    // Particles.js initialization
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Skill progress bars
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const progressBar = card.querySelector('.progress-bar');
        const progressValue = progressBar.getAttribute('data-progress');
        progressBar.style.setProperty('--progress', progressValue + '%');
    });
    
    // Scroll animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-rotate, .reveal-zoom, .stagger-children, .timeline-item, .skill-card');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        revealElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition - (elementHeight / 4))
            ) {
                element.classList.add('active');
            } else {
                // Optional: remove the active class when element is out of viewport
                // element.classList.remove('active');
            }
        });
    }
    
    // Initial check on page load
    setTimeout(checkScroll, 100);
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on resize
    window.addEventListener('resize', checkScroll);
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form submission is handled by Formspree
            // This is just for additional functionality if needed
            
            // Display a success message after form submission
            const formSubmitSuccess = () => {
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                
                // Insert after form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            };
            
            // If using Formspree, this will be handled by their redirect
            // This is just for reference if you want to handle it with AJAX later
        });
    }
    
    // Blog integration
    const blogPosts = document.querySelectorAll('.blog-post');
    if (blogPosts.length > 0) {
        blogPosts.forEach(post => {
            post.addEventListener('click', function() {
                const postUrl = this.getAttribute('data-url');
                if (postUrl) {
                    window.open(postUrl, '_blank');
                }
            });
        });
    }
    
    // Blog pagination
    const blogPagination = document.querySelector('.blog-pagination');
    if (blogPagination) {
        const pageLinks = blogPagination.querySelectorAll('.page-link');
        const blogCards = document.querySelectorAll('.blog-card');
        const postsPerPage = 3;
        let currentPage = 1;
        
        // Function to show posts for the current page
        function showPostsForPage(page) {
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            
            blogCards.forEach((post, index) => {
                if (index >= startIndex && index < endIndex) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Update active class on pagination
            pageLinks.forEach((link, index) => {
                if (index === page - 1 || (index === 0 && page === 1)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            currentPage = page;
        }
        
        // Add click event listeners to pagination links
        pageLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Handle next button (last link)
                if (index === pageLinks.length - 1) {
                    if (currentPage < Math.ceil(blogCards.length / postsPerPage)) {
                        showPostsForPage(currentPage + 1);
                    }
                    return;
                }
                
                // Handle ellipsis
                if (index === pageLinks.length - 2) {
                    return;
                }
                
                // Handle regular page numbers
                showPostsForPage(index + 1);
            });
        });
        
        // Initialize with first page
        showPostsForPage(1);
    }
    
    // Add this function to ensure text visibility on page load
    applyTextColors();
    
    // Apply again after a short delay to handle any race conditions
    setTimeout(applyTextColors, 100);
    setTimeout(applyTextColors, 500);
    setTimeout(applyTextColors, 1000);
});

function applyTextColors() {
    // Skills section
    document.querySelectorAll('.skills-section .section-header h2').forEach(el => {
        el.style.color = 'var(--text-primary)';
    });
    
    document.querySelectorAll('.skills-section .section-header p').forEach(el => {
        el.style.color = 'var(--text-secondary)';
    });
    
    document.querySelectorAll('.skill-card h3').forEach(el => {
        el.style.color = 'var(--text-primary)';
    });
    
    document.querySelectorAll('.skill-card p').forEach(el => {
        el.style.color = 'var(--text-secondary)';
    });
    
    document.querySelectorAll('.skill-icon').forEach(el => {
        el.style.color = 'var(--primary-color)';
    });
    
    document.querySelectorAll('.progress-text').forEach(el => {
        el.style.color = 'var(--text-primary)';
    });
    
    // Experience section
    document.querySelectorAll('.timeline-item h3').forEach(el => {
        el.style.color = 'var(--text-primary)';
    });
    
    document.querySelectorAll('.timeline-item p, .timeline-item .date').forEach(el => {
        el.style.color = 'var(--text-secondary)';
    });
    
    // Contact section
    document.querySelectorAll('.contact-section .section-header h2').forEach(el => {
        el.style.color = 'var(--text-primary)';
    });
    
    document.querySelectorAll('.contact-section .section-header p').forEach(el => {
        el.style.color = 'var(--text-secondary)';
    });
    
    document.querySelectorAll('.contact-text h4').forEach(el => {
        el.style.color = 'var(--text-primary)';
    });
    
    document.querySelectorAll('.contact-text p, .contact-text a').forEach(el => {
        el.style.color = 'var(--text-secondary)';
    });
}

// Parallax Effect
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});
