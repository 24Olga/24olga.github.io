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
        document.addEventListener('DOMContentLoaded', function() {
            const welcomeModal = document.getElementById('welcomeModal');
            const closeModal = document.getElementById('closeModal');
            const confirmBtn = document.getElementById('confirmBtn');
            
            // 检查是否已经访问过
            if (!localStorage.getItem('hasVisitedLinks')) {
                // 显示提示
                setTimeout(() => {
                    welcomeModal.classList.add('active');
                }, 500);
                
                // 设置访问标记，有效期30天
                const setVisitFlag = () => {
                    localStorage.setItem('hasVisitedLinks', 'true');
                    // 设置30天后过期
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 30);
                    localStorage.setItem('visitExpiry', expiryDate.getTime());
                };
                
                // 关闭按钮事件
                closeModal.addEventListener('click', function() {
                    welcomeModal.classList.remove('active');
                    setVisitFlag();
                });
                
                // 确认按钮事件
                confirmBtn.addEventListener('click', function() {
                    welcomeModal.classList.remove('active');
                    setVisitFlag();
                });
                
                // 点击蒙层关闭
                welcomeModal.addEventListener('click', function(e) {
                    if (e.target === welcomeModal) {
                        welcomeModal.classList.remove('active');
                        setVisitFlag();
                    }
                });
            } else {
                // 检查是否过期
                const expiry = localStorage.getItem('visitExpiry');
                if (expiry && new Date().getTime() > parseInt(expiry)) {
                    localStorage.removeItem('hasVisitedLinks');
                    localStorage.removeItem('visitExpiry');
                }
            }
        });