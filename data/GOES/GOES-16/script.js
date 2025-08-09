document.querySelectorAll('.content-header').forEach(header => {
    header.addEventListener('click', function() {
        const contentBody = this.nextElementSibling;
        const isActive = this.classList.toggle('active');
        
        if (isActive) {
            contentBody.classList.add('active');
        } else {
            contentBody.classList.remove('active');
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50 
        ? 'rgba(255,255,255,0.95)' 
        : 'rgba(255,255,255,0.85)';
});
