/* ============================================================
   Grip City Handyman — Main JavaScript
   js/main.js
   ============================================================ */

// ============================================================
// BLUEPRINT BACKGROUND EFFECT
// ============================================================
function createBlueprint(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const positions = [
    { top: '8%',  left: '4%',  delay: 0  }, { top: '8%',  left: '45%', delay: 5  },
    { top: '25%', left: '12%', delay: 2  }, { top: '25%', left: '60%', delay: 9  },
    { top: '45%', left: '5%',  delay: 7  }, { top: '45%', left: '38%', delay: 3  },
    { top: '65%', left: '22%', delay: 11 }, { top: '65%', left: '65%', delay: 1  },
    { top: '85%', left: '8%',  delay: 6  }, { top: '85%', left: '50%', delay: 13 },
  ];
  const vals = [340, 820, 475, 1150, 210, 690, 930, 560, 1080, 380];

  positions.forEach((p, i) => {
    const d = document.createElement('div');
    d.className = 'bp-label';
    d.style.cssText = `top:${p.top};left:${p.left};animation-delay:${p.delay}s`;
    d.textContent = vals[i] + ' SQ FT';
    el.appendChild(d);
  });

  [0, 1, 2, 3].forEach(i => {
    const l = document.createElement('div');
    l.className = 'bp-line';
    l.style.top = (80 + i * 130) + 'px';
    el.appendChild(l);
  });
}

['bpOverlay', 'bpOverlay2', 'bpOverlay3'].forEach(id => createBlueprint(id));

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// HEADER SHADOW ON SCROLL
// ============================================================
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
}, { passive: true });

// ============================================================
// MOBILE NAV
// ============================================================
function openMobile() {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// BEFORE/AFTER SLIDERS
// ============================================================
function initSlider(wrapperId, handleId, beforeId) {
  const wrap   = document.getElementById(wrapperId);
  const handle = document.getElementById(handleId);
  const before = document.getElementById(beforeId);
  if (!wrap || !handle || !before) return;

  let dragging = false;

  function setPos(clientX) {
    const rect = wrap.getBoundingClientRect();
    const pct  = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    handle.style.left      = pct + '%';
    before.style.width     = pct + '%';
    const img = before.querySelector('img');
    if (img) img.style.width = (10000 / pct) + '%';
  }

  // Mouse
  handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup',   () => { dragging = false; });

  // Touch
  wrap.addEventListener('touchmove', e => {
    setPos(e.touches[0].clientX);
    e.preventDefault();
  }, { passive: false });

  // Init at 50%
  setPos(wrap.getBoundingClientRect().left + wrap.offsetWidth * 0.5);
}

initSlider('slider1', 'handle1', 'before1');
initSlider('slider2', 'handle2', 'before2');
initSlider('slider3', 'handle3', 'before3');

// ============================================================
// PROCESS STEP ANIMATION
// ============================================================
const processIcons = document.querySelectorAll('.process-icon-wrap');
if (processIcons.length) {
  const durations = [2000, 1500, 2000, 1500, 2000, 1500, 2000, 2500];
  let stepIdx = 0;

  function animateProcess() {
    processIcons.forEach((ic, i) => ic.classList.toggle('active', i === stepIdx % 4));
    stepIdx++;
    setTimeout(animateProcess, durations[stepIdx % durations.length]);
  }
  setTimeout(animateProcess, 1000);
}
