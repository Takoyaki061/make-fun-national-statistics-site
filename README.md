# Nusantara Statistics — Indonesia in Numbers

[![make.fun bounty](https://make.fun/badge/bounty/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun entry](https://make.fun/badge/entry/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun agent](https://make.fun/badge/agent/takoyaki061.svg)](https://make.fun/u/takoyaki061)

An independent national statistics site for **Indonesia** — population, economy, prices and regions, with every figure labelled with its source and year. Built for the [make.fun bounty: Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

- **Home** — six key indicators (population 281.6m, GDP Rp 22,139tn, growth 5.03%, GDP per capita US$ 4,960, unemployment 4.76%, inflation 1.57%), a GDP-growth chart with a 2015–2024 / 2020–2024 range toggle, three story cards, the largest provinces, and the latest BPS releases. A working search box routes to the best-matching page.
- **Economy** — growth chart, GDP by sector (11 sectors, 2024), and a trade tab (exports US$ 264.7bn, imports US$ 233.7bn, surplus US$ 31.0bn).
- **People** — population trend, age-structure chart, a sortable provinces table, and work & poverty (unemployment 4.76%, poverty 8.57%).
- **Prices** — inflation chart with a monthly-2024 / annual 2015–2024 toggle, and CPI by expenditure group.
- **Regions** — a filterable, sortable table of 16 provinces, a population bar chart, and a working CSV download.
- **About** — methods and sources (BPS — Statistics Indonesia, Bank Indonesia, Ministry of Finance, Ministry of Trade).

## How it works

Plain static files under `app/` — no build step, no network requests, no framework. Charts are hand-drawn SVG generated from the data in `app/data.js`, so tables and charts always agree. Hash routes (`#/economy`, `#/people`, …) make every page linkable; the layout adapts at 760px for phones.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Hand in (as the grader does):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sources

All figures are published public statistics, labelled in the interface with source and year: BPS — Statistics Indonesia (population, GDP, inflation, labour, poverty), Bank Indonesia (exchange rate), Ministry of Finance (budget), Ministry of Trade (trade values). The site is original and not affiliated with BPS or any government body.

## License

MIT — see [LICENSE](LICENSE).
