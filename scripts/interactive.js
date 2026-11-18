/**
 * interactive.js - Interactive filtering, search, modal preview, and clipboard utilities
 * for Mihraj Mashhoor K's personal cybersecurity portfolio.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterableCards = document.querySelectorAll('.filterable-card');

  if (filterBtns.length > 0 && filterableCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });
  }

  // 2. Search Input
  const searchInput = document.querySelector('.search-input');
  if (searchInput && filterableCards.length > 0) {
    searchInput.addEventListener('input', () => {
      applyFilters();
    });
  }

  function applyFilters() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let visibleCount = 0;

    filterableCards.forEach(card => {
      const category = (card.getAttribute('data-category') || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchesCategory = (filter === 'all' || category.includes(filter.toLowerCase()));
      const matchesQuery = (!query || text.includes(query));

      if (matchesCategory && matchesQuery) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Check if empty message is needed
    const noResultsMsg = document.getElementById('no-results-msg');
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // 3. Certificate Modal Viewer
  const modalOverlay = document.getElementById('cert-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalPdf = document.getElementById('modal-pdf-frame');
  const modalDirectLink = document.getElementById('modal-direct-link');
  const modalVerifyLink = document.getElementById('modal-verify-link');

  if (modalOverlay) {
    document.querySelectorAll('.open-cert-modal').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const title = trigger.getAttribute('data-cert-title') || 'Certificate Viewer';
        const pdfUrl = trigger.getAttribute('data-pdf-url') || '';
        const verifyUrl = trigger.getAttribute('data-verify-url') || '';

        if (modalTitle) modalTitle.textContent = title;
        if (modalPdf) modalPdf.src = pdfUrl;
        if (modalDirectLink) modalDirectLink.href = pdfUrl;

        if (modalVerifyLink) {
          if (verifyUrl) {
            modalVerifyLink.href = verifyUrl;
            modalVerifyLink.style.display = 'inline-flex';
          } else {
            modalVerifyLink.style.display = 'none';
          }
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (modalPdf) modalPdf.src = 'about:blank';
    };

    const closeBtn = modalOverlay.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. Copy to Clipboard Utility
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      const feedbackTarget = document.getElementById(btn.getAttribute('data-feedback-id'));

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (feedbackTarget) {
            feedbackTarget.classList.add('show');
            setTimeout(() => {
              feedbackTarget.classList.remove('show');
            }, 2000);
          }
        }).catch(err => {
          console.error('Copy failed:', err);
        });
      }
    });
  });
});
