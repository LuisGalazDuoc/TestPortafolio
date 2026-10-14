import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm.jsx';

async function fill(user, { name, email, message }) {
  if (name) await user.type(screen.getByLabelText('Nombre'), name);
  if (email) await user.type(screen.getByLabelText('Correo electrónico'), email);
  if (message) await user.type(screen.getByLabelText('Mensaje'), message);
}

describe('ContactForm', () => {
  it('muestra errores y no envía si el formulario está vacío', async () => {
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('aria-invalid', 'true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rechaza un correo con formato inválido', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user, { name: 'Ada', email: 'ada@correo', message: 'Mensaje de prueba largo' });
    await user.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(screen.getByText('Ingresa un correo válido.')).toBeInTheDocument();
  });

  it('actualiza el estado al escribir (componente controlado)', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user, { name: 'Ada' });
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ada');
  });

  it('envía los datos válidos, confirma y limpia el formulario', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);
    const data = { name: 'Ada', email: 'ada@correo.cl', message: 'Hola, este es un mensaje.' };

    await fill(user, data);
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(onSubmit).toHaveBeenCalledWith(data);
    expect(screen.getByRole('alert')).toHaveTextContent(/enviado correctamente/i);
    expect(screen.getByLabelText('Nombre')).toHaveValue('');
  });

  it('oculta la confirmación al volver a escribir', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fill(user, { name: 'Ada', email: 'ada@correo.cl', message: 'Hola, este es un mensaje.' });
    await user.click(screen.getByRole('button', { name: 'Enviar' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Nombre'), 'B');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
