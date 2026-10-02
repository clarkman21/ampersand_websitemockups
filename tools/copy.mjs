#!/usr/bin/env node
// Write the text in content/copy.md into the Proof pages.
//
//   node tools/copy.mjs apply   write the copy into proof/*.html and proof/assets/copy.js
//   node tools/copy.mjs check   report keys that are missing or not used, and change nothing
//
// Each text element on a page has data-copy="key". copy.md has a "### key" heading for it,
// and the text under the heading is the element's content. No dependencies: Node 18 or later.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROOF = join(ROOT, 'proof');
const mode = process.argv[2] || 'check';

// ---- copy.md -> { key: text } ----
function parse(md) {
  const out = {}, order = [];
  let key = null, lines = [];
  const flush = () => {
    if (!key) return;
    if (key in out) throw new Error(`copy.md: key "${key}" is in the file two times`);
    out[key] = lines.join(' ').replace(/\s+/g, ' ').trim();
    order.push(key);
  };
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^###\s+(\S+)\s*$/);
    if (h) { flush(); key = h[1]; lines = []; continue; }
    if (/^#{1,2}\s/.test(line)) { flush(); key = null; continue; }
    if (key) lines.push(line);
  }
  flush();
  return { copy: out, order };
}

// ---- the Markdown conventions -> HTML ----
const TAG = /<\/?[a-z][a-z0-9]*(\s[^<>]*)?\/?>/i;
function toHtml(text) {
  let s = text;
  if (TAG.test(s)) s = s.replace(/&(?![a-z]+;|#\d+;|#x[0-9a-f]+;)/gi, '&amp;'); // inline HTML: escape only a bare &
  else s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  s = s.replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
  s = s.replace(/(^|\s)_([^_]+?)_(?=$|[\s.,;:!?)])/g, '<span class="u"> $2</span>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return s.replace(/ /g, '&nbsp;');
}

// ---- replace the content of each data-copy element ----
// Finds the matching close tag by counting same-name tags, so nested elements are safe.
function replaceAll(src, copy, used, missing, file) {
  const open = /<([a-z][a-z0-9]*)\b[^>]*\sdata-copy="([^"]+)"[^>]*>/gi;
  let out = '', last = 0, m;
  while ((m = open.exec(src))) {
    const [tagText, tag, key] = m;
    const innerStart = m.index + tagText.length;
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = innerStart;
    let depth = 1, c;
    while (depth && (c = re.exec(src))) depth += c[1] ? -1 : 1;
    if (depth) throw new Error(`${file}: no close tag for data-copy="${key}"`);
    const innerEnd = c.index;
    used.add(key);
    if (!(key in copy)) { missing.push(`${file}: ${key}`); continue; }
    out += src.slice(last, innerStart) + toHtml(copy[key]);
    last = innerEnd;
    open.lastIndex = innerEnd;
  }
  return out + src.slice(last);
}

const { copy, order } = parse(readFileSync(join(ROOT, 'content', 'copy.md'), 'utf8'));
const used = new Set(), missing = [], changed = [];
const pages = readdirSync(PROOF).filter(f => f.endsWith('.html'));

for (const file of pages) {
  const path = join(PROOF, file);
  const src = readFileSync(path, 'utf8');
  let out = replaceAll(src, copy, used, missing, file);
  const slug = file === 'index.html' ? 'home' : file.replace(/\.html$/, '');
  const tKey = `${slug}.title`;
  if (tKey in copy) {
    used.add(tKey);
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${toHtml(copy[tKey])}</title>`);
  }
  if (out !== src) {
    changed.push(file);
    if (mode === 'apply') writeFileSync(path, out);
  }
}

// Shared header and footer copy: proof.js reads it from window.AMP_COPY.
const shared = {};
for (const k of order) if (k.startsWith('shared.')) { shared[k] = toHtml(copy[k]); used.add(k); }
const js = '/* Made by tools/copy.mjs from content/copy.md. Do not edit: edit copy.md. */\n' +
  'window.AMP_COPY = ' + JSON.stringify(shared, null, 2) + ';\n';
const jsPath = join(PROOF, 'assets', 'copy.js');
let oldJs = '';
try { oldJs = readFileSync(jsPath, 'utf8'); } catch {}
if (js !== oldJs) {
  changed.push('assets/copy.js');
  if (mode === 'apply') writeFileSync(jsPath, js);
}

const unused = order.filter(k => !used.has(k));
if (missing.length) console.log(`Keys on the pages but not in copy.md (the page text stays as it is):\n  ${missing.join('\n  ')}`);
if (unused.length) console.log(`Keys in copy.md that no page uses (check the spelling):\n  ${unused.join('\n  ')}`);
console.log(`${mode === 'apply' ? 'Updated' : 'Would update'}: ${changed.length ? changed.join(', ') : 'nothing'}`);
if (mode === 'check' && (missing.length || unused.length)) process.exitCode = 1;
