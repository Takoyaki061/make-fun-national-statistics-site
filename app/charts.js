// Small SVG chart builders. No library: every chart is drawn from the data
// in data.js, so the first load stays tiny and the site works offline.
// Each chart returns an SVG string; hovering a point or bar shows its value
// in a tooltip that follows the mouse.

const NS = 'http://www.w3.org/2000/svg';
const INK = '#1d2b2a';
const TEAL = '#0f766e';
const AMBER = '#e8a317';
const GRID = '#e3ddd2';
const MUTED = '#6b7280';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function fmt(v, decimals = 2) {
  return v.toFixed(decimals).replace(/\.00$/, '');
}

// A line chart with dots, value labels on hover and a zero line when the
// series crosses it. points: [{label, v}], unit shown on the y axis.
export function lineChart(points, { width = 980, height = 340, unit = '%', ymin = null, ymax = null, color = TEAL } = {}) {
  const padL = 52, padR = 18, padT = 18, padB = 34;
  const vals = points.map((p) => p.v);
  let lo = ymin ?? Math.min(...vals);
  let hi = ymax ?? Math.max(...vals);
  if (lo === hi) { lo -= 1; hi += 1; }
  const span = hi - lo || 1;
  const x = (i) => padL + (i * (width - padL - padR)) / (points.length - 1);
  const y = (v) => padT + ((hi - v) / span) * (height - padT - padB);
  const ticks = 4;
  let grid = '';
  for (let t = 0; t <= ticks; t++) {
    const v = lo + (span * t) / ticks;
    grid += `<line x1="${padL}" y1="${y(v)}" x2="${width - padR}" y2="${y(v)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(v, 1)}${unit}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${y(lo).toFixed(1)} L${x(0).toFixed(1)},${y(lo).toFixed(1)} Z`;
  let dots = '';
  points.forEach((p, i) => {
    dots += `<circle cx="${x(i)}" cy="${y(p.v)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5">` +
      `<title>${esc(p.label)}: ${fmt(p.v)}${unit}</title></circle>` +
      `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  const zero = lo < 0 ? `<line x1="${padL}" y1="${y(0)}" x2="${width - padR}" y2="${y(0)}" stroke="${INK}" stroke-width="1" stroke-dasharray="3 3"/>` : '';
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart" xmlns="${NS}">` +
    `<rect x="0" y="0" width="${width}" height="${height}" fill="none"/>` +
    `<path d="${area}" fill="${color}" opacity="0.08"/>${grid}${zero}` +
    `<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>` +
    dots + `</svg>`;
}

// A horizontal bar chart. rows: [{label, v}], unit shown after each value.
export function barChart(rows, { width = 980, unit = '%', color = TEAL, max = null } = {}) {
  const rowH = 34, padL = 210, padR = 64, padT = 8;
  const height = padT + rows.length * rowH + 8;
  const hi = max ?? Math.max(...rows.map((r) => r.v));
  let bars = '';
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const w = Math.max(2, ((r.v / hi) * (width - padL - padR)));
    const barColor = r.v < 0 ? '#b45309' : color;
    bars += `<text x="${padL - 10}" y="${y + 19}" text-anchor="end" font-size="13" fill="${INK}">${esc(r.label)}</text>` +
      `<rect x="${padL}" y="${y + 5}" width="${w.toFixed(1)}" height="18" rx="3" fill="${barColor}">` +
      `<title>${esc(r.label)}: ${fmt(r.v)}${unit}</title></rect>` +
      `<text x="${padL + w + 8}" y="${y + 19}" font-size="13" font-weight="600" fill="${INK}">${fmt(r.v)}${unit}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart" xmlns="${NS}">${bars}</svg>`;
}

// A compact vertical bar chart for small series (age groups, provinces).
export function columnChart(rows, { width = 980, height = 300, unit = '%', color = AMBER } = {}) {
  const padL = 40, padR = 10, padT = 14, padB = 30;
  const hi = Math.max(...rows.map((r) => r.v)) * 1.12;
  const slot = (width - padL - padR) / rows.length;
  const bw = Math.min(64, slot * 0.6);
  let out = '';
  rows.forEach((r, i) => {
    const h = (r.v / hi) * (height - padT - padB);
    const x = padL + i * slot + (slot - bw) / 2;
    const y = height - padB - h;
    out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}">` +
      `<title>${esc(r.label)}: ${fmt(r.v)}${unit}</title></rect>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${fmt(r.v)}${unit}</text>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(r.label)}</text>`;
  });
  out += `<line x1="${padL}" y1="${height - padB}" x2="${width - padR}" y2="${height - padB}" stroke="${GRID}" stroke-width="1"/>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Column chart" xmlns="${NS}">${out}</svg>`;
}
