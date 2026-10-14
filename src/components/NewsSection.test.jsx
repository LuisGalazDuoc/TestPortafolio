import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockFetch } from '../test/mockFetch.js';
import { newsTech } from '../test/fixtures.js';
import NewsSection from './NewsSection.jsx';

describe('NewsSection', () => {
  it('carga las noticias desde el JSON y las muestra', async () => {
    const fetchMock = mockFetch({ 'news-tech.json': newsTech });
    render(<NewsSection id="news-tech" title="Noticias de tecnología" source="data/news-tech.json" />);

    expect(await screen.findByText('Noticia Tech 1')).toBeInTheDocument();
    expect(screen.getByText('Contenido tech 2')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Noticias de tecnología' })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('muestra un mensaje si no hay noticias', async () => {
    mockFetch({ 'news-tech.json': [] });
    render(<NewsSection id="news-tech" title="Noticias" source="data/news-tech.json" />);
    expect(await screen.findByText(/no hay noticias/i)).toBeInTheDocument();
  });

  it('muestra un error si falla la red', async () => {
    mockFetch({ 'news-tech.json': new TypeError('Network error') });
    render(<NewsSection id="news-tech" title="Noticias" source="data/news-tech.json" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Network error');
  });
});
