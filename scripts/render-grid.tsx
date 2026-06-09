import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { writeFileSync } from 'fs';
import { GUIDES } from '../src/illustrations/all';
import { ROTATION, dayConfig } from '../src/program';

// Derive the guidable exercise order and step labels directly from program.ts,
// so this grid never drifts from the source of truth. Walk the rotation once,
// collect each unique guidable exercise key with its `path` array.
const ORDER: string[] = [];
const PATHS: Record<string, string[]> = {};
for (const type of ROTATION) {
  for (const ex of dayConfig(type).exercises) {
    if (!GUIDES[ex.key] || PATHS[ex.key]) continue;
    ORDER.push(ex.key);
    PATHS[ex.key] = ex.path;
  }
}

type Cell = { svg: string; label: string };
const all: Cell[] = [];
for (const key of ORDER) {
  const guides = GUIDES[key];
  guides.forEach((g, i) => {
    const svg = renderToStaticMarkup(createElement(g.Art));
    all.push({ svg, label: `${key} [${i}] ${PATHS[key][i] ?? ''}` });
  });
}

const STYLE = `
  body { margin:0; background:#0E100D; font-family: -apple-system, sans-serif; }
  .grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:0; }
  .cell { margin:0; padding:14px 14px 6px; border:1px solid #1d211b; }
  .svgwrap { color:#C8FA4B; background:#0E100D; }
  .svgwrap svg { display:block; width:100%; height:auto; }
  .pose-a { opacity:0.25; }
  .pose-b { opacity:1; }
  figcaption { color:#cdd3c5; font-size:15px; margin-top:6px; font-family:monospace; }
`;

function page(cells: Cell[]): string {
  const body = cells
    .map(
      (c) =>
        `<figure class="cell"><div class="svgwrap">${c.svg}</div><figcaption>${c.label}</figcaption></figure>`,
    )
    .join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${STYLE}</style></head><body><div class="grid">${body}</div></body></html>`;
}

// full grid (4 cols) for the overview
const overview = `<!doctype html><html><head><meta charset="utf-8"><style>${STYLE}
  .grid { grid-template-columns: repeat(4, 1fr); }
  .cell { padding:10px 8px 4px; }
  figcaption { font-size:12px; }
</style></head><body><div class="grid">${all
  .map(
    (c) =>
      `<figure class="cell"><div class="svgwrap">${c.svg}</div><figcaption>${c.label}</figcaption></figure>`,
  )
  .join('\n')}</div></body></html>`;
writeFileSync('/tmp/guide-grid.html', overview);

// paginated: 8 cells per page (2 cols x 4 rows)
const per = 8;
let n = 0;
for (let i = 0; i < all.length; i += per) {
  writeFileSync(`/tmp/guide-page-${n}.html`, page(all.slice(i, i + per)));
  n++;
}
console.log('wrote overview + ', n, 'pages, total cells', all.length);
