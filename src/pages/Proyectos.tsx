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
              <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-[#e63946] transition-all shadow-2xl">
                <div className="h-64 overflow-hidden bg-zinc-900">
                  <img 
                    src={p.imagen_url} 
                    alt={p.nombre} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 text-white">
                  <h3 className="text-3xl font-black uppercase italic mb-4">{p.nombre}</h3>
                  <p className="text-zinc-500 mb-8 text-sm leading-relaxed">{p.descripcion}</p>
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-block border-2 border-[#e63946] text-[#e63946] px-8 py-2 font-black uppercase text-xs tracking-widest hover:bg-[#e63946] hover:text-white transition-all">
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