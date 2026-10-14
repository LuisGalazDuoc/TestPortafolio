import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTheme } from './useTheme.js';

describe('useTheme', () => {
  it('usa "light" por defecto y lo aplica a <html>', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement).toHaveAttribute('data-bs-theme', 'light');
  });

  it('respeta la preferencia oscura del sistema', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('prioriza el tema guardado en localStorage', () => {
    window.localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('alterna el tema y lo persiste', () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
  });

  it('no falla si localStorage no está disponible', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });
});
