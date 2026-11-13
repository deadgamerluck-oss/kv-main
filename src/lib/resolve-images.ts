// Saved content may reference bundled files by their source path (e.g. "/src/assets/x.jpg"),
// which only works in development. Map those to the real bundled URLs everywhere in the content.
const files = import.meta.glob('/src/assets/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;
const byName: Record<string, string> = Object.fromEntries(Object.entries(files).map(([k, v]) => [k.split('/').pop()!, v]));

export function resolveImage(v: string): string {
  const m = /^\/(?:src\/)?assets\/([^/?#]+)$/.exec(v);
  const name = m?.[1];
  return name && byName[name] ? byName[name] : v;
}

export function resolveImages<T>(value: T): T {
  if (typeof value === 'string') return resolveImage(value) as T;
  if (Array.isArray(value)) return value.map(resolveImages) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveImages(v)])) as T;
  return value;
}
