import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export default function ThemeToggle({ theme, onToggle }) {
  const label = theme === 'dark' ? 'Cambiar a Día' : 'Cambiar a Noche';
  return (
    <Button variant="outline-secondary" size="sm" onClick={onToggle}>
      {label}
    </Button>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onToggle: PropTypes.func.isRequired,
};
