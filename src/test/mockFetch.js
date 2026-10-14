import { vi } from 'vitest';

export function mockFetch(routes) {
  const fetchMock = vi.fn(async (url) => {
    const key = Object.keys(routes).find((fragment) => String(url).includes(fragment));
    if (!key) return { ok: false, status: 404, json: async () => ({}) };

    const value = routes[key];
    if (value instanceof Error) throw value;
    if (value && value.__status) return { ok: false, status: value.__status, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => value };
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
