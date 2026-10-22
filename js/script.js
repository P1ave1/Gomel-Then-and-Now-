// ===== scroll progress =====
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
});

const nav = document.querySelector('nav.timeline-nav');
function navHeight(){
  return nav ? nav.offsetHeight : 80;
}

const navLinks = [...document.querySelectorAll('.nav-track a')];
const sections = [...document.querySelectorAll('.era')];

let isClickScrolling = false;
let clickTimer = null;
let lastActiveId = null;

// ===== автоскролл панели навигации к активному пункту =====
function scrollNavToActive(link, instant = false){
  if (!nav || !link) return;

  const navRect = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const linkLeftInNav = linkRect.left - navRect.left + nav.scrollLeft;
  const linkWidth = linkRect.width;
  const navWidth = nav.clientWidth;

  let targetScroll = linkLeftInNav - (navWidth - linkWidth) / 2;

  const maxScroll = nav.scrollWidth - navWidth;
  if (targetScroll < 0) targetScroll = 0;
  if (targetScroll > maxScroll) targetScroll = maxScroll;

  nav.scrollTo({
    left: targetScroll,
    behavior: instant ? 'auto' : 'smooth'
  });
}

// ===== клик по навигации =====
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    isClickScrolling = true;
    lastActiveId = link.getAttribute('href');

    navLinks.forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    scrollNavToActive(link);

    const y = target.getBoundingClientRect().top
            + window.pageYOffset
            - navHeight()
            - 20;

    window.scrollTo({ top: y, behavior: 'smooth' });

    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      isClickScrolling = false;
      updateActiveByScroll();
    }, 900);
  });
});

// ===== подсветка по позиции при обычной прокрутке =====
function updateActiveByScroll(){
  if (isClickScrolling) return;

  const doc = document.documentElement;
  const atBottom = (window.innerHeight + window.scrollY) >= (doc.scrollHeight - 4);

  let current;

  if (atBottom) {
    current = sections[sections.length - 1];
  } else {
    const offset = navHeight() + 60;
    current = sections[0];
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top - offset <= 0) {
        current = sec;
      }
    });
  }

  const id = '#' + current.id;

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === id);
  });

  if (id !== lastActiveId) {
    lastActiveId = id;
    const activeLink = navLinks.find(a => a.getAttribute('href') === id);
    if (activeLink) {
      scrollNavToActive(activeLink);
    }
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveByScroll();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('load', () => {
  updateActiveByScroll();
  const first = navLinks[0];
  if (first) scrollNavToActive(first, true);
});

window.addEventListener('resize', () => {
  clearTimeout(window.__resizeTimer);
  window.__resizeTimer = setTimeout(() => {
    updateActiveByScroll();
    const activeLink = navLinks.find(a => a.classList.contains('active'));
    if (activeLink) scrollToActiveRaf(activeLink);
  }, 150);
});

// небольшая страховка для ресайза
function scrollToActiveRaf(link){
  if (!nav || !link) return;
  const navRect = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const linkLeftInNav = linkRect.left - navRect.left + nav.scrollLeft;
  let targetScroll = linkLeftInNav - (nav.clientWidth - linkRect.width) / 2;
  const maxScroll = nav.scrollWidth - nav.clientWidth;
  if (targetScroll < 0) targetScroll = 0;
  if (targetScroll > maxScroll) targetScroll = maxScroll;
  nav.scrollTo({ left: targetScroll, behavior: 'auto' });
}

// ===== показать кнопку «наверх» при скролле =====
const topFooter = document.querySelector('body footer');
if (topFooter) {
    const toggleTopFooter = () => {
        topFooter.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', toggleTopFooter, { passive: true });
    toggleTopFooter();
}