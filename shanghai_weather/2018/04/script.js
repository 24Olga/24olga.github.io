window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.background = window.scrollY > 50
    ? 'rgba(255,255,255,0.95)'
    : 'rgba(255,255,255,0.85)';
});

document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.tooltip'); // 选中所有 tooltip

  tooltips.forEach(tooltip => {
    tooltip.addEventListener('click', (e) => {
      e.stopPropagation();
      tooltip.classList.toggle('show'); // 切换显示状态
    });
  });

  // 点击页面其他地方隐藏所有 tooltip
  document.addEventListener('click', () => {
    tooltips.forEach(tooltip => tooltip.classList.remove('show'));
  });
});