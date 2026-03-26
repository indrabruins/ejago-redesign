/**
 * Google Stitch Scroll Observer
 * Initializes scroll-triggered Stitch animations across the page
 */
export function initStitchAnimations() {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after triggering (one-shot)
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe all stitch animation elements
  document.querySelectorAll('.stitch-fade-up, .stitch-fade-down, .stitch-fade-left, .stitch-fade-right, .stitch-scale-in, .stitch-line-draw').forEach((el) => {
    observer.observe(el);
  });

  // ── Navbar scroll state ──
  const nav = document.querySelector('header');
  if (nav) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:80px;height:1px;width:1px;pointer-events:none';
    document.body.prepend(sentinel);
    navObserver.observe(sentinel);
  }

  // ── Parallax on hero blobs ──
  const blobs = document.querySelectorAll('[data-parallax]');
  if (blobs.length) {
    const handleParallax = () => {
      const scrollY = window.scrollY;
      blobs.forEach((blob) => {
        const speed = parseFloat(blob.dataset.parallax) || 0.3;
        blob.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleParallax, { passive: true });
  }

  // ── Stats counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1500;
            const start = performance.now();
            const animate = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(eased * target);
              el.textContent = prefix + current + suffix;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  }
}

// Auto-init on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStitchAnimations);
  } else {
    initStitchAnimations();
  }
}
