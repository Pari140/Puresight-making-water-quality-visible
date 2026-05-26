/*
  PureSight - puresight.js
  Interactions, animations, and device state machine.
*/

// Scroll progress bar
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// Hero canvas particles
const cv  = document.getElementById('heroCanvas');
const ctx = cv.getContext('2d');
let W, H, pts = [];

function resize() {
  W = cv.width  = cv.offsetWidth;
  H = cv.height = cv.offsetHeight;
}
resize();
window.addEventListener('resize', () => { resize(); spawnPts(); });

function spawnPts() {
  pts = [];
  const n = Math.floor((W * H) / 13000);
  for (let i = 0; i < n; i++) {
    pts.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.3 + 0.3,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      a:  Math.random() * .38 + .06
    });
  }
}
spawnPts();

function drawPts() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 95) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(94,196,184,${.065 * (1 - d / 95)})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
    const p = pts[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(94,196,184,${p.a})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }
  requestAnimationFrame(drawPts);
}
drawPts();

// â”€â”€â”€ hero text stagger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.addEventListener('load', () => {
  setTimeout(() => {
    ['hl0','hl1','hl2'].forEach((id, i) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('show');
      }, i * 190);
    });
    setTimeout(() => {
      document.getElementById('hP')?.classList.add('show');
      document.getElementById('hStats')?.classList.add('show');
    }, 680);
  }, 250);
});

// â”€â”€â”€ scroll reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// â”€â”€â”€ stat counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function countUp(el, to, dur) {
  let start = null;
  const run = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1-p, 3)) * to);
    if (p < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target, +e.target.dataset.to, 1600);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('.hs-num').forEach(el => cntObs.observe(el));

// â”€â”€â”€ live clock â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function tick() {
  const d = new Date();
  const p = n => String(n).padStart(2,'0');
  document.getElementById('scClock').textContent =
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
tick(); setInterval(tick, 1000);

// â”€â”€â”€ verified timer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let vs = 0;
setInterval(() => {
  vs++;
  const p = n => String(n).padStart(2,'0');
  const h = Math.floor(vs / 3600);
  const m = Math.floor((vs % 3600) / 60);
  const s = vs % 60;
  const str = `${p(h)}:${p(m)}:${p(s)}`;
  const el = document.getElementById('trustTimer');
  if (el) el.textContent = str;
  const strip = document.getElementById('stripTime');
  if (strip) strip.textContent = str;
}, 1000);

// â”€â”€â”€ liters counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let liters = 74320;
setInterval(() => {
  liters += Math.floor(Math.random() * 3);
  document.getElementById('scLiters').textContent =
    liters.toLocaleString('en-IN') + ' L filtered';
}, 3500);

// â”€â”€â”€ gauge canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const gc  = document.getElementById('gaugeCanvas');
const gx  = gc.getContext('2d');

function drawGauge(score, color) {
  const cx = 65, cy = 65, r = 53;
  gx.clearRect(0, 0, 130, 130);

  gx.beginPath();
  gx.arc(cx, cy, r, Math.PI * .75, Math.PI * 2.25);
  gx.strokeStyle = 'rgba(255,255,255,.07)';
  gx.lineWidth = 9; gx.lineCap = 'round'; gx.stroke();

  const end = Math.PI * .75 + (score / 100) * Math.PI * 1.5;
  gx.beginPath();
  gx.arc(cx, cy, r, Math.PI * .75, end);
  gx.strokeStyle = color;
  gx.lineWidth = 9; gx.lineCap = 'round'; gx.stroke();

  gx.beginPath();
  gx.arc(cx, cy, r - 16, 0, Math.PI * 2);
  gx.strokeStyle = 'rgba(255,255,255,.03)';
  gx.lineWidth = 1; gx.stroke();
}

// â”€â”€â”€ state definitions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const STATES = {
  safe: {
    score: 94, gaugeColor: '#5EC4B8',
    numColor: '#ffffff',
    badgeBorder: '#1B8A7E', badgeBg: 'rgba(27,138,126,0.1)',
    dotColor: '#5EC4B8', lblColor: '#5EC4B8',
    statusText: 'Safe to Drink',
    screenClass: 'safe',

    tds: '142', tdsW: '28%', tdsC: '#5EC4B8', tdsNote: 'Excellent', tdsCls: '',
    turb: '0.3', turbW: '6%', turbC: '#5EC4B8', turbNote: 'Crystal clear', turbCls: '',
    temp: '24', tempW: '48%', tempC: '#5EC4B8', tempNote: 'Optimal', tempCls: '',
    filt: '38', filtW: '38%', filtC: '#C5780C', filtNote: 'Replace soon', filtCls: 'is-warn',

    uvBorder: 'rgba(255,255,255,.07)', uvBg: 'rgba(255,255,255,.03)',
    uvIconBg: 'rgba(27,138,126,.12)', uvIconColor: '#5EC4B8',
    uvSub: 'Operational Â· 2,847 hrs',
    uvPill: 'Active', uvPillC: '#5EC4B8', uvPillBg: 'rgba(27,138,126,.12)', uvPillBr: 'rgba(94,196,184,.3)',

    frBorder: 'rgba(255,255,255,.07)', frBg: 'rgba(255,255,255,.03)',
    frIconBg: 'rgba(27,138,126,.12)', frIconColor: '#5EC4B8',
    frSub: 'Verified genuine Â· installed 12 May',
    frPill: 'Genuine', frPillC: '#5EC4B8', frPillBg: 'rgba(27,138,126,.12)', frPillBr: 'rgba(94,196,184,.3)',

    dropColor: '#5EC4B8', dropText: 'Pure', dropCaption: 'Water quality: excellent',
    flash: false
  },

  warn: {
    score: 58, gaugeColor: '#C5780C',
    numColor: '#C5780C',
    badgeBorder: '#C5780C', badgeBg: 'rgba(197,120,12,0.1)',
    dotColor: '#C5780C', lblColor: '#C5780C',
    statusText: 'Caution â€” Check Filter',
    screenClass: 'warn',

    tds: '390', tdsW: '78%', tdsC: '#C5780C', tdsNote: 'High â€” monitor', tdsCls: 'is-warn',
    turb: '2.4', turbW: '48%', turbC: '#C5780C', turbNote: 'Slightly murky', turbCls: 'is-warn',
    temp: '27', tempW: '54%', tempC: '#5EC4B8', tempNote: 'Acceptable', tempCls: '',
    filt: '8',  filtW: '8%',  filtC: '#B02D24', filtNote: 'Replace now', filtCls: 'is-crit',

    uvBorder: 'rgba(255,255,255,.07)', uvBg: 'rgba(255,255,255,.03)',
    uvIconBg: 'rgba(27,138,126,.12)', uvIconColor: '#5EC4B8',
    uvSub: 'Operational Â· 3,101 hrs',
    uvPill: 'Active', uvPillC: '#5EC4B8', uvPillBg: 'rgba(27,138,126,.12)', uvPillBr: 'rgba(94,196,184,.3)',

    frBorder: 'rgba(255,255,255,.07)', frBg: 'rgba(255,255,255,.03)',
    frIconBg: 'rgba(27,138,126,.12)', frIconColor: '#5EC4B8',
    frSub: 'Verified genuine Â· installed 12 May',
    frPill: 'Genuine', frPillC: '#5EC4B8', frPillBg: 'rgba(27,138,126,.12)', frPillBr: 'rgba(94,196,184,.3)',

    dropColor: '#8B8B20', dropText: 'Caution', dropCaption: 'Water quality: degraded',
    flash: false
  },

  crit: {
    score: 19, gaugeColor: '#B02D24',
    numColor: '#B02D24',
    badgeBorder: '#B02D24', badgeBg: 'rgba(176,45,36,0.12)',
    dotColor: '#B02D24', lblColor: '#B02D24',
    statusText: 'Do Not Drink',
    screenClass: 'crit',

    tds: '640', tdsW: '100%', tdsC: '#B02D24', tdsNote: 'Unsafe', tdsCls: 'is-crit',
    turb: '9.1', turbW: '91%', turbC: '#B02D24', turbNote: 'Contaminated', turbCls: 'is-crit',
    temp: '32',  tempW: '64%', tempC: '#C5780C', tempNote: 'Elevated', tempCls: 'is-warn',
    filt: '1',   filtW: '1%',  filtC: '#B02D24', filtNote: 'Failed', filtCls: 'is-crit',

    uvBorder: 'rgba(176,45,36,.35)', uvBg: 'rgba(176,45,36,.07)',
    uvIconBg: 'rgba(176,45,36,.15)', uvIconColor: '#B02D24',
    uvSub: 'LAMP FAILURE DETECTED',
    uvPill: 'Failed', uvPillC: '#B02D24', uvPillBg: 'rgba(176,45,36,.15)', uvPillBr: 'rgba(176,45,36,.4)',

    frBorder: 'rgba(176,45,36,.35)', frBg: 'rgba(176,45,36,.07)',
    frIconBg: 'rgba(176,45,36,.15)', frIconColor: '#B02D24',
    frSub: 'FAKE FILTER DETECTED â€” DO NOT USE',
    frPill: '! Fake', frPillC: '#B02D24', frPillBg: 'rgba(176,45,36,.15)', frPillBr: 'rgba(176,45,36,.4)',

    dropColor: '#6B3A36', dropText: 'Unsafe', dropCaption: 'Water quality: contaminated',
    flash: true
  }
};

let currentState = 'safe';

// â”€â”€â”€ apply state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function applyState(key) {
  const s = STATES[key];
  currentState = key;

  drawGauge(s.score, s.gaugeColor);
  const gNum = document.getElementById('gNum');
  gNum.textContent = s.score;
  gNum.style.color = s.numColor;

  const badge = document.getElementById('trustBadge');
  badge.style.borderColor = s.badgeBorder;
  badge.style.background  = s.badgeBg;
  document.getElementById('tbDot').style.background = s.dotColor;
  const lbl = document.getElementById('tbLbl');
  lbl.style.color = s.lblColor; lbl.textContent = s.statusText;

  document.getElementById('screen').className = 'screen ' + s.screenClass;

  setMetric('TDS',    s.tds,  s.tdsW,  s.tdsC,  s.tdsNote,  s.tdsCls);
  setMetric('Turb',   s.turb, s.turbW, s.turbC, s.turbNote, s.turbCls);
  setMetric('Temp',   s.temp, s.tempW, s.tempC, s.tempNote, s.tempCls);
  setMetric('Filter', s.filt, s.filtW, s.filtC, s.filtNote, s.filtCls);

  const slUV = document.getElementById('slUV');
  slUV.style.borderColor = s.uvBorder; slUV.style.background = s.uvBg;
  const uvIco = document.getElementById('slUVIcon');
  uvIco.style.background = s.uvIconBg; uvIco.style.color = s.uvIconColor;
  document.getElementById('uvSub').textContent = s.uvSub;
  setPill('uvPill', s.uvPill, s.uvPillC, s.uvPillBg, s.uvPillBr);

  const slFr = document.getElementById('slFraud');
  slFr.style.borderColor = s.frBorder; slFr.style.background = s.frBg;
  const frIco = document.getElementById('slFraudIcon');
  frIco.style.background = s.frIconBg; frIco.style.color = s.frIconColor;
  document.getElementById('fraudSub').textContent = s.frSub;
  setPill('fraudPill', s.frPill, s.frPillC, s.frPillBg, s.frPillBr);

  document.getElementById('dropPath').style.fill = s.dropColor;
  document.getElementById('dropLabel').textContent = s.dropText;
  const dCap = document.getElementById('dropCaption');
  if (dCap) dCap.textContent = s.dropCaption.replace('Water quality: ','');

  const stripScore = document.getElementById('stripScore');
  const stripStatus = document.getElementById('stripStatus');
  if (stripScore)  { stripScore.textContent = s.score + '/100'; stripScore.style.color = s.gaugeColor; }
  if (stripStatus) { stripStatus.textContent = s.statusText; stripStatus.style.color = s.gaugeColor; }

  const glow = document.getElementById('deviceGlow');
  if (glow) {
    glow.classList.remove('warn-glow','crit-glow');
    if (key === 'warn') glow.classList.add('warn-glow');
    if (key === 'crit') glow.classList.add('crit-glow');
  }

  if (s.flash) {
    const ff = document.getElementById('fraudFlash');
    ff.classList.remove('go');
    void ff.offsetWidth;
    ff.classList.add('go');
  }
}

function setMetric(id, val, width, color, note, cls) {
  document.getElementById('val'  + id).textContent      = val;
  document.getElementById('fill' + id).style.width      = width;
  document.getElementById('fill' + id).style.background = color;
  document.getElementById('dot'  + id).style.background = color;
  const noteEl = document.getElementById('note' + id);
  noteEl.textContent = note; noteEl.style.color = color;
  const icon = document.getElementById('icon' + id);
  if (icon) { icon.style.background = color + '22'; icon.style.color = color; }
  const card = document.getElementById('mg' + id);
  card.classList.remove('is-warn','is-crit');
  if (cls) card.classList.add(cls);
}

function setPill(id, txt, color, bg, border) {
  const p = document.getElementById(id);
  p.textContent = txt; p.style.color = color;
  p.style.background = bg; p.style.borderColor = border;
}

// â”€â”€â”€ dev section grid canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const dgc = document.getElementById('devGridCanvas');
if (dgc) {
  const dctx = dgc.getContext('2d');
  let dW, dH;
  function resizeDev() {
    dW = dgc.width  = dgc.offsetWidth;
    dH = dgc.height = dgc.offsetHeight;
  }
  resizeDev();
  window.addEventListener('resize', resizeDev);
  function drawDevGrid() {
    dctx.clearRect(0, 0, dW, dH);
    const step = 48;
    dctx.strokeStyle = 'rgba(94,196,184,0.06)';
    dctx.lineWidth = 1;
    for (let x = 0; x < dW; x += step) {
      dctx.beginPath(); dctx.moveTo(x,0); dctx.lineTo(x,dH); dctx.stroke();
    }
    for (let y = 0; y < dH; y += step) {
      dctx.beginPath(); dctx.moveTo(0,y); dctx.lineTo(dW,y); dctx.stroke();
    }
  }
  drawDevGrid();
  window.addEventListener('resize', drawDevGrid);
}

// Scenario buttons
document.querySelectorAll('.sc').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sc').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyState(btn.dataset.s);
  });
});

// initialise
applyState('safe');

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


