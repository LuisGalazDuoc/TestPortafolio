import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem.jsx';

describe('NewsItem', () => {
  it('muestra título, contenido y fecha semántica', () => {
    render(<NewsItem title="Titular" date="2024-08-01" content="Cuerpo breve" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Titular' })).toBeInTheDocument();
    expect(screen.getByText('Cuerpo breve')).toBeInTheDocument();
    const time = screen.getByText(/2024/);
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '2024-08-01');
  });
});
