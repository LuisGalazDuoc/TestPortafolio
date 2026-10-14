import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { formatDate } from '../utils/validators.js';

export default function NewsItem({ title, date, content }) {
  return (
    <Card as="article" className="h-100">
      <Card.Body>
        <Card.Title as="h3" className="h5">
          {title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-body-secondary">
          Fecha: <time dateTime={date}>{formatDate(date)}</time>
        </Card.Subtitle>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
