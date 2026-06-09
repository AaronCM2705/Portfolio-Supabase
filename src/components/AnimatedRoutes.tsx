import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from '../pages/Home';
import SobreMi from '../pages/SobreMi';
import Servicios from '../pages/Servicios';
import Proyectos from '../pages/Proyectos';
import Contacto from '../pages/Contacto';
import ServicioDetalle from '../pages/ServicioDetalle';
import Cursos from '../pages/Cursos';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

// Wrapper for animations
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
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
