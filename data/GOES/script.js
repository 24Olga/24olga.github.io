document.querySelectorAll('.content-header').forEach(header => {
    header.addEventListener('click', function() {
        const contentBody = this.nextElementSibling;
        const isActive = this.classList.toggle('active');
        
        if (isActive) {
            contentBody.classList.add('active');
            contentBody.querySelector('p').classList.add('expanded');
        } else {
            contentBody.classList.remove('active');
            contentBody.querySelector('p').classList.remove('expanded');
        }
    });
});

document.querySelectorAll('.content-body p').forEach(paragraph => {
    paragraph.addEventListener('touchstart', function(e) {
        if (this.classList.contains('expanded')) {
            e.stopPropagation();
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50 
        ? 'rgba(255,255,255,0.95)' 
        : 'rgba(255,255,255,0.85)';
});
