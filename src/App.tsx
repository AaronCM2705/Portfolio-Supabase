import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SobreMi from './pages/SobreMi';
import Servicios from './pages/Servicios';
import Proyectos from './pages/Proyectos';
import Contacto from './pages/Contacto';
import ServicioDetalle from './pages/ServicioDetalle';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Navbar />
        {/* El padding-top (pt-20) evita que el menú tape el contenido */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/:id" element={<ServicioDetalle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;