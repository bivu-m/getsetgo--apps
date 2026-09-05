document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const modal = document.getElementById('privacy-modal');
    const closeBtn = document.getElementById('close-privacy-modal') || document.querySelector('.close-btn');
    
    // Select all potential triggers (Navbar link, Footer link, Footer button, etc.)
    const modalTriggers = document.querySelectorAll('#privacy-link, #open-privacy-modal, [data-modal="privacy"]');

    // Store active element before opening to restore focus on close
    let lastActiveElement = null;

    /**
     * Open Modal Handler
     */
    function openModal(e) {
        if (e) e.preventDefault();
        if (!modal) return;

        // Remember element that had focus before opening
        lastActiveElement = document.activeElement;

        // Display modal & prevent body scroll
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Shift focus to close button or first focusable element for accessibility
        if (closeBtn) {
            closeBtn.focus();
        } else {
            const firstFocusable = getFocusableElements()[0];
            if (firstFocusable) firstFocusable.focus();
        }

        // Attach global key listeners for keyboard accessibility
        document.addEventListener('keydown', handleKeyDown);
    }

    /**
     * Close Modal Handler
     */
    function closeModal() {
        if (!modal || !modal.classList.contains('is-open')) return;

        // Hide modal & restore body scroll
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Detach keyboard listener
        document.removeEventListener('keydown', handleKeyDown);

        // Restore focus to original trigger element
        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }
    }

    /**
     * Helper to get all focusable children inside modal (for Focus Trapping)
     */
    function getFocusableElements() {
        if (!modal) return [];
        return Array.from(
            modal.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        );
    }

    /**
     * Keyboard Handler (Escape Key & Focus Trap)
     */
    function handleKeyDown(e) {
        // Close on 'Escape' key
        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        // Trap Focus on 'Tab'
        if (e.key === 'Tab') {
            const focusables = getFocusableElements();
            if (focusables.length === 0) return;

            const firstElement = focusables[0];
            const lastElement = focusables[focusables.length - 1];

            if (e.shiftKey) {
                // Shift + Tab: wrapping from first to last
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: wrapping from last to first
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    // Attach click handlers to all modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Attach click handler to close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Dismiss modal when clicking backdrop outside content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
