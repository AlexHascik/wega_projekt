document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
  
    hamburger.addEventListener('click', function () {
      // Only toggle the nav if on smaller screens
      if (window.innerWidth <= 768) {
        if (navMenu.style.transform === 'translateX(0%)') {
          navMenu.style.transform = 'translateX(100%)';
        } else {
          navMenu.style.transform = 'translateX(0%)';
        }
      }
    });
  });