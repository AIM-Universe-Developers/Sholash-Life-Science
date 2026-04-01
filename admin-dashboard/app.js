/* =====================================================
   SHOLASH ADMIN — app.js  |  Real Data + API Integration
   ===================================================== */

const API_BASE = 'https://sholash-life-science.onrender.com/api';
const TOKEN = localStorage.getItem('sholash_admin_token');

async function fetchWithAuth(endpoint, options = {}) {
  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers
  };
  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('sholash_admin_token');
    window.location.href = 'login.html';
    return;
  }
  return response.json();
}

// ---- DATA (Initialized Empty) ----
let ORDERS = [];
let PRODUCTS = [];
let CUSTOMERS = [];
let REVIEWS = []; // Reviews might still be mock for now if no backend yet


// ---- NAVIGATION ----
function navigate(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) { target.classList.add('active'); }
  if (el) { el.classList.add('active'); const ng = el.querySelector('.nav-glow'); if(!ng){ const g=document.createElement('span'); g.className='nav-glow'; el.appendChild(g); } }
  // Lazy-init charts for analytics
  if(page==='analytics' && !window._analyticsChartsInit) { initAnalyticsCharts(); window._analyticsChartsInit=true; }
}

// ---- SIDEBAR TOGGLE ----
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ---- RENDER HELPERS ----
function statusBadge(s) {
  return `<span class="status-badge ${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</span>`;
}

// Dashboard orders table (5 rows)
function renderDashboardOrders() {
  const tbody = document.getElementById('ordersTableBody');
  if(!tbody) return;
  
  if (!ORDERS || ORDERS.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted);">No orders found.</td></tr>';
    return;
  }

  tbody.innerHTML = ORDERS.slice(0,5).map(o=>`
    <tr>
      <td><code style="color:var(--blue);font-size:.8rem;">${o._id.substring(o._id.length - 8).toUpperCase()}</code></td>
      <td>${o.orderItems ? o.orderItems.map(i => i.name).join(', ') : 'Product'}</td>
      <td>${o.user ? o.user.name : 'Unknown User'} ${o.isGuest ? '(Guest)' : ''}</td>
      <td>${statusBadge(o.orderStatus || 'pending')}</td>
      <td style="font-weight:600;color:var(--text-primary);">₹${o.totalPrice}</td>
      <td>
        <button class="btn-glass sm" onclick="openOrderModal('${o._id}', false)"><i class="ri-eye-line"></i></button>
      </td>
    </tr>`).join('');
}

async function initDashboard() {
    const data = await fetchWithAuth('/admin/dashboard');
    if (data && data.success) {
        const stats = data.data;
        
        // Update Stat Cards
        document.querySelector('.stat-card[style*="#3B82F6"] .stat-value').innerText = `₹${stats.totalRevenue.toLocaleString()}`;
        document.querySelector('.stat-card[style*="#8B5CF6"] .stat-value').innerText = stats.totalOrders.toLocaleString();
        document.querySelector('.stat-card[style*="#06B6D4"] .stat-value').innerText = stats.totalProducts.toLocaleString();
        document.querySelector('.stat-card[style*="#10B981"] .stat-value').innerText = stats.totalUsers.toLocaleString();

        ORDERS = stats.recentOrders;
        renderDashboardOrders();
    }
}
async function fetchAllData() {
    try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
            fetchWithAuth('/orders'), // Adjust if routes differ
            fetchWithAuth('/products'),
            fetchWithAuth('/admin/users')
        ]);

        if (ordersRes && ordersRes.success) ORDERS = ordersRes.data;
        if (productsRes && productsRes.success) PRODUCTS = productsRes.data;
        if (usersRes && usersRes.success) CUSTOMERS = usersRes.data;

        renderFullOrders();
        renderProducts();
        renderCustomers();
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

// Full orders page
function renderFullOrders(filtered = ORDERS) {
  const tbody = document.getElementById('fullOrdersBody');
  if(!tbody) return;
  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">No orders found matching your search.</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(o=>`
    <tr>
      <td><code style="color:var(--blue);font-size:.8rem;">${o._id.substring(o._id.length - 8).toUpperCase()}</code></td>
      <td>${o.orderItems ? o.orderItems.map(i => i.name).join(', ') : 'Product'}</td>
      <td>${o.user ? o.user.name : 'Unknown User'}</td>
      <td style="color:var(--text-muted);font-size:.78rem;">${new Date(o.createdAt).toLocaleDateString()}</td>
      <td>${statusBadge(o.orderStatus || 'pending')}</td>
      <td style="font-weight:600;color:var(--text-primary);">₹${o.totalPrice}</td>
      <td>
        <button class="btn-glass sm" onclick="openOrderModal('${o._id}', false)"><i class="ri-eye-line"></i></button>
        <button class="btn-glass sm" style="margin-left:4px;" onclick="openOrderModal('${o._id}', true)"><i class="ri-edit-line"></i></button>
      </td>
    </tr>`).join('');
}

// Products
function renderProducts(filtered = PRODUCTS) {
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  if (!filtered || filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);font-size:1.1rem;">No products found matching your search.</div>';
    return;
  }
  grid.innerHTML = filtered.map(p=>`
    <div class="product-card glass-card float-card">
      <div class="product-img">🌿</div>
      <div class="product-name">${p.name}</div>
      <div class="product-meta">
        <span class="product-price">₹${p.price}</span>
        <span class="product-stock ${p.stock < 10 ? 'low' : ''}">Stock: ${p.stock}</span>
      </div>
      <button class="product-edit"><i class="ri-edit-line"></i> Edit Product</button>
    </div>`).join('');
}

// Customers
function renderCustomers(filtered = CUSTOMERS) {
  const grid = document.getElementById('customersGrid');
  if(!grid) return;
  if (!filtered || filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);font-size:1.1rem;">No customers found matching your search.</div>';
    return;
  }
  grid.innerHTML = filtered.map(c=>`
    <div class="customer-card glass-card float-card">
      <div class="cust-avatar">${c.name.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
      <div class="cust-name">${c.name}</div>
      <div class="cust-email">${c.email}</div>
      <div class="cust-orders">${c.isActive ? 'Active Member' : 'Blocked'}</div>
      <button class="btn-glass sm" style="margin-top:6px;width:100%;justify-content:center;">View Profile</button>
    </div>`).join('');
}

// Reviews
function renderReviews(filtered = REVIEWS) {
  const grid = document.getElementById('reviewsGrid');
  if(!grid) return;
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);font-size:1.1rem;">No reviews found matching your search.</div>';
    return;
  }
  grid.innerHTML = filtered.map(r=>`
    <div class="review-card glass-card float-card">
      <div class="review-top">
        <div class="review-av" style="background:linear-gradient(135deg,${r.colors[0]},${r.colors[1]})">${r.author.split(' ').map(w=>w[0]).join('')}</div>
        <div class="review-meta">
          <div class="review-author">${r.author}</div>
          <div class="review-product">${r.product}</div>
        </div>
        <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      </div>
      <p class="review-text">"${r.text}"</p>
    </div>`).join('');
}

// ---- CHART.JS DEFAULTS ----
const commonChartDefaults = {
  responsive:true, maintainAspectRatio:false,
  plugins:{ legend:{ display:false }, tooltip:{ backgroundColor:'rgba(15,23,42,0.9)', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, titleColor:'#F1F5F9', bodyColor:'#94A3B8', padding:12, cornerRadius:10 } },
  scales:{
    x:{ border:{display:false}, grid:{ color:'rgba(255,255,255,0.05)' }, ticks:{ color:'#475569', font:{size:11} } },
    y:{ border:{display:false}, grid:{ color:'rgba(255,255,255,0.05)' }, ticks:{ color:'#475569', font:{size:11} } }
  }
};

// Revenue Chart
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if(!ctx) return;
  const labels = ['Sep','Oct','Nov','Dec','Jan','Feb'];
  new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[{
        label:'Revenue',
        data:[32000,41000,38000,55000,49000,68000],
        borderColor:'#3B82F6', borderWidth:2.5,
        backgroundColor: (function(){ const g=ctx.getContext('2d').createLinearGradient(0,0,0,200); g.addColorStop(0,'rgba(59,130,246,0.25)'); g.addColorStop(1,'rgba(59,130,246,0.01)'); return g; })(),
        fill:true, tension:0.4, pointBackgroundColor:'#3B82F6', pointRadius:4, pointHoverRadius:7,
      },{
        label:'Prev Year',
        data:[22000,29000,29000,41000,38000,52000],
        borderColor:'rgba(124,58,237,0.6)', borderWidth:1.5,
        backgroundColor:'transparent', fill:false, tension:0.4,
        borderDash:[5,4], pointRadius:0,
      }]
    },
    options:{ ...commonChartDefaults, plugins:{...commonChartDefaults.plugins, legend:{display:true, labels:{color:'#94A3B8',font:{size:11},boxWidth:14,usePointStyle:true}}} }
  });
}

// Sales Donut
function initSalesChart() {
  const ctx = document.getElementById('salesChart');
  if(!ctx) return;
  new Chart(ctx, {
    type:'doughnut',
    data:{
      labels:['Serums','Creams','Sunscreen','Oils','Toners','Other'],
      datasets:[{ data:[34,22,16,12,10,6], backgroundColor:['#3B82F6','#7C3AED','#06B6D4','#10B981','#F59E0B','#EC4899'], borderWidth:0, hoverOffset:10 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false, cutout:'68%',
      plugins:{ legend:{ position:'bottom', labels:{ color:'#94A3B8', font:{size:10}, boxWidth:10, padding:10, usePointStyle:true } }, tooltip: commonChartDefaults.plugins.tooltip }
    }
  });
}

// Orders Bar
function initOrdersChart() {
  const ctx = document.getElementById('ordersChart');
  if(!ctx) return;
  new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets:[{ label:'Orders', data:[48,62,55,78,91,104,72], backgroundColor:(()=>{ const g=ctx.getContext('2d').createLinearGradient(0,0,0,180); g.addColorStop(0,'rgba(124,58,237,0.8)'); g.addColorStop(1,'rgba(37,99,235,0.4)'); return g; })(), borderRadius:8, borderSkipped:false }]
    },
    options:{ ...commonChartDefaults, plugins:{...commonChartDefaults.plugins} }
  });
}

// Analytics Charts (lazy)
function initAnalyticsCharts() {
  const tc = document.getElementById('trafficChart');
  if(tc) { new Chart(tc,{ type:'line', data:{ labels:['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'], datasets:[{ label:'Visitors', data:[18200,22400,20100,29800,26300,34100], borderColor:'#06B6D4', borderWidth:2.5, backgroundColor:(()=>{ const g=tc.getContext('2d').createLinearGradient(0,0,0,180); g.addColorStop(0,'rgba(6,182,212,.25)'); g.addColorStop(1,'rgba(6,182,212,.01)'); return g; })(), fill:true, tension:.4, pointRadius:4, pointBackgroundColor:'#06B6D4' }] }, options:commonChartDefaults }); }
  const rc = document.getElementById('regionChart');
  if(rc) { new Chart(rc,{ type:'bar', data:{ labels:['India','UK','UAE','USA','KSA','SG'], datasets:[{ label:'Revenue', data:[42,28,18,15,11,8], backgroundColor:(()=>{ const g=rc.getContext('2d').createLinearGradient(0,0,0,180); g.addColorStop(0,'rgba(16,185,129,.8)'); g.addColorStop(1,'rgba(6,182,212,.4)'); return g; })(), borderRadius:8, borderSkipped:false }] }, options:{...commonChartDefaults} }); }
  const dc = document.getElementById('deviceChart');
  if(dc) { new Chart(dc,{ type:'doughnut', data:{ labels:['Mobile','Desktop','Tablet'], datasets:[{ data:[58,32,10], backgroundColor:['#3B82F6','#7C3AED','#06B6D4'], borderWidth:0, hoverOffset:8 }] }, options:{ responsive:true, maintainAspectRatio:false, cutout:'65%', plugins:{ legend:{ position:'bottom', labels:{ color:'#94A3B8', font:{size:11}, boxWidth:10, usePointStyle:true } }, tooltip: commonChartDefaults.plugins.tooltip } } }); }
}

// ---- ORDER MODAL ----
let currentEditingOrderId = null;

function openOrderModal(orderId, isEdit) {
  const order = ORDERS.find(o => o.id === orderId);
  if (!order) return;

  currentEditingOrderId = orderId;
  document.getElementById('orderModalTitle').innerText = isEdit ? 'Edit Order Status' : 'Order Details';
  document.getElementById('view-order-id').value = order.id;
  document.getElementById('view-order-product').value = order.product;
  document.getElementById('view-order-customer').value = order.customer;
  document.getElementById('view-order-amount').value = order.amount;
  
  const statusSelect = document.getElementById('edit-order-status');
  statusSelect.value = order.status;
  statusSelect.disabled = !isEdit;
  
  const saveBtn = document.getElementById('saveOrderBtn');
  saveBtn.style.display = isEdit ? 'inline-flex' : 'none';

  document.getElementById('orderModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('open');
  document.body.style.overflow = '';
}

function saveOrderStatus() {
  if (!currentEditingOrderId) return;
  const newStatus = document.getElementById('edit-order-status').value;
  const order = ORDERS.find(o => o.id === currentEditingOrderId);
  if (order) {
    order.status = newStatus;
    showToast(`Order ${currentEditingOrderId} updated to ${newStatus}`);
    renderDashboardOrders();
    renderFullOrders();
    closeOrderModal();
  }
}

// ---- PRODUCT MODAL & FORM LOGIC ----
let CATEGORIES = [];
let selectedImages = [];
let featuresList = [];
let targetList = [];
let detailsData = {
  benefits: [], ingredients: [], beforeAfter: [], usage: [], faq: [], other: [], legal: []
};
let isEditingProduct = false;
let editingProductId = null;

async function fetchCategories() {
  if (CATEGORIES.length > 0) return;
  try {
    const res = await fetchWithAuth('/categories');
    if (res && res.success) {
      CATEGORIES = res.data;
      const select = document.getElementById('prod-category');
      select.innerHTML = '<option value="" disabled selected>Select Category</option>' + 
        CATEGORIES.map(c => `<option value="${c._id}">${c.name}</option>`).join('');
    }
  } catch(e) { console.error("Could not fetch categories", e); }
}

async function showAddProduct() {
  isEditingProduct = false;
  editingProductId = null;
  document.getElementById('productModalTitle').innerText = 'Add New Product';
  document.getElementById('productForm').reset();
  
  // reset state
  selectedImages = [];
  featuresList = [];
  targetList = [];
  detailsData = { benefits: [], ingredients: [], beforeAfter: [], usage: [], faq: [], other: [], legal: [] };
  
  renderImages();
  renderListItems('featuresList');
  renderListItems('targetList');
  Object.keys(detailsData).forEach(key => renderDetailItems(key));
  
  await fetchCategories();
  
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow='';
}

// Lists handling
function handleListAdd(e, listId, inputId) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = document.getElementById(inputId);
    const val = input.value.trim();
    if (val) {
      if (listId === 'featuresList') featuresList.push(val);
      if (listId === 'targetList') targetList.push(val);
      renderListItems(listId);
      input.value = '';
    }
  }
}
function removeListItem(listId, index) {
  if (listId === 'featuresList') featuresList.splice(index, 1);
  if (listId === 'targetList') targetList.splice(index, 1);
  renderListItems(listId);
}
function renderListItems(listId) {
  const container = document.getElementById(listId);
  const arr = listId === 'featuresList' ? featuresList : targetList;
  container.innerHTML = arr.map((item, idx) => `
    <div class="tag-item">
      ${item} <i class="ri-close-line tag-remove" onclick="removeListItem('${listId}', ${idx})"></i>
    </div>
  `).join('');
}

// Details Accordion handling
function addDetailItem(section) {
  detailsData[section].push({ id: Date.now().toString(), title: '', content: '' });
  renderDetailItems(section);
}
function removeDetailItem(section, index) {
  detailsData[section].splice(index, 1);
  renderDetailItems(section);
}
function updateDetailItem(section, index, field, value) {
  detailsData[section][index][field] = value;
}
function renderDetailItems(section) {
  const container = document.getElementById(`container-${section}`);
  const countBadge = document.getElementById(`count-${section}`);
  
  countBadge.innerText = detailsData[section].length;
  container.innerHTML = detailsData[section].map((item, idx) => `
    <div class="detail-item-box">
      <button type="button" class="btn-remove" onclick="removeDetailItem('${section}', ${idx})" title="Remove">
        <i class="ri-delete-bin-line"></i>
      </button>
      <div class="settings-field">
        <label>Title <span class="req">*</span></label>
        <div class="glass-input full"><input type="text" value="${item.title}" onchange="updateDetailItem('${section}', ${idx}, 'title', this.value)" required placeholder="e.g. Key Component"/></div>
      </div>
      <div class="settings-field">
        <label>Content</label>
        <div class="glass-input full textarea-wrap" style="min-height:60px;">
          <textarea rows="2" onchange="updateDetailItem('${section}', ${idx}, 'content', this.value)" placeholder="Description...">${item.content}</textarea>
        </div>
      </div>
    </div>
  `).join('');
}

// Image handling
function handleImageSelection(e) {
  const files = Array.from(e.target.files);
  if (selectedImages.length + files.length > 5) {
    showToast('Maximum 5 images allowed');
    return;
  }
  
  files.forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      showToast(`File ${file.name} is too large (>5MB)`);
      return;
    }
    selectedImages.push(file);
  });
  
  e.target.value = ''; // reset
  renderImages();
}

// Optional Drag and drop
setTimeout(() => {
    const dropZone = document.getElementById('imgUploadZone');
    if(dropZone) {
      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--blue)'; });
      dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--glass-border)'; });
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--glass-border)';
        const dt = new DataTransfer();
        Array.from(e.dataTransfer.files).forEach(f => dt.items.add(f));
        const input = document.getElementById('imgUploadInput');
        input.files = dt.files;
        input.dispatchEvent(new Event('change'));
      });
    }
}, 1000);

function removeImage(index) {
  selectedImages.splice(index, 1);
  renderImages();
}

function renderImages() {
  const grid = document.getElementById('imagePreviewGrid');
  grid.innerHTML = selectedImages.map((file, idx) => {
    let src = '';
    if (file instanceof File) {
      src = URL.createObjectURL(file);
    } else {
      src = `https://sholash-life-science.onrender.com/${file}`; 
    }
    return `
      <div class="img-preview-wrap">
        <img src="${src}" class="img-preview" />
        <button type="button" class="img-remove" onclick="removeImage(${idx})"><i class="ri-close-line"></i></button>
      </div>
    `;
  }).join('');
}

// Form Submission
async function handleProductSubmit(e) {
  e.preventDefault();
  
  const btn = document.getElementById('btnSubmitProduct');
  const ogText = btn.innerHTML;
  btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Saving...';
  btn.disabled = true;
  
  const formData = new FormData();
  formData.append('name', document.getElementById('prod-name').value);
  formData.append('brand', document.getElementById('prod-brand').value);
  formData.append('tagline', document.getElementById('prod-tagline').value);
  formData.append('category', document.getElementById('prod-category').value);
  formData.append('price', document.getElementById('prod-price').value);
  formData.append('stock', document.getElementById('prod-stock').value);
  formData.append('color', document.getElementById('prod-color').value);
  formData.append('description', document.getElementById('prod-desc').value);
  
  formData.append('features', JSON.stringify(featuresList));
  formData.append('target', JSON.stringify(targetList));
  formData.append('details', JSON.stringify(detailsData));
  
  selectedImages.forEach(file => {
    if (file instanceof File) {
      formData.append('images', file);
    }
  });

  try {
    const url = isEditingProduct ? `/products/${editingProductId}` : '/products';
    const method = isEditingProduct ? 'PUT' : 'POST';
    
    const res = await fetch(`${API_BASE}${url}`, {
      method,
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      body: formData
    });
    
    const data = await res.json();
    if (data.success) {
      showToast(isEditingProduct ? 'Product updated successfully' : 'Product created successfully');
      closeModal();
      fetchAllData();
      initDashboard();
    } else {
      showToast(data.message || 'Error saving product');
    }
  } catch (err) {
    console.error(err);
    showToast('Network error occurred');
  } finally {
    btn.innerHTML = ogText;
    btn.disabled = false;
  }
}

// ---- EXPORT FUNCTIONALITY ----
function handleExport() {
  if (!ORDERS || ORDERS.length === 0) {
    showToast("No data available to export");
    return;
  }

  // Define CSV headers
  const headers = ["Order ID", "Product", "Customer", "Date", "Status", "Amount"];
  
  // Convert orders data to CSV rows
  const csvRows = ORDERS.map(order => [
    order.id,
    `"${order.product}"`, // Quote product name in case it contains commas
    `"${order.customer}"`,
    order.date,
    order.status,
    order.amount.replace('₹', '') // Remove currency symbol for cleaner data
  ].join(','));

  // Combine headers and rows
  const csvContent = [headers.join(','), ...csvRows].join('\n');
  
  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const timestamp = new Date().toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `sholash_report_${timestamp}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast("Report exported successfully!");
}

// ---- SIDE PANEL LOGIC ----
function togglePanel(id) {
  const panel = document.getElementById(id);
  const overlay = document.getElementById('panel-overlay');
  const isOpen = panel.classList.contains('open');
  
  // Close everything first
  closeAllPanels();
  
  if (!isOpen) {
    panel.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }
}

function closeAllPanels() {
  document.querySelectorAll('.side-panel').forEach(p => p.classList.remove('open'));
  const overlay = document.getElementById('panel-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

// Close panels on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeAllPanels();
    closeModal();
    closeOrderModal();
  }
});

// ---- CHART.JS DEFAULTS ----
document.addEventListener('click', e=>{
  const tab = e.target.closest('.tab');
  if(!tab) return;
  const group = tab.closest('.card-tabs');
  if(!group) return;
  group.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
});

// ---- THEME SWITCHING ----
function initTheme() {
  const savedTheme = localStorage.getItem('sholash-theme') || 'dark';
  const toggle = document.getElementById('themeToggle');
  
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggle) toggle.checked = false;
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggle) toggle.checked = true;
  }
}

function toggleTheme(e) {
  const isDark = e.target.checked;
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('sholash-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('sholash-theme', 'light');
  }
  
  // Refresh charts to update grid/text colors
  updateChartsTheme();
}

function updateChartsTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const textColor = isLight ? '#475569' : '#94A3B8';
  const gridColor = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  
  // Update Chart.js defaults (for future charts)
  Chart.defaults.color = textColor;
  
  // Update existing chart instances
  const charts = [
    'revenueChart', 'salesChart', 'ordersChart', 
    'trafficChart', 'regionChart', 'deviceChart'
  ];
  
  charts.forEach(id => {
    const chart = Chart.getChart(id);
    if (chart) {
      if (chart.options.scales) {
        if (chart.options.scales.x) chart.options.scales.x.ticks.color = textColor;
        if (chart.options.scales.x) chart.options.scales.x.grid.color = gridColor;
        if (chart.options.scales.y) chart.options.scales.y.ticks.color = textColor;
        if (chart.options.scales.y) chart.options.scales.y.grid.color = gridColor;
      }
      if (chart.options.plugins && chart.options.plugins.legend) {
        if (chart.options.plugins.legend.labels) chart.options.plugins.legend.labels.color = textColor;
      }
      chart.update();
    }
  });
}

// ---- TOASTS ----
function showToast(msg) {
  let container = document.querySelector('.toast-container');
  if(!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="ri-checkbox-circle-line" style="color:var(--green)"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- SETTINGS & PERSISTENCE ----
const SETTINGS_KEYS = {
  orderAlerts: 'sholash-alerts-orders',
  stockWarning: 'sholash-alerts-stock',
  reviews: 'sholash-alerts-reviews',
  reports: 'sholash-alerts-reports',
  animations: 'sholash-animations',
  compactSidebar: 'sholash-compact-sidebar'
};

function initSettings() {
  initTheme();
  
  // Load Checkbox States
  Object.keys(SETTINGS_KEYS).forEach(key => {
    const saved = localStorage.getItem(SETTINGS_KEYS[key]);
    const el = document.getElementById(`toggle-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
    if (el && saved !== null) {
      el.checked = saved === 'true';
    }
  });

  // Apply initial states
  const animsOn = localStorage.getItem(SETTINGS_KEYS.animations) !== 'false';
  document.body.classList.toggle('no-animations', !animsOn);
  
  const compactOn = localStorage.getItem(SETTINGS_KEYS.compactSidebar) === 'true';
  document.getElementById('sidebar').classList.toggle('collapsed', compactOn);
}

function handleSettingChange(id, key, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('change', (e) => {
    const val = e.target.checked;
    localStorage.setItem(key, val);
    
    if (id === 'toggle-animations') {
      document.body.classList.toggle('no-animations', !val);
    } else if (id === 'toggle-compact-sidebar') {
      document.getElementById('sidebar').classList.toggle('collapsed', val);
    }
    
    showToast(`${msg}: ${val ? 'Enabled' : 'Disabled'}`);
  });
}

// ---- SEARCH LOGIC ----
function handleSearch(inputId, type) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Fallback search type detection for navbar
    let currentType = type;
    if (type === 'auto') {
      const activePage = document.querySelector('.page.active').id;
      if (activePage === 'page-orders') currentType = 'orders';
      else if (activePage === 'page-products') currentType = 'products';
      else if (activePage === 'page-customers') currentType = 'customers';
      else if (activePage === 'page-reviews') currentType = 'reviews';
      else return; // Don't search on dashboard for now
    }

    if (currentType === 'orders') {
      const filtered = ORDERS.filter(o => 
        o._id.toLowerCase().includes(query) || 
        (o.orderItems && o.orderItems.some(i => i.name.toLowerCase().includes(query))) || 
        (o.user && o.user.name.toLowerCase().includes(query)) ||
        (o.orderStatus && o.orderStatus.toLowerCase().includes(query))
      );
      renderFullOrders(filtered);
    } else if (currentType === 'products') {
      const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || (p.brand && p.brand.toLowerCase().includes(query)));
      renderProducts(filtered);
    } else if (currentType === 'customers') {
      const filtered = CUSTOMERS.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.email.toLowerCase().includes(query)
      );
      renderCustomers(filtered);
    } else if (currentType === 'reviews') {
      const filtered = REVIEWS.filter(r => 
        r.author.toLowerCase().includes(query) || 
        r.product.toLowerCase().includes(query) || 
        r.text.toLowerCase().includes(query)
      );
      renderReviews(filtered);
    }
  });
}

// ---- INIT ----
window.addEventListener('DOMContentLoaded', ()=>{
  initSettings();
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('change', toggleTheme);

  // Setup other toggle listeners
  handleSettingChange('toggle-order-alerts', SETTINGS_KEYS.orderAlerts, 'Order Alerts');
  handleSettingChange('toggle-stock-warning', SETTINGS_KEYS.stockWarning, 'Stock Warnings');
  handleSettingChange('toggle-reviews', SETTINGS_KEYS.reviews, 'Review Notifications');
  handleSettingChange('toggle-reports', SETTINGS_KEYS.reports, 'Weekly Reports');
  handleSettingChange('toggle-animations', SETTINGS_KEYS.animations, 'Animations');
  handleSettingChange('toggle-compact-sidebar', SETTINGS_KEYS.compactSidebar, 'Compact Sidebar');

  // Setup search listeners
  handleSearch('navbar-search-input', 'auto');
  handleSearch('orders-search-input', 'orders');

  renderDashboardOrders();
  initDashboard();
  fetchAllData();
  
  // Wait a tick so canvas is laid out
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      initRevenueChart();
      initSalesChart();
      initOrdersChart();
      updateChartsTheme();
    });
  });
});
