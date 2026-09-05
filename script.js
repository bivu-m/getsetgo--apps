document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links with sticky navbar offset compensation
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.querySelector('.navbar');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate position minus navbar height
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
