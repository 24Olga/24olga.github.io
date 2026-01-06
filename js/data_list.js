// js/data_list.js
// 作用：加载 data_dirs_index.json，并渲染带分类的文件夹列表

class DataDirList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`未找到容器 #${containerId}`);
      return;
    }
    this.init();
  }

  async init() {
    try {
      // 加载 JSON
      const res = await fetch('/data/data_dirs_index.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      this.render(data);
    } catch (err) {
      console.error('加载数据目录失败:', err);
      this.container.innerHTML = `
        <div class="alert alert-error">
          <strong>加载失败</strong>：无法获取数据目录列表。<br>
          请检查 <code>/data/data_dirs_index.json</code> 是否存在。
        </div>`;
    }
  }

  render(data) {
    if (!data.items || data.items.length === 0) {
      this.container.innerHTML = '<p>暂无数据文件夹</p>';
      return;
    }

    // 按 category 分组
    const groups = {};
    data.items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    // 构建 HTML
    let html = `<p class="dir-count">共 <strong>${data.total}</strong> 个数据文件夹：</p>`;
    
    for (const [category, items] of Object.entries(groups).sort()) {
      html += `
        <div class="dir-category">
          <h3>${category}</h3>
          <ul class="dir-list">
            ${items.map(item => `
              <li>
                <a href="/data-view/${item.path}/" class="dir-link">
                  <span class="dir-name">${item.name}</span>
                </a>
                <span class="dir-category-tag">${item.category}</span>
              </li>
            `).join('')}
          </ul>
        </div>`;
    }

    this.container.innerHTML = html;
  }
}

// 自动初始化（页面加载完成后）
document.addEventListener('DOMContentLoaded', () => {
  new DataDirList('data-dir-container');
});