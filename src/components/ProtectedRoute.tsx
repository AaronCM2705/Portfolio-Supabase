import React, { useEffect, useState } from 'react'; // React es la librería base para crear componentes.
import { Navigate } from 'react-router-dom'; // Navigate es un componente que nos permite redirigir al usuario a otra página.
import { supabase } from '../supabase/supabaseClient'; // Importamos nuestra conexión a Supabase.
import type { Session } from '@supabase/supabase-js'; // Importamos una interfaz de TypeScript para tipar la sesión.

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => { //children es el contenido que queremos proteger. React.ReactNode es un tipo de TypeScript que representa cualquier cosa que se pueda renderizar en React.
  const [session, setSession] = useState<Session | null>(null); // session es el estado de la sesión. null significa que no hay sesión.
  const [loading, setLoading] = useState(true); // loading es el estado de la carga. true significa que estamos cargando.

  useEffect(() => {
    // 1. Nada más cargar este componente, le preguntamos a Supabase:
    // "¿Hay alguien logueado en este navegador?"
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); // Guardamos la respuesta (null si no hay nadie)
      setLoading(false);   // Quitamos la pantalla de carga
    });

    const {
      data: { subscription }, // subscription es una función que nos permite suscribirnos a cambios en la sesión.
    } = supabase.auth.onAuthStateChange((_event, session) => { // onAuthStateChange es una función que nos permite suscribirnos a cambios en la sesión.
      setSession(session); // Guardamos la respuesta (null si no hay nadie)
    });

    return () => subscription.unsubscribe(); // unsubscribe es una función que nos permite desuscribirnos de cambios en la sesión.
  }, []);

  if (loading) { // Si loading es true, mostramos la pantalla de carga.
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-[#e63946] rounded-full animate-spin"></div>
        <p className="text-[#e63946] font-black uppercase italic text-sm tracking-widest animate-pulse">
          Verificando credenciales...
        </p>
      </div>
    );
  }

  // 2. Si ya ha terminado de cargar y 'session' está vacío (null)...
  // ¡Expulsamos al usuario a la página de login usando <Navigate>!
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si tiene sesión, le dejamos ver el contenido protegido (el AdminDashboard)
  return children;
};

export default ProtectedRoute;
