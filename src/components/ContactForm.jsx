import { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { validateContact } from '../utils/validators.js';
import Section from './Section.jsx';

const INITIAL_VALUES = { name: '', email: '', message: '' };


export default function ContactForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit?.(values);
    setSent(true);
    setValues(INITIAL_VALUES);
  };

  return (
    <Section id="contact" title="Contacto">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {sent && <Alert variant="success">¡Gracias! Tu mensaje fue enviado correctamente.</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="contact-name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={Boolean(errors.name)}
                aria-invalid={Boolean(errors.name)}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contact-email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={Boolean(errors.email)}
                aria-invalid={Boolean(errors.email)}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contact-message">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={values.message}
                onChange={handleChange}
                isInvalid={Boolean(errors.message)}
                aria-invalid={Boolean(errors.message)}
              />
              <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Section>
  );
}

ContactForm.propTypes = { onSubmit: PropTypes.func };
