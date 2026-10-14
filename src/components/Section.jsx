import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

/** Contenedor reutilizable de sección: título accesible + contenido. */
export default function Section({ id, title, children, className = '' }) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={`py-5 ${className}`.trim()}>
      <Container>
        <h2 id={titleId} className="text-center mb-4">
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};
