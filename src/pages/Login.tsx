import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserShield } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya está logueado, redirigir al panel
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Verificando credenciales...');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Credenciales incorrectas o usuario no registrado.', { id: toastId });
      setLoading(false);
    } else {
      toast.success('Acceso concedido', { id: toastId });
      navigate('/admin');
    }
  };

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e63946]/10 blur-3xl"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-black border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(230,57,70,0.3)]">
            <FaUserShield className="text-3xl text-[#e63946]" />
          </div>
          <h1 className="text-3xl font-black uppercase italic text-white">
            Acceso <span className="text-[#e63946]">Seguro</span>
          </h1>
          <p className="text-zinc-500 text-xs font-mono mt-2">Panel de Administración Privado</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800 text-sm" 
              placeholder="admin@dominio.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Contraseña</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800 text-sm" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#e63946] py-3.5 rounded-xl font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#e63946]/20 disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Entrar al Sistema'}
            <FaLock />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
