// ======================================
// THEME TOGGLE
// ======================================

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ======================================
// NAVIGATION
// ======================================

const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav__link');

// Sticky nav border on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('nav--scrolled', scrollY > 20);
  lastScroll = scrollY;
}, { passive: true });

// Mobile hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('nav__hamburger--active');
  navLinks.classList.toggle('nav__links--open');
  document.body.style.overflow = navLinks.classList.contains('nav__links--open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('nav__hamburger--active');
    navLinks.classList.remove('nav__links--open');
    document.body.style.overflow = '';
  });
});

// Active nav highlighting
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinkEls.forEach(link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('nav__link--active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ======================================
// TYPING ANIMATION
// ======================================

const typedEl = document.getElementById('typedText');
const titles = [
  'Lead Salesforce Consultant',
  'AgentForce Specialist',
  'AI & Automation Expert',
  'Enterprise Solution Architect',
  'Lightning Web Components Dev'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = titles[titleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 35);
  }
}

// Start typing after hero loads
setTimeout(typeEffect, 1200);

// ======================================
// SCROLL REVEAL (Intersection Observer)
// ======================================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ======================================
// BACK TO TOP
// ======================================

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
