/* ============================================
   AYUSH SHARMA — PORTFOLIO INTERACTIVITY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Dynamic Current Month/Year ----------
  const currentMonthEl = document.getElementById('currentMonthYear');
  if (currentMonthEl) {
    const now = new Date();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    currentMonthEl.textContent = months[now.getMonth()] + ' ' + now.getFullYear();
  }
  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ---------- Mobile Menu Toggle ----------
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Typing Effect ----------
  const typedElement = document.querySelector('.typed-text');
  if (typedElement) {
    const texts = [
      'Tax Associate at BDO RISE',
      'US Partnership Tax',
      'Financial Services Group',
      'Continuous Learner'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Skill Bar Animation ----------
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute('data-width');
          target.style.width = width + '%';
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ---------- Particles Generator ----------
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ---------- Counter Animation ----------
  const statValues = document.querySelectorAll('.hero-stat-value');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const textValue = target.getAttribute('data-text');
          
          // If it's a text-based stat, just display it
          if (textValue) {
            target.textContent = textValue;
            counterObserver.unobserve(target);
            return;
          }
          
          const end = parseInt(target.getAttribute('data-count'));
          const suffix = target.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const step = end / (duration / 30);

          const timer = setInterval(() => {
            count += step;
            if (count >= end) {
              count = end;
              clearInterval(timer);
            }
            target.textContent = Math.floor(count) + suffix;
          }, 30);

          counterObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statValues.forEach((stat) => counterObserver.observe(stat));

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Contact Form ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with actual Formspree/backend)
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});

// ---------- Certificate Lightbox ----------
function openCertLightbox(imageSrc) {
  const lightbox = document.getElementById('certLightbox');
  const img = document.getElementById('certLightboxImg');
  if (lightbox && img) {
    img.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertLightbox(e) {
  // Don't close if clicking the image itself
  if (e && e.target && e.target.tagName === 'IMG') return;
  const lightbox = document.getElementById('certLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close lightbox on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertLightbox(e);
});
