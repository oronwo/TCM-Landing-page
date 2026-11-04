import { useEffect } from 'react';

// Anima elementos marcados como reveal quando entram na área visível da página.
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'));
      return undefined;
    }

    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return null;
}
