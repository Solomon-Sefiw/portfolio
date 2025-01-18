import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useAppSelector } from './features/hooks';
import { customTheme } from './styles/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
 <CssBaseline />
    <Header />
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <section id="about">
        <AboutMe />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </Container>
    <section id="footer">
        <Footer />
      </section>
    </ThemeProvider>
  );
};

export default App;
