import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        {/* Toaster global para las notificaciones flotantes */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#18181b', // zinc-900
              color: '#fff',
              border: '1px solid #27272a', // zinc-800
            },
            success: {
              iconTheme: {
                primary: '#22c55e', // green-500
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e63946', // tu rojo corporativo
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Navbar />
        <main className="grow pt-20 overflow-x-hidden">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;