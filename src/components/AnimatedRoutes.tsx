import { Routes, Route, useLocation } from 'react-router-dom'; // UseLocation para obtener la ubicación actual
import { AnimatePresence, motion } from 'framer-motion'; // AnimatePresence para las animaciones
import { useEffect } from 'react'; // UseEffect para el scroll

// Pages
import Home from '../pages/Home'; // Página principal 
import SobreMi from '../pages/SobreMi'; // Página sobre mí
import Servicios from '../pages/Servicios'; // Página de servicios
import Proyectos from '../pages/Proyectos'; // Página de proyectos
import Contacto from '../pages/Contacto'; // Página de contacto
import ServicioDetalle from '../pages/ServicioDetalle'; // Página de detalle de servicio
import Cursos from '../pages/Cursos'; // Página de cursos
import Login from '../pages/Login'; // Página de login
import AdminDashboard from '../pages/AdminDashboard'; // Página de administración
import NotFound from '../pages/NotFound'; // Página de error 404
import ProtectedRoute from './ProtectedRoute'; // Protección de rutas

// Wrapper for animations
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  // Solución definitiva para el scroll:
  // Como usamos mode="wait", la nueva página se monta JUSTO cuando la anterior ha terminado de salir.
  // Al poner el useEffect aquí, nos aseguramos de que el scroll suba en el instante perfecto.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/sobre-mi" element={<PageWrapper><SobreMi /></PageWrapper>} />
        <Route path="/servicios" element={<PageWrapper><Servicios /></PageWrapper>} />
        <Route path="/proyectos" element={<PageWrapper><Proyectos /></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper><Contacto /></PageWrapper>} />
        <Route path="/servicios/:id" element={<PageWrapper><ServicioDetalle /></PageWrapper>} />
        <Route path="/cursos" element={<PageWrapper><Cursos /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <PageWrapper><AdminDashboard /></PageWrapper>
            </ProtectedRoute>
          } 
        />
        {/* Error 404 para cualquier ruta no definida */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
