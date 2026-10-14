import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

describe('Footer', () => {
  it('muestra el año actual y el nombre', () => {
    render(<Footer name="Ada Lovelace" />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(`${year}.*Ada Lovelace`))).toBeInTheDocument();
  });
});
