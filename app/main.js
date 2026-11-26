// Router and controls. Hash routes: #/ home, #/economy, #/people, #/prices,
// #/regions, #/about. After each render, wire the page's controls so every
// button, toggle, tab and input on the site does what it says.
import { VIEWS } from './views.js';
import { GDP_GROWTH, INFLATION_2024, INFLATION_ANNUAL, PROVINCES } from './data.js';
import { lineChart } from './charts.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const SEARCH_INDEX = [
  { keys: 'inflation cpi prices cost', href: '#/prices', label: 'Prices — inflation, 1.57% in Dec 2024' },
  { keys: 'gdp growth economy manufacturing trade exports imports', href: '#/economy', label: 'Economy — GDP growth 5.03% in 2024' },
  { keys: 'population people provinces age unemployment poverty', href: '#/people', label: 'People — 281.6 million, median age 30.7' },
  { keys: 'provinces regions java jakarta west java east java', href: '#/regions', label: 'Regions — provinces by population and GDP share' },
  { keys: 'sources methods about data download csv', href: '#/about', label: 'About — methods & sources' },
];

function route() {
  const name = (location.hash.replace(/^#\/?/, '') || 'home').split('/')[0];
  const view = VIEWS[name] || VIEWS.home;
  app.innerHTML = view();
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '') || 'home';
    a.classList.toggle('active', target === name);
    if (target === name) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  wirePage(name);
  window.scrollTo(0, 0);
}

function wirePage(name) {
  if (name === 'home' || name === '') wireHome();
  if (name === 'economy') wireEconomy();
  if (name === 'people' || name === 'regions') wireSortable();
  if (name === 'prices') wirePrices();
  if (name === 'regions') wireRegions();
}

function wireHome() {
  const form = document.getElementById('home-search');
  const input = document.getElementById('q');
  const hint = document.getElementById('search-hint');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) { hint.textContent = 'Type a word first — try “inflation”, “GDP” or “provinces”.'; return; }
    const hit = SEARCH_INDEX.find((s) => s.keys.split(' ').some((k) => q.includes(k)));
    if (hit) { hint.innerHTML = `Best match: <a href="${hit.href}">${hit.label}</a>`; }
    else { hint.textContent = `No page matches “${input.value.trim()}”. Try “inflation”, “GDP”, “population” or “provinces”.`; }
  });
  const chart = document.getElementById('growth-chart');
  document.querySelectorAll('#app .toggle [data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#app .toggle [data-range]').forEach((b) => b.classList.toggle('active', b === btn));
      const points = (btn.dataset.range === 'recent' ? GDP_GROWTH.slice(5) : GDP_GROWTH)
        .map((d) => ({ label: String(d.year), v: d.v }));
      chart.innerHTML = lineChart(points, { ymin: -3, ymax: 6 });
    });
  });
}

function wireEconomy() {
  document.querySelectorAll('#app .tabs [data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#app .tabs [data-tab]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
        document.getElementById(`tab-${b.dataset.tab}`).hidden = !on;
      });
    });
  });
}

function wireSortable() {
  document.querySelectorAll('#app table.sortable').forEach((table) => {
    const tbody = table.querySelector('tbody');
    let rows = [...tbody.querySelectorAll('tr')];
    let dir = 1;
    table.querySelectorAll('th[data-sort]').forEach((th) => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        const col = [...th.parentNode.children].indexOf(th);
        dir = th.dataset.dir === 'asc' ? -1 : 1;
        table.querySelectorAll('th').forEach((h) => delete h.dataset.dir);
        th.dataset.dir = dir === 1 ? 'asc' : 'desc';
        rows = [...tbody.querySelectorAll('tr')].sort((a, b) => {
          const av = a.children[col].textContent.trim();
          const bv = b.children[col].textContent.trim();
          const an = parseFloat(av), bn = parseFloat(bv);
          if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * dir;
          return av.localeCompare(bv) * dir;
        });
        rows.forEach((r) => tbody.appendChild(r));
      });
    });
  });
}

function wirePrices() {
  const chart = document.getElementById('inflation-chart');
  document.querySelectorAll('#app .toggle [data-inflation]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#app .toggle [data-inflation]').forEach((b) => b.classList.toggle('active', b === btn));
      const points = btn.dataset.inflation === 'annual'
        ? INFLATION_ANNUAL.map((d) => ({ label: String(d.year), v: d.v }))
        : INFLATION_2024.map((d) => ({ label: d.m, v: d.v }));
      chart.innerHTML = lineChart(points, { ymin: 0, ymax: btn.dataset.inflation === 'annual' ? 7 : 4 });
    });
  });
}

function wireRegions() {
  const filter = document.getElementById('region-filter');
  const tbody = document.querySelector('#regions-table tbody');
  if (filter) filter.addEventListener('input', () => {
    const q = filter.value.trim().toLowerCase();
    [...tbody.querySelectorAll('tr')].forEach((tr) => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
  const btn = document.getElementById('download-csv');
  const note = document.getElementById('download-note');
  if (btn) btn.addEventListener('click', () => {
    const csv = 'Province,Population (millions, 2024),Share of GDP (%, 2024)\n' +
      PROVINCES.map((p) => `${p.name},${p.pop.toFixed(2)},${p.gdpShare.toFixed(1)}`).join('\n') + '\n';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'indonesia-provinces-2024.csv'; a.click();
    URL.revokeObjectURL(url);
    note.textContent = 'Downloaded indonesia-provinces-2024.csv (16 provinces, BPS 2024).';
  });
}

window.addEventListener('hashchange', route);
route();
