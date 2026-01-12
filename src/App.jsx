import "./output.css";
import "./index.css";
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import useTheme from './hooks/useTheme'
import { useEffect } from 'react';

function App() {
  // initialize theme hook (keeps in localStorage and on <html> class)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <div className="app-root">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default App
