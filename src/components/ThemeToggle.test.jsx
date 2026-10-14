import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle.jsx';

describe('ThemeToggle', () => {
  it('ofrece cambiar a Noche cuando el tema es claro', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Cambiar a Noche' })).toBeInTheDocument();
  });

  it('ofrece cambiar a Día cuando el tema es oscuro', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Cambiar a Día' })).toBeInTheDocument();
  });

  it('llama a onToggle al hacer clic', async () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
