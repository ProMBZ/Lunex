import { copyFile, mkdir, readdir, readFile, rename, stat, open } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const targetDir = join(root, 'public', 'models');
const target = join(targetDir, 'Moon_NASA_LRO_8k_Topo_Small.glb');
const nasaUrl = 'https://svs.gsfc.nasa.gov/vis/a010000/a014900/a014959/Moon_NASA_LRO_8k_Topo_Small.glb';
const MIN_BYTES = 60 * 1024 * 1024;
const downloadMode = process.argv.includes('--download');
const discoverOnly = process.argv.includes('--discover-only') || !downloadMode;
const profile = process.env.USERPROFILE || homedir();

async function configuredPath() {
  const modelEnv = process.env.LUNEX_MOON_MODEL?.trim() || process.env.LUNAPATH_MOON_MODEL?.trim();
  if (modelEnv) return modelEnv.replace(/^['"]|['"]$/g, '');
  for (const envName of ['.env.local', '.env']) {
    try {
      const raw = await readFile(join(root, envName), 'utf8');
      const line = raw.split(/\r?\n/).find((item) => /^\s*(?:LUNEX|LUNAPATH)_MOON_MODEL\s*=/.test(item));
      if (line) return line.slice(line.indexOf('=') + 1).trim().replace(/^['"]|['"]$/g, '');
    } catch {}
  }
  return null;
}

async function isValidTopographicGlb(file) {
  try {
    const info = await stat(file);
    if (!info.isFile() || info.size < MIN_BYTES) return false;
    const handle = await open(file, 'r');
    try {
      const header = Buffer.alloc(12);
      const { bytesRead } = await handle.read(header, 0, header.length, 0);
      return bytesRead === 12 && header.toString('ascii', 0, 4) === 'glTF' && header.readUInt32LE(4) === 2 && header.readUInt32LE(8) <= info.size;
    } finally {
      await handle.close();
    }
  } catch {
    return false;
  }
}

async function findInDirectory(start, maxDepth = 5, maxDirectories = 1800) {
  if (!start || !existsSync(start)) return null;
  const ignored = new Set(['node_modules', '.next', '.git', 'AppData', 'Windows', 'Program Files', 'Program Files (x86)', '$Recycle.Bin', 'System Volume Information']);
  let visited = 0;
  async function walk(directory, depth) {
    if (depth > maxDepth || visited >= maxDirectories) return null;
    visited += 1;
    let entries;
    try { entries = await readdir(directory, { withFileTypes: true }); } catch { return null; }
    for (const entry of entries) {
      if (!entry.isFile() || extname(entry.name).toLowerCase() !== '.glb') continue;
      const normalized = entry.name.toLowerCase();
      if (!normalized.includes('moon') || !/(topo|height|8k)/.test(normalized)) continue;
      const candidate = join(directory, entry.name);
      if (await isValidTopographicGlb(candidate)) return candidate;
    }
    if (depth === maxDepth) return null;
    for (const entry of entries) {
      if (!entry.isDirectory() || ignored.has(entry.name)) continue;
      const result = await walk(join(directory, entry.name), depth + 1);
      if (result) return result;
      if (visited >= maxDirectories) break;
    }
    return null;
  }
  return walk(start, 0);
}

await mkdir(targetDir, { recursive: true });
if (await isValidTopographicGlb(target)) {
  const info = await stat(target);
  console.log(`✓ NASA LRO/LOLA topographic GLB ready: ${(info.size / 1024 / 1024).toFixed(1)} MB`);
  process.exit(0);
}

const configured = await configuredPath();
const likelyNames = [
  'Moon_NASA_LRO_8k_Topo_Small.glb',
  'Moon_NASA_LRO_8k_Topo.glb',
  'Moon_NASA_LRO_8k_Topo_Small (1).glb'
];
const candidates = [];
if (configured) candidates.push(isAbsoluteSafe(configured) ? configured : resolve(root, configured));
for (const name of likelyNames) {
  candidates.push(join(root, name), join(root, 'public', 'models', name), join(profile, 'Downloads', name), join(profile, 'Desktop', name), join(profile, 'Documents', name));
}

let found = null;
for (const candidate of candidates) {
  if (await isValidTopographicGlb(candidate)) { found = candidate; break; }
}

if (!found) {
  const searchRoots = [
    join(profile, 'Downloads'),
    join(profile, 'Desktop'),
    join(profile, 'Documents'),
    join(profile, 'OneDrive', 'Downloads'),
    join(root, 'public', 'models'),
    root
  ];
  for (const searchRoot of [...new Set(searchRoots.map((item) => resolve(item)))]) {
    found = await findInDirectory(searchRoot, 5, 1800);
    if (found) break;
  }
}

function isAbsoluteSafe(value) {
  return /^[A-Za-z]:[\\/]/.test(value) || value.startsWith('\\\\') || value.startsWith('/');
}

if (found) {
  if (resolve(found) !== resolve(target)) await copyFile(found, target);
  const info = await stat(target);
  console.log(`✓ Found your existing NASA topographic Moon model (${(info.size / 1024 / 1024).toFixed(1)} MB).`);
  console.log(`  Original: ${found}`);
  console.log(`  Project:  ${target}`);
  console.log('✓ The local API will now serve this GLB directly with byte-range support.');
  process.exit(0);
}

if (discoverOnly) {
  if (process.platform === 'win32' && process.env.CI !== 'true' && (process.env.LUNEX_SKIP_MODEL_PICKER || process.env.LUNAPATH_SKIP_MODEL_PICKER) !== '1') {
    console.warn('\nNASA topographic GLB was not found automatically. Opening a file picker so you can select the model you already downloaded...');
    const picker = spawnSync(process.execPath, [join(root, 'scripts', 'select-model.mjs'), '--interactive'], {
      cwd: root, stdio: 'inherit', env: process.env, windowsHide: false
    });
    if (picker.status === 0 && await isValidTopographicGlb(target)) {
      console.log('\n✓ NASA topographic Moon model is ready.');
      process.exit(0);
    }
    console.warn('No valid model was selected. The website will start, but the 3D Moon needs the model.');
    console.warn('Run `npm run model:select` any time to select it.');
    process.exit(0);
  }
  console.warn('\nNASA topographic GLB was not found.');
  console.warn('Run `npm run model:select` to choose your downloaded GLB (Windows file picker),');
  console.warn('or run `npm run model:select -- "D:/path/to/your/model.glb"`.');
  console.warn('The large model is never downloaded automatically during `npm run dev`.');
  process.exit(0);
}

console.log('Downloading NASA LRO/LOLA 8k topographic Moon GLB (about 77.7 MB).');
console.log('This is a separate, resumable action. It does not run automatically with dev.');
const partial = `${target}.part`;
const curl = process.platform === 'win32' ? 'curl.exe' : 'curl';
const args = ['-fL', '--retry', '10', '--retry-all-errors', '--retry-delay', '3', '--connect-timeout', '30', '--max-time', '0', '-C', '-', '-o', partial, nasaUrl];
const child = spawn(curl, args, { stdio: 'inherit', windowsHide: true });
child.on('error', (error) => {
  console.error(`Could not start curl: ${error.message}`);
  console.error('Download manually from https://svs.gsfc.nasa.gov/14959/ and copy the GLB to public/models/.');
  process.exitCode = 1;
});
child.on('close', async (code) => {
  if (code !== 0 || !(await isValidTopographicGlb(partial))) {
    console.error('Download did not produce a valid topographic GLB. The partial file is retained for retry.');
    process.exitCode = 1;
    return;
  }
  await rename(partial, target);
  console.log(`✓ NASA topographic GLB installed at ${target}`);
});
