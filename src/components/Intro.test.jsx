import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { profile } from '../test/fixtures.js';
import Intro from './Intro.jsx';

describe('Intro', () => {
  it('muestra nombre, rol, biografía y foto con alt', () => {
    render(<Intro {...profile} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('Estudiante de Informática')).toBeInTheDocument();
    expect(screen.getByText('Me apasiona crear software.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Foto de Ada' })).toBeInTheDocument();
  });

  it('renderiza enlaces sociales seguros', () => {
    render(<Intro {...profile} />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/ada');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('no muestra enlaces si no hay redes', () => {
    render(<Intro {...profile} socials={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
