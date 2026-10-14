import AsyncState from './components/AsyncState.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import Intro from './components/Intro.jsx';
import NavBar from './components/NavBar.jsx';
import NewsSection from './components/NewsSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import { useFetchJson } from './hooks/useFetchJson.js';
import { useTheme } from './hooks/useTheme.js';

const NAV_LINKS = [
  { href: '#intro', label: 'Introducción' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#news-tech', label: 'Noticias' },
  { href: '#contact', label: 'Contacto' },
];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { data: profile, loading, error } = useFetchJson('data/profile.json');

  return (
    <>
      <a className="visually-hidden-focusable skip-link btn btn-light" href="#main">
        Saltar al contenido
      </a>
      <NavBar brand="Mi Portafolio" links={NAV_LINKS} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main" tabIndex={-1}>
        <AsyncState loading={loading} error={error} loadingLabel="Cargando perfil…">
          {profile && <Intro {...profile} />}
        </AsyncState>
        <ProjectsSection />
        <NewsSection id="news-tech" title="Noticias de tecnología" source="data/news-tech.json" />
        <NewsSection id="news-campus" title="Noticias académicas" source="data/news-campus.json" />
        <ContactForm />
      </main>

      <Footer name={profile?.name ?? 'Tu Nombre'} />
    </>
  );
}
