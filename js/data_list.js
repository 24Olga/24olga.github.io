// js/data_list.js
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
      const res = await fetch('/data/data_dirs_index.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      this.items = data.items || [];
      this.total = data.total || this.items.length; // 兼容无 total 字段

      this.render(this.items);
      this.setupSearch();
    } catch (err) {
      console.error('加载数据目录失败:', err);
      this.container.innerHTML = `
        <div class="alert alert-error">
          <strong>加载失败</strong>：无法获取数据目录列表。<br>
          请检查 <code>/data/data_dirs_index.json</code> 是否存在。
        </div>`;
    }
  }

  render(items) {
    if (!items || items.length === 0) {
      this.container.innerHTML = '<p>暂无数据文件夹</p>';
      return;
    }

    // 按 category 分组
    const groups = {};
    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    let html = `<p class="dir-count">共 <strong>${this.total}</strong> 个数据文件夹：</p>`;
    
    for (const [category, groupItems] of Object.entries(groups).sort()) {
      html += `
        <div class="dir-category">
          <h3>${category}</h3>
          <ul class="dir-list">
            ${groupItems.map(item => `
              <li>
                <a href="/data/${item.path}/" class="dir-link">
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

  setupSearch() {
    const searchInput = document.getElementById('dir-search');
    const countEl = document.getElementById('result-count');
    
    if (!searchInput || !countEl) return;

    // 初始显示总数
    countEl.textContent = `共 ${this.total} 个`;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      this.filterItems(query, countEl);
    });
  }

  filterItems(query, countEl) {
    let filtered = this.items;
    if (query) {
      filtered = this.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      );
      countEl.textContent = `找到 ${filtered.length} 个（共 ${this.total}）`;
    } else {
      countEl.textContent = `共 ${this.total} 个`;
    }

    this.render(filtered);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DataDirList('data-dir-container');
});