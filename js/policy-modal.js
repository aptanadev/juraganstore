// Policy Modal Control Script
(function () {
  'use strict';

  // Function to open modal
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  // Function to close modal
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }
  }

  // Initialize modal functionality when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {

    // Check URL hash on page load and open corresponding modal
    var hash = window.location.hash;
    if (hash === '#privacy-policy') {
      openModal('privacyPolicyModal');
    } else if (hash === '#terms-conditions' || hash === '#terms-of-use') {
      openModal('termsOfUseModal');
    }

    // Get all policy links
    var privacyLinks = document.querySelectorAll('a[href="#privacy-policy"], a[href*="privacy"]');
    var termsLinks = document.querySelectorAll('a[href="#terms-conditions"], a[href="#terms-of-use"], a[href*="terms"]');

    // Add click event to Privacy Policy links
    privacyLinks.forEach(function (link) {
      // Check if it's in the footer quicklinks
      if (link.closest('.quicklinks')) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          openModal('privacyPolicyModal');
        });
      }
    });

    // Add click event to Terms & Conditions links
    termsLinks.forEach(function (link) {
      // Check if it's in the footer quicklinks
      if (link.closest('.quicklinks')) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          openModal('termsOfUseModal');
        });
      }
    });

    // Get all close buttons
    var closeButtons = document.querySelectorAll('.policy-close, .policy-close-btn');

    // Add click event to close buttons
    closeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var modalId = this.getAttribute('data-modal');
        if (modalId) {
          closeModal(modalId);
        }
      });
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function (event) {
      if (event.target.classList.contains('policy-modal')) {
        closeModal(event.target.id);
      }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        var openModals = document.querySelectorAll('.policy-modal[style*="display: block"]');
        openModals.forEach(function (modal) {
          closeModal(modal.id);
        });
      }
    });

    // Handle hash changes (browser back/forward navigation)
    window.addEventListener('hashchange', function () {
      var hash = window.location.hash;
      
      // Close all modals first
      closeModal('privacyPolicyModal');
      closeModal('termsOfUseModal');
      
      // Open corresponding modal based on hash
      if (hash === '#privacy-policy') {
        openModal('privacyPolicyModal');
      } else if (hash === '#terms-conditions' || hash === '#terms-of-use') {
        openModal('termsOfUseModal');
      }
    });
  });

  // Export functions for external use
  window.policyModal = {
    open: openModal,
    close: closeModal
  };
})();
