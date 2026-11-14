import { open, stat } from 'node:fs/promises';
import { join } from 'node:path';

const file = join(process.cwd(), 'public', 'models', 'Moon_NASA_LRO_8k_Topo_Small.glb');
try {
  const info = await stat(file);
  if (!info.isFile() || info.size < 60 * 1024 * 1024) throw new Error('File is too small for the NASA topographic model.');
  const handle = await open(file, 'r');
  try {
    const header = Buffer.alloc(12);
    const { bytesRead } = await handle.read(header, 0, 12, 0);
    if (bytesRead !== 12 || header.toString('ascii', 0, 4) !== 'glTF' || header.readUInt32LE(4) !== 2 || header.readUInt32LE(8) > info.size) {
      throw new Error('File header is not a valid glTF 2 binary.');
    }
  } finally {
    await handle.close();
  }
  console.log(`✓ Valid NASA topographic GLB: ${file}`);
  console.log(`✓ Size: ${(info.size / 1024 / 1024).toFixed(1)} MB`);
} catch (error) {
  console.error(`NASA model verification failed: ${error.message}`);
  console.error('Copy the existing 77.7 MB Moon_NASA_LRO_8k_Topo_Small.glb to public/models/ or set LUNEX_MOON_MODEL in .env.local, then run npm run model:find.');
  process.exit(1);
}
