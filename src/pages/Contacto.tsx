
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaDatabase } from 'react-icons/fa';

interface InfoContacto {
  email_personal: string;
  direccion_texto: string;
  google_maps_url: string;
}

const Contacto = () => {
  const [info, setInfo] = useState<InfoContacto | null>(null);
  const [status, setStatus] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data, error } = await supabase
        .from('Informacion_Contacto')
        .select('*')
        .single(); 

      if (error) {
        console.error("Error al cargar info de contacto:", error.message);
      } else {
        setInfo(data);
      }
      setCargando(false);
    };
    fetchInfo();
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Enviando...');
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const mensaje = formData.get('mensaje') as string;

    const { error } = await supabase
      .from('Mensaje_Contacto')
      .insert([{ nombre, email, mensaje }]);

    if (!error) {
      setStatus('¡Mensaje enviado con éxito! Te responderé pronto.');
      (e.target as HTMLFormElement).reset();
    } else {
      console.error("Error al guardar mensaje:", error.message);
      setStatus('Error al enviar el mensaje. Revisa la conexión.');
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#e63946] font-black uppercase italic">
        Estableciendo conexión con el servidor...
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-7xl font-black uppercase italic text-[#e63946] leading-none">
                Contacto
              </h1>
              <p className="text-zinc-400 text-xl italic">¿Tienes un proyecto en mente? Hablemos.</p>
            </div>

            <div className="space-y-6">
              <a 
                href={`mailto:${info?.email_personal}`} 
                className="group flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-[#e63946] transition-all duration-500 shadow-xl"
              >
                <div className="bg-[#e63946] p-4 rounded-xl text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Correo Personal</p>
                  <p className="text-zinc-200 font-bold text-lg group-hover:text-[#e63946] transition-colors">
                    {info?.email_personal || "email@ejemplo.com"}
                  </p>
                </div>
              </a>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-2">
                  <FaMapMarkerAlt className="text-[#e63946] text-xl" />
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    {info?.direccion_texto || "Ubicación"}
                  </p>
                </div>
                
                <div className="w-full h-72 rounded-[40px] overflow-hidden border-2 border-zinc-800 grayscale invert opacity-60 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-1000 shadow-2xl">
                  {info?.google_maps_url ? (
                    <iframe 
                      src={info.google_maps_url} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                    ></iframe>
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold italic uppercase">
                      Mapa no configurado
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e63946]/5 blur-3xl"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 mb-4 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                <FaDatabase className="text-[#e63946]" /> 
                Envío directo a Supabase DB
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Tu Nombre</label>
                <input 
                  name="nombre" 
                  type="text" 
                  required 
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800" 
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Tu Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800" 
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Tu Mensaje</label>
                <textarea 
                  name="mensaje" 
                  rows={5} 
                  required 
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl outline-none focus:border-[#e63946] transition-all text-white resize-none placeholder:text-zinc-800"
                  placeholder="¿En qué puedo ayudarte?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#e63946] py-5 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#e63946]/20 group"
              >
                Enviar Mensaje 
                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              {status && (
                <div className={`text-center p-4 rounded-xl text-xs font-black uppercase tracking-widest ${
                  status.includes('éxito') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {status}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contacto;