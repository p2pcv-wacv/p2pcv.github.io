// P2P-CV @ WACV 2026 - Interactive Features

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const navHeight = document.querySelector('.navbar').offsetHeight;
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll(
    '.topic-card, .track-card, .speaker-card, .organizer-card, .outcome-card, .timeline-item, .schedule-item'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// Countdown Timer (optional - for submission deadline)
function updateCountdown() {
  const deadline = new Date('2025-11-28T23:59:59-12:00'); // AoE timezone
  const now = new Date();
  const diff = deadline - now;
  
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
      countdownEl.innerHTML = `
        <strong>${days}</strong> days 
        <strong>${hours}</strong> hours 
        <strong>${minutes}</strong> minutes until submission deadline
      `;
    }
  }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Back to Top Button (optional enhancement)
function createBackToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'back-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 81, 255, 0.3);
  `;
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.style.opacity = '1';
      button.style.transform = 'scale(1)';
    } else {
      button.style.opacity = '0';
      button.style.transform = 'scale(0.8)';
    }
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Form Validation (if adding a contact form later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// External Link Handler (open in new tab)
document.addEventListener('DOMContentLoaded', function() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

// Copy Email to Clipboard
function setupEmailCopy() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const email = this.getAttribute('href').replace('mailto:', '');
      
      // Create tooltip
      const tooltip = document.createElement('span');
      tooltip.textContent = 'Click to copy email';
      tooltip.style.cssText = `
        position: absolute;
        background: var(--text-dark);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.85rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        margin-top: -40px;
        white-space: nowrap;
      `;
      
      this.style.position = 'relative';
      this.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.style.opacity = '1';
      }, 10);
      
      setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
      }, 2000);
    });
  });
}

document.addEventListener('DOMContentLoaded', setupEmailCopy);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
  });
}

// Parallax Effect for Hero (subtle)
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero && window.scrollY < hero.offsetHeight) {
    hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
  }
});

// Add subtle animations to cards on hover
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.topic-card, .track-card, .speaker-card, .organizer-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease';
    });
  });
});

// Console message for developers
console.log('%cP2P-CV @ WACV 2026', 'color: #0051ff; font-size: 24px; font-weight: bold;');
console.log('%cPixels to Patients: Bridging CV State-of-the-Art with Clinical Impact', 'color: #666; font-size: 14px;');
console.log('%cWebsite by P2P-CV Organizing Committee', 'color: #999; font-size: 12px;');
