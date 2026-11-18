/**
 * Mihraj Mashhoor K — Personal Cybersecurity Portfolio Script
 * Lightweight vanilla JavaScript · Zero third-party runtime dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen.toString());
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    // Close when clicking mobile nav links
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link, .btn');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // 2. Navigation Active State (IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0 && navLinks.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
