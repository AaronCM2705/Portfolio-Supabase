// src/pages/Home.tsx

import { Link } from 'react-router-dom';
import { FaCodeBranch, FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white overflow-hidden relative flex items-center justify-center">
      {/* Círculo de brillo rojo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#e63946]/5 blur-[150px] rounded-full"></div>

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
            <div className="absolute -inset-4 bg-[#e63946]/20 blur-[100px] rounded-full group-hover:bg-[#e63946]/30 transition-colors"></div>
            
            <div className="bg-zinc-950/60 backdrop-blur-md border-2 border-[#e63946] p-4 rounded-[40px] relative overflow-hidden group shadow-2xl">
              <img 
                src="/computer_world.png" // Tu imagen técnica
                alt="Infrastructure Visualization" 
                className="w-full h-full max-w-md aspect-square object-contain transition-transform group-hover:scale-105 duration-700"
              />
              
              {/* Overlay técnico ASIR (Segundo Vídeo) */}
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-[#e63946]/50 p-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 font-mono">
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