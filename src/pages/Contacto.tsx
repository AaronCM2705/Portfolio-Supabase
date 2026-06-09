// src/pages/Contacto.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface InfoContacto {
  email_personal: string;
  direccion_texto: string;
  google_maps_url: string;
}

const Contacto = () => {
  const [info, setInfo] = useState<InfoContacto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [asunto, setAsunto] = useState('');

  // Fetch de los datos de contacto desde Supabase al montar el componente
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

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading('Enviando mensaje...');
    
    // Extracción de datos del form
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const empresa = formData.get('empresa') as string;
    const asuntoSeleccionado = formData.get('asunto') as string;
    const mensajeRaw = formData.get('mensaje') as string;

    // Build del mensaje final dependiendo del tipo de asunto
    let mensajeFinal = `[${asuntoSeleccionado}]\n`;
    if (telefono) mensajeFinal += `Teléfono: ${telefono}\n`;
    if (empresa) mensajeFinal += `Empresa: ${empresa}\n`;

    if (asuntoSeleccionado === 'Reserva de Cita') {
      const fecha = formData.get('fecha') as string;
      const hora = formData.get('hora') as string;
      mensajeFinal += `Cita: ${fecha} a las ${hora}\n`;
    } else if (asuntoSeleccionado === 'Propuesta Laboral') {
      const presupuesto = formData.get('presupuesto') as string;
      mensajeFinal += `Presupuesto: ${presupuesto}\n`;
    } else if (asuntoSeleccionado === 'Soporte Técnico / ASIR') {
      const urgencia = formData.get('urgencia') as string;
      mensajeFinal += `Urgencia: ${urgencia}\n`;
    }

    mensajeFinal += `\nMensaje:\n${mensajeRaw}`;

    // 1. Guardar log en Supabase
    const { error } = await supabase
      .from('Mensaje_Contacto')
      .insert([{ nombre, email, mensaje: mensajeFinal }]);

    if (!error) {
      // 2. Notificación push a Telegram
      try {
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
        
        if (botToken && chatId) {
          let telegramText = `🚀 NUEVO MENSAJE DEL PORTFOLIO 🚀\n\n`;
          telegramText += `👤 Nombre: ${nombre}\n`;
          telegramText += `📧 Email: ${email}\n`;
          if (telefono) telegramText += `📱 Teléfono: ${telefono}\n`;
          if (empresa) telegramText += `🏢 Empresa/Proyecto: ${empresa}\n`;
          telegramText += `📌 Asunto: ${asuntoSeleccionado}\n`;
          
          if (asuntoSeleccionado === 'Reserva de Cita') {
            telegramText += `📅 Fecha: ${formData.get('fecha')}\n⏰ Hora: ${formData.get('hora')}\n`;
          } else if (asuntoSeleccionado === 'Propuesta Laboral') {
            telegramText += `💰 Presupuesto: ${formData.get('presupuesto')}\n`;
          } else if (asuntoSeleccionado === 'Soporte Técnico / ASIR') {
            telegramText += `🚨 Urgencia: ${formData.get('urgencia')}\n`;
          }
          
          telegramText += `\n💬 Mensaje:\n${mensajeRaw}`;
          
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramText
            })
          });
        }
      } catch (tgError) {
        console.error("Error enviando alerta a Telegram:", tgError);
      }

      toast.success('¡Mensaje enviado con éxito!', { id: toastId });
      (e.target as HTMLFormElement).reset();
      setAsunto('');
    } else {
      console.error("Error al guardar mensaje:", error.message);
      toast.error('Error al enviar el mensaje', { id: toastId });
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
          
          {/* Lado izquierdo: Info contacto */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black uppercase italic text-[#e63946] leading-none">
                Contacto
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl italic">¿Tienes un proyecto en mente? Hablemos.</p>
            </div>

            <div className="space-y-6">
              
              <a 
                href={info?.email_personal ? `https://mail.google.com/mail/?view=cm&fs=1&to=${info.email_personal}` : "#"} 
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-[#e63946] transition-all duration-500 shadow-xl cursor-pointer"
              >
                <div className="bg-[#e63946] p-4 rounded-xl text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-black uppercase tracking-widest mb-1">Correo Personal</p>
                  <p className="text-zinc-200 font-bold text-sm md:text-lg group-hover:text-[#e63946] transition-colors break-all">
                    {info?.email_personal || "email@ejemplo.com"}
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-widest font-bold group-hover:text-zinc-400">Abrir en Gmail</p>
                </div>
              </a>

              <a 
                href="https://wa.me/34672803909" 
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-green-500 transition-all duration-500 shadow-xl cursor-pointer"
              >
                <div className="bg-green-500 p-4 rounded-xl text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-black uppercase tracking-widest mb-1">Línea Directa</p>
                  <p className="text-zinc-200 font-bold text-lg group-hover:text-green-500 transition-colors">
                    +34 672 803 909
                  </p>
                  <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-widest font-bold group-hover:text-zinc-400">Contactar por WhatsApp</p>
                </div>
              </a>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-2">
                  <FaMapMarkerAlt className="text-[#e63946] text-xl" />
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    {info?.direccion_texto || "Ubicación"}
                  </p>
                </div>
                
                {/* Contenedor del mapa (iframe) con filtro B/N al pasar el ratón */}
                <div className="w-full h-72 rounded-3xl overflow-hidden border-2 border-zinc-800 grayscale invert opacity-60 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-1000 shadow-2xl">
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

          {/* Lado derecho: Formulario */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e63946]/5 blur-3xl"></div>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Tu Nombre *</label>
                  <input 
                    name="nombre" 
                    type="text" 
                    required 
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800 text-sm" 
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Tu Email *</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800 text-sm" 
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Teléfono (Opcional)</label>
                  <input 
                    name="telefono" 
                    type="tel" 
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800 text-sm" 
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Empresa / Entidad</label>
                  <input 
                    name="empresa" 
                    type="text" 
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white placeholder:text-zinc-800 text-sm" 
                    placeholder="Tu empresa..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Asunto *</label>
                <div className="relative">
                  <select 
                    name="asunto" 
                    required
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    className={`w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-sm appearance-none cursor-pointer ${asunto === '' ? 'text-zinc-500' : 'text-white'}`}
                  >
                    <option value="" disabled hidden>Selecciona el motivo de tu mensaje...</option>
                    <option value="Propuesta Laboral" className="bg-zinc-900 text-white">💼 Propuesta Laboral / Contratación</option>
                    <option value="Reserva de Cita" className="bg-zinc-900 text-white">📅 Reserva de Cita / Reunión</option>
                    <option value="Soporte Técnico / ASIR" className="bg-zinc-900 text-white">💻 Soporte Técnico / Consultoría</option>
                    <option value="Otro" className="bg-zinc-900 text-white">❓ Otro</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs font-black">
                    ▼
                  </div>
                </div>
              </div>

              {/* Campos dinámicos de config según el select */}
              {asunto === 'Reserva de Cita' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Fecha Deseada *</label>
                    <input 
                      name="fecha" 
                      type="date" 
                      required 
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Hora (Aprox) *</label>
                    <input 
                      name="hora" 
                      type="time" 
                      required 
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white text-sm" 
                    />
                  </div>
                </div>
              )}

              {asunto === 'Propuesta Laboral' && (
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Rango de Presupuesto</label>
                  <select name="presupuesto" className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-sm text-white">
                    <option value="A negociar / No definido">A negociar / No definido</option>
                    <option value="Menos de 500€">Menos de 500€</option>
                    <option value="500€ - 1.500€">500€ - 1.500€</option>
                    <option value="1.500€ - 5.000€">1.500€ - 5.000€</option>
                    <option value="Más de 5.000€">Más de 5.000€</option>
                  </select>
                </div>
              )}

              {asunto === 'Soporte Técnico / ASIR' && (
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Nivel de Urgencia</label>
                  <select name="urgencia" className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-sm text-white">
                    <option value="Baja (Consulta general)">Baja (Consulta general)</option>
                    <option value="Media (Problema a resolver pronto)">Media (Problema a resolver pronto)</option>
                    <option value="Alta (Sistema caído / Bloqueo)">Alta (Sistema caído / Bloqueo crítico)</option>
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 pl-2">Tu Mensaje *</label>
                <textarea 
                  name="mensaje" 
                  rows={4} 
                  required 
                  className="w-full bg-black border border-zinc-800 p-3 rounded-xl outline-none focus:border-[#e63946] transition-all text-white resize-none placeholder:text-zinc-800 text-sm"
                  placeholder="¿En qué puedo ayudarte? Describe los detalles de tu proyecto o consulta..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#e63946] py-3.5 rounded-xl font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#e63946]/20 group mt-2"
              >
                Enviar Mensaje 
                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contacto;