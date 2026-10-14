import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ThemeToggle from './ThemeToggle.jsx';

export default function NavBar({ brand, links, theme, onToggleTheme }) {
  return (
    <Navbar expand="md" sticky="top" className="bg-body-tertiary border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="#intro">{brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" aria-label="Abrir menú de navegación" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-md-center gap-md-2">
            {links.map(({ href, label }) => (
              <Nav.Link key={href} href={href}>
                {label}
              </Nav.Link>
            ))}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  brand: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({ href: PropTypes.string.isRequired, label: PropTypes.string.isRequired }),
  ).isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
