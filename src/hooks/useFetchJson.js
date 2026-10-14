import { useEffect, useState } from 'react';
import { fetchJson } from '../services/dataService.js';

/**
 * Carga un JSON y expone { data, loading, error }.
 * Cancela la petición si el componente se desmonta o cambia la ruta.
 */
export function useFetchJson(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetchJson(path, { signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ data: null, loading: false, error });
      });

    return () => controller.abort();
  }, [path]);

  return state;
}
