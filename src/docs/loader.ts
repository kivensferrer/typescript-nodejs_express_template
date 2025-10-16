import path from 'path';
import fs from 'fs/promises';
import YAML from 'yaml';

const ROOT = path.resolve(__dirname, 'openapi.yaml'); // <— single centralized file

export async function loadOpenApiDoc(): Promise<object> {
  const raw = await fs.readFile(ROOT, 'utf-8');
  return YAML.parse(raw) as object;
}
