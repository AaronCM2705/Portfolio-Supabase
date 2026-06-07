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
              {/* Visual Animado: Server Rack CSS Puro */}
              <div className="w-full max-w-md aspect-square flex flex-col justify-center gap-6 p-8 relative bg-zinc-950/80 rounded-2xl group-hover:scale-105 transition-transform duration-700">
                {/* Fondo de red de puntos (Grid) */}
                <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#e63946]/10 blur-3xl rounded-full"></div>
                
                {/* Rack 1: Nodo General */}
                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 shadow-xl relative z-10">
                   <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                     <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-bold">SRV-01 // Compute Node</span>
                     <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse"></div>
                       <div className="w-2.5 h-2.5 bg-zinc-700 rounded-full"></div>
                     </div>
                   </div>
                   <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-zinc-500 animate-[pulse_3s_ease-in-out_infinite]"></div>
                   </div>
                </div>

                {/* Rack 2: Base de Datos (Destacado Rojo) */}
                <div className="bg-[#050505] border border-[#e63946]/50 rounded-xl p-5 flex flex-col gap-4 shadow-[0_0_25px_rgba(230,57,70,0.15)] relative z-10 overflow-hidden">
                   <div className="absolute left-0 top-0 w-1 h-full bg-[#e63946] shadow-[0_0_15px_#e63946]"></div>
                   <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                     <span className="text-[10px] text-[#e63946] font-mono uppercase tracking-widest font-bold">DB-MASTER // Supabase</span>
                     <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 bg-[#e63946] rounded-full shadow-[0_0_10px_#e63946] animate-ping opacity-75"></div>
                       <div className="w-2.5 h-2.5 bg-[#e63946] rounded-full shadow-[0_0_10px_#e63946]"></div>
                     </div>
                   </div>
                   <div className="flex gap-2 items-center">
                     <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-[#e63946] animate-[pulse_2s_ease-in-out_infinite]"></div>
                     </div>
                     <span className="text-[10px] text-[#e63946] font-mono">75%</span>
                   </div>
                </div>

                {/* Rack 3: Gateway */}
                <div className="bg-[#050505] border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 shadow-xl relative z-10">
                   <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                     <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-bold">NET-01 // API Gateway</span>
                     <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                       <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308] animate-pulse"></div>
                     </div>
                   </div>
                   <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-zinc-500 animate-[pulse_4s_ease-in-out_infinite]"></div>
                   </div>
                </div>
              </div>
              
              {/* Overlay técnico ASIR (Segundo Vídeo) */}
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-[#e63946]/50 p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-300 font-mono">
                  Network Status: Secure
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Home;