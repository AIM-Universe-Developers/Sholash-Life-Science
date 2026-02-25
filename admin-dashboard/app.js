/* =====================================================
   SHOLASH ADMIN — app.js  |  Data + Charts + Routing
   ===================================================== */

// ---- DATA ----
const ORDERS = [
  { id:'#SH-10421', product:'Glow Serum 30ml', customer:'Aisha Patel', date:'Feb 24, 2026', status:'delivered', amount:'$48.00' },
  { id:'#SH-10420', product:'HydraBalance Cream', customer:'Marcus Chen', date:'Feb 24, 2026', status:'shipped', amount:'$65.00' },
  { id:'#SH-10419', product:'Vitamin C Booster', customer:'Priya Sharma', date:'Feb 23, 2026', status:'pending', amount:'$39.00' },
  { id:'#SH-10418', product:'Retinol Night Oil', customer:'James Okafor', date:'Feb 23, 2026', status:'delivered', amount:'$82.00' },
  { id:'#SH-10417', product:'SPF 50+ Sunscreen', customer:'Luna García', date:'Feb 22, 2026', status:'cancelled', amount:'$28.00' },
  { id:'#SH-10416', product:'Pearl Brightener', customer:'Emily Watson', date:'Feb 22, 2026', status:'shipped', amount:'$75.00' },
  { id:'#SH-10415', product:'Collagen Peptide', customer:'Raj Murthy', date:'Feb 21, 2026', status:'delivered', amount:'$55.00' },
  { id:'#SH-10414', product:'Rose Water Toner', customer:'Yuki Tanaka', date:'Feb 21, 2026', status:'pending', amount:'$32.00' },
  { id:'#SH-10413', product:'Micellar Cleanser', customer:'Chris Adeyemi', date:'Feb 20, 2026', status:'shipped', amount:'$27.00' },
  { id:'#SH-10412', product:'Eye Lift Serum', customer:'Sarah Kim', date:'Feb 20, 2026', status:'delivered', amount:'$94.00' },
];

const PRODUCTS = [
  { emoji:'🌿', name:'Glow Serum 30ml', price:'$48.00', stock:142, low:false },
  { emoji:'💧', name:'HydraBalance Cream', price:'$65.00', stock:89, low:false },
  { emoji:'☀️', name:'Vitamin C Booster', price:'$39.00', stock:17, low:true },
  { emoji:'🌙', name:'Retinol Night Oil', price:'$82.00', stock:204, low:false },
  { emoji:'🛡️', name:'SPF 50+ Sunscreen', price:'$28.00', stock:8,  low:true },
  { emoji:'✨', name:'Pearl Brightener', price:'$75.00', stock:56, low:false },
  { emoji:'💎', name:'Collagen Peptide', price:'$55.00', stock:120, low:false },
  { emoji:'🌹', name:'Rose Water Toner', price:'$32.00', stock:233, low:false },
  { emoji:'🫧', name:'Micellar Cleanser', price:'$27.00', stock:310, low:false },
  { emoji:'👁️', name:'Eye Lift Serum', price:'$94.00', stock:44, low:false },
  { emoji:'🧴', name:'Exfoliating Scrub', price:'$36.00', stock:12, low:true },
  { emoji:'🍯', name:'Honey Mask', price:'$42.00', stock:98, low:false },
];

const CUSTOMERS = [
  { initials:'AP', name:'Aisha Patel',   email:'aisha@mail.com',   orders:14, colors:['#3B82F6','#7C3AED'] },
  { initials:'MC', name:'Marcus Chen',   email:'mchen@mail.com',   orders:8,  colors:['#06B6D4','#3B82F6'] },
  { initials:'PS', name:'Priya Sharma',  email:'priya@mail.com',   orders:22, colors:['#8B5CF6','#2563EB'] },
  { initials:'JO', name:'James Okafor', email:'james@mail.com',   orders:5,  colors:['#10B981','#06B6D4'] },
  { initials:'LG', name:'Luna García',  email:'luna@mail.com',    orders:11, colors:['#F59E0B','#EF4444'] },
  { initials:'EW', name:'Emily Watson', email:'emily@mail.com',   orders:19, colors:['#EC4899','#8B5CF6'] },
  { initials:'RM', name:'Raj Murthy',   email:'raj@mail.com',     orders:7,  colors:['#3B82F6','#10B981'] },
  { initials:'YT', name:'Yuki Tanaka',  email:'yuki@mail.com',    orders:3,  colors:['#F59E0B','#3B82F6'] },
];

const REVIEWS = [
  { author:'Aisha Patel',   product:'Glow Serum 30ml',  stars:5, text:'Absolutely love this! My skin feels so soft and radiant after just one week of use.', colors:['#3B82F6','#7C3AED'] },
  { author:'Marcus Chen',   product:'HydraBalance Cream', stars:4, text:'Great moisturizer, light texture and absorbs quickly. Will definitely repurchase.', colors:['#06B6D4','#3B82F6'] },
  { author:'Priya Sharma',  product:'Vitamin C Booster', stars:5, text:'Noticed a visible difference in my skin tone within two weeks. Highly recommended!', colors:['#8B5CF6','#2563EB'] },
  { author:'Luna García',   product:'SPF 50+ Sunscreen', stars:3, text:'Good protection but slightly leaves a white cast. Would be perfect in a tinted version.', colors:['#F59E0B','#EF4444'] },
  { author:'Emily Watson',  product:'Pearl Brightener',  stars:5, text:'The texture is luxurious and the glow it gives is unreal. My skincare staple!', colors:['#EC4899','#8B5CF6'] },
  { author:'Raj Murthy',    product:'Collagen Peptide',  stars:4, text:'Skin feels firmer after consistent use. Great product at a fair price point.', colors:['#3B82F6','#10B981'] },
];

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
  tbody.innerHTML = ORDERS.slice(0,5).map(o=>`
    <tr>
      <td><code style="color:var(--blue);font-size:.8rem;">${o.id}</code></td>
      <td>${o.product}</td>
      <td>${o.customer}</td>
      <td>${statusBadge(o.status)}</td>
      <td style="font-weight:600;color:var(--text-primary);">${o.amount}</td>
    </tr>`).join('');
}

// Full orders page
function renderFullOrders() {
  const tbody = document.getElementById('fullOrdersBody');
  if(!tbody) return;
  tbody.innerHTML = ORDERS.map(o=>`
    <tr>
      <td><code style="color:var(--blue);font-size:.8rem;">${o.id}</code></td>
      <td>${o.product}</td>
      <td>${o.customer}</td>
      <td style="color:var(--text-muted);font-size:.78rem;">${o.date}</td>
      <td>${statusBadge(o.status)}</td>
      <td style="font-weight:600;color:var(--text-primary);">${o.amount}</td>
      <td>
        <button class="btn-glass sm"><i class="ri-eye-line"></i></button>
        <button class="btn-glass sm" style="margin-left:4px;"><i class="ri-edit-line"></i></button>
      </td>
    </tr>`).join('');
}

// Products
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  grid.innerHTML = PRODUCTS.map(p=>`
    <div class="product-card glass-card float-card">
      <div class="product-img">${p.emoji}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-meta">
        <span class="product-price">${p.price}</span>
        <span class="product-stock ${p.low?'low':''}">Stock: ${p.stock}${p.low?' ⚠️':''}</span>
      </div>
      <button class="product-edit"><i class="ri-edit-line"></i> Edit Product</button>
    </div>`).join('');
}

// Customers
function renderCustomers() {
  const grid = document.getElementById('customersGrid');
  if(!grid) return;
  grid.innerHTML = CUSTOMERS.map(c=>`
    <div class="customer-card glass-card float-card">
      <div class="cust-avatar" style="background:linear-gradient(135deg,${c.colors[0]},${c.colors[1]})">${c.initials}</div>
      <div class="cust-name">${c.name}</div>
      <div class="cust-email">${c.email}</div>
      <div class="cust-orders">${c.orders} orders placed</div>
      <button class="btn-glass sm" style="margin-top:6px;width:100%;justify-content:center;">View Profile</button>
    </div>`).join('');
}

// Reviews
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if(!grid) return;
  grid.innerHTML = REVIEWS.map(r=>`
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

// ---- MODAL ----
function showAddProduct() {
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

// ---- TAB CLICKS (generic) ----
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

// ---- INIT ----
window.addEventListener('DOMContentLoaded', ()=>{
  initTheme();
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('change', toggleTheme);

  renderDashboardOrders();
  renderFullOrders();
  renderProducts();
  renderCustomers();
  renderReviews();
  
  // Wait a tick so canvas is laid out
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      initRevenueChart();
      initSalesChart();
      initOrdersChart();
      // Apply correct theme colors to newly created charts
      updateChartsTheme();
    });
  });
});
