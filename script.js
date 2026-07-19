// ===== MOBILE NAV =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== DARK VEIL CANVAS BACKGROUND =====
// A slow, moody drifting-cloud effect in near-black/gold tones behind the hero.
(function darkVeil() {
  const canvas = document.getElementById('darkVeil');
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const blobs = Array.from({ length: 6 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.25 + Math.random() * 0.25,
    speed: 0.00015 + Math.random() * 0.0002,
    offset: Math.random() * Math.PI * 2,
    hue: i % 2 === 0 ? 'rgba(201,162,126,' : 'rgba(30,25,20,'
  }));

  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0F0D0B';
    ctx.fillRect(0, 0, w, h);

    blobs.forEach(b => {
      const x = (b.x + Math.sin(time * b.speed + b.offset) * 0.15) * w;
      const y = (b.y + Math.cos(time * b.speed * 0.8 + b.offset) * 0.15) * h;
      const radius = b.r * Math.max(w, h);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, b.hue + '0.10)');
      gradient.addColorStop(1, b.hue + '0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

// ===== SCROLL REVEAL (IntersectionObserver) =====
const revealEls = document.querySelectorAll('.reveal, .testi-card');
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
revealEls.forEach(el => revealObserver.observe(el));

// ===== TILT CARD =====
const tiltCard = document.getElementById('tiltCard');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', e => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 14;
    const rotateY = (x / rect.width) * 14;
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
}

// ===== BENTO GLOW =====
document.querySelectorAll('[data-glow]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// ===== GALLERY DRAG-TO-SCROLL =====
const galleryTrack = document.getElementById('galleryTrack');
let isDown = false, startX, scrollLeftStart;

galleryTrack.addEventListener('mousedown', e => {
  isDown = true;
  galleryTrack.classList.add('dragging');
  startX = e.pageX - galleryTrack.offsetLeft;
  scrollLeftStart = galleryTrack.scrollLeft;
});
['mouseleave', 'mouseup'].forEach(evt =>
  galleryTrack.addEventListener(evt, () => {
    isDown = false;
    galleryTrack.classList.remove('dragging');
  })
);
galleryTrack.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - galleryTrack.offsetLeft;
  const walk = (x - startX) * 1.5;
  galleryTrack.scrollLeft = scrollLeftStart - walk;
});

// ===== CARD STACK (Why Fresh Bite) — click/drag top card to send to back =====
const cardStack = document.getElementById('cardStack');
function layoutStack() {
  const cards = Array.from(cardStack.children);
  cards.forEach((card, i) => {
    const depth = cards.length - 1 - i;
    card.style.transform = `translateY(${depth * -10}px) scale(${1 - depth * 0.05})`;
    card.style.zIndex = i;
  });
}
layoutStack();

cardStack.querySelectorAll('.stack-card').forEach(card => {
  card.addEventListener('click', () => {
    cardStack.appendChild(card);
    layoutStack();
  });
});

// ===== NAV BACKGROUND ON SCROLL (subtle) =====
const pillNav = document.getElementById('pillNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    pillNav.style.background = 'rgba(15, 13, 11, 0.92)';
  } else {
    pillNav.style.background = 'rgba(15, 13, 11, 0.7)';
  }
});
