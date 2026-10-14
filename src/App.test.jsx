import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { mockFetch } from './test/mockFetch.js';
import { newsCampus, newsTech, profile, projects } from './test/fixtures.js';

const routes = {
  'profile.json': profile,
  'projects.json': projects,
  'news-tech.json': newsTech,
  'news-campus.json': newsCampus,
};

describe('App (integración)', () => {
  it('carga y muestra introducción, proyectos, dos secciones de noticias y contacto', async () => {
    mockFetch(routes);
    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(await screen.findByText('Proyecto Tres')).toBeInTheDocument();
    expect(await screen.findByText('Noticia Tech 1')).toBeInTheDocument();
    expect(await screen.findByText('Noticia Campus 2')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Noticias de tecnología' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Noticias académicas' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Contacto' })).toBeInTheDocument();
  });

  it('incluye un enlace para saltar al contenido principal', async () => {
    mockFetch(routes);
    render(<App />);
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveAttribute('href', '#main');
    await screen.findByRole('heading', { level: 1 });
  });

  it('alterna entre tema Día y Noche', async () => {
    mockFetch(routes);
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: 'Cambiar a Noche' }));
    expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark');

    await user.click(screen.getByRole('button', { name: 'Cambiar a Día' }));
    expect(document.documentElement).toHaveAttribute('data-bs-theme', 'light');
  });

  it('informa errores de carga sin romper la página', async () => {
    mockFetch({ 'profile.json': new TypeError('sin red'), 'projects.json': projects,
      'news-tech.json': newsTech, 'news-campus.json': newsCampus });
    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent('sin red');
    expect(await screen.findByText('Proyecto Uno')).toBeInTheDocument();
  });
});
