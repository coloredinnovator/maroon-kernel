// Flattens tokens/base.json into CSS custom properties at tokens/base.css.
// Reference values like "{base.palette.blue.600}" resolve to var(--maroon-...) so
// the cascade (not this script) handles the actual value lookup at runtime.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tokens = JSON.parse(readFileSync(join(root, 'tokens/base.json'), 'utf8'));

const lines = [];

function walk(node, path) {
  for (const [key, value] of Object.entries(node)) {
    const nextPath = [...path, key];
    if (value !== null && typeof value === 'object') {
      walk(value, nextPath);
    } else {
      lines.push(toDeclaration(nextPath, value));
    }
  }
}

function toDeclaration(path, value) {
  const name = `--maroon-${path.join('-')}`;
  const resolved = typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
    ? `var(--maroon-${value.slice(1, -1).replace(/\./g, '-')})`
    : value;
  return `  ${name}: ${resolved};`;
}

walk(tokens, []);

const css = `:root {\n${lines.join('\n')}\n}\n`;

mkdirSync(join(root, 'tokens'), { recursive: true });
writeFileSync(join(root, 'tokens/base.css'), css);
console.log(`Wrote tokens/base.css (${lines.length} custom properties)`);
