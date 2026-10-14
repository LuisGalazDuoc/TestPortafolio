import { describe, expect, it, vi } from 'vitest';
import { fetchJson } from './dataService.js';

describe('fetchJson', () => {
  it('devuelve el JSON y pide la ruta indicada', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => [{ a: 1 }] });
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchJson('data/x.json')).resolves.toEqual([{ a: 1 }]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('data/x.json');
  });

  it('lanza un error descriptivo si la respuesta no es OK', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(fetchJson('data/x.json')).rejects.toThrow(/data\/x\.json.*404/);
  });

  it('propaga el signal de cancelación a fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    const { signal } = new AbortController();

    await fetchJson('data/x.json', { signal });
    expect(fetchMock.mock.calls[0][1]).toEqual({ signal });
  });
});
