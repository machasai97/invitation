// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Initialize lightGallery
    const lightGalleryElement = document.getElementById('lightgallery');
    if (lightGalleryElement) {
      lightGallery(lightGalleryElement, {
        selector: '.gallery-link',
        speed: 500,
        download: false
      });
    }
  
    // Set up navigation scroll effect
    setupNavbarScroll();
  
    // Initialize countdown timer
    initCountdown();
  
    // Set up RSVP form
    setupRsvpForm();
  
    // Initialize smooth scrolling for anchor links
    setupSmoothScrolling();
  });
  
  // Navigation scroll effect
  function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
  
      // Update active navigation link based on scroll position
      updateActiveNavLink();
    });
  
    // Update active navigation based on scroll position
    function updateActiveNavLink() {
      const scrollPosition = window.scrollY + 100;
  
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
  
    // Close mobile menu when item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      });
    });
  }
  
  // Countdown Timer
  function initCountdown() {
    const eventDate = new Date("May 18, 2025 09:10:00").getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownTimer = document.getElementById('countdown-timer');
  
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
  
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = eventDate - now;
  
      if (distance < 0) {
        countdownTimer.innerHTML = "<div class='completed-message'>🎉 The event has started!</div>";
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      daysElement.textContent = days.toString().padStart(2, '0');
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
  
    // Initial update
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
  }
  
  // RSVP Form Handling
  function setupRsvpForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    const formSuccess = document.getElementById('form-success');
    const attendingCheckbox = document.getElementById('attending');
    const messageContainer = document.getElementById('message-container');
  
    if (!rsvpForm || !formSuccess) return;
  
    // Show/hide message textarea based on attending checkbox
    if (attendingCheckbox && messageContainer) {
      attendingCheckbox.addEventListener('change', () => {
        messageContainer.classList.toggle('d-none', !attendingCheckbox.checked);
      });
    }
  
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const guests = document.getElementById('guests').value;
      
      if (!name || !email || !guests) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Hide form and show success message
      rsvpForm.classList.add('d-none');
      formSuccess.classList.remove('d-none');
      
      // Scroll to success message
      setTimeout(() => {
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      
      // Reset form (in case we want to show it again)
      rsvpForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: 'smooth'
        });
      });
    });
  }