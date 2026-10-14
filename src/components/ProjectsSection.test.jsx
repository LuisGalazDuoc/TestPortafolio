import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockFetch } from '../test/mockFetch.js';
import { projects } from '../test/fixtures.js';
import ProjectsSection from './ProjectsSection.jsx';

describe('ProjectsSection', () => {
  it('muestra el estado de carga y luego al menos tres proyectos', async () => {
    mockFetch({ 'projects.json': projects });
    render(<ProjectsSection />);

    expect(screen.getByRole('status')).toHaveTextContent('Cargando proyectos');
    const cards = await screen.findAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(3);
    expect(screen.getByRole('heading', { level: 2, name: 'Proyectos' })).toBeInTheDocument();
  });

  it('muestra un mensaje cuando no hay proyectos', async () => {
    mockFetch({ 'projects.json': [] });
    render(<ProjectsSection />);
    expect(await screen.findByText(/aún no hay proyectos/i)).toBeInTheDocument();
  });

  it('muestra un error si el JSON no se puede cargar', async () => {
    mockFetch({ 'projects.json': { __status: 500 } });
    render(<ProjectsSection />);
    expect(await screen.findByRole('alert')).toHaveTextContent(/500/);
  });

  it('usa la fuente indicada por props', async () => {
    const fetchMock = mockFetch({ 'otros.json': projects });
    render(<ProjectsSection source="data/otros.json" />);
    await screen.findAllByRole('heading', { level: 3 });
    expect(fetchMock.mock.calls[0][0]).toContain('data/otros.json');
  });
});
