/**
 * Lee un archivo JSON estático servido desde /public.
 * @param {string} path Ruta relativa a la base de la app (ej. "data/projects.json").
 * @param {{signal?: AbortSignal}} [options]
 * @returns {Promise<unknown>}
 */
export async function fetchJson(path, { signal } = {}) {
  const response = await fetch(`${import.meta.env.BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path} (HTTP ${response.status})`);
  }
  return response.json();
}
