(function() {
    function getColumnValues(selector) {
        const cells = document.querySelectorAll(selector);
        const values = [];
        cells.forEach(cell => {
            // 优先读取 data-temp 属性（存储精确数值），如果没有则读取文本内容（兜底）
            let rawVal = cell.getAttribute('data-temp');
            if (rawVal === null || rawVal === '') {
                rawVal = cell.textContent.trim();
            }
            const num = parseFloat(rawVal);
            if (!isNaN(num)) {
                values.push(num);
            }
        });
        return values;
    }
    
    // 计算数组的最小值、中位数(50分位)、最大值
    function calcStats(arr) {
        if (!arr.length) return { min: 0, median: 0, max: 0 };
        const sorted = [...arr].sort((a, b) => a - b);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        let median;
        const len = sorted.length;
        const mid = Math.floor(len / 2);
        if (len % 2 === 0) {
            median = (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            median = sorted[mid];
        }
        return { min, median, max };
    }
    
    // 颜色转换 HEX -> RGB 对象
    function hexToRgb(hex) {
        let color = hex.startsWith('#') ? hex.slice(1) : hex;
        if (color.length === 3) {
            color = color.split('').map(c => c + c).join('');
        }
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        return { r, g, b };
    }
    
    // 三色端点 RGB
    const minRgb = hexToRgb("#63BE7B");
    const midRgb = hexToRgb("#FFEB84");
    const maxRgb = hexToRgb("#F8696B");
    
    // 插值函数：给定数值value，区间[min, mid, max] 返回 rgb颜色字符串
    function interpolateColor(value, minVal, midVal, maxVal) {
        // 边界相同情况返回中间色
        if (minVal === maxVal) {
            return `rgb(${midRgb.r}, ${midRgb.g}, ${midRgb.b})`;
        }
        if (value <= minVal) {
            return `rgb(${minRgb.r}, ${minRgb.g}, ${minRgb.b})`;
        }
        if (value >= maxVal) {
            return `rgb(${maxRgb.r}, ${maxRgb.g}, ${maxRgb.b})`;
        }
        // 区间在 min 和 mid 之间
        if (value <= midVal) {
            if (minVal === midVal) return `rgb(${midRgb.r}, ${midRgb.g}, ${midRgb.b})`;
            const t = (value - minVal) / (midVal - minVal);
            const r = Math.round(minRgb.r + (midRgb.r - minRgb.r) * t);
            const g = Math.round(minRgb.g + (midRgb.g - minRgb.g) * t);
            const b = Math.round(minRgb.b + (midRgb.b - minRgb.b) * t);
            return `rgb(${r}, ${g}, ${b})`;
        } 
        // 区间在 mid 和 max 之间
        else {
            if (midVal === maxVal) return `rgb(${maxRgb.r}, ${maxRgb.g}, ${maxRgb.b})`;
            const t = (value - midVal) / (maxVal - midVal);
            const r = Math.round(midRgb.r + (maxRgb.r - midRgb.r) * t);
            const g = Math.round(midRgb.g + (maxRgb.g - midRgb.g) * t);
            const b = Math.round(midRgb.b + (maxRgb.b - midRgb.b) * t);
            return `rgb(${r}, ${g}, ${b})`;
        }
    }
    
    // 获取最高气温列所有数值和最低气温列所有数值
    const highValues = getColumnValues('.temp-high-cell');
    const lowValues = getColumnValues('.temp-low-cell');
    
    // 计算各自的统计值
    const highStats = calcStats(highValues);
    const lowStats = calcStats(lowValues);
    
    console.log("最高气温统计(基于HTML):", highStats);
    console.log("最低气温统计(基于HTML):", lowStats);
    
    // 为最高气温列每个单元格应用背景色
    const highCells = document.querySelectorAll('.temp-high-cell');
    highCells.forEach(cell => {
        let rawVal = cell.getAttribute('data-temp');
        if (rawVal === null) rawVal = cell.textContent.trim();
        const val = parseFloat(rawVal);
        if (!isNaN(val)) {
            const bgColor = interpolateColor(val, highStats.min, highStats.median, highStats.max);
            cell.style.backgroundColor = bgColor;
            // 保证无边框（已有.no-border-col，但为了完全避免边框，加强样式）
            cell.style.border = "none";
            // 确保右对齐 + 字体可读
            cell.classList.add('num-col', 'temp-value');
        } else {
            // 非数字时给默认底色
            cell.style.backgroundColor = "#f0f0f0";
        }
        // 添加无边框类（如果尚未有类名no-border-col，增加）
        if (!cell.classList.contains('no-border-col')) {
            cell.classList.add('no-border-col');
        }
    });
    
    // 为最低气温列每个单元格应用背景色
    const lowCells = document.querySelectorAll('.temp-low-cell');
    lowCells.forEach(cell => {
        let rawVal = cell.getAttribute('data-temp');
        if (rawVal === null) rawVal = cell.textContent.trim();
        const val = parseFloat(rawVal);
        if (!isNaN(val)) {
            const bgColor = interpolateColor(val, lowStats.min, lowStats.median, lowStats.max);
            cell.style.backgroundColor = bgColor;
            cell.style.border = "none";
            cell.classList.add('num-col', 'temp-value');
        } else {
            cell.style.backgroundColor = "#f0f0f0";
        }
        if (!cell.classList.contains('no-border-col')) {
            cell.classList.add('no-border-col');
        }
    }); 
})();