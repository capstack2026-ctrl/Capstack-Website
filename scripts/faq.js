const searchInput = document.querySelector('#faq-search-input');
const clearButton = document.querySelector('.faq-search__clear');
const groups = [...document.querySelectorAll('.faq-group')];
const items = [...document.querySelectorAll('.faq-item')];
const results = document.querySelector('.faq-search-results');
const resultsList = document.querySelector('.faq-search-results__list');
const resultsCount = document.querySelector('.faq-search-results__count');
const emptyState = document.querySelector('.faq-search-empty');
const navLinks = [...document.querySelectorAll('.faq-category-nav a')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function closeAll(except = null) { items.forEach((item) => { if (item !== except) { const button = item.querySelector('button'); const answer = item.querySelector('[role="region"]'); button.setAttribute('aria-expanded', 'false'); answer.hidden = true; } }); }
function setOpen(item, open) { const button = item.querySelector('button'); const answer = item.querySelector('[role="region"]'); closeAll(open ? item : null); button.setAttribute('aria-expanded', String(open)); answer.hidden = !open; }
items.forEach((item) => item.querySelector('button').addEventListener('click', () => setOpen(item, item.querySelector('button').getAttribute('aria-expanded') !== 'true')));

function clearSearch() { searchInput.value = ''; updateSearch(); searchInput.focus(); }
function updateSearch() { const term = searchInput.value.trim().toLowerCase(); const active = Boolean(term); clearButton.hidden = !active; results.hidden = !active; groups.forEach((group) => { group.hidden = active; }); if (!active) return; const matches = items.filter((item) => item.textContent.toLowerCase().includes(term)); resultsCount.textContent = `${matches.length} ${matches.length === 1 ? 'question' : 'questions'} found`;
  resultsList.innerHTML = matches.map((item) => { const group = item.closest('.faq-group'); const question = item.querySelector('button span').textContent; const answer = item.querySelector('p').textContent; return `<article class="faq-result"><span class="faq-result__meta">${group.querySelector('h2').textContent}<br />${item.dataset.number}</span><button type="button" data-target="${item.dataset.number}">${question}</button><p>${answer}</p></article>`; }).join(''); emptyState.hidden = matches.length !== 0;
  resultsList.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { const item = document.querySelector(`.faq-item[data-number="${button.dataset.target}"]`); clearSearch(); item.closest('.faq-group').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); setOpen(item, true); })); }
searchInput.addEventListener('input', updateSearch); clearButton.addEventListener('click', clearSearch); document.querySelector('.faq-search-empty__clear').addEventListener('click', clearSearch);
document.addEventListener('keydown', (event) => { const tag = document.activeElement?.tagName; if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) && !document.activeElement?.isContentEditable) { event.preventDefault(); searchInput.focus(); } if (event.key === 'Escape' && searchInput.value) clearSearch(); });
navLinks.forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }));
const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (!visible) return; navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.category === visible.target.dataset.category)); }, { rootMargin: '-18% 0px -68% 0px', threshold: [0.05, 0.3] }); groups.forEach((group) => observer.observe(group));
