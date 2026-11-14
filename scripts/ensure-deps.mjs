import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const required = Object.entries(packageJson.dependencies ?? {});

function findProblems() {
  const problems = [];
  for (const [name, wanted] of required) {
    const packageFile = join(root, 'node_modules', name, 'package.json');
    if (!existsSync(packageFile)) {
      problems.push(`${name}@${wanted} is missing`);
      continue;
    }
    try {
      const actual = JSON.parse(readFileSync(packageFile, 'utf8')).version;
      if (actual !== wanted) problems.push(`${name}: expected ${wanted}, found ${actual}`);
    } catch {
      problems.push(`${name}: package metadata could not be read`);
    }
  }
  return problems;
}

let problems = findProblems();
if (problems.length === 0) {
  console.log('LunaPath dependencies verified: Next.js, React, React DOM and Three.js are installed.');
  process.exit(0);
}

console.log('\nInstalling project dependencies:');
for (const problem of problems) console.log(`  - ${problem}`);

// Use npm's own CLI through the current Node executable. This avoids shell=true
// and the Windows DEP0190 warning triggered by spawning npm.cmd with a shell.
let npmCli = process.env.npm_execpath;
if (!npmCli) {
  const candidates = [
    resolve(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'),
    resolve(dirname(dirname(process.execPath)), 'node_modules/npm/bin/npm-cli.js')
  ];
  npmCli = candidates.find(existsSync);
}
if (!npmCli || !existsSync(npmCli)) {
  console.error('Could not locate npm-cli.js. Install Node.js 22 LTS from https://nodejs.org/ and run npm install manually.');
  process.exit(1);
}

const result = spawnSync(process.execPath, [npmCli, 'install', '--no-audit', '--no-fund'], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
  windowsHide: true
});
if (result.error || result.status !== 0) {
  console.error('npm install did not complete. Run `npm install` and try again.');
  if (result.error) console.error(result.error.message);
  process.exit(result.status ?? 1);
}

problems = findProblems();
if (problems.length) {
  console.error('Dependencies remain unresolved:');
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log('All exact dependencies are installed.');
