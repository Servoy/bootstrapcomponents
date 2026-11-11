// Renders the Vitest coverage-summary.json as a Markdown table.
// Used by CI to write into the GitHub Job Summary, and locally for a quick view.
// Usage: node scripts/coverage-summary.js [path-to-coverage-summary.json]

const fs = require('fs');
const path = require('path');

const summaryPath = process.argv[2]
  || path.join(__dirname, '..', 'coverage', '@servoy', 'bootstrapcomponents', 'coverage-summary.json');

if (!fs.existsSync(summaryPath)) {
  console.error(`Coverage summary not found at ${summaryPath}. Run "npm run test:coverage" first.`);
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const total = summary.total;

// Turn an absolute file path into a "component/file.ts" label.
const label = (file) => {
  const parts = file.split(/[\\/]/);
  const i = parts.lastIndexOf('src');
  return i === -1 ? file : parts.slice(i + 1).join('/');
};

const pct = (v) => `${v.pct.toFixed(1)}%`;

const files = Object.entries(summary)
  .filter(([key]) => key !== 'total')
  .map(([file, m]) => ({ file: label(file), lines: m.lines, branches: m.branches, functions: m.functions }))
  .sort((a, b) => a.lines.pct - b.lines.pct);

const lines = [];
lines.push('## Test coverage');
lines.push('');
lines.push('| | Lines | Statements | Functions | Branches |');
lines.push('|---|---|---|---|---|');
lines.push(`| **Total** | ${pct(total.lines)} (${total.lines.covered}/${total.lines.total}) | ${pct(total.statements)} | ${pct(total.functions)} | ${pct(total.branches)} |`);
lines.push('');
lines.push('<details><summary>Per-component (worst first)</summary>');
lines.push('');
lines.push('| Component | Lines | Functions | Branches |');
lines.push('|---|---|---|---|');
for (const f of files) {
  lines.push(`| ${f.file} | ${pct(f.lines)} | ${pct(f.functions)} | ${pct(f.branches)} |`);
}
lines.push('');
lines.push('</details>');

console.log(lines.join('\n'));
