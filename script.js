// =========================================================
// THE EMERALD COFFEE — interacciones
// =========================================================

// Número de WhatsApp del negocio (formato internacional, sin + ni espacios).
const WHATSAPP_NUMBER = '573116193694';

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- header al hacer scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- menú móvil ---------- */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    const closeMenu = () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- contadores animados ---------- */
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    let start = null;
    const dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('es-CO') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        animateCount(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));

  /* ---------- hero parallax sutil ---------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `scale(1.08) translateY(${y * 0.15}px)`;
      }
    });
  }

  /* ---------- hero: carrusel de imágenes de fondo ---------- */
  const heroSlides = document.querySelectorAll('#heroBg img');
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    setInterval(() => {
      heroSlides[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
    }, 5000);
  }

  /* ---------- ficha técnica: tap-to-flip en pantallas táctiles ---------- */
  const fichaCells = document.querySelectorAll('.ficha-cell');
  fichaCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const isTouch = matchMedia('(hover: none)').matches;
      if (!isTouch) return;
      fichaCells.forEach(c => { if (c !== cell) c.classList.remove('is-flipped'); });
      cell.classList.toggle('is-flipped');
    });
  });

  /* ---------- galería: lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galeriaImgs = document.querySelectorAll('#galeriaGrid .galeria-item img');
  if (lightbox && lightboxImg) {
    galeriaImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    const closeLightbox = () => lightbox.classList.remove('open');
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ---------- formulario de contacto → WhatsApp ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const contacto = form.contacto.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !contacto || !mensaje) {
        formNote.textContent = 'Completa los tres campos para enviar tu mensaje.';
        formNote.classList.add('show');
        return;
      }

      const texto = `Hola The Emerald Coffee, soy ${nombre}.%0A${mensaje}%0A%0AMi contacto: ${contacto}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
      window.open(url, '_blank', 'noopener');
      formNote.textContent = 'Abriendo WhatsApp con tu mensaje…';
      formNote.classList.add('show');
    });
  }
});