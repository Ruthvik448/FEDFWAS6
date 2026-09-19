/* ═══════════════════════════════════════════════
   FOODSHARE – JavaScript App
   ═══════════════════════════════════════════════ */

'use strict';

/* ───────── FOOD DATA ─────────── */
const FOOD_DATA = [
  { id:1, name:'Vegetable Rice',  category:'Vegetarian',     qty:30,  location:'Benz Circle, Vijayawada', time:'Today, 11:30 AM – 4:00 PM', status:'Available', img:'images/food_veg_rice.jpg'     },
  { id:2, name:'Idly & Sambar',   category:'Vegetarian',     qty:20,  location:'Guntur',                  time:'Today, 9:00 AM – 1:00 PM',  status:'Available', img:'images/food_idly_sambar.jpg'  },
  { id:3, name:'Chapati & Curry', category:'Vegetarian',     qty:25,  location:'Yangagiri',               time:'Today, 10:00 AM – 2:00 PM', status:'Requested', img:'images/food_chapati_curry.jpg'},
  { id:4, name:'Bread & Fruits',  category:'Bakery/Fruit',   qty:15,  location:'Vijayawada',              time:'Today, 12:00 PM – 5:00 PM', status:'Available', img:'images/food_bread_fruits.jpg' },
  { id:5, name:'Chicken Biryani', category:'Non-Vegetarian', qty:40,  location:'Vijayawada',              time:'Today, 1:00 PM – 5:00 PM',  status:'Available', img:'images/food_biryani.jpg'      },
  { id:6, name:'Dal & Rice',      category:'Vegetarian',     qty:60,  location:'Guntur',                  time:'Today, 12:00 PM – 4:00 PM', status:'Collected', img:'images/food_dal_rice.jpg'     },
  { id:7, name:'Mixed Sweets',    category:'Vegan',          qty:100, location:'Vijayawada',              time:'Today, 10:00 AM – 3:00 PM', status:'Available', img:'images/food_sweets.jpg'       },
  { id:8, name:'Pongal',          category:'Vegetarian',     qty:35,  location:'Yangagiri',               time:'Today, 8:00 AM – 12:00 PM', status:'Requested', img:'images/food_pongal.jpg'       },
];

const RECENT_DONATIONS = [
  { food:'Vegetable Rice', cat:'Vegetarian', qty:30, loc:'Vijayawada', status:'Collected', date:'18-09-2026' },
  { food:'Idly & Sambar',  cat:'Vegetarian', qty:20, loc:'Guntur',     status:'Available', date:'18-09-2026' },
  { food:'Chapell & Curry',cat:'Vegetarian', qty:25, loc:'Yangagiri',  status:'Requested', date:'18-09-2026' },
  { food:'Bread & Fruits', cat:'Bakery/Fruit',qty:15,loc:'Vijayawada', status:'Available', date:'17-09-2026' },
  { food:'Chicken Biryani',cat:'Non-Veg',    qty:40, loc:'Vijayawada', status:'Available', date:'17-09-2026' },
];

/* ───────── NAVIGATION ─────────── */
function showPage(pageId) {
  /* hide all */
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  /* show target */
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
  }
  /* update nav links */
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  /* close mobile menu */
  document.getElementById('navLinks').classList.remove('open');
  /* page-specific inits */
  if (pageId === 'home') initStats();
  if (pageId === 'find') renderFoodGrid(FOOD_DATA);
  if (pageId === 'dashboard') initDashboard();
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ───────── HERO PARTICLES ─────────── */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 40 + 10;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*15+10}s;
      animation-delay:${Math.random()*-20}s;
    `;
    container.appendChild(p);
  }
}

/* ───────── ANIMATED COUNTERS ─────────── */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (target >= 1000 ? '+' : target === 40 || target === 10 ? '+' : '+');
    if (start >= target) clearInterval(timer);
  }, 16);
}

function initStats() {
  const items = document.querySelectorAll('.stat-item');
  items.forEach((item, i) => {
    const ids = ['stat1','stat2','stat3','stat4'];
    const targets = [1200,350,40,10];
    const el = document.getElementById(ids[i]);
    if (el) {
      el.textContent = '0';
      setTimeout(() => animateCounter(el, targets[i]), i * 200);
    }
  });
}

/* ───────── FIND FOOD ─────────── */
function renderFoodGrid(data) {
  const grid = document.getElementById('foodGrid');
  if (!grid) return;

  if (data.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#757575">
      <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
      <p>No food items found. Try different filters.</p>
    </div>`;
    return;
  }

  grid.innerHTML = data.map(f => {
    const badgeClass = f.status === 'Available' ? 'badge-available' : f.status === 'Requested' ? 'badge-requested' : 'badge-collected';
    const btnLabel   = f.status === 'Available' ? 'Request' : f.status === 'Requested' ? 'View' : 'Collected';
    const btnDisabled = f.status === 'Collected' ? 'disabled style="opacity:.5;cursor:default"' : '';
    return `
      <div class="food-card" data-id="${f.id}">
        <div class="food-card-header">
          <div class="food-img" style="overflow:hidden;border-radius:12px;background:#f5f5f5">
            <img src="${f.img}" alt="${f.name}" style="width:64px;height:64px;object-fit:cover;border-radius:12px;display:block" />
          </div>
          <div class="food-info">
            <h3>${f.name}</h3>
            <div class="food-meta">${f.category} · ${f.qty} meals</div>
          </div>
          <span class="food-badge ${badgeClass}">${f.status}</span>
        </div>
        <div class="food-card-body">
          <div class="food-detail">📍 ${f.location}</div>
          <div class="food-detail">⏰ ${f.time}</div>
        </div>
        <div class="food-card-footer">
          <button class="btn-request" onclick="openRequestModal(${f.id})" ${btnDisabled}>${btnLabel}</button>
          <button class="btn-view" onclick="openViewModal(${f.id})">View</button>
        </div>
      </div>`;
  }).join('');
}

function filterFood() {
  const query    = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const catF     = document.getElementById('filterCategory')?.value || '';
  const locF     = document.getElementById('filterLocation')?.value || '';
  const statusF  = document.getElementById('filterStatus')?.value || '';

  const filtered = FOOD_DATA.filter(f => {
    const matchQ  = !query   || f.name.toLowerCase().includes(query) || f.category.toLowerCase().includes(query);
    const matchC  = !catF    || f.category === catF;
    const matchL  = !locF    || f.location.includes(locF);
    const matchS  = !statusF || f.status === statusF;
    return matchQ && matchC && matchL && matchS;
  });
  renderFoodGrid(filtered);
}

/* ───────── MODALS ─────────── */
function openRequestModal(id) {
  const food = FOOD_DATA.find(f => f.id === id);
  if (!food) return;
  document.getElementById('modalTitle').textContent = '🙏 Request Food';
  document.getElementById('modalBody').innerHTML = `
    <div style="margin-bottom:1.25rem;padding:1rem;background:#f1f8e9;border-radius:10px;display:flex;gap:.75rem;align-items:center">
      <img src="${food.img}" alt="${food.name}" style="width:72px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0" />
      <div>
        <strong>${food.name}</strong>
        <div style="font-size:.85rem;color:#757575">${food.category} · ${food.qty} meals available</div>
        <div style="font-size:.8rem;color:#757575">📍 ${food.location}</div>
      </div>
    </div>
    <div class="form-grid" style="grid-template-columns:1fr">
      <div class="form-group">
        <label>Your Name *</label>
        <input type="text" id="m-name" placeholder="Enter your name" />
      </div>
      <div class="form-group">
        <label>Phone Number *</label>
        <input type="tel" id="m-phone" placeholder="Enter phone number" />
      </div>
      <div class="form-group">
        <label>Required Quantity *</label>
        <input type="number" id="m-qty" placeholder="How many meals?" max="${food.qty}" />
      </div>
      <div class="form-group">
        <label>Purpose *</label>
        <textarea id="m-purpose" placeholder="Describe your need..." rows="3"></textarea>
      </div>
      <button class="btn-form-submit" onclick="submitModalRequest(${id})" style="margin-top:.5rem">Submit Request 🙏</button>
    </div>`;
  document.getElementById('modalOverlay').classList.add('open');
}

function openViewModal(id) {
  const food = FOOD_DATA.find(f => f.id === id);
  if (!food) return;
  document.getElementById('modalTitle').textContent = '🍽️ Food Details';
  document.getElementById('modalBody').innerHTML = `
    <div style="text-align:center;margin-bottom:1.5rem">
      <img src="${food.img}" alt="${food.name}" style="width:160px;height:120px;object-fit:cover;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.15)" />
      <h2 style="margin:.75rem 0 .25rem">${food.name}</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div style="background:#f5f5f5;padding:.75rem;border-radius:10px">
        <div style="font-size:.75rem;font-weight:600;color:#757575;margin-bottom:.25rem">CATEGORY</div>
        <div>${food.category}</div>
      </div>
      <div style="background:#f5f5f5;padding:.75rem;border-radius:10px">
        <div style="font-size:.75rem;font-weight:600;color:#757575;margin-bottom:.25rem">QUANTITY</div>
        <div>${food.qty} meals</div>
      </div>
      <div style="background:#f5f5f5;padding:.75rem;border-radius:10px;grid-column:1/-1">
        <div style="font-size:.75rem;font-weight:600;color:#757575;margin-bottom:.25rem">LOCATION</div>
        <div>📍 ${food.location}</div>
      </div>
      <div style="background:#f5f5f5;padding:.75rem;border-radius:10px;grid-column:1/-1">
        <div style="font-size:.75rem;font-weight:600;color:#757575;margin-bottom:.25rem">AVAILABLE TIME</div>
        <div>⏰ ${food.time}</div>
      </div>
      <div style="grid-column:1/-1;background:#e8f5e9;padding:.75rem;border-radius:10px;text-align:center">
        <span style="color:#2e7d32;font-weight:700">${food.status}</span>
      </div>
    </div>`;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function submitModalRequest(id) {
  const name    = document.getElementById('m-name')?.value;
  const phone   = document.getElementById('m-phone')?.value;
  const qty     = document.getElementById('m-qty')?.value;
  const purpose = document.getElementById('m-purpose')?.value;
  if (!name || !phone || !qty || !purpose) {
    showToast('⚠️ Please fill all required fields!', '#e65100');
    return;
  }
  closeModal();
  showToast('✅ Food request submitted successfully! We will contact you shortly.');
  /* update status in data */
  const food = FOOD_DATA.find(f => f.id === id);
  if (food && food.status === 'Available') {
    food.status = 'Requested';
    renderFoodGrid(FOOD_DATA);
  }
}

/* ───────── TRACK DONATION ─────────── */
function trackDonation() {
  const val = document.getElementById('trackId')?.value.trim();
  if (!val) {
    showToast('⚠️ Please enter a Donation ID or Phone Number', '#e65100');
    return;
  }
  showToast('🔍 Tracking your donation...');
  /* reveal the track card with animation */
  const result = document.getElementById('trackResult');
  if (result) {
    result.style.opacity = '0';
    result.style.transform = 'translateY(20px)';
    result.style.display = 'block';
    setTimeout(() => {
      result.style.transition = 'all .5s ease';
      result.style.opacity = '1';
      result.style.transform = 'translateY(0)';
    }, 100);
  }
}

/* ───────── DASHBOARD ─────────── */
function initDashboard() {
  renderBarChart();
  renderRecentDonations();
}

function renderBarChart() {
  const data = [
    { label:'Available', val:8,  color:'#43a047' },
    { label:'Requested', val:5,  color:'#ff9800' },
    { label:'Collected', val:7,  color:'#2196f3' },
    { label:'Distributed', val:10, color:'#9c27b0' },
  ];
  const maxVal = Math.max(...data.map(d => d.val));
  const chart  = document.getElementById('barChart');
  if (!chart) return;
  chart.innerHTML = data.map(d => {
    const h = Math.round((d.val / maxVal) * 140);
    return `<div class="bar-wrap">
      <div class="bar-fill" style="height:${h}px;background:linear-gradient(180deg,${d.color},${d.color}88)" data-val="${d.val}">
      </div>
    </div>`;
  }).join('');
}

function renderRecentDonations() {
  const tbody = document.getElementById('recentDonations');
  if (!tbody) return;
  const statusColors = { Available:'#2e7d32', Requested:'#e65100', Collected:'#1565c0', Distributed:'#6a1b9a' };
  tbody.innerHTML = RECENT_DONATIONS.map(d => `
    <tr>
      <td><strong>${d.food}</strong></td>
      <td>${d.cat}</td>
      <td>${d.qty}</td>
      <td>${d.loc}</td>
      <td><span style="color:${statusColors[d.status] || '#333'};font-weight:600">${d.status}</span></td>
      <td>${d.date}</td>
    </tr>`).join('');
}

function updateDashboard() {
  /* just re-render for demo */
  renderBarChart();
}

/* ───────── FORM HANDLERS ─────────── */
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  showToast(`🎉 Welcome, ${name}! You are now registered as a donor.`);
  e.target.reset();
  setTimeout(() => showPage('donate'), 1500);
}

function handleDonate(e) {
  e.preventDefault();
  const food = document.getElementById('don-name').value;
  showToast(`✅ "${food}" donated successfully! Thank you for sharing! 💚`);
  e.target.reset();
  /* add to food data */
  const newFood = {
    id: FOOD_DATA.length + 1,
    name: food,
    category: document.getElementById('don-category').value,
    qty: parseInt(document.getElementById('don-qty').value) || 10,
    location: document.getElementById('don-pickup').value || 'Vijayawada',
    time: 'Today, Available',
    status: 'Available',
    img: 'images/food_veg_rice.jpg'
  };
  FOOD_DATA.push(newFood);
  setTimeout(() => showPage('find'), 1500);
}

function handleRequest(e) {
  e.preventDefault();
  const name = document.getElementById('req-name').value;
  showToast(`✅ Request submitted for ${name}! We'll match you with a donor soon. 🙏`);
  e.target.reset();
}

function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('con-name').value;
  showToast(`📩 Thank you, ${name}! Your message has been sent. We'll respond soon! 💚`);
  e.target.reset();
}

/* ───────── TOAST ─────────── */
function showToast(message, bg = '#2e7d32') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.background = bg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ───────── SCROLL NAVBAR ─────────── */
function initScrollNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

/* ───────── INIT ─────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollNav();
  initStats();
  renderFoodGrid(FOOD_DATA);

  /* Set default datetime values */
  const now = new Date();
  const nowStr = now.toISOString().slice(0,16);
  const later  = new Date(now.getTime() + 6 * 3600000).toISOString().slice(0,16);
  document.querySelectorAll('input[type=datetime-local]').forEach(el => {
    if (el.id.includes('prepared') || el.id.includes('pickup')) {
      el.value = nowStr;
    } else {
      el.value = later;
    }
  });
});
