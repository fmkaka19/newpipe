document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initFaqAccordion();
  initTroubleshootingChecklist();
  initSmoothScroll();
});

function initMobileMenu() {
  const toggleBtn = document.querySelector('.hamburger-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');

    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-button');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.closest('.faq-item');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const btn = item.querySelector('.faq-button');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        faqItem.classList.remove('active');
      } else {
        button.setAttribute('aria-expanded', 'true');
        faqItem.classList.add('active');
      }
    });
  });
}

function initTroubleshootingChecklist() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const countDisplay = document.getElementById('checklist-count');
  const progressFill = document.getElementById('checklist-progress');

  if (!checkboxes.length) return;

  function updateProgress() {
    const total = checkboxes.length;
    let checkedCount = 0;

    checkboxes.forEach(box => {
      const parent = box.closest('.checklist-item');
      if (box.checked) {
        checkedCount++;
        if (parent) parent.classList.add('checked');
      } else {
        if (parent) parent.classList.remove('checked');
      }
    });

    const percentage = Math.round((checkedCount / total) * 100);

    if (countDisplay) {
      countDisplay.textContent = `${checkedCount} of ${total} completed (${percentage}%)`;
    }

    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  }

  checkboxes.forEach(box => {
    box.addEventListener('change', updateProgress);
  });

  updateProgress();
}

function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}
