import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaEnvelopeOpenText, FaTrash } from 'react-icons/fa';

interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMensajes = async () => {
    const { data, error } = await supabase
      .from('Mensaje_Contacto')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMensajes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.')) {
      const { error } = await supabase.from('Mensaje_Contacto').delete().eq('id', id);
      if (!error) {
        setMensajes(mensajes.filter(m => m.id !== id));
      } else {
        alert('Error al eliminar el mensaje');
      }
    }
  };

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic text-[#e63946] mb-2">
              Panel de Control
            </h1>
            <p className="text-zinc-400 font-mono text-sm">Bandeja de Entrada Privada</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-[#e63946] hover:border-[#e63946] px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center gap-4">
            <FaEnvelopeOpenText className="text-[#e63946] text-xl" />
            <h2 className="text-xl font-bold uppercase tracking-widest">Mensajes Recibidos ({mensajes.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-20 text-center text-zinc-500 font-black uppercase italic tracking-widest animate-pulse">
              Cargando base de datos...
            </div>
          ) : mensajes.length === 0 ? (
            <div className="p-20 text-center text-zinc-500 font-black uppercase italic tracking-widest">
              No tienes mensajes en la bandeja de entrada.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/50 text-xs uppercase tracking-widest text-zinc-500 font-black">
                    <th className="p-5 border-b border-zinc-800">Fecha</th>
                    <th className="p-5 border-b border-zinc-800">Contacto</th>
                    <th className="p-5 border-b border-zinc-800 w-1/2">Contenido</th>
                    <th className="p-5 border-b border-zinc-800 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajes.map((msg) => (
                    <tr key={msg.id} className="hover:bg-zinc-800/30 transition-colors group">
                      <td className="p-5 border-b border-zinc-800/50 align-top text-xs text-zinc-400 whitespace-nowrap">
                        {formatearFecha(msg.created_at)}
                      </td>
                      <td className="p-5 border-b border-zinc-800/50 align-top">
                        <p className="font-bold text-[#e63946] uppercase text-sm mb-1">{msg.nombre}</p>
                        <a href={`mailto:${msg.email}`} className="text-zinc-400 text-xs hover:text-white transition-colors">
                          {msg.email}
                        </a>
                      </td>
                      <td className="p-5 border-b border-zinc-800/50">
                        <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-sans font-medium leading-relaxed">
                          {msg.mensaje}
                        </pre>
                      </td>
                      <td className="p-5 border-b border-zinc-800/50 align-top text-center">
                        <button 
                          onClick={() => handleDelete(msg.id)}
                          className="text-zinc-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                          title="Eliminar mensaje"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;
