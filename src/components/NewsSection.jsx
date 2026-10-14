import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFetchJson } from '../hooks/useFetchJson.js';
import AsyncState from './AsyncState.jsx';
import NewsItem from './NewsItem.jsx';
import Section from './Section.jsx';


export default function NewsSection({ id, title, source }) {
  const { data, loading, error } = useFetchJson(source);
  const items = data ?? [];

  return (
    <Section id={id} title={title}>
      <AsyncState
        loading={loading}
        error={error}
        isEmpty={items.length === 0}
        loadingLabel={`Cargando ${title.toLowerCase()}…`}
        emptyMessage="No hay noticias disponibles."
      >
        <Row xs={1} md={2} className="g-4">
          {items.map((item) => (
            <Col key={item.id}>
              <NewsItem title={item.title} date={item.date} content={item.content} />
            </Col>
          ))}
        </Row>
      </AsyncState>
    </Section>
  );
}

NewsSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};
