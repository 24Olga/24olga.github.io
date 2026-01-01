// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50 
        ? 'rgba(255,255,255,0.95)' 
        : 'rgba(255,255,255,0.85)';
});

// 按钮点击动画
document.querySelectorAll('.file-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});
