import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFetchJson } from '../hooks/useFetchJson.js';
import AsyncState from './AsyncState.jsx';
import ProjectCard from './ProjectCard.jsx';
import Section from './Section.jsx';

export default function ProjectsSection({ source = 'data/projects.json' }) {
  const { data, loading, error } = useFetchJson(source);
  const projects = data ?? [];

  return (
    <Section id="projects" title="Proyectos">
      <AsyncState
        loading={loading}
        error={error}
        isEmpty={projects.length === 0}
        loadingLabel="Cargando proyectos…"
        emptyMessage="Aún no hay proyectos para mostrar."
      >
        <Row xs={1} md={2} lg={3} className="g-4">
          {projects.map((project) => (
            <Col key={project.id}>
              <ProjectCard {...project} />
            </Col>
          ))}
        </Row>
      </AsyncState>
    </Section>
  );
}

ProjectsSection.propTypes = { source: PropTypes.string };
