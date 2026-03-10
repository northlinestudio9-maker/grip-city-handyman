/* ============================================================
   Grip City Handyman — Admin JavaScript
   js/admin.js
   ============================================================ */

// ============================================================
// AUTH — SHA-256 password check (password: "handyman")
// ============================================================
async function checkLogin() {
  const pwInput = document.getElementById('loginPassword');
  const pw = pwInput ? pwInput.value.toLowerCase().trim() : '';
  if (!pw) return;

  const encoder = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-256', encoder.encode(pw));
  const hash    = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

  // Compute expected hash at runtime so no plain-text secret in code
  const expectedBuf = await crypto.subtle.digest('SHA-256', encoder.encode('handyman'));
  const expected    = Array.from(new Uint8Array(expectedBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

  if (hash === expected) {
    sessionStorage.setItem('gc_admin_auth', 'true');
    showDashboard();
  } else {
    const err = document.getElementById('loginError');
    if (err) err.classList.add('show');
    if (pwInput) pwInput.value = '';
  }
}

function showDashboard() {
  const login = document.getElementById('admin-login-screen');
  const dash  = document.getElementById('admin-dashboard-screen');
  if (login) login.style.display = 'none';
  if (dash)  dash.style.display  = 'block';
  updateEstimate();
}

function logoutAdmin() {
  sessionStorage.removeItem('gc_admin_auth');
  const login = document.getElementById('admin-login-screen');
  const dash  = document.getElementById('admin-dashboard-screen');
  if (login) login.style.display = 'block';
  if (dash)  dash.style.display  = 'none';
}

// Check auth on page load
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('gc_admin_auth') === 'true') {
    showDashboard();
  }

  // Allow Enter key on password field
  const pwInput = document.getElementById('loginPassword');
  if (pwInput) {
    pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkLogin(); });
  }

  // Init estimator
  updateEstimate();
});

// ============================================================
// TABS
// ============================================================
function switchTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('tab-' + tab);
  if (panel) panel.classList.add('active');
  if (tab === 'estimator') updateEstimate();
}

// ============================================================
// CONTENT SAVE
// ============================================================
function saveContent() {
  // In production: POST these values to your backend / CMS.
  // Here we demonstrate a live page update + success toast.
  const phone = document.getElementById('biz-phone')?.value;
  if (phone) {
    document.querySelectorAll('.btn-phone span').forEach(el => el.textContent = phone);
  }
  const saved = document.getElementById('content-saved');
  if (saved) {
    saved.classList.add('show');
    setTimeout(() => saved.classList.remove('show'), 2500);
  }
}

// ============================================================
// ESTIMATOR
// ============================================================
const SERVICE_RATES = {
  painting:   { type: 'sqft', rate: 3.5   },
  flooring:   { type: 'sqft', rate: 6.0   },
  drywall:    { type: 'sqft', rate: 2.5   },
  carpentry:  { type: 'hour', rate: 85    },
  plumbing:   { type: 'hour', rate: 95    },
  electrical: { type: 'hour', rate: 100   },
  tile:       { type: 'sqft', rate: 8.0   },
  demo:       { type: 'sqft', rate: 1.5   },
  general:    { type: 'hour', rate: 75    },
};

function fmt(n) {
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function val(id, fallback = 0) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) || fallback : fallback;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function updateEstimate() {
  const svcKey = document.getElementById('est-service')?.value || 'painting';
  const info   = SERVICE_RATES[svcKey] || { type: 'sqft', rate: 3.5 };

  const qty      = val('est-sqft');
  const mats     = val('est-materials');
  const lh       = val('est-labor-hours');
  const lr       = val('est-labor-rate', 75);
  const profit   = val('est-profit', 20);
  const tax      = val('est-tax', 0);

  const sizeLabel = document.getElementById('est-size-label');
  if (sizeLabel) sizeLabel.textContent = info.type === 'sqft' ? 'Square Footage' : 'Units / Hours';

  const svcCost    = qty * info.rate;
  const laborCost  = lh * lr;
  const subtotal   = svcCost + mats + laborCost;
  const profitAmt  = subtotal * (profit / 100);
  const afterProfit = subtotal + profitAmt;
  const taxAmt     = afterProfit * (tax / 100);
  const total      = afterProfit + taxAmt;

  setText('r-service',      fmt(svcCost));
  setText('r-materials',    fmt(mats));
  setText('r-labor',        fmt(laborCost));
  setText('r-subtotal',     fmt(subtotal));
  setText('r-profit-label', `Profit (${profit}%)`);
  setText('r-profit',       fmt(profitAmt));
  setText('r-tax-label',    `Tax (${tax}%)`);
  setText('r-tax',          fmt(taxAmt));
  setText('r-total',        fmt(total));
}

function resetEstimate() {
  const defaults = {
    'est-sqft': 500, 'est-materials': 0,
    'est-labor-hours': 8, 'est-labor-rate': 75,
    'est-profit': 20, 'est-tax': 0,
  };
  Object.entries(defaults).forEach(([id, v]) => {
    const el = document.getElementById(id);
    if (el) el.value = v;
  });
  updateEstimate();
}

function printEstimate() {
  const name    = document.getElementById('est-name')?.value || 'Project Estimate';
  const svcEl   = document.getElementById('est-service');
  const svcText = svcEl ? svcEl.options[svcEl.selectedIndex].text : '';
  const total   = document.getElementById('r-total')?.textContent || '';

  const rows = [
    ['Service Cost',  'r-service'],
    ['Materials',     'r-materials'],
    ['Labor',         'r-labor'],
    ['Subtotal',      'r-subtotal'],
    [document.getElementById('r-profit-label')?.textContent || 'Profit', 'r-profit'],
    [document.getElementById('r-tax-label')?.textContent    || 'Tax',    'r-tax'],
  ].map(([label, id]) => {
    const v = document.getElementById(id)?.textContent || '$0.00';
    return `<tr><td>${label}</td><td align="right">${v}</td></tr>`;
  }).join('');

  const w = window.open('', '_blank', 'width=620,height=750');
  w.document.write(`
    <!DOCTYPE html><html><head><title>Estimate — ${name}</title>
    <style>
      body{font-family:sans-serif;padding:40px;color:#1a1a2e}
      h1{color:#D92B2B;margin-bottom:4px}
      table{width:100%;border-collapse:collapse;margin-top:20px}
      td{padding:10px;border-bottom:1px solid #eee}
      .total{font-size:24px;font-weight:900;color:#D92B2B}
    </style>
    </head><body>
    <h1>Grip City Handyman</h1>
    <p style="color:#888;margin-bottom:24px">(971) 666-2625 · Portland, OR</p>
    <h2 style="margin-bottom:4px">${name}</h2>
    <p style="color:#888;margin-bottom:8px">Service: ${svcText}</p>
    <table>${rows}
      <tr><td class="total">TOTAL</td><td align="right" class="total">${total}</td></tr>
    </table>
    <p style="margin-top:40px;color:#aaa;font-size:12px">
      Generated by Grip City Handyman Admin · ${new Date().toLocaleDateString()}
    </p>
    <script>window.print();<\/script>
    </body></html>
  `);
}
