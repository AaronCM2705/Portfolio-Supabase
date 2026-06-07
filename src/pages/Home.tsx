// src/pages/Home.tsx

import { Link } from 'react-router-dom';
import { FaCodeBranch, FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white overflow-hidden relative flex items-center justify-center">
      {/* Círculo de brillo rojo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#e63946]/5 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO IZQUIERDO: Texto con animaciones (Vídeo 1) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 px-5 py-2 rounded-full text-[#e63946] text-xs font-black uppercase tracking-[0.2em] backdrop-blur-sm">
                <FaTerminal className="animate-pulse" /> Status: System Online
              </span>
              
              <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none">
                HOLA, SOY <br />
                <span className="text-[#e63946] relative">
                  {/* EFECTO TYPEWRITER DEL VÍDEO 1 */}
                  <Typewriter
                    options={{
                      strings: ['AARON', 'ESPECIALISTA', 'SYSADMIN'],
                      autoStart: true,
                      loop: true,
                      delay: 70,
                      deleteSpeed: 50,
                    }}
                  />
                  {/* Brillo de acento en el texto */}
                  <div className="absolute -inset-2 bg-[#e63946]/10 blur-xl rounded-lg"></div>
                </span>
              </h1>
            </div>

            <p className="text-xl text-zinc-400 leading-relaxed max-w-xl italic border-l-4 border-zinc-800 pl-6">
              Estudiante de <strong className="text-white font-black">1º ASIR</strong> enfocado en la gestión de infraestructuras críticas, virtualización y seguridad de redes. Transformando la complejidad en eficiencia.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/proyectos" className="group bg-[#e63946] text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(230,57,70,0.2)]">
                <FaCodeBranch /> Explorar Proyectos
              </Link>
              <Link to="/cursos" className="group border-2 border-zinc-800 text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:border-[#e63946] transition-all">
                Ver Certificaciones
              </Link>
            </div>
          </motion.div>

          {/* LADO DERECHO: Visual Técnico Premium (Vídeo 2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Brillo rojo detrás de la tarjeta */}
            <div className="absolute -inset-4 bg-[#e63946]/20 blur-3xl rounded-full group-hover:bg-[#e63946]/30 transition-colors"></div>
            
            <div className="bg-zinc-950/60 backdrop-blur-md border-2 border-[#e63946] p-4 rounded-3xl relative overflow-hidden group shadow-2xl">
              {/* Consola Interactiva Simulada */}
              <div className="w-full h-80 max-w-md bg-[#0a0a0a] rounded-xl border border-zinc-800 shadow-[0_0_30px_rgba(230,57,70,0.15)] flex flex-col overflow-hidden group-hover:border-[#e63946]/50 transition-colors duration-500">
                {/* Cabecera de la terminal */}
                <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  <span className="ml-4 text-[10px] text-zinc-500 font-mono tracking-widest">root@aaron-server:~</span>
                </div>
                {/* Cuerpo de la terminal con texto animado */}
                <div className="p-5 font-mono text-xs flex flex-col gap-2 relative h-full">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                  
                  <div className="flex gap-2 text-zinc-300">
                    <span className="text-[#e63946]">$</span>
                    <span className="typing-effect-1 overflow-hidden whitespace-nowrap border-r-2 border-transparent">./init_sysadmin_profile.sh</span>
                  </div>
                  
                  <div className="flex flex-col gap-1 text-zinc-500 animate-[fadeIn_0s_ease_1.5s_forwards] opacity-0">
                    <span>[ OK ] Loading OS modules...</span>
                    <span>[ OK ] Mounting virtual volumes...</span>
                    <span>[ OK ] Connecting to database...</span>
                  </div>

                  <div className="flex gap-2 text-green-400 mt-2 animate-[fadeIn_0s_ease_3s_forwards] opacity-0">
                    <span className="text-zinc-500">&gt;</span>
                    <span>SYSTEM ONLINE. ALL SERVICES RUNNING.</span>
                  </div>

                  <div className="flex gap-2 text-zinc-300 mt-auto animate-[fadeIn_0s_ease_3.5s_forwards] opacity-0">
                    <span className="text-[#e63946]">$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>

              {/* Estilos CSS para la animación de la terminal insertados localmente */}
              <style dangerouslySetInnerHTML={{__html: `
                .typing-effect-1 {
                  animation: typing 1.5s steps(30, end) forwards, blink-caret .75s step-end infinite;
                  width: 0;
                }
                @keyframes typing {
                  from { width: 0 }
                  to { width: 100% }
                }
                @keyframes blink-caret {
                  from, to { border-color: transparent }
                  50% { border-color: white; }
                }
                @keyframes fadeIn {
                  to { opacity: 1; }
                }
              `}} />
              
              {/* Overlay técnico ASIR (Mejorado Premium) */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-zinc-950/85 backdrop-blur-2xl border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#22c55e]"></div>
                
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_12px_#22c55e]"></div>
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping opacity-60"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold mb-0.5">Status</span>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-200 font-sans">
                      Red Segura
                    </span>
                  </div>
                </div>
                
                <div className="h-8 w-px bg-zinc-800"></div>
                
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold mb-0.5">Ping</span>
                  <span className="text-xs font-black text-green-400 font-mono">14ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Home;