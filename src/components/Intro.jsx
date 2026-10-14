import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

/** Sección "Sobre mí": nombre, foto profesional, biografía y redes. */
export default function Intro({ name, role, bio, photo, photoAlt, socials = [] }) {
  return (
    <section id="intro" aria-labelledby="intro-title" className="py-5 bg-body-tertiary">
      <Container>
        <Row className="align-items-center justify-content-center g-4">
          <Col xs={12} md={4} className="text-center">
            <Image
              src={`${import.meta.env.BASE_URL}${photo}`}
              alt={photoAlt}
              roundedCircle
              width={220}
              height={220}
              className="shadow"
            />
          </Col>
          <Col xs={12} md={7} className="text-center text-md-start">
            <h1 id="intro-title">{name}</h1>
            <p className="lead">{role}</p>
            <p>{bio}</p>
            {socials.length > 0 && (
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                {socials.map(({ label, url }) => (
                  <Button
                    key={url}
                    as="a"
                    href={url}
                    variant="outline-primary"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Intro.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  photoAlt: PropTypes.string.isRequired,
  socials: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, url: PropTypes.string.isRequired }),
  ),
};
