import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { mockFetch } from '../test/mockFetch.js';
import { useFetchJson } from './useFetchJson.js';

describe('useFetchJson', () => {
  it('comienza en estado de carga', () => {
    mockFetch({ 'a.json': [] });
    const { result } = renderHook(() => useFetchJson('data/a.json'));
    expect(result.current).toEqual({ data: null, loading: true, error: null });
  });

  it('entrega los datos al resolver la petición', async () => {
    mockFetch({ 'a.json': [1, 2, 3] });
    const { result } = renderHook(() => useFetchJson('data/a.json'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([1, 2, 3]);
    expect(result.current.error).toBeNull();
  });

  it('entrega el error si la petición falla', async () => {
    mockFetch({ 'a.json': { __status: 500 } });
    const { result } = renderHook(() => useFetchJson('data/a.json'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('vuelve a cargar cuando cambia la ruta', async () => {
    const fetchMock = mockFetch({ 'a.json': ['A'], 'b.json': ['B'] });
    const { result, rerender } = renderHook(({ path }) => useFetchJson(path), {
      initialProps: { path: 'data/a.json' },
    });
    await waitFor(() => expect(result.current.data).toEqual(['A']));

    rerender({ path: 'data/b.json' });
    await waitFor(() => expect(result.current.data).toEqual(['B']));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
