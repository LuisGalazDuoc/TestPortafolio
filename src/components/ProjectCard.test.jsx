import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { projects } from '../test/fixtures.js';
import ProjectCard from './ProjectCard.jsx';

const [project] = projects;

describe('ProjectCard', () => {
  it('muestra título, descripción e imagen con texto alternativo', () => {
    render(<ProjectCard {...project} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Proyecto Uno' })).toBeInTheDocument();
    expect(screen.getByText('Descripción uno')).toBeInTheDocument();
    const img = screen.getByRole('img', { name: 'Captura del proyecto uno' });
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('lista cada tecnología utilizada', () => {
    render(<ProjectCard {...project} />);
    const list = screen.getByRole('list', { name: /tecnologías de proyecto uno/i });
    const items = within(list).getAllByRole('listitem');
    expect(items.map((li) => li.textContent)).toEqual(['React', 'Vite']);
  });

  it('enlaza a la demo en una pestaña nueva y de forma segura', () => {
    render(<ProjectCard {...project} />);
    const link = screen.getByRole('link', { name: 'Ver demo de Proyecto Uno' });
    expect(link).toHaveAttribute('href', 'https://example.com/uno');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('permite personalizar la etiqueta del enlace', () => {
    render(<ProjectCard {...project} linkLabel="Ver repositorio" />);
    expect(screen.getByRole('link', { name: 'Ver repositorio de Proyecto Uno' })).toBeInTheDocument();
  });
});
