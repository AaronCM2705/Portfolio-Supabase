import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { FaArrowLeft } from 'react-icons/fa';

// 1. DEFINIMOS LA ESTRUCTURA (Interface) para que TypeScript no se queje
interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  detalles: string;
  imagen_url: string;
}

const ServicioDetalle = () => {
  const { id } = useParams<{ id: string }>(); // Tipamos también el parámetro de la URL
  
  // 2. USAMOS LA INTERFACE AQUÍ (En lugar de any)
  const [servicio, setServicio] = useState<Servicio | null>(null);

  useEffect(() => {
    const fetchServicio = async () => {
      // Usamos .single() porque solo queremos un servicio, no un array
      const { data, error } = await supabase
        .from('Servicios')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error al obtener detalle:", error.message);
      } else {
        setServicio(data);
      }
    };
    fetchServicio();
  }, [id]);

  if (!servicio) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[#e63946] animate-pulse font-black uppercase italic">Cargando especificaciones...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto">
        <Link to="/servicios" className="flex items-center gap-2 text-zinc-500 hover:text-[#e63946] font-black uppercase text-xs mb-10 transition-all">
          <FaArrowLeft /> Volver a servicios
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-zinc-950 p-8 md:p-12 rounded-[40px] border border-zinc-800 shadow-2xl">
          <div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic mb-6 leading-none">
              {servicio.nombre}
            </h1>
            <div className="w-20 h-2 bg-[#e63946] mb-8"></div>
            
            <p className="text-zinc-400 text-lg italic mb-8 leading-relaxed">
              "{servicio.descripcion}"
            </p>
            
            <div className="bg-zinc-900 p-6 rounded-2xl border-l-4 border-[#e63946]">
              <h3 className="text-white font-black uppercase text-xs mb-3 italic tracking-widest">
                Análisis Técnico ASIR:
              </h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                {servicio.detalles}
              </p>
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl h-full min-h-[300px]">
            <img 
              src={servicio.imagen_url} 
              alt={servicio.nombre} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicioDetalle;