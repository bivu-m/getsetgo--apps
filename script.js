document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('privacy-modal');
    const openBtn1 = document.getElementById('privacy-link');
    const openBtn2 = document.getElementById('privacy-footer-link');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(e) {
        if (e) e.preventDefault();
        if (modal) modal.style.display = 'block';
    }

    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    // Attach listeners safely
    if (openBtn1) openBtn1.addEventListener('click', openModal);
    if (openBtn2) openBtn2.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
