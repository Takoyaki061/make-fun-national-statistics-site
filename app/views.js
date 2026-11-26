// Page renderers. Each view is a function returning HTML for #app; main.js
// wires the controls after render (toggles, tabs, sorting, search, download).
import { KPIS, GDP_GROWTH, POPULATION, SECTORS, TRADE, AGE_GROUPS, INFLATION_2024, INFLATION_ANNUAL, PROVINCES, RELEASES, SOURCES } from './data.js';
import { lineChart, barChart, columnChart } from './charts.js';

const sourceNote = (text) => `<p class="source">Source: ${text}</p>`;

function kpiCards() {
  return `<section class="kpis" aria-label="Key indicators">` + KPIS.map((k) =>
    `<a class="kpi" href="${k.href}"><span class="kpi-label">${k.label}</span>` +
    `<span class="kpi-value">${k.value}</span><span class="kpi-note">${k.note}</span></a>`).join('') + `</section>`;
}

function storyCards() {
  const cards = [
    { href: '#/economy', tag: 'Economy', title: 'Growth held at 5% in 2024', body: 'GDP reached Rp 22,139 trillion. Manufacturing is still the largest sector at 19.0% of output, and exports beat imports by US$ 31.0 billion.' },
    { href: '#/people', tag: 'People', title: '281.6 million people, median age 30', body: 'Seven in ten Indonesians are of working age. West Java is the largest province with 49.9 million people; Jakarta holds 16.5% of GDP.' },
    { href: '#/prices', tag: 'Prices', title: 'Inflation cooled to 1.57% by December', body: 'Year-on-year inflation fell through 2024 from 3.05% in March to 1.57% in December, inside Bank Indonesia’s 1.5–3.5% target band.' },
  ];
  return `<section class="stories" aria-label="Stories in the data">` + cards.map((c) =>
    `<a class="story" href="${c.href}"><span class="story-tag">${c.tag}</span><h3>${c.title}</h3><p>${c.body}</p><span class="story-link">Explore ${c.tag.toLowerCase()} →</span></a>`).join('') + `</section>`;
}

function provinceRows(list) {
  return list.map((p, i) =>
    `<tr><td>${i + 1}</td><td>${p.name}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.gdpShare.toFixed(1)}</td></tr>`).join('');
}

export function homeView() {
  const growth = GDP_GROWTH.map((d) => ({ label: String(d.year), v: d.v }));
  return `
  <section class="hero">
    <p class="eyebrow">The national statistics portal of Indonesia</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">Population, economy, prices and regions — the official figures, explained in plain language and updated with every BPS release.</p>
    <form class="search" id="home-search" role="search">
      <label class="visually-hidden" for="q">Search the site</label>
      <input id="q" type="search" placeholder="Search statistics — try “inflation”, “GDP”, “provinces”…">
      <button type="submit">Search</button>
    </form>
    <p class="search-hint" id="search-hint" aria-live="polite"></p>
  </section>
  ${kpiCards()}
  <section class="card chart-card">
    <div class="card-head">
      <div><h2>Real GDP growth</h2><p class="card-sub">Percent change on the previous year</p></div>
      <div class="toggle" role="group" aria-label="Chart range">
        <button type="button" data-range="all" class="active">2015–2024</button>
        <button type="button" data-range="recent">2020–2024</button>
      </div>
    </div>
    <div id="growth-chart">${lineChart(growth, { height: 280, ymin: -3, ymax: 6 })}</div>
    ${sourceNote('BPS — Statistics Indonesia, GDP by expenditure, 2024. 2020 shows the pandemic contraction of −2.07%.')}
  </section>
  ${storyCards()}
  <section class="card">
    <div class="card-head"><div><h2>Largest provinces</h2><p class="card-sub">Population, millions, 2024</p></div><a class="more" href="#/regions">All 38 provinces →</a></div>
    <table class="data-table"><thead><tr><th>#</th><th>Province</th><th class="num">Population (m)</th><th class="num">Share of GDP (%)</th></tr></thead>
    <tbody>${provinceRows(PROVINCES.slice(0, 6))}</tbody></table>
    ${sourceNote('BPS — Statistics Indonesia, population estimates and regional GDP, 2024.')}
  </section>
  <section class="card">
    <h2>Latest releases</h2>
    <ul class="releases">${RELEASES.map((r) => `<li><span class="rel-date">${r.date}</span><span class="rel-topic">${r.topic}</span><span class="rel-title">${r.title}</span></li>`).join('')}</ul>
  </section>`;
}

export function economyView() {
  const growth = GDP_GROWTH.map((d) => ({ label: String(d.year), v: d.v }));
  return `
  <section class="page-head"><p class="eyebrow">Economy</p><h1>How the economy grows</h1>
  <p class="lede">Indonesia’s economy grew 5.03% in 2024 to Rp 22,139 trillion — about US$ 1.40 trillion. GDP per capita reached Rp 78.6 million (US$ 4,960).</p></section>
  <section class="card chart-card">
    <div class="card-head"><div><h2>Growth, 2015–2024</h2><p class="card-sub">Real GDP, percent per year</p></div></div>
    ${lineChart(growth, { ymin: -3, ymax: 6 })}
    ${sourceNote('BPS — Statistics Indonesia.')}
  </section>
  <section class="card">
    <div class="tabs" role="tablist" aria-label="Economy detail">
      <button type="button" role="tab" data-tab="sectors" class="active" aria-selected="true">GDP by sector</button>
      <button type="button" role="tab" data-tab="trade" aria-selected="false">Trade</button>
    </div>
    <div id="tab-sectors" role="tabpanel">
      <h2>What Indonesia makes</h2>
      ${barChart(SECTORS.map((s) => ({ label: s.name, v: s.v })))}
      ${sourceNote('BPS — Statistics Indonesia, share of GDP at current prices, 2024.')}
    </div>
    <div id="tab-trade" role="tabpanel" hidden>
      <h2>Trade in 2024</h2>
      <div class="stat-grid">
        <div class="stat"><span class="stat-value">US$ ${TRADE.exports}bn</span><span class="stat-label">Exports</span></div>
        <div class="stat"><span class="stat-value">US$ ${TRADE.imports}bn</span><span class="stat-label">Imports</span></div>
        <div class="stat"><span class="stat-value">US$ ${TRADE.surplus}bn</span><span class="stat-label">Trade surplus</span></div>
      </div>
      <p>Indonesia has run a goods trade surplus every month since May 2020. Its largest export earners are coal, palm oil, iron and steel, and nickel products; its largest imports are machinery, fuels and electrical equipment.</p>
      ${sourceNote('BPS — Statistics Indonesia and Ministry of Trade, 2024.')}
    </div>
  </section>
  <section class="card">
    <h2>What this means</h2>
    <p>Growth of about 5% a year has been Indonesia’s norm for a decade, interrupted only by the 2020 pandemic year. Household consumption is roughly 54% of GDP, so the spending of 281 million people — not exports — is the engine. The government’s 2025 budget targets growth of 5.2%.</p>
    ${sourceNote('BPS — Statistics Indonesia; Ministry of Finance, 2025 state budget.')}
  </section>`;
}

export function peopleView() {
  const pop = POPULATION.map((d) => ({ label: String(d.year), v: d.v }));
  return `
  <section class="page-head"><p class="eyebrow">People</p><h1>281.6 million people</h1>
  <p class="lede">Indonesia is the world’s fourth most populous country. The median age is 30.7 years, life expectancy is 74.1, and 8.57% of people live below the poverty line.</p></section>
  ${kpiCards()}
  <section class="card chart-card">
    <div class="card-head"><div><h2>Population growth</h2><p class="card-sub">Millions of people</p></div></div>
    ${lineChart(pop, { unit: 'm', ymin: 240, ymax: 290 })}
    ${sourceNote('BPS — Statistics Indonesia, census 2020 and intercensal estimates.')}
  </section>
  <section class="card chart-card">
    <div class="card-head"><div><h2>Age structure, 2024</h2><p class="card-sub">Share of the population</p></div></div>
    ${columnChart(AGE_GROUPS.map((a) => ({ label: a.group, v: a.v })))}
    ${sourceNote('BPS — Statistics Indonesia, 2024. 69.3% of the population is of working age (15–64).')}
  </section>
  <section class="card">
    <div class="card-head"><div><h2>Provinces by population</h2><p class="card-sub">Click a column heading to sort</p></div><a class="more" href="#/regions">Full table →</a></div>
    <table class="data-table sortable" id="people-table"><thead><tr><th data-sort="name">Province ↕</th><th class="num" data-sort="pop">Population (m) ↕</th><th class="num" data-sort="gdpShare">Share of GDP (%) ↕</th></tr></thead>
    <tbody>${PROVINCES.map((p) => `<tr><td>${p.name}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.gdpShare.toFixed(1)}</td></tr>`).join('')}</tbody></table>
    ${sourceNote('BPS — Statistics Indonesia, 2024.')}
  </section>
  <section class="card">
    <h2>Work and poverty</h2>
    <p>Unemployment stood at 4.76% in February 2025, the lowest since the pandemic, and 59.4% of workers are in informal jobs. The poverty rate fell to 8.57% in September 2024 from 9.36% a year earlier — the lowest on record — while the Gini ratio was 0.379.</p>
    ${sourceNote('BPS — Statistics Indonesia, labour force survey Feb 2025 and poverty profile Sep 2024.')}
  </section>`;
}

export function pricesView() {
  const monthly = INFLATION_2024.map((d) => ({ label: d.m, v: d.v }));
  const annual = INFLATION_ANNUAL.map((d) => ({ label: String(d.year), v: d.v }));
  return `
  <section class="page-head"><p class="eyebrow">Prices</p><h1>What things cost</h1>
  <p class="lede">Consumer-price inflation ended 2024 at 1.57% year-on-year — the lowest December reading in the series — after peaking at 3.05% in March.</p></section>
  <section class="card chart-card">
    <div class="card-head">
      <div><h2>Inflation</h2><p class="card-sub">Percent, year-on-year</p></div>
      <div class="toggle" role="group" aria-label="Inflation series">
        <button type="button" data-inflation="monthly" class="active">Monthly 2024</button>
        <button type="button" data-inflation="annual">Annual 2015–2024</button>
      </div>
    </div>
    <div id="inflation-chart">${lineChart(monthly, { ymin: 0, ymax: 4 })}</div>
    ${sourceNote('BPS — Statistics Indonesia, consumer price index. Bank Indonesia’s target band is 1.5–3.5%.')}
  </section>
  <section class="card">
    <h2>What moved prices in 2024</h2>
    <table class="data-table"><thead><tr><th>Group</th><th class="num">Dec 2024, y-on-y (%)</th></tr></thead>
    <tbody>
      <tr><td>Food, beverages &amp; tobacco</td><td class="num">1.90</td></tr>
      <tr><td>Housing, water &amp; energy</td><td class="num">0.39</td></tr>
      <tr><td>Transport</td><td class="num">0.44</td></tr>
      <tr><td>Education</td><td class="num">1.65</td></tr>
      <tr><td>Restaurants &amp; hotels</td><td class="num">2.22</td></tr>
      <tr><td>Personal care &amp; other services</td><td class="num">6.55</td></tr>
    </tbody></table>
    ${sourceNote('BPS — Statistics Indonesia, CPI by expenditure group, December 2024.')}
  </section>
  <section class="card">
    <h2>How to read this</h2>
    <p>Inflation is the change in the consumer price index — the cost of a fixed basket of goods and services — compared with the same month a year earlier. Food prices, which weigh about 29% of the basket, drove most of 2024’s movement; administered prices (fuel, electricity) were broadly flat.</p>
  </section>`;
}

export function regionsView() {
  return `
  <section class="page-head"><p class="eyebrow">Regions</p><h1>38 provinces, one country</h1>
  <p class="lede">Java holds 55% of the population on 7% of the land. Jakarta alone produces 16.5% of GDP; the five largest provinces by population hold 57% of all Indonesians.</p></section>
  <section class="card">
    <div class="card-head"><div><h2>Provinces</h2><p class="card-sub">Population and GDP share, 2024 — type to filter, click a heading to sort</p></div></div>
    <label class="filter-label" for="region-filter">Filter provinces</label>
    <input id="region-filter" class="filter" type="search" placeholder="Type a province name — try “Java”, “Kalimantan”…">
    <table class="data-table sortable" id="regions-table"><thead><tr><th data-sort="name">Province ↕</th><th class="num" data-sort="pop">Population (m) ↕</th><th class="num" data-sort="gdpShare">Share of GDP (%) ↕</th></tr></thead>
    <tbody>${PROVINCES.map((p) => `<tr><td>${p.name}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.gdpShare.toFixed(1)}</td></tr>`).join('')}</tbody></table>
    <p class="source">Source: BPS — Statistics Indonesia, 2024. Sixteen of the 38 provinces are shown here; the full table is in the downloadable data file.</p>
    <p><button type="button" class="btn" id="download-csv">Download provinces as CSV</button> <span id="download-note" aria-live="polite"></span></p>
  </section>
  <section class="card chart-card">
    <div class="card-head"><div><h2>Where people live</h2><p class="card-sub">Population, millions, five largest provinces</p></div></div>
    ${barChart(PROVINCES.slice(0, 5).map((p) => ({ label: p.name, v: p.pop })), { unit: 'm', color: '#0f766e' })}
    ${sourceNote('BPS — Statistics Indonesia, 2024.')}
  </section>`;
}

export function aboutView() {
  return `
  <section class="page-head"><p class="eyebrow">About this site</p><h1>Methods &amp; sources</h1>
  <p class="lede">Nusantara Statistics is an independent, original statistics portal. It is not affiliated with BPS or any government body. Every figure names its source and year; nothing is fetched from the network at run time.</p></section>
  <section class="card">
    <h2>Sources</h2>
    <table class="data-table"><thead><tr><th>Source</th><th>Figures used</th></tr></thead>
    <tbody>${SOURCES.map((s) => `<tr><td>${s.name} (${s.url})</td><td>${s.what}</td></tr>`).join('')}</tbody></table>
  </section>
  <section class="card">
    <h2>How figures are shown</h2>
    <ul class="bullets">
      <li>Growth rates are real (inflation-adjusted) unless labelled otherwise.</li>
      <li>GDP in rupiah is at current prices; US$ conversions use the year’s average Bank Indonesia rate.</li>
      <li>Provincial populations are BPS mid-year estimates for 2024.</li>
      <li>Charts are drawn from the same data files as the tables, so the two always agree.</li>
    </ul>
  </section>
  <section class="card">
    <h2>Contact</h2>
    <p>Corrections and suggestions: write to the editors through the make.fun bounty page for this site. The site’s data files are in its public repository.</p>
    <p><a class="btn" href="https://make.fun/bounty/best-national-statistics-site-20261126-0539">View this bounty on make.fun</a></p>
  </section>`;
}

export const VIEWS = { home: homeView, economy: economyView, people: peopleView, prices: pricesView, regions: regionsView, about: aboutView };
