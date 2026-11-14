import { createReadStream } from 'node:fs';
import { access, open, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { isAbsolute, join, resolve } from 'node:path';
import { Readable } from 'node:stream';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL_NAMES = ['Moon_NASA_LRO_8k_Topo_Small.glb', 'Moon_NASA_LRO_8k_Topo.glb'];
const MIN_BYTES = 60 * 1024 * 1024;

async function validModel(file) {
  try {
    await access(file);
    const info = await stat(file);
    if (!info.isFile() || info.size < MIN_BYTES) return null;
    const handle = await open(file, 'r');
    try {
      const header = Buffer.alloc(12);
      const { bytesRead } = await handle.read(header, 0, 12, 0);
      if (bytesRead !== 12 || header.toString('ascii', 0, 4) !== 'glTF' || header.readUInt32LE(4) !== 2 || header.readUInt32LE(8) > info.size) return null;
    } finally {
      await handle.close();
    }
    return { file, size: info.size, modified: info.mtimeMs };
  } catch {
    return null;
  }
}

async function locateModel() {
  const profile = process.env.USERPROFILE || homedir();
  const configured = process.env.LUNAPATH_MOON_MODEL?.trim().replace(/^['"]|['"]$/g, '');
  const candidates = [];
  if (configured) candidates.push(isAbsolute(configured) ? configured : resolve(process.cwd(), configured));
  for (const name of MODEL_NAMES) {
    candidates.push(join(process.cwd(), 'public', 'models', name));
    candidates.push(join(process.cwd(), name));
    candidates.push(join(profile, 'Downloads', name));
    candidates.push(join(profile, 'Desktop', name));
  }
  for (const candidate of [...new Set(candidates)]) {
    const model = await validModel(candidate);
    if (model) return model;
  }
  return null;
}

function json(payload, status = 200) {
  return Response.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(request) {
  const model = await locateModel();
  const url = new URL(request.url);

  if (url.searchParams.has('status')) {
    return json({
      available: Boolean(model),
      size: model?.size ?? null,
      sizeMB: model ? Number((model.size / 1024 / 1024).toFixed(1)) : null,
      expectedPath: 'public/models/Moon_NASA_LRO_8k_Topo_Small.glb',
      configuredPath: process.env.LUNAPATH_MOON_MODEL ? 'configured' : null,
      source: 'NASA Goddard Space Flight Center / LRO / LOLA'
    });
  }

  if (!model) {
    return json({
      error: 'A valid NASA topographic GLB was not found. This is a local-file lookup issue, not a Three.js issue.',
      expectedPath: 'public/models/Moon_NASA_LRO_8k_Topo_Small.glb',
      fix: 'Copy the 77.7 MB NASA GLB into public/models/, or set LUNAPATH_MOON_MODEL to its full path in .env.local, then run npm run model:find and restart.'
    }, 404);
  }

  const range = request.headers.get('range');
  const headers = {
    'Content-Type': 'model/gltf-binary',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    'X-Asset-Source': 'NASA GSFC SVS / LRO / LOLA - global colour + height model',
    'Last-Modified': new Date(model.modified).toUTCString()
  };

  if (range) {
    const match = range.match(/^bytes=(\d*)-(\d*)$/);
    if (!match) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${model.size}` } });
    const start = match[1] ? Number(match[1]) : 0;
    const end = match[2] ? Math.min(Number(match[2]), model.size - 1) : model.size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || start >= model.size) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${model.size}` } });
    }
    headers['Content-Length'] = String(end - start + 1);
    headers['Content-Range'] = `bytes ${start}-${end}/${model.size}`;
    return new Response(Readable.toWeb(createReadStream(model.file, { start, end })), { status: 206, headers });
  }

  headers['Content-Length'] = String(model.size);
  return new Response(Readable.toWeb(createReadStream(model.file)), { status: 200, headers });
}
