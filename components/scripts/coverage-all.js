// Run both test suites with coverage and merge the results into one summary.
//
//   1. jsdom run    -> coverage/@servoy/bootstrapcomponents/lcov.info
//   2. browser run  -> overwrites the same lcov.info, so we stash the jsdom one
//   3. merge both   -> coverage/combined/coverage-summary.json
//
// The Angular unit-test builder writes coverage to coverage/<project>/, and the
// project name is discovered rather than hardcoded (it differs per repo).

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const coverageRoot = path.join(__dirname, '..', 'coverage');

function findLcov(dir) {
    if (!fs.existsSync(dir)) return null;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const found = findLcov(full);
            if (found) return found;
        } else if (entry.name === 'lcov.info') {
            return full;
        }
    }
    return null;
}

function run(cmd) {
    console.log(`\n> ${cmd}`);
    execSync(cmd, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
}

// 1. jsdom run, then stash its lcov before the browser run overwrites it.
run('npm run test:coverage');
const jsdomLcovSrc = findLcov(coverageRoot);
if (!jsdomLcovSrc) {
    console.error('jsdom coverage lcov.info not found.');
    process.exit(1);
}
const jsdomLcov = path.join(coverageRoot, 'lcov.jsdom.info');
fs.copyFileSync(jsdomLcovSrc, jsdomLcov);

// 2. browser run (writes a fresh lcov.info into the same project folder).
run('npm run test:browser:coverage');
const browserLcov = findLcov(coverageRoot);
if (!browserLcov) {
    console.error('browser coverage lcov.info not found.');
    process.exit(1);
}

// 3. merge and render the combined summary.
const combinedDir = path.join(coverageRoot, 'combined');
run(`node scripts/coverage-merge.js "${jsdomLcov}" "${browserLcov}" "${combinedDir}"`);
run(`node scripts/coverage-summary.js "${path.join(combinedDir, 'coverage-summary.json')}"`);
