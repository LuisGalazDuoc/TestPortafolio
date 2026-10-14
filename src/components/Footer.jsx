import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

export default function Footer({ name }) {
  return (
    <footer className="py-4 bg-body-tertiary border-top text-center">
      <Container>
        <small>
          © {new Date().getFullYear()} {name}. Todos los derechos reservados.
        </small>
      </Container>
    </footer>
  );
}

Footer.propTypes = { name: PropTypes.string.isRequired };
