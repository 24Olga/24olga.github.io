function updateTime() {   
 const now = new Date();
 const beijingTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 480 * 60000)
 const hours = String(beijingTime.getHours()).padStart(2, '0')
 const minutes = String(beijingTime.getMinutes()).padStart(2, '0')
 const seconds = String(beijingTime.getSeconds()).padStart(2, '0')
 
 const timeString = `现在是 ${beijingTime.getFullYear()}/${String(beijingTime.getMonth() + 1).padStart(2, '0')}/${String(beijingTime.getDate()).padStart(2, '0')} ${hours}:${minutes}:${seconds}`;    
 document.getElementById('currentTime').innerText = timeString;
}

updateTime();    
setInterval(updateTime, 1000); 

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.85)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.animation = 'clickEffect 0.3s';
        setTimeout(() => {
            window.location.href = this.href;
        }, 300);
    });
});

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