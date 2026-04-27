// src/pages/Cursos.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaAward } from 'react-icons/fa';

interface Curso {
  id: number;
  nombre: string;
  institucion: string;
  descripcion: string;
  fecha: string;
  certificado_url: string;
  imagen_logo: string;
}

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data } = await supabase.from('Cursos').select('*').order('id', { ascending: false });
      if (data) setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* TÍTULO ANIMADO (Vídeo 1) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-[#e63946] font-black uppercase tracking-[0.3em] text-sm mb-4">Acreditaciones Técnicas</h2>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none">
            CURSOS Y <br /> <span className="text-[#e63946]">CERTIFICADOS</span>
          </h1>
          <div className="w-32 h-2 bg-[#e63946] mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(230,57,70,0.4)]"></div>
        </motion.div>

        {/* GRID DE CURSOS (Vídeo 2: Glassmorphism y Micro-interacciones) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso, index) => (
            <motion.div
              key={curso.id}
              // Animación de entrada escalada por tarjeta
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Micro-interacción: flotación al pasar el ratón
              whileHover={{ y: -10, border: '1px solid #e63946' }}
              className="relative group bg-zinc-900/30 backdrop-blur-lg border border-zinc-800 p-10 rounded-[40px] flex flex-col h-full transition-all duration-700 shadow-2xl"
            >
              {/* Brillo de acento rojo de fondo en la tarjeta */}
              <div className="absolute -inset-2 bg-[#e63946]/5 blur-3xl rounded-full group-hover:bg-[#e63946]/10 transition-colors"></div>

              {/* Badge de Medalla con rotación (Segundo vídeo) */}
              <div className="absolute -top-4 -right-4 bg-[#e63946] p-3 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform shadow-[0_0_15px_rgba(230,57,70,0.5)] z-10">
                <FaAward className="text-white text-xl" />
              </div>

              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-black p-3 rounded-2xl border border-zinc-800 flex items-center justify-center relative">
                   {curso.imagen_logo ? (
                      <img src={curso.imagen_logo} alt="Logo" className="w-full h-full object-contain" />
                   ) : (
                      <FaCertificate className="text-[#e63946] text-3xl" />
                   )}
                   {/* Brillo interno del logo */}
                    <div className="absolute inset-0 bg-[#e63946]/5 blur-lg rounded-full"></div>
                </div>
                <div>
                  <p className="text-[#e63946] text-xs font-black uppercase tracking-widest leading-none mb-1">{curso.institucion}</p>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">{curso.fecha}</p>
                </div>
              </div>

              <h3 className="text-3xl font-black uppercase italic mb-5 leading-none group-hover:text-[#e63946] transition-colors shadow-text">
                {curso.nombre}
              </h3>
              
              <p className="text-zinc-400 text-sm italic mb-10 grow leading-relaxed max-w-sm">
                "{curso.descripcion}"
              </p>

              {/* Botón con efecto de llenado del Segundo Vídeo */}
              <a 
                href={curso.certificado_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest overflow-hidden flex items-center justify-center gap-3 transition-all duration-300"
              >
                <span className="relative z-10">Validar Credencial</span>
                <FaExternalLinkAlt className="relative z-10 text-xs" />
                {/* Llenado de color rojo desde abajo */}
                <div className="absolute inset-0 bg-[#e63946] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cursos;