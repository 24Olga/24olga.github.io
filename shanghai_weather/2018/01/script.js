window.addEventListener('scroll', () = {
  const navbar = document.querySelector('.navbar');
  navbar.style.background = window.scrollY  50 
       'rgba(255,255,255,0.95)' 
       'rgba(255,255,255,0.85)';
});

document.querySelectorAll('.data-table td:last-child').forEach(cell => {
    // 自动为有截断的内容添加功能
    if (cell.scrollWidth > cell.clientWidth) {
        // 添加提示tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = '点击查看完整内容';
        
        // 样式化tooltip
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.display = 'none';
        tooltip.style.marginBottom = '5px';
        
        cell.appendChild(tooltip);
        
        // 桌面端悬浮显示
        cell.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                tooltip.style.display = 'block';
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
        
        // 移动端点击交互
        cell.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    const closeOnOutsideClick = (e) => {
                        if (!this.contains(e.target)) {
                            this.classList.remove('expanded');
                            document.removeEventListener('click', closeOnOutsideClick);
                        }
                    };
                    setTimeout(() => {
                        document.addEventListener('click', closeOnOutsideClick);
                    }, 10);
                }
            }
        });
    }
});