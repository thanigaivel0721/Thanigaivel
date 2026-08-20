/* Deck engine — slide navigation, chrome updates, carousel, next-cards */

const slides = [...document.querySelectorAll('.slide')];
const N = slides.length;
let cur = 0, locked = false;

/* dot rail */
const rail = document.getElementById('rail');
slides.forEach((s, i) => {
  const b = document.createElement('button');
  b.innerHTML = `<span class="tip">${s.dataset.name}</span>`;
  b.setAttribute('aria-label', s.dataset.name);
  b.onclick = () => go(i);
  rail.appendChild(b);
});

const counter = document.getElementById('counter');
const progress = document.getElementById('progress');
const nextbtn = document.getElementById('nextbtn');
const DARK = { 'bg-teal': 1, 'bg-ink': 1, 'bg-cream': 1, 'bg-soft': 1 };

function go(i, dir) {
  i = Math.max(0, Math.min(N - 1, i));
  if (i === cur && slides[i].classList.contains('active')) return;
  const prev = cur; cur = i;
  slides.forEach((s, k) => {
    s.classList.remove('active', 'leaving-up');
    if (k === prev && prev < i) s.classList.add('leaving-up');
  });
  slides[i].classList.add('active');
  /* chrome updates */
  counter.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b> / ${String(N).padStart(2, '0')}`;
  progress.style.width = ((i + 1) / N * 100) + '%';
  [...rail.children].forEach((b, k) => b.classList.toggle('on', k === i));
  const cls = [...slides[i].classList].find(c => DARK[c]);
  document.body.dataset.dark = cls ? 1 : 0;
  nextbtn.classList.toggle('end', i === N - 1);
  location.hash = 's' + (i + 1);
}
function step(d) {
  if (locked) return;
  locked = true; setTimeout(() => locked = false, 750);
  go(cur + d);
}

/* wheel — over a carousel the wheel browses the screens first; the deck only advances
   once you scroll past the last (or before the first) screen. Elsewhere: one step per gesture. */
let wheelReady = true, wheelIdle = null;
addEventListener('wheel', e => {
  clearTimeout(wheelIdle);
  wheelIdle = setTimeout(() => { wheelReady = true }, 180);   // gesture ends after 180ms idle
  const ax = Math.abs(e.deltaX), ay = Math.abs(e.deltaY);
  const dir = ay >= ax ? e.deltaY : e.deltaX;                 // dominant axis
  const sc = e.target.closest ? e.target.closest('.showcase.carousel') : null;
  if (sc) {
    const max = sc.scrollWidth - sc.clientWidth;
    if (max > 4) {
      const atStart = sc.scrollLeft <= 1, atEnd = sc.scrollLeft >= max - 1;
      if ((dir > 0 && !atEnd) || (dir < 0 && !atStart)) {     // still screens to reveal → scroll them
        sc.scrollLeft += dir; return;                         // consume; don't change slide
      }
    }
  }
  if (!wheelReady) return;
  if (Math.abs(dir) > 20) {
    wheelReady = false;
    step(dir > 0 ? 1 : -1);
  }
}, { passive: true });

/* keys */
addEventListener('keydown', e => {
  if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); step(1) }
  if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); step(-1) }
  if (e.key === 'Home') go(0);
  if (e.key === 'End') go(N - 1);
});

/* touch swipe — only navigate on a clearly VERTICAL swipe, so horizontal carousel swipes scroll cards instead of flipping slides */
let tx = null, ty = null;
addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
addEventListener('touchend', e => {
  if (ty === null) return;
  const dx = tx - e.changedTouches[0].clientX;
  const dy = ty - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * 1.3) step(dy > 0 ? 1 : -1);
  tx = ty = null;
}, { passive: true });

nextbtn.onclick = () => step(1);

/* carousel arrows for showcases with many screens */
document.querySelectorAll('.showstage').forEach(st => {
  const sc = st.querySelector('.showcase');
  const L = st.querySelector('.cnav.left'), R = st.querySelector('.cnav.right');
  if (!sc || !L || !R) return;
  const stepW = () => {
    const p = sc.querySelector('.phone');
    const gap = parseFloat(getComputedStyle(sc).columnGap) || 24;
    return p ? (p.offsetWidth + gap) * 2 : 600;
  };
  L.addEventListener('click', e => { e.stopPropagation(); sc.scrollBy({ left: -stepW(), behavior: 'smooth' }) });
  R.addEventListener('click', e => { e.stopPropagation(); sc.scrollBy({ left: stepW(), behavior: 'smooth' }) });
  const upd = () => {
    const max = sc.scrollWidth - sc.clientWidth;
    const none = max <= 8;
    L.disabled = none || sc.scrollLeft <= 4;
    R.disabled = none || sc.scrollLeft >= max - 4;
  };
  sc.addEventListener('scroll', upd, { passive: true });
  addEventListener('resize', upd);
  upd(); setTimeout(upd, 600);
});

/* next-project reference cards — thumbnail is a live clone of the next project's first UI screen */
document.querySelectorAll('.nextcard').forEach(card => {
  const name = card.dataset.target;
  const idx = slides.findIndex(s => s.dataset.name === name);
  if (idx < 0) return;
  const label = card.dataset.label || 'Next project';
  const title = card.dataset.title || name;
  card.innerHTML = `<div class="thumb"></div><div><small>${label}</small><b>${title}</b></div><span class="go">→</span>`;
  const src = slides[idx].querySelector('.showcase .phone');
  const thumb = card.querySelector('.thumb');
  if (src) {
    const c = src.cloneNode(true);
    c.className = 'phone';
    thumb.appendChild(c);
  } else {
    thumb.innerHTML = '<div class="tile">✳</div>';
  }
  card.onclick = () => go(idx);
});

/* deep link */
const h = parseInt((location.hash.match(/s(\d+)/) || [])[1]);
go(h ? h - 1 : 0);
