const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validacion de campos del formulario de contacto.
 * @returns {{name?: string, email?: string, message?: string}}
 */
export function validateContact({ name = '', email = '', message = '' }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'El nombre es obligatorio.';
  }

  if (!email.trim()) {
    errors.email = 'El correo es obligatorio.';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Ingresa un correo válido.';
  }

  if (message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

/** Formatea una fecha*/
export function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat('es-CL', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}
