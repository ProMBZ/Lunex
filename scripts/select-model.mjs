import { copyFile, mkdir, open, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';

const root = process.cwd();
const targetDir = join(root, 'public', 'models');
const target = join(targetDir, 'Moon_NASA_LRO_8k_Topo_Small.glb');
const MIN_BYTES = 60 * 1024 * 1024;

function chooseFile() {
  if (process.argv[2] && process.argv[2] !== '--interactive') return process.argv[2].replace(/^['"]|['"]$/g, '');
  if (process.platform !== 'win32') {
    console.error('Usage: npm run model:select -- /absolute/path/to/your/moon-topography.glb');
    process.exit(1);
  }
  const ps = [
    'Add-Type -AssemblyName System.Windows.Forms;',
    '$dialog = New-Object System.Windows.Forms.OpenFileDialog;',
    '$dialog.Title = "Select your NASA lunar topographic GLB (77 MB or larger)";',
    '$dialog.Filter = "GLB 3D model (*.glb)|*.glb|All files (*.*)|*.*";',
    '$dialog.Multiselect = $false;',
    'if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::WriteLine($dialog.FileName) } else { exit 2 }'
  ].join(' ');
  const result = spawnSync('powershell.exe', ['-NoProfile', '-STA', '-ExecutionPolicy', 'Bypass', '-Command', ps], { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0 || !result.stdout.trim()) {
    console.error('No model selected. Run again, or pass the full GLB path as an argument.');
    process.exit(1);
  }
  return result.stdout.trim().split(/\r?\n/).at(-1).trim();
}

async function validate(file) {
  const info = await stat(file);
  if (!info.isFile()) throw new Error('Selected path is not a file.');
  if (info.size < MIN_BYTES) throw new Error(`File is ${(info.size / 1024 / 1024).toFixed(1)} MB. The NASA LRO/LOLA topographic model should be at least 60 MB.`);
  const handle = await open(file, 'r');
  try {
    const header = Buffer.alloc(12);
    const { bytesRead } = await handle.read(header, 0, 12, 0);
    if (bytesRead !== 12 || header.toString('ascii', 0, 4) !== 'glTF' || header.readUInt32LE(4) !== 2 || header.readUInt32LE(8) > info.size) {
      throw new Error('This is not a valid glTF 2 binary (.glb). Choose the actual .glb file, not a .gltf, ZIP, JPG or preview image.');
    }
  } finally { await handle.close(); }
  return info;
}

try {
  const selected = resolve(chooseFile());
  if (!existsSync(selected)) throw new Error(`File not found: ${selected}`);
  const info = await validate(selected);
  await mkdir(targetDir, { recursive: true });
  if (selected.toLowerCase() !== target.toLowerCase()) {
    console.log(`Copying ${basename(selected)} into the project model folder...`);
    await copyFile(selected, target);
  }
  const envPath = join(root, '.env.local');
  let env = '';
  try { env = await readFile(envPath, 'utf8'); } catch {}
  const normalized = target.replace(/\\/g, '/');
  const line = `LUNAPATH_MOON_MODEL=${normalized}`;
  const lines = env.split(/\r?\n/).filter((item) => !/^\s*LUNAPATH_MOON_MODEL\s*=/.test(item));
  lines.push(line);
  await writeFile(envPath, `${lines.filter(Boolean).join('\n')}\n`, 'utf8');
  console.log('\n✓ NASA lunar topographic model installed and selected.');
  console.log(`  File: ${target}`);
  console.log(`  Size: ${(info.size / 1024 / 1024).toFixed(1)} MB`);
  console.log('  GLB: valid glTF 2 binary');
  console.log('\nNext: stop the dev server (Ctrl+C), then run:');
  console.log('  npm run model:verify');
  console.log('  npm run dev');
} catch (error) {
  console.error(`\nModel selection failed: ${error.message}`);
  process.exit(1);
}
