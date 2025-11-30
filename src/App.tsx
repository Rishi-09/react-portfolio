import LiquidBackground from './ui/LiquidBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Cursor from './ui/Cursor';
import SmoothScroll from './ui/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-slate-200 selection:bg-cyan-500/30">
        <Cursor />
        
        {/* Background Layer */}
        <LiquidBackground />
        
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="relative z-10">
          <Hero id="home" />
          <About id="about" />
          <Projects id="projects" />
          <Skills id="skills" />
          <Contact id="contact" />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;