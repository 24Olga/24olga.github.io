function populateDateSelect(year, month) {
    const dateSelect = document.getElementById('dateSelect');
    dateSelect.innerHTML = '';
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const option = new Option(
            `${String(day).padStart(2, '0')}日`,
            String(day).padStart(2, '0')
        );
        dateSelect.add(option);
    }

    const summaryOption = new Option('本月总结', 'summary');
    dateSelect.add(summaryOption);
}

function submitForm() {
    const selectedDate = document.getElementById('dateSelect').value;
    if (selectedDate) {
        const cleanPath = window.location.pathname.replace(/\/$/, '');
        window.location.href = `${cleanPath}/${selectedDate}`;
    } else {
        alert('请先选择日期');
    }
}

window.addEventListener('load', () => {
    const pathSegments = window.location.pathname.split('/').filter(s => s);

    let year, month;
    for (let i = pathSegments.length - 1; i >= 0; i--) {
        if (/^\d{4}$/.test(pathSegments[i])) {
            year = parseInt(pathSegments[i], 10);
            if (i + 1 < pathSegments.length && /^\d{1,2}$/.test(pathSegments[i+1])) {
                month = parseInt(pathSegments[i+1], 10);
                break;
            }
        }
    }

    if (year && month) {
        document.querySelector('h1').textContent = `请选择日期 - ${year}年${month}月`;
        populateDateSelect(year, month - 1); // 月份需要减1
    } else {
        const defaultYear = 2024;
        const defaultMonth = 3;
        document.querySelector('h1').textContent = `请选择日期 - ${defaultYear}年${defaultMonth}月`;
        populateDateSelect(defaultYear, defaultMonth - 1);
    }
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50 
        ? 'rgba(255,255,255,0.95)' 
        : 'rgba(255,255,255,0.85)';
});
