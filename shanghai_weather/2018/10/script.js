window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.background = window.scrollY > 50
    ? 'rgba(255,255,255,0.95)'
    : 'rgba(255,255,255,0.85)';
});

document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.tooltip');

  tooltips.forEach(tooltip => {
    tooltip.addEventListener('click', (e) => {
      e.stopPropagation();

      // 先隐藏其他 tooltip
      tooltips.forEach(t => {
        if (t !== tooltip) {
          t.classList.remove('show');
        }
      });

      tooltip.classList.toggle('show');
    });
  });

  document.addEventListener('click', () => {
    tooltips.forEach(tooltip => tooltip.classList.remove('show'));
  });
});