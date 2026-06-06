import { useEffect, useState } from 'react';
import { obtenerProyectos, type Proyecto } from '../services/proyectoService';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const { data, error } = await obtenerProyectos();
      
      if (error) {
        console.error("Error de conexión:", error.message || error);
      } else {
        console.log("Datos cargados:", data);
        setProyectos(data || []);
      }
      setCargando(false);
    };
    fetchProyectos();
  }, []);

  return (
    <section className="min-h-screen pt-20 pb-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black uppercase italic text-white leading-none">Proyecto</h1>
          <div className="w-24 h-2 bg-[#e63946] mx-auto mt-4"></div>
        </div>

        {cargando ? (
          <p className="text-center text-zinc-500 italic">Conectando con la base de datos...</p>
        ) : proyectos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {proyectos.map((p) => (
              <div key={p.id} className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden group hover:border-[#e63946]/80 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(230,57,70,0.2)] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none"></div>
                <div className="h-72 overflow-hidden bg-zinc-950 relative">
                  <img 
                    src={p.imagen_url} 
                    alt={p.nombre} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                </div>
                <div className="p-8 relative z-20 -mt-20">
                  <h3 className="text-3xl font-black uppercase italic mb-3 text-white drop-shadow-lg">{p.nombre}</h3>
                  <p className="text-zinc-300 mb-8 text-sm leading-relaxed drop-shadow-md">{p.descripcion}</p>
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-block border border-[#e63946]/50 bg-black/50 backdrop-blur-md text-[#e63946] px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-[#e63946] hover:text-white hover:border-[#e63946] transition-all rounded-xl">
                    Ver proyecto
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500">
            <p>No hay proyectos disponibles en la base de datos.</p>
            <p className="text-xs mt-2 text-[#e63946]">Revisa el RLS en Supabase</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Proyectos;