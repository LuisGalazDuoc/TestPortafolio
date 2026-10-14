import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import AsyncState from './AsyncState.jsx';

describe('AsyncState', () => {
  it('muestra un indicador de carga accesible', () => {
    render(<AsyncState loading error={null} loadingLabel="Cargando datos…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando datos…');
  });

  it('muestra el mensaje de error', () => {
    render(<AsyncState loading={false} error={new Error('Falló la carga')} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Falló la carga');
  });

  it('muestra el mensaje de vacío', () => {
    render(<AsyncState loading={false} error={null} isEmpty emptyMessage="Nada por aquí" />);
    expect(screen.getByText('Nada por aquí')).toBeInTheDocument();
  });

  it('renderiza los hijos cuando todo está correcto', () => {
    render(
      <AsyncState loading={false} error={null}>
        <p>Listo</p>
      </AsyncState>,
    );
    expect(screen.getByText('Listo')).toBeInTheDocument();
  });
});
