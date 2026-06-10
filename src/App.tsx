import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter para poder navegar entre páginas
import Navbar from './components/Navbar'; // Menú superior
import Footer from './components/Footer'; // Pie de página
import AnimatedRoutes from './components/AnimatedRoutes'; // Animaciones al cambiar de página
import { Toaster } from 'react-hot-toast'; // Sistema de notificaciones

function App() {
  return (
    // Envuelvo todo en Router para que ruten bien las páginas
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        
        {/* Config global para los popups de aviso (toast) */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000, 
            style: {
              background: '#18181b', 
              color: '#fff',         
              border: '1px solid #27272a', 
            },
            success: {
              iconTheme: {
                primary: '#22c55e', 
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e63946', 
                secondary: '#fff',
              },
            },
          }}
        />
        
        {/* Menú fijo arriba */}
        <Navbar />

        {/* Zona principal donde se inyectan las páginas. pt-20 para q no lo tape la nav */}
        <main className="grow pt-20 overflow-x-hidden">
          <AnimatedRoutes />
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;