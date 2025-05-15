// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMenuButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });

  closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  // Form Validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('border-red-500');
          const error = document.createElement('p');
          error.className = 'text-red-500 text-sm mt-1';
          error.textContent = `Please fill out this field.`;
          if (!field.nextElementSibling?.classList.contains('text-red-500')) {
            field.parentNode.insertBefore(error, field.nextSibling);
          }
        } else {
          field.classList.remove('border-red-500');
          if (field.nextElementSibling?.classList.contains('text-red-500')) {
            field.nextElementSibling.remove();
          }
        }
      });

      if (isValid) {
        // Placeholder for backend submission
        alert('Form submitted successfully! (Backend not implemented)');
        form.reset();
      }
    });
  });

  // Highlight Active Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // Load Header and Footer
  fetch('/components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      // Re-attach mobile menu event listeners after header load
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const closeMenuButton = document.getElementById('close-menu');
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
      closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
        });
      });
      // Re-highlight active nav after header load
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPath) {
          link.classList.add('active');
        }
      });
    });

  fetch('/components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});

// Minify this JavaScript for production using a tool like UglifyJS