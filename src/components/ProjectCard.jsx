import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  imageAlt,
  url,
  linkLabel = 'Ver demo',
}) {
  return (
    <Card className="project-card h-100">
      <Card.Img
        variant="top"
        src={`${import.meta.env.BASE_URL}${image}`}
        alt={imageAlt}
        loading="lazy"
        width={640}
        height={360}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h5">
          {title}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <ul className="list-inline mb-3" aria-label={`Tecnologías de ${title}`}>
          {technologies.map((tech) => (
            <li key={tech} className="list-inline-item">
              <Badge bg="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        <Button
          as="a"
          href={url}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
          aria-label={`${linkLabel} de ${title}`}
        >
          {linkLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  linkLabel: PropTypes.string,
};
