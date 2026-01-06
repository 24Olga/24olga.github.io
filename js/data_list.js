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
    // 只渲染搜索结果
    if (!items || items.length === 0) {
      this.container.innerHTML = '<p class="no-results">未找到匹配项</p>';
      this.container.style.display = 'block'; // 显示“无结果”
      return;
    }

    // 按 category 分组
    const groups = {};
    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    let html = `<p class="dir-count">找到 <strong>${items.length}</strong> 个结果：</p>`;
    
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
    this.container.style.display = 'block'; // 显示结果
  }

  filterItems(query, countEl) {
    // 清空搜索时隐藏列表 + 显示提示
    if (!query.trim()) {
      countEl.textContent = `共 ${this.total} 个`;
      this.container.style.display = 'none'; // 隐藏列表
      return;
    }

    const filtered = this.items.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.path.toLowerCase().includes(query)
    );

    countEl.textContent = `找到 ${filtered.length} 个（共 ${this.total}）`;
    this.render(filtered); // 自动显示/隐藏容器
  }

document.addEventListener('DOMContentLoaded', () => {
  new DataDirList('data-dir-container');
});