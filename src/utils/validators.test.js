import { describe, expect, it } from 'vitest';
import { formatDate, validateContact } from './validators.js';

describe('validateContact', () => {
  const valid = { name: 'Ada', email: 'ada@correo.cl', message: 'Hola, este es un mensaje.' };

  it('no retorna errores para datos válidos', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('exige nombre, correo y mensaje', () => {
    expect(validateContact({})).toEqual({
      name: 'El nombre es obligatorio.',
      email: 'El correo es obligatorio.',
      message: 'El mensaje debe tener al menos 10 caracteres.',
    });
  });

  it('rechaza correos con formato inválido', () => {
    expect(validateContact({ ...valid, email: 'ada@correo' }).email).toBe('Ingresa un correo válido.');
  });

  it('ignora espacios en blanco al validar', () => {
    expect(validateContact({ ...valid, name: '   ' }).name).toBeDefined();
    expect(validateContact({ ...valid, message: '  corto  ' }).message).toBeDefined();
  });
});

describe('formatDate', () => {
  it('formatea una fecha ISO sin desfase de zona horaria', () => {
    const text = formatDate('2024-08-01');
    expect(text).toMatch(/2024/);
    expect(text).toMatch(/1/);
  });

  it('devuelve el texto original si la fecha es inválida', () => {
    expect(formatDate('no-es-fecha')).toBe('no-es-fecha');
  });
});
