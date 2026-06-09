import { useEffect, useState } from 'react';
import { obtenerProyectos, type Proyecto } from '../services/proyectoService';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [cargando, setCargando] = useState(true);

  // Fetch de proyectos desde Supabase
  useEffect(() => {
    const fetchProyectos = async () => {
      const { data, error } = await obtenerProyectos();
      
      if (error) {
        console.error("Error de conexión:", error.message || error);
      } else {
        setProyectos(data || []);
      }
      setCargando(false);
    };
    fetchProyectos();
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Brillo de fondo sutil */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#e63946]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabecera animada y responsive */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-l-8 border-[#e63946] pl-6 md:pl-8"
        >
          <h2 className="text-[#e63946] font-black uppercase tracking-[0.3em] text-xs md:text-sm mb-2">
            Desarrollo e Infraestructura
          </h2>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black uppercase italic text-white leading-none break-words tracking-tight">
            Proyectos
          </h1>
        </motion.div>

        {cargando ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-[#e63946] rounded-full animate-spin shadow-[0_0_15px_#e63946]"></div>
            <p className="text-zinc-500 font-black uppercase italic text-sm tracking-widest animate-pulse">Obteniendo proyectos...</p>
          </div>
        ) : proyectos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {proyectos.map((p, index) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden hover:border-[#e63946] hover:shadow-[0_0_40px_rgba(230,57,70,0.15)] transition-all duration-500 group flex flex-col relative"
              >
                {/* Imagen Superior */}
                <div className="h-64 overflow-hidden bg-black relative">
                  {/* Capa oscura que se difumina hacia abajo para fusionarse con la tarjeta */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <img 
                    src={p.imagen_url} 
                    alt={p.nombre} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-90 object-top" 
                  />
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#e63946]/20 blur-[50px] z-0 rounded-full group-hover:bg-[#e63946]/40 transition-colors duration-500"></div>
                </div>
                
                {/* Contenido Inferior */}
                <div className="p-8 flex flex-col grow relative z-20">
                  <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-4 group-hover:text-[#e63946] transition-colors leading-tight shadow-text">
                    {p.nombre}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-8 line-clamp-3 leading-relaxed italic">
                    "{p.descripcion}"
                  </p>
                  
                  {/* Botón Call to Action */}
                  <div className="mt-auto">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group/btn relative w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest overflow-hidden flex items-center justify-center gap-3 transition-all duration-300"
                    >
                      <span className="relative z-10">Explorar Proyecto</span>
                      <FaExternalLinkAlt className="relative z-10 text-xs" />
                      
                      {/* Efecto de llenado del botón al hacer hover */}
                      <div className="absolute inset-0 bg-[#e63946] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      <div className="absolute inset-0 text-white flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-20">
                        Explorar Proyecto <FaExternalLinkAlt className="text-xs" />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-zinc-500 font-black uppercase tracking-widest text-lg mb-2">Sin proyectos</p>
            <p className="text-zinc-600 text-sm">No hay proyectos disponibles en la base de datos.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Proyectos;