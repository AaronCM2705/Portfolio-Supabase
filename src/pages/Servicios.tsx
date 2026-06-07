import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

// 1. DEFINIMOS LA INTERFACE (La misma que en ServicioDetalle)
interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  detalles: string;
  imagen_url: string;
}

const Servicios = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      const { data } = await supabase.from('Servicios').select('*');
      if (data) setServicios(data);
      setLoading(false);
    };
    fetchServicios();
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black uppercase italic text-white mb-16 border-l-8 border-[#e63946] pl-6">
          Servicios
        </h1>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-[#e63946] rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-black uppercase italic text-sm tracking-widest animate-pulse">Cargando módulos...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((s) => (
            <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-[#e63946] hover:shadow-[0_0_30px_rgba(230,57,70,0.15)] transition-all duration-300 group flex flex-col">
              <div className="h-48 overflow-hidden bg-zinc-950">
                <img 
                  src={s.imagen_url} 
                  alt={s.nombre} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" 
                />
              </div>
              
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-black uppercase italic text-white mb-4">
                  {s.nombre}
                </h3>
                <p className="text-zinc-500 text-sm mb-8 line-clamp-2 italic">
                  {s.descripcion}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    to={`/servicios/${s.id}`} 
                    className="inline-block bg-[#e63946] text-white px-6 py-2 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Ver más detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Servicios;