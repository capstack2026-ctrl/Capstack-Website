export function initializeInteractions() {
  const approach = document.querySelector('.engineering-approach');
  if (approach) {
    const decisions = [...approach.querySelectorAll('.decision-grid [data-decision]')];
    const setActive = (name) => {
      approach.dataset.activeDecision = name || '';
      decisions.forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.decision === name)));
    };
    decisions.forEach((decision) => {
      const { decision: name } = decision.dataset;
      decision.addEventListener('mouseenter', () => setActive(name));
      decision.addEventListener('focus', () => setActive(name));
      decision.addEventListener('mouseleave', () => setActive(''));
      decision.addEventListener('blur', () => setActive(''));
      decision.addEventListener('click', () => setActive(approach.dataset.activeDecision === name ? '' : name));
      decision.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); decision.click(); }
      });
    });
  }

  const processIntro = document.querySelector('.development-process .process-intro');
  if (processIntro) {
    const reveal = () => processIntro.classList.add('is-visible');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reveal();
    else new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) { reveal(); observer.disconnect(); }
    }, { threshold: .3 }).observe(processIntro);
  }
}
