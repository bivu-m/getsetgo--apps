document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('privacy-modal');
    const openBtn1 = document.getElementById('privacy-link');
    const openBtn2 = document.getElementById('privacy-footer-link');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(e) {
        e.preventDefault();
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    openBtn1.addEventListener('click', openModal);
    openBtn2.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
