// ========== MOBİL MENÜ ==========
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropdowns = document.querySelectorAll('.dropdown, .mobile-menu .dropdown');
  
  // Mobil menü toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Dropdown işlemleri (mobil için)
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });
  
  // Sayfa dışı tıklamada dropdown kapat
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });
  
  // Scroll animasyonları için Intersection Observer
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => observer.observe(el));
  
  // Sayı sayma animasyonu (istatistikler için)
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + (el.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
          }
        }, 20);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(el => countObserver.observe(el));
  
  // Sticky header arka plan değişimi
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(17, 24, 39, 0.98)';
    } else {
      header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
    }
  });
  
  // Teklif popup (eğer varsa)
  const offerPopup = document.getElementById('offerPopup');
  const offerClose = document.getElementById('offerClose');
  const offerTriggers = document.querySelectorAll('[data-offer-trigger]');
  
  if (offerPopup) {
    offerTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        offerPopup.style.display = 'flex';
      });
    });
    
    offerClose.addEventListener('click', () => {
      offerPopup.style.display = 'none';
    });
    
    offerPopup.addEventListener('click', (e) => {
      if (e.target === offerPopup) {
        offerPopup.style.display = 'none';
      }
    });
  }
  
  // Form doğrulama (basit)
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#EF4444';
          valid = false;
        } else {
          field.style.borderColor = '#E5E7EB';
        }
      });
      
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.style.borderColor = '#EF4444';
          valid = false;
        }
      }
      
      const phoneField = form.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value) {
        const phoneRegex = /^[0-9\s\+\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
          phoneField.style.borderColor = '#EF4444';
          valid = false;
        }
      }
      
      if (!valid) {
        e.preventDefault();
        alert('Lütfen tüm zorunlu alanları doğru şekilde doldurun.');
      }
    });
  });
  
  // Dosya yükleme önizleme (kariyer sayfası için)
  const cvInput = document.getElementById('cv');
  const cvPreview = document.getElementById('cv-preview');
  if (cvInput && cvPreview) {
    cvInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        cvPreview.textContent = `Seçilen dosya: ${file.name}`;
      } else {
        cvPreview.textContent = '';
      }
    });
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== LAZY LOADING ==========
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}