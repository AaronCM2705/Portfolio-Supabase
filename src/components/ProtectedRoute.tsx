import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import type { Session } from '@supabase/supabase-js';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Nada más cargar este componente, le preguntamos a Supabase:
    // "¿Hay alguien logueado en este navegador?"
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); // Guardamos la respuesta (null si no hay nadie)
      setLoading(false);   // Quitamos la pantalla de carga
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
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
