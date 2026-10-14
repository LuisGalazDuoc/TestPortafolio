import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar.jsx';

const links = [
  { href: '#intro', label: 'Introducción' },
  { href: '#projects', label: 'Proyectos' },
];

describe('NavBar', () => {
  it('muestra la marca y los enlaces con su ancla', () => {
    render(<NavBar brand="Mi Portafolio" links={links} theme="light" onToggleTheme={() => {}} />);
    expect(screen.getByText('Mi Portafolio')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Proyectos' })).toHaveAttribute('href', '#projects');
  });

  it('permite abrir el menú con teclado (botón accesible)', async () => {
    render(<NavBar brand="Mi Portafolio" links={links} theme="light" onToggleTheme={() => {}} />);
    const toggler = screen.getByRole('button', { name: 'Abrir menú de navegación' });
    expect(toggler).toHaveClass('collapsed');
    await userEvent.click(toggler);
    expect(toggler).not.toHaveClass('collapsed');
  });

  it('dispara onToggleTheme desde el botón de tema', async () => {
    const onToggleTheme = vi.fn();
    render(<NavBar brand="Mi Portafolio" links={links} theme="light" onToggleTheme={onToggleTheme} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a Noche' }));
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });
});
