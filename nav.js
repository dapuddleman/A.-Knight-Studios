document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('nav-links');
    const menuLinks = mobileMenu.querySelectorAll('a');

    // Function to toggle the menu
    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('menu-open');
        document.body.classList.toggle('no-scroll');
    };

    // Open/close menu when hamburger is clicked
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when a link inside it is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the menu is actually open before trying to close it
            if (mobileMenu.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });
});