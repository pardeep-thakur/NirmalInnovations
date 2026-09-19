/**
 * Nirmal Innovations Admin Dashboard App Logic
 * Client-side SPA routing, VM Stations, Customers, Products CRUD & Modals
 * Supports both Live Express Backend and Static GitHub Pages / Offline Demo
 */

// Initial Seed Data
const DEFAULT_STATIONS = [
  { id: '1', name: 'ASD', code: 'ASD', address: 'Ahmedabad Gujarat India 380001', latitude: '23.0225', longitude: '72.5714', phone: '9876543210', email: 'asd@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380001', status: 'Enabled' },
  { id: '2', name: 'Nirmal Test', code: 'Nirmal', address: '123 street India 380001', latitude: '23.0300', longitude: '72.5800', phone: '9925069523', email: 'nirmal@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380001', status: 'Enabled' },
  { id: '3', name: 'Zydus', code: 'ZYD', address: 'Ahmedabad Gujarat India 380001', latitude: '22.9900', longitude: '72.5100', phone: '9825069523', email: 'zydus@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380001', status: 'Enabled' },
  { id: '4', name: 'Tea Vend 1', code: 'TV1', address: 'a-211, it slos, sg highway Ahmedabad Gujarat India 380015', latitude: '23.0400', longitude: '72.5200', phone: '8866041036', email: 'tv1@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380015', status: 'Enabled' },
  { id: '5', name: 'Tea Vend 2', code: 'TV2', address: 'a-211, it slos, sg highway Ahmedabad Gujarat India 380015', latitude: '23.0410', longitude: '72.5210', phone: '8866041037', email: 'tv2@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380015', status: 'Enabled' },
  { id: '6', name: 'Tea Vend 3', code: 'TV3', address: 'a-211, it slos, sg highway Ahmedabad Gujarat India 380015', latitude: '23.0420', longitude: '72.5220', phone: '8866041038', email: 'tv3@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380015', status: 'Enabled' },
  { id: '7', name: 'Hiren1', code: 'H1', address: 'a-211, it slos, sg highway Ahmedabad Gujarat India 380015', latitude: '23.0450', longitude: '72.5250', phone: '9106897179', email: 'hiren@nirmal.com', country: 'India', state: 'Gujarat', city: 'Ahmedabad', zip: '380015', status: 'Enabled' }
];

const DEFAULT_CUSTOMERS = [
  { id: '1', name: 'jobin mackwan', email: 'xyz@gmail.com', contact: '1234567890', balance: 416.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '2', name: 'Nirmal Panchal', email: '123@123.co', contact: '9925069523', balance: 297.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '3', name: 'N P', email: '123@123.co', contact: '9825069523', balance: 4471.00, billing: 'Post-Paid', city: 'Baroda' },
  { id: '4', name: 'Ruchi as', email: 'assd@gmail.com', contact: '1234567891', balance: 4459.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '5', name: 'testa testa', email: 'nirmalpanc444@gmail.com', contact: '9106897179', balance: 4825.00, billing: 'Pre-Paid', city: 'Surat' },
  { id: '6', name: 'DND Demo', email: 'demo@gmail.com', contact: '9897665464', balance: -35796.00, billing: 'Post-Paid', city: 'Rajkot' },
  { id: '7', name: 'Hiren bhai Rathod', email: 'hir_2288@yahoo.com', contact: '8866041036', balance: 220.00, billing: 'Pre-Paid', city: 'Ahmedabad' },
  { id: '8', name: 'demoone demoone', email: 'asjddsaoi@gmail.com', contact: '6786543212', balance: 4985.00, billing: 'Pre-Paid', city: 'Gandhinagar' },
  { id: '9', name: 'reasd sf', email: 'virendrasinghshekhawat4@gmail.com', contact: '5412545641', balance: 620.00, billing: 'Pre-Paid', city: 'Jaipur' },
  { id: '10', name: 'demoqwer Mehta', email: 'asdgiuygih@gmail.com', contact: '9598714254', balance: 100.00, billing: 'Pre-Paid', city: 'Ahmedabad' }
];

const DEFAULT_PRODUCTS = [
  { id: '1', machine: 'ASMT ASMT', name: 'Tea 500Grms', image: 'tea.jpg', uom: 'Kg', unitSize: '1', price: 1.00, gst: 1.00, mrp: 1.00, minQty: '1', status: 'Enabled' },
  { id: '2', machine: 'CMP001 CMP001', name: 'Amul Gold', image: 'amul_gold.jpg', uom: 'Liter', unitSize: '0.500', price: 27.26, gst: 6.00, mrp: 29.00, minQty: '1', status: 'Disabled' },
  { id: '3', machine: 'CMP001 CMP001', name: 'Amul Taza', image: 'amul_taza.jpg', uom: 'Liter', unitSize: '0.500', price: 23.50, gst: 6.00, mrp: 25.00, minQty: '1', status: 'Disabled' },
  { id: '4', machine: 'CMP001 CMP001', name: 'Amul Shakti', image: 'amul_shakti.jpg', uom: 'Liter', unitSize: '0.500', price: 19.74, gst: 6.00, mrp: 21.00, minQty: '1', status: 'Disabled' },
  { id: '5', machine: 'CMP001 CMP001', name: '46.Ferrero Rocher - Chocolate (24 pcs)', image: 'ferrero.jpg', uom: 'Piece', unitSize: '1', price: 737.29, gst: 18.00, mrp: 870.00, minQty: '1', status: 'Disabled' },
  { id: '6', machine: 'ZYDVEND ZYD003', name: '31.JEERA MASALA', image: 'jeera.jpg', uom: 'Liter', unitSize: '1', price: 1.00, gst: 0.00, mrp: 1.00, minQty: '1', status: 'Enabled' },
  { id: '7', machine: 'ZYDVEND ZYD003', name: '34.COCA COLA', image: 'cocacola.jpg', uom: 'Liter', unitSize: '1', price: 20.00, gst: 0.00, mrp: 20.00, minQty: '1', status: 'Disabled' },
  { id: '8', machine: 'ZYDVEND ZYD003', name: '32. SPRITE', image: 'sprite.jpg', uom: 'Liter', unitSize: '1', price: 10.00, gst: 0.00, mrp: 10.00, minQty: '1', status: 'Enabled' },
  { id: '9', machine: 'ZYDVEND ZYD003', name: '36.BISLERI', image: 'bisleri.jpg', uom: 'Liter', unitSize: '1', price: 10.00, gst: 0.00, mrp: 10.00, minQty: '1', status: 'Disabled' },
  { id: '10', machine: 'ZYDVEND ZYD003', name: '37.PEPSI', image: 'pepsi.jpg', uom: 'Liter', unitSize: '1', price: 20.00, gst: 0.00, mrp: 20.00, minQty: '1', status: 'Disabled' }
];

// App State
let state = {
  stations: [],
  customers: [],
  products: [],
  deleteTarget: null
};

// LocalStorage helpers for seamless demo on GitHub Pages
function getLocalData(key, defaultVal) {
  try {
    const item = localStorage.getItem('nirmal_' + key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setLocalData(key, val) {
  try {
    localStorage.setItem('nirmal_' + key, JSON.stringify(val));
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  initSidebar();
  initAnimations();
  initBalanceModal();
  initStationModal();
  initCustomerModal();
  initProductModal();
  initDeleteModal();
  initTableFilters();
  initQuickActions();

  // Load initial data
  fetchStations();
  fetchCustomers();
  fetchProducts();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('theme-sun-icon');
  const moonIcon = document.getElementById('theme-moon-icon');

  const savedTheme = localStorage.getItem('nirmal_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    sunIcon?.classList.remove('hidden');
    moonIcon?.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon?.classList.add('hidden');
    moonIcon?.classList.remove('hidden');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('nirmal_theme', isDark ? 'dark' : 'light');
      sunIcon?.classList.toggle('hidden', !isDark);
      moonIcon?.classList.toggle('hidden', isDark);
      showToast(isDark ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️', 'info');
    });
  }
}

/* ==========================================================================
   2. Client-Side Router (Supports Hash & Path routing on GitHub Pages & Localhost)
   ========================================================================== */
function initRouter() {
  const validRoutes = ['dashboard', 'machines', 'customers', 'products', 'reports', 'billing', 'settings'];

  function getCleanRoute() {
    // 1. Check URL hash first (e.g. #machines or #/machines)
    if (window.location.hash) {
      const hashRoute = window.location.hash.replace(/^[#/]+/, '').toLowerCase();
      if (validRoutes.includes(hashRoute)) {
        return hashRoute;
      }
    }

    // 2. Check pathname (handles root, subdirectories like /NirmalInnovations/customers)
    const segments = window.location.pathname.toLowerCase().split('/').filter(Boolean);
    if (segments.length > 0) {
      const last = segments[segments.length - 1];
      if (validRoutes.includes(last)) {
        return last;
      }
    }

    return 'dashboard';
  }

  function handleRoute() {
    const activeRoute = getCleanRoute();

    // Toggle view sections
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => v.classList.add('hidden'));

    const targetView = document.getElementById(activeRoute + '-view');
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    // Highlight active sidebar links in desktop & mobile
    const allNavLinks = document.querySelectorAll('.nav-link, #drawer-content a');
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const cleanHref = href.replace(/^[#/]+/, '');
      if (cleanHref === activeRoute) {
        link.classList.add('bg-emerald-50/90', 'dark:bg-emerald-950/70', 'text-emerald-700', 'dark:text-emerald-300', 'border-emerald-200/60', 'dark:border-emerald-800/60', 'font-bold');
        link.classList.remove('text-slate-600', 'dark:text-slate-400');
        const icon = link.querySelector('svg');
        if (icon) {
          icon.classList.remove('text-slate-400');
          icon.classList.add('text-emerald-500');
        }
      } else {
        link.classList.remove('bg-emerald-50/90', 'dark:bg-emerald-950/70', 'text-emerald-700', 'dark:text-emerald-300', 'border-emerald-200/60', 'dark:border-emerald-800/60', 'font-bold');
        link.classList.add('text-slate-600', 'dark:text-slate-400');
        const icon = link.querySelector('svg');
        if (icon && !link.classList.contains('group')) {
          icon.classList.add('text-slate-400');
        }
      }
    });

    if (typeof window.closeMobileDrawer === 'function') {
      window.closeMobileDrawer();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Intercept navigation link clicks for SPA hash change without full page reloads
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href && (href.startsWith('#') || href.startsWith('/')) && !href.startsWith('//') && !href.startsWith('http')) {
      const route = href.replace(/^[#/]+/, '');
      if (validRoutes.includes(route)) {
        e.preventDefault();
        window.location.hash = '#' + route;
        handleRoute();
      }
    }
  });

  window.addEventListener('popstate', handleRoute);
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

/* ==========================================================================
   3. Sidebar & Mobile Drawer Logic
   ========================================================================== */
function initSidebar() {
  const sidebar = document.getElementById('main-sidebar');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerContent = document.getElementById('drawer-content');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const collapseDesktopBtn = document.getElementById('collapse-desktop-sidebar-btn');

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('hidden');
    setTimeout(() => {
      drawerBackdrop?.classList.remove('opacity-0');
      drawerContent?.classList.remove('-translate-x-full');
    }, 10);
  }

  window.closeMobileDrawer = function() {
    if (!mobileDrawer || mobileDrawer.classList.contains('hidden')) return;
    drawerBackdrop?.classList.add('opacity-0');
    drawerContent?.classList.add('-translate-x-full');
    setTimeout(() => {
      mobileDrawer.classList.add('hidden');
    }, 300);
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

  let isCollapsed = false;
  if (collapseDesktopBtn && sidebar) {
    collapseDesktopBtn.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      const textLabels = sidebar.querySelectorAll('.sidebar-label');
      const brandTitle = document.getElementById('brand-title');
      const brandSub = document.getElementById('brand-subtitle');

      if (isCollapsed) {
        sidebar.classList.replace('w-64', 'w-20');
        textLabels.forEach(el => el.classList.add('hidden'));
        if (brandTitle) brandTitle.classList.add('hidden');
        if (brandSub) brandSub.classList.add('hidden');
        collapseDesktopBtn.style.transform = 'rotate(180deg)';
      } else {
        sidebar.classList.replace('w-20', 'w-64');
        textLabels.forEach(el => el.classList.remove('hidden'));
        if (brandTitle) brandTitle.classList.remove('hidden');
        if (brandSub) brandSub.classList.remove('hidden');
        collapseDesktopBtn.style.transform = 'rotate(0deg)';
      }
    });
  }
}

/* ==========================================================================
   4. Staggered Animations & Counter Values
   ========================================================================== */
function initAnimations() {
  const statNumbers = document.querySelectorAll('.counter-value');

  statNumbers.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || counter.innerText, 10);
    let count = 0;
    const speed = Math.max(1, Math.floor(target / 25));

    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

/* ==========================================================================
   5. Data Fetching API Functions (Hybrid: Server API with LocalStorage Fallback)
   ========================================================================== */
async function fetchStations() {
  try {
    const res = await fetch('/api/stations');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      state.stations = data.data;
      setLocalData('stations', state.stations);
    } else {
      throw new Error('Invalid API response');
    }
  } catch (err) {
    state.stations = getLocalData('stations', DEFAULT_STATIONS);
  }
  renderStationsTable();
  renderDashboardStationGrid();
  updateBadges();
}

async function fetchCustomers() {
  try {
    const res = await fetch('/api/customers');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      state.customers = data.data;
      setLocalData('customers', state.customers);
    } else {
      throw new Error('Invalid API response');
    }
  } catch (err) {
    state.customers = getLocalData('customers', DEFAULT_CUSTOMERS);
  }
  renderCustomersTable();
  populateCustomerSelect();
  updateBadges();
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      state.products = data.data;
      setLocalData('products', state.products);
    } else {
      throw new Error('Invalid API response');
    }
  } catch (err) {
    state.products = getLocalData('products', DEFAULT_PRODUCTS);
  }
  renderProductsTable();
  updateBadges();
}

function updateBadges() {
  const stationBadge = document.getElementById('station-count-badge');
  const customerBadge = document.getElementById('customer-count-badge');
  const productBadge = document.getElementById('product-count-badge');

  if (stationBadge) stationBadge.innerText = state.stations.length;
  if (customerBadge) customerBadge.innerText = state.customers.length;
  if (productBadge) productBadge.innerText = state.products.length;

  const dashStation = document.getElementById('dash-station-count');
  const dashProduct = document.getElementById('dash-product-count');
  const dashCustomer = document.getElementById('dash-customer-count');

  if (dashStation) dashStation.innerText = state.stations.length;
  if (dashProduct) dashProduct.innerText = state.products.length;
  if (dashCustomer) dashCustomer.innerText = state.customers.length;
}

function populateCustomerSelect() {
  const select = document.getElementById('balance-customer-select');
  if (!select) return;

  select.innerHTML = state.customers.map(c => `
    <option value="${c.name}">${c.name} (${c.email || c.contact})</option>
  `).join('');
}

/* ==========================================================================
   6. Render Tables (VM Stations, Customers, Products)
   ========================================================================== */
function renderStationsTable() {
  const tbody = document.getElementById('machines-tbody');
  if (!tbody) return;

  if (state.stations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No VM Stations found. Click 'Add VM Station' to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.stations.map((s, idx) => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">${idx + 1}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
            ${s.code}
          </div>
          <span>${s.name}</span>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 dark:text-emerald-400 font-mono font-bold">${s.code}</td>
      <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-xs truncate" title="${s.address}">${s.address}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${s.status === 'Enabled' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}">
          ${s.status}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
        <button onclick="triggerDelete('station', '${s.id}', '${s.name}')" class="px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 transition-colors">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function renderDashboardStationGrid() {
  const container = document.getElementById('dashboard-stations-grid');
  if (!container) return;

  container.innerHTML = state.stations.slice(0, 4).map(s => `
    <div class="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between space-y-3 hover-lift">
      <div class="flex items-start justify-between">
        <a href="#machines" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
            ${s.code}
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${s.name}</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">${s.city || 'Ahmedabad'}, ${s.state || 'Gujarat'}</p>
          </div>
        </a>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
      </div>
      <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/50 dark:border-slate-700/40">
        <span>Status: <strong class="text-emerald-600 dark:text-emerald-400">${s.status}</strong></span>
        <div class="flex items-center space-x-3">
          <a href="#machines" class="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center space-x-1">
            <span>Manage</span>
            <span>&rarr;</span>
          </a>
          <button data-station="${s.name}" class="action-reboot-btn text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium">Reboot</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCustomersTable() {
  const tbody = document.getElementById('customers-tbody');
  if (!tbody) return;

  if (state.customers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">No Customers found. Click 'Add Customer' to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.customers.map((c, idx) => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">${idx + 1}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">${c.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${c.email}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600 dark:text-slate-300">${c.contact}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-bold ${c.balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
        $${parseFloat(c.balance).toFixed(2)}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
        <button onclick="triggerDelete('customer', '${c.id}', '${c.name}')" class="px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 transition-colors">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function renderProductsTable() {
  const tbody = document.getElementById('products-tbody');
  if (!tbody) return;

  if (state.products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="px-6 py-8 text-center text-slate-400">No Products found. Click 'Add Product' to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.products.map((p) => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">${p.machine}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">${p.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${p.uom}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${p.unitSize}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600 dark:text-emerald-400">$${parseFloat(p.price).toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">${p.gst}%</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">$${parseFloat(p.mrp).toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
        <button onclick="triggerDelete('product', '${p.id}', '${p.name}')" class="px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 transition-colors">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

/* ==========================================================================
   7. Modals: Add VM Station, Customer, Product
   ========================================================================== */
function initStationModal() {
  const modal = document.getElementById('station-modal');
  const modalBackdrop = document.getElementById('station-modal-backdrop');
  const modalBox = document.getElementById('station-modal-box');
  const openBtn = document.getElementById('open-station-modal-btn');
  const closeBtn = document.getElementById('close-station-modal-btn');
  const cancelBtn = document.getElementById('cancel-station-modal-btn');
  const form = document.getElementById('station-add-form');

  function openModal() {
    modal?.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop?.classList.remove('opacity-0');
      modalBox?.classList.remove('scale-95', 'opacity-0');
      modalBox?.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function closeModal() {
    modalBackdrop?.classList.add('opacity-0');
    modalBox?.classList.remove('scale-100', 'opacity-100');
    modalBox?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal?.classList.add('hidden'); }, 300);
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('station-name-input')?.value,
        code: document.getElementById('station-code-input')?.value,
        address: document.getElementById('station-address-input')?.value,
        phone: document.getElementById('station-phone-input')?.value,
        email: document.getElementById('station-email-input')?.value,
        city: document.getElementById('station-city-input')?.value
      };

      try {
        const res = await fetch('/api/stations/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('✅ VM Station added successfully!', 'success');
          fetchStations();
          form.reset();
          closeModal();
          return;
        }
      } catch (err) {
        // Offline / GitHub Pages fallback
      }

      // Add to local state & storage
      const newStation = {
        id: String(Date.now()),
        name: payload.name,
        code: payload.code,
        address: payload.address || 'Ahmedabad Gujarat India',
        phone: payload.phone || '9876543210',
        email: payload.email || 'station@nirmal.com',
        city: payload.city || 'Ahmedabad',
        state: 'Gujarat',
        status: 'Enabled'
      };

      state.stations.unshift(newStation);
      setLocalData('stations', state.stations);
      renderStationsTable();
      renderDashboardStationGrid();
      updateBadges();
      showToast('✅ VM Station added successfully!', 'success');
      form.reset();
      closeModal();
    });
  }
}

function initCustomerModal() {
  const modal = document.getElementById('customer-modal');
  const modalBackdrop = document.getElementById('customer-modal-backdrop');
  const modalBox = document.getElementById('customer-modal-box');
  const openBtn = document.getElementById('open-customer-modal-btn');
  const closeBtn = document.getElementById('close-customer-modal-btn');
  const cancelBtn = document.getElementById('cancel-customer-modal-btn');
  const form = document.getElementById('customer-add-form');

  function openModal() {
    modal?.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop?.classList.remove('opacity-0');
      modalBox?.classList.remove('scale-95', 'opacity-0');
      modalBox?.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function closeModal() {
    modalBackdrop?.classList.add('opacity-0');
    modalBox?.classList.remove('scale-100', 'opacity-100');
    modalBox?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal?.classList.add('hidden'); }, 300);
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        firstName: document.getElementById('cust-firstname-input')?.value,
        lastName: document.getElementById('cust-lastname-input')?.value,
        email: document.getElementById('cust-email-input')?.value,
        mobile: document.getElementById('cust-mobile-input')?.value,
        billing: document.getElementById('cust-billing-select')?.value,
        city: document.getElementById('cust-city-input')?.value
      };

      try {
        const res = await fetch('/api/customers/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('✅ Customer added successfully!', 'success');
          fetchCustomers();
          form.reset();
          closeModal();
          return;
        }
      } catch (err) {
        // Offline / GitHub Pages fallback
      }

      const newCustomer = {
        id: String(Date.now()),
        name: `${payload.firstName} ${payload.lastName || ''}`.trim(),
        email: payload.email,
        contact: payload.mobile,
        balance: 0.00,
        billing: payload.billing || 'Pre-Paid',
        city: payload.city || 'Ahmedabad'
      };

      state.customers.unshift(newCustomer);
      setLocalData('customers', state.customers);
      renderCustomersTable();
      populateCustomerSelect();
      updateBadges();
      showToast('✅ Customer added successfully!', 'success');
      form.reset();
      closeModal();
    });
  }
}

function initProductModal() {
  const modal = document.getElementById('product-modal');
  const modalBackdrop = document.getElementById('product-modal-backdrop');
  const modalBox = document.getElementById('product-modal-box');
  const openBtn = document.getElementById('open-product-modal-btn');
  const closeBtn = document.getElementById('close-product-modal-btn');
  const cancelBtn = document.getElementById('cancel-product-modal-btn');
  const form = document.getElementById('product-add-form');

  function openModal() {
    modal?.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop?.classList.remove('opacity-0');
      modalBox?.classList.remove('scale-95', 'opacity-0');
      modalBox?.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function closeModal() {
    modalBackdrop?.classList.add('opacity-0');
    modalBox?.classList.remove('scale-100', 'opacity-100');
    modalBox?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal?.classList.add('hidden'); }, 300);
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        machine: document.getElementById('prod-machine-select')?.value,
        name: document.getElementById('prod-name-input')?.value,
        uom: document.getElementById('prod-uom-select')?.value,
        unitSize: document.getElementById('prod-unitsize-input')?.value,
        price: document.getElementById('prod-price-input')?.value,
        gst: document.getElementById('prod-gst-input')?.value,
        mrp: document.getElementById('prod-mrp-input')?.value
      };

      try {
        const res = await fetch('/api/products/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('✅ Product added successfully!', 'success');
          fetchProducts();
          form.reset();
          closeModal();
          return;
        }
      } catch (err) {
        // Offline / GitHub Pages fallback
      }

      const newProduct = {
        id: String(Date.now()),
        machine: payload.machine,
        name: payload.name,
        image: 'default_product.jpg',
        uom: payload.uom || 'Piece',
        unitSize: payload.unitSize || '1',
        price: parseFloat(payload.price) || 10.00,
        gst: parseFloat(payload.gst) || 0.00,
        mrp: parseFloat(payload.mrp) || parseFloat(payload.price) || 10.00,
        minQty: '1',
        status: 'Enabled'
      };

      state.products.unshift(newProduct);
      setLocalData('products', state.products);
      renderProductsTable();
      updateBadges();
      showToast('✅ Product added successfully!', 'success');
      form.reset();
      closeModal();
    });
  }
}

/* ==========================================================================
   8. Delete Confirmation Modal
   ========================================================================== */
function initDeleteModal() {
  const modal = document.getElementById('delete-modal');
  const modalBackdrop = document.getElementById('delete-modal-backdrop');
  const modalBox = document.getElementById('delete-modal-box');
  const closeBtn = document.getElementById('close-delete-modal-btn');
  const cancelBtn = document.getElementById('cancel-delete-modal-btn');
  const confirmBtn = document.getElementById('confirm-delete-btn');

  function closeModal() {
    modalBackdrop?.classList.add('opacity-0');
    modalBox?.classList.remove('scale-100', 'opacity-100');
    modalBox?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal?.classList.add('hidden'); }, 300);
  }

  window.triggerDelete = function(type, id, name) {
    state.deleteTarget = { type, id, name };
    const label = document.getElementById('delete-item-name');
    if (label) label.innerText = `"${name}"`;

    modal?.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop?.classList.remove('opacity-0');
      modalBox?.classList.remove('scale-95', 'opacity-0');
      modalBox?.classList.add('scale-100', 'opacity-100');
    }, 10);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!state.deleteTarget) return;

      const { type, id, name } = state.deleteTarget;
      let endpoint = '';
      if (type === 'station') endpoint = `/api/stations/${id}`;
      else if (type === 'customer') endpoint = `/api/customers/${id}`;
      else if (type === 'product') endpoint = `/api/products/${id}`;

      let deletedRemotely = false;
      try {
        const res = await fetch(endpoint, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          deletedRemotely = true;
        }
      } catch (err) {
        // Fallback to local
      }

      if (type === 'station') {
        state.stations = state.stations.filter(s => s.id !== id);
        setLocalData('stations', state.stations);
        renderStationsTable();
        renderDashboardStationGrid();
      } else if (type === 'customer') {
        state.customers = state.customers.filter(c => c.id !== id);
        setLocalData('customers', state.customers);
        renderCustomersTable();
        populateCustomerSelect();
      } else if (type === 'product') {
        state.products = state.products.filter(p => p.id !== id);
        setLocalData('products', state.products);
        renderProductsTable();
      }

      updateBadges();
      showToast(`🗑️ Deleted ${name} successfully!`, 'info');
      closeModal();
    });
  }
}

/* ==========================================================================
   9. Balance Add Modal
   ========================================================================== */
function initBalanceModal() {
  const modal = document.getElementById('balance-modal');
  const modalBackdrop = document.getElementById('balance-modal-backdrop');
  const modalBox = document.getElementById('balance-modal-box');
  const openBtns = document.querySelectorAll('.open-balance-modal-btn');
  const closeBtn = document.getElementById('close-balance-modal-btn');
  const cancelBtn = document.getElementById('cancel-balance-modal-btn');
  const balanceForm = document.getElementById('balance-add-form');
  const quickPills = document.querySelectorAll('.quick-amount-pill');
  const amountInput = document.getElementById('balance-amount-input');

  function openModal() {
    populateCustomerSelect();
    modal?.classList.remove('hidden');
    setTimeout(() => {
      modalBackdrop?.classList.remove('opacity-0');
      modalBox?.classList.remove('scale-95', 'opacity-0');
      modalBox?.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function closeModal() {
    modalBackdrop?.classList.add('opacity-0');
    modalBox?.classList.remove('scale-100', 'opacity-100');
    modalBox?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modal?.classList.add('hidden'); }, 300);
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      quickPills.forEach(p => p.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-600'));
      pill.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600');
      if (amountInput) amountInput.value = pill.getAttribute('data-value');
    });
  });

  if (balanceForm) {
    balanceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const customerName = document.getElementById('balance-customer-select')?.value;
      const amount = parseFloat(amountInput?.value);

      if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid positive balance amount.', 'error');
        return;
      }

      try {
        const res = await fetch('/api/balance/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId: customerName, amount })
        });
        const data = await res.json();
        if (data.success) {
          showToast(`✅ Successfully added $${amount.toFixed(2)} balance!`, 'success');
          fetchCustomers();
          closeModal();
          return;
        }
      } catch (err) {
        // Fallback to local
      }

      // Update customer in local state
      const targetCustomer = state.customers.find(c => c.name === customerName);
      if (targetCustomer) {
        targetCustomer.balance = (parseFloat(targetCustomer.balance) || 0) + amount;
      }
      setLocalData('customers', state.customers);
      renderCustomersTable();
      showToast(`✅ Successfully added $${amount.toFixed(2)} balance!`, 'success');
      closeModal();
    });
  }
}

/* ==========================================================================
   10. Search Filters & Toast Notifications
   ========================================================================== */
function initTableFilters() {
  const searchInput = document.getElementById('table-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(r => {
      r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

function initQuickActions() {
  const syncBtn = document.getElementById('action-sync-btn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      showToast('⚡ Telemetry synchronized with connected VM machines!', 'info');
    });
  }

  // Delegated listener for station reboot buttons
  document.body.addEventListener('click', (e) => {
    const rebootBtn = e.target.closest('.action-reboot-btn');
    if (rebootBtn) {
      const station = rebootBtn.getAttribute('data-station') || 'VM Station';
      showToast(`🔄 Reboot command sent to ${station}!`, 'info');
    }
  });
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center p-4 min-w-[280px] max-w-md rounded-xl shadow-2xl text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0 glass-panel border ${
    type === 'success' ? 'border-emerald-500/30 text-emerald-900 dark:text-emerald-100 bg-emerald-50/90 dark:bg-emerald-950/90' :
    type === 'error' ? 'border-rose-500/30 text-rose-900 dark:text-rose-100 bg-rose-50/90 dark:bg-rose-950/90' :
    'border-teal-500/30 text-teal-900 dark:text-teal-100 bg-teal-50/90 dark:bg-teal-950/90'
  }`;

  toast.innerHTML = `<span class="flex-1">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => { toast.classList.remove('translate-y-4', 'opacity-0'); }, 10);
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => { toast.remove(); }, 300);
  }, 3500);
}
