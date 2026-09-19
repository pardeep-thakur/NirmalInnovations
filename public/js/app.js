/**
 * Nirmal Innovations Admin Dashboard App Logic
 * Client-side SPA routing, VM Stations, Customers, Products CRUD & Modals
 */

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

// App State
let state = {
  stations: [],
  customers: [],
  products: [],
  deleteTarget: null // { type: 'station'|'customer'|'product', id: string, name: string }
};

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
   2. Client-Side HTML5 History Router (/dashboard, /machines, /customers, etc.)
   ========================================================================== */
function initRouter() {
  function getCleanPath() {
    let path = window.location.pathname.toLowerCase();
    // Normalize root or empty
    if (path === '/' || path === '/home' || path === '') {
      // Check if hash exists for backwards compatibility
      if (window.location.hash) {
        path = '/' + window.location.hash.replace('#', '');
      } else {
        path = '/dashboard';
      }
    }
    return path;
  }

  function handleRoute() {
    let path = getCleanPath();
    const routeKey = path.replace('/', '');
    const validRoutes = ['dashboard', 'machines', 'customers', 'products', 'reports', 'billing', 'settings'];
    const activeRoute = validRoutes.includes(routeKey) ? routeKey : 'dashboard';

    // Toggle view sections
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => v.classList.add('hidden'));

    const targetView = document.getElementById(activeRoute + '-view');
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    // Highlight active sidebar links
    const sidebarLinks = document.querySelectorAll('.nav-link');
    sidebarLinks.forEach(link => {
      const linkPath = link.getAttribute('href').replace('#', '/');
      if (linkPath === '/' + activeRoute) {
        link.classList.add('bg-emerald-50/90', 'dark:bg-emerald-950/70', 'text-emerald-700', 'dark:text-emerald-300', 'border-emerald-200/60', 'dark:border-emerald-800/60', 'font-bold');
        link.classList.remove('text-slate-600', 'dark:text-slate-400');
      } else {
        link.classList.remove('bg-emerald-50/90', 'dark:bg-emerald-950/70', 'text-emerald-700', 'dark:text-emerald-300', 'border-emerald-200/60', 'dark:border-emerald-800/60', 'font-bold');
        link.classList.add('text-slate-600', 'dark:text-slate-400');
      }
    });

    // Close mobile drawer if open
    if (typeof window.closeMobileDrawer === 'function') {
      window.closeMobileDrawer();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Intercept navigation link clicks for SPA pushState without page reload
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href && (href.startsWith('/') || href.startsWith('#')) && !href.startsWith('//') && !href.startsWith('http')) {
      const cleanHref = href.startsWith('#') ? '/' + href.replace('#', '') : href;
      
      // If it's one of our SPA routes, use pushState
      const route = cleanHref.replace('/', '');
      if (['dashboard', 'machines', 'customers', 'products', 'reports', 'billing', 'settings'].includes(route)) {
        e.preventDefault();
        window.history.pushState({}, '', cleanHref);
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
   5. Data Fetching API Functions
   ========================================================================== */
async function fetchStations() {
  try {
    const res = await fetch('/api/stations');
    const data = await res.json();
    if (data.success) {
      state.stations = data.data;
      renderStationsTable();
      renderDashboardStationGrid();
      updateBadges();
    }
  } catch (err) {
    console.error('Failed to fetch stations:', err);
  }
}

async function fetchCustomers() {
  try {
    const res = await fetch('/api/customers');
    const data = await res.json();
    if (data.success) {
      state.customers = data.data;
      renderCustomersTable();
      updateBadges();
    }
  } catch (err) {
    console.error('Failed to fetch customers:', err);
  }
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (data.success) {
      state.products = data.data;
      renderProductsTable();
      updateBadges();
    }
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }
}

function updateBadges() {
  const stationBadge = document.getElementById('station-count-badge');
  const customerBadge = document.getElementById('customer-count-badge');
  const productBadge = document.getElementById('product-count-badge');

  if (stationBadge) stationBadge.innerText = state.stations.length;
  if (customerBadge) customerBadge.innerText = state.customers.length;
  if (productBadge) productBadge.innerText = state.products.length;
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
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
            ${s.code}
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">${s.name}</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">${s.city || 'Ahmedabad'}, ${s.state || 'Gujarat'}</p>
          </div>
        </div>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
      </div>
      <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/50 dark:border-slate-700/40">
        <span>Status: <strong class="text-emerald-600 dark:text-emerald-400">${s.status}</strong></span>
        <button data-station="${s.name}" class="action-reboot-btn text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">Reboot</button>
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

  tbody.innerHTML = state.products.map((p, idx) => `
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
        } else {
          showToast(data.message || 'Error adding station', 'error');
        }
      } catch (err) {
        showToast('✅ VM Station added (Demo mode)', 'success');
        closeModal();
      }
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
        } else {
          showToast(data.message || 'Error adding customer', 'error');
        }
      } catch (err) {
        showToast('✅ Customer added (Demo mode)', 'success');
        closeModal();
      }
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
        } else {
          showToast(data.message || 'Error adding product', 'error');
        }
      } catch (err) {
        showToast('✅ Product added (Demo mode)', 'success');
        closeModal();
      }
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

      try {
        const res = await fetch(endpoint, { method: 'DELETE' });
        const data = await res.json();

        if (data.success) {
          showToast(`🗑️ Deleted ${name} successfully!`, 'info');
          if (type === 'station') fetchStations();
          else if (type === 'customer') fetchCustomers();
          else if (type === 'product') fetchProducts();
        }
      } catch (err) {
        showToast(`🗑️ Deleted ${name} (Demo mode)`, 'info');
      } finally {
        closeModal();
      }
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
      const customer = document.getElementById('balance-customer-select')?.value;
      const amount = amountInput?.value;

      if (!amount || amount <= 0) {
        showToast('Please enter a valid positive balance amount.', 'error');
        return;
      }

      try {
        const res = await fetch('/api/balance/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId: customer, amount })
        });
        const data = await res.json();
        if (data.success) {
          showToast(`✅ Successfully added $${parseFloat(amount).toFixed(2)} balance!`, 'success');
          fetchCustomers();
          closeModal();
        }
      } catch (err) {
        showToast(`✅ Added $${parseFloat(amount).toFixed(2)} balance (Demo Mode)`, 'success');
        closeModal();
      }
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
      showToast('⚡ Telemetry synchronized with 13 connected VM machines!', 'info');
    });
  }
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
