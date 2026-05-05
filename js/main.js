/* =============================================
   BROW BEAUTY HUB — JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. NAVBAR — scroll effect & mobile menu
  // =============================================
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const backToTop = document.getElementById('back-to-top');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // =============================================
  // 1b. ACTIVE NAV — highlight current page link
  // =============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.split('#')[0] === currentPage) {
        a.classList.add('active-nav');
      }
    });
  }

  // =============================================
  // 1c. SERVICES DROPDOWN — click toggle (mobile + desktop fallback)
  // =============================================
  document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const li = toggle.closest('.nav-dropdown');
      const isOpen = li.classList.contains('open');
      // Close all open dropdowns first
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) {
        e.preventDefault(); // stay on services.html hover; open dropdown on click
        li.classList.add('open');
      }
    });
  });
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =============================================
  // 2. FADE-UP SCROLL ANIMATION
  // =============================================
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Also animate section children on scroll
  const animateOnScroll = (selector, className = 'fade-up') => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add(className);
      fadeObserver.observe(el);
    });
  };

  animateOnScroll('.service-card');
  animateOnScroll('.gallery-item');
  animateOnScroll('.stat-item');
  animateOnScroll('.about-content');
  animateOnScroll('.about-images');
  animateOnScroll('.contact-item');


  // =============================================
  // 3. ANIMATED STAT COUNTERS
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = Math.ceil(target / (duration / 16));
    let current    = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 16);
  }


  // =============================================
  // 4. GALLERY FILTER
  // =============================================
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        if (match) {
          item.classList.remove('hidden');
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => item.classList.add('hidden'), 400);
        }
      });
    });
  });


  // =============================================
  // 5. TESTIMONIAL SLIDER
  // =============================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotsContainer    = document.getElementById('slider-dots');
  const prevBtn          = document.getElementById('prev-btn');
  const nextBtn          = document.getElementById('next-btn');
  let   currentSlide     = 0;
  let   autoSlide;

  if (testimonialCards.length && dotsContainer && prevBtn && nextBtn) {
    // Build dots
    testimonialCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      testimonialCards[currentSlide].classList.remove('active');
      dotsContainer.querySelectorAll('.dot')[currentSlide].classList.remove('active');

      currentSlide = (index + testimonialCards.length) % testimonialCards.length;

      testimonialCards[currentSlide].classList.add('active');
      dotsContainer.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAuto(); });

    function startAuto() { autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000); }
    function resetAuto()  { clearInterval(autoSlide); startAuto(); }

    startAuto();
  }


  // =============================================
  // 6. BOOKING FORM SUBMISSION
  // =============================================
  const bookingForm   = document.getElementById('booking-form');
  const formSuccess   = document.getElementById('form-success');
  const dateInput     = document.getElementById('date');

  if (bookingForm && formSuccess && dateInput) {
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const requiredFields = bookingForm.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e57373';
          valid = false;
        }
      });

      if (!valid) {
        const firstInvalid = bookingForm.querySelector('[required]:invalid, [style*="e57373"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate submission
      const submitBtn = bookingForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formSuccess.classList.add('show');
        bookingForm.reset();
        submitBtn.textContent = 'Confirm Booking';
        submitBtn.disabled = false;

        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });

    // Clear field error on input
    bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }


  // =============================================
  // 7. BACK TO TOP BUTTON — handled in section 1
  // =============================================


  // =============================================
  // 8. SMOOTH ACTIVE NAV LINK ON SCROLL — not needed (multi-page)
  // =============================================


  // =============================================
  // 9. SHOP FILTER
  // =============================================
  const shopFilterBtns = document.querySelectorAll('.shop-filter .filter-btn');
  const productCards   = document.querySelectorAll('.product-card');

  if (shopFilterBtns.length) {
    shopFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        shopFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.shop;

        productCards.forEach(card => {
          const match = filter === 'all' || card.dataset.shopcat === filter;
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          if (match) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.display = '';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              if (btn.dataset.shop !== 'all' && card.dataset.shopcat !== btn.dataset.shop) {
                card.style.display = 'none';
              }
            }, 400);
          }
        });
      });
    });
  }


  // =============================================
  // 10. ADD TO CART — toast notification
  // =============================================
  const cartToast    = document.getElementById('cart-toast');
  const cartToastMsg = document.getElementById('cart-toast-msg');
  let   cartTimer;

  if (cartToast && cartToastMsg) {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        cartToastMsg.textContent = `"${name}" added to cart!`;
        cartToast.classList.add('show');
        clearTimeout(cartTimer);
        cartTimer = setTimeout(() => cartToast.classList.remove('show'), 3000);
      });
    });
  }


  // =============================================
  // 11. CONTACT FORM SUBMISSION
  // =============================================
  const contactForm    = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = contactForm.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e57373';
          valid = false;
        }
      });

      if (!valid) return;

      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactSuccess.classList.add('show');
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(() => contactSuccess.classList.remove('show'), 5000);
      }, 1000);
    });

    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => { field.style.borderColor = ''; });
    });
  }

  // =============================================
  // 12. DISCOUNT POPUP
  // =============================================
  const discountPopup   = document.getElementById('discountPopup');
  const discountOverlay = document.getElementById('discountOverlay');
  const discountClose   = document.getElementById('discountClose');
  const discountForm    = document.getElementById('discountForm');

  if (discountPopup && discountOverlay && discountClose) {

    function openDiscount() {
      discountPopup.classList.add('active');
      discountOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeDiscount() {
      discountPopup.classList.remove('active');
      discountOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Remember dismissal for 7 days
      localStorage.setItem('bbh_popup_dismissed', Date.now());
    }

    // Show after 3 seconds, only if not dismissed within 7 days
    const lastDismissed = localStorage.getItem('bbh_popup_dismissed');
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (!lastDismissed || Date.now() - lastDismissed > sevenDays) {
      setTimeout(openDiscount, 3000);
    }

    discountClose.addEventListener('click', closeDiscount);
    discountOverlay.addEventListener('click', closeDiscount);

    if (discountForm) {
      discountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const first = document.getElementById('dpFirst');
        const email = document.getElementById('dpEmail');
        let ok = true;
        [first, email].forEach(f => { f.classList.remove('error'); });
        if (!first.value.trim()) { first.classList.add('error'); ok = false; }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          email.classList.add('error'); ok = false;
        }
        if (!ok) return;

        // Show success state
        discountForm.innerHTML = `
          <div class="discount-success">
            <i class="fa-solid fa-circle-check"></i>
            <h3>You're in, ${first.value.split(' ')[0]}!</h3>
            <p>Check your inbox for your 10% off code. See you soon at Brow Beauty Hub!</p>
          </div>`;
        document.querySelector('.discount-legal').style.display = 'none';
        localStorage.setItem('bbh_popup_dismissed', Date.now());
        setTimeout(closeDiscount, 3500);
      });
    }

  }

});
