import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';

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