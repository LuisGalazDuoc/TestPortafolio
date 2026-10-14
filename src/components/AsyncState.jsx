import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


export default function AsyncState({
  loading,
  error,
  isEmpty = false,
  loadingLabel = 'Cargando…',
  emptyMessage = 'No hay información disponible.',
  children,
}) {
  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{loadingLabel}</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (isEmpty) {
    return <p className="text-center text-body-secondary">{emptyMessage}</p>;
  }
  return children;
}

AsyncState.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  isEmpty: PropTypes.bool,
  loadingLabel: PropTypes.string,
  emptyMessage: PropTypes.string,
  children: PropTypes.node,
};
