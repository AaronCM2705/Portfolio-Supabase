// src/pages/Cursos.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
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
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-7xl font-black uppercase italic leading-none">
              Certifica<span className="text-[#e63946]">ciones</span>
            </h1>
            <p className="text-zinc-500 mt-4 text-xl italic">Formación complementaria y especializaciones.</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
            <FaAward className="text-[#e63946] text-3xl" />
            <span className="text-xs font-black uppercase tracking-widest leading-tight">
              Aprendizaje <br /> Continuo
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <div key={curso.id} className="group bg-zinc-950 border border-zinc-800 p-8 rounded-[30px] hover:border-[#e63946] transition-all duration-500 relative overflow-hidden flex flex-col">
              
              {/* Decoración de fondo */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#e63946]/5 blur-3xl group-hover:bg-[#e63946]/10 transition-colors"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 group-hover:border-[#e63946]/50 transition-colors">
                  {curso.imagen_logo ? (
                    <img src={curso.imagen_logo} alt="Logo" className="w-10 h-10 object-contain" />
                  ) : (
                    <FaCertificate className="text-3xl text-[#e63946]" />
                  )}
                </div>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter bg-black px-3 py-1 rounded-full border border-zinc-900">
                  {curso.fecha}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase italic mb-2 leading-tight">
                {curso.nombre}
              </h3>
              <p className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-4">
                {curso.institucion}
              </p>
              
              <p className="text-zinc-500 text-sm italic mb-8 grow">
                {curso.descripcion}
              </p>

              <a 
                href={curso.certificado_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#e63946] hover:border-[#e63946] hover:text-white transition-all duration-300"
              >
                Ver Certificado <FaExternalLinkAlt />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cursos;