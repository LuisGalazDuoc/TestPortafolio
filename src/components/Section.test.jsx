import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section from './Section.jsx';

describe('Section', () => {
  it('expone una región accesible con su título', () => {
    render(
      <Section id="demo" title="Mi sección">
        <p>Contenido</p>
      </Section>,
    );
    const region = screen.getByRole('region', { name: 'Mi sección' });
    expect(region).toHaveAttribute('id', 'demo');
    expect(screen.getByRole('heading', { level: 2, name: 'Mi sección' })).toBeInTheDocument();
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });
});
