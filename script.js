/**
 * Compliance Landing Page - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Elements
  const openDrawerBtn = document.getElementById('openDrawerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const contactBtnDrawer = document.querySelector('.contact-btn-drawer');

  // Toggle mobile drawer
  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = ''; // Allow background scrolling
  }

  if (openDrawerBtn) {
    openDrawerBtn.addEventListener('click', openDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer when a link is clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active class from all drawer links
      drawerLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');
      closeDrawer();
    });
  });

  if (contactBtnDrawer) {
    contactBtnDrawer.addEventListener('click', closeDrawer);
  }

  // Navigation Links Active State on Scroll (Desktop & Mobile)
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  function changeActiveLink() {
    let scrollPosition = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        // Update desktop links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || (id === 'home' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
          }
        });

        // Update drawer links
        drawerLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || (id === 'home' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Listen to scroll events
  window.addEventListener('scroll', changeActiveLink);

  // Smooth scroll helper for older browsers (optional fallback)
  const allNavLinks = document.querySelectorAll('.nav-link, .drawer-link, .btn');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for sticky header
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
