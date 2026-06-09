import { Link } from 'react-router-dom';
import { FaCodeBranch, FaTerminal, FaLinux, FaWindows, FaNetworkWired, FaServer, FaDatabase, FaDocker, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
      {/* -------------------- HERO SECTION -------------------- */}
      <section className="relative pt-40 pb-20 px-6 flex items-center justify-center min-h-screen">
        {/* Círculo de brillo rojo de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#e63946]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LADO IZQUIERDO: Texto con animaciones */}
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
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase italic leading-none tracking-tight">
                  HOLA, SOY <br />
                  <span className="text-[#e63946] relative inline-block">
                    <Typewriter
                      options={{
                        strings: ['AARON', 'ESPECIALISTA', 'SYSADMIN'],
                        autoStart: true,
                        loop: true,
                        delay: 70,
                        deleteSpeed: 50,
                      }}
                    />
                    <div className="absolute -inset-2 bg-[#e63946]/10 blur-xl rounded-lg pointer-events-none"></div>
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl italic border-l-4 border-zinc-800 pl-4 md:pl-6">
                Estudiante de <strong className="text-white font-black">1º ASIR</strong> enfocado en la gestión de infraestructuras críticas, virtualización y seguridad de redes. Transformando la complejidad en eficiencia.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/proyectos" className="group bg-[#e63946] text-white px-6 md:px-10 py-3 md:py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(230,57,70,0.2)]">
                  <FaCodeBranch /> Explorar Proyectos
                </Link>
                <Link to="/cursos" className="group border-2 border-zinc-800 text-white px-6 md:px-10 py-3 md:py-4 font-black uppercase text-xs tracking-widest hover:border-[#e63946] transition-all text-center">
                  Ver Certificaciones
                </Link>
              </div>
            </motion.div>

            {/* LADO DERECHO: Terminal Simulada */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="absolute -inset-4 bg-[#e63946]/20 blur-3xl rounded-full group-hover:bg-[#e63946]/30 transition-colors pointer-events-none"></div>
              
              <div className="bg-zinc-950/60 backdrop-blur-md border-2 border-[#e63946] p-4 rounded-3xl relative overflow-hidden group shadow-2xl">
                <img 
                  src="/cyber_server_red.png"
                  alt="Cyber Server Infrastructure" 
                  className="w-full h-full max-w-md aspect-4/3 lg:aspect-square object-cover rounded-2xl transition-transform group-hover:scale-105 duration-700 opacity-90"
                />

                {/* Overlay técnico ASIR */}
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

      {/* -------------------- 1. MARQUEE INFINITO -------------------- */}
      <section className="w-full bg-[#050505] border-y border-zinc-900 py-8 overflow-hidden relative flex items-center">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-[marquee_20s_linear_infinite] group hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 items-center opacity-60">
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaLinux className="text-3xl" /> Linux</span>
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaWindows className="text-3xl" /> Windows Server</span>
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaNetworkWired className="text-3xl" /> Cisco Networking</span>
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaServer className="text-3xl" /> Virtualización</span>
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaDatabase className="text-3xl" /> Bases de Datos</span>
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaDocker className="text-3xl" /> Contenedores</span>
              <span className="flex items-center gap-3 font-mono text-xl text-white hover:text-[#e63946] transition-colors"><FaShieldAlt className="text-3xl" /> Ciberseguridad</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------- 2. PILARES BENTO -------------------- */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">Pilares <span className="text-[#e63946]">Estratégicos</span></h2>
          <p className="text-zinc-400 font-mono text-sm max-w-2xl mx-auto">La base sólida para una infraestructura tecnológica resiliente y escalable.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-6 md:p-8 rounded-3xl hover:border-[#e63946]/50 transition-colors group">
            <div className="w-14 h-14 bg-[#e63946]/10 rounded-2xl flex items-center justify-center mb-6 text-[#e63946] text-2xl group-hover:scale-110 group-hover:bg-[#e63946] group-hover:text-white transition-all shadow-lg">
              <FaServer />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white uppercase tracking-tight">Infraestructura & Virtualización</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Despliegue y administración robusta de servidores físicos y virtuales garantizando la máxima disponibilidad.</p>
          </div>
          
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-[#e63946]/30 p-6 md:p-8 rounded-3xl hover:border-[#e63946] transition-colors group relative overflow-hidden shadow-[0_0_20px_rgba(230,57,70,0.05)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e63946]/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="w-14 h-14 bg-[#e63946] rounded-2xl flex items-center justify-center mb-6 text-white text-2xl group-hover:scale-110 shadow-[0_0_15px_rgba(230,57,70,0.5)] transition-all">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white uppercase tracking-tight">Seguridad de Redes</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">Implementación estricta de firewalls, políticas de acceso y auditorías para proteger activos críticos.</p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-6 md:p-8 rounded-3xl hover:border-[#e63946]/50 transition-colors group">
            <div className="w-14 h-14 bg-[#e63946]/10 rounded-2xl flex items-center justify-center mb-6 text-[#e63946] text-2xl group-hover:scale-110 group-hover:bg-[#e63946] group-hover:text-white transition-all shadow-lg">
              <FaTerminal />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white uppercase tracking-tight">Soporte & Automatización</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Resolución de incidencias (Tier 1/2) y creación de scripts Bash/PowerShell para optimizar tareas.</p>
          </div>
        </div>
      </section>

      {/* -------------------- 3. MINI-DASHBOARD STATS -------------------- */}
      <section className="border-t border-zinc-900 bg-[#050505] py-16 px-6 relative overflow-hidden">
        {/* Red laser line at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 h-[2px] bg-linear-to-r from-transparent via-[#e63946] to-transparent shadow-[0_0_15px_#e63946]"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-zinc-800">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[#e63946] font-black text-4xl md:text-5xl tracking-tighter">1º</span>
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest font-bold">Año Cursando ASIR</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-white font-black text-4xl md:text-5xl tracking-tighter">5+</span>
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest font-bold">Proyectos Prácticos</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-white font-black text-4xl md:text-5xl tracking-tighter">8+</span>
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest font-bold">Tecnologías Aprendidas</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[#e63946] font-black text-4xl md:text-5xl tracking-tighter">100%</span>
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-widest font-bold">Ganas de Aprender</span>
          </div>
        </div>
      </section>

      {/* CSS Animaciones Locales */}
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </main>
  );
};

export default Home;