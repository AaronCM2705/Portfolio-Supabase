import { Link } from 'react-router-dom';
import { FaServer, FaNetworkWired, FaShieldAlt, FaTerminal } from 'react-icons/fa';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* COLUMNA IZQUIERDA: TEXTO Y CARACTERÍSTICAS */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[#e63946] font-black uppercase tracking-[0.3em] text-sm border-l-4 border-[#e63946] pl-4">
              System Administrator Portfolio
            </span>
            <h1 className="text-7xl md:text-8xl font-black uppercase leading-none text-white">
              Hola, soy <br />
              <span className="text-[#e63946] italic">Aaron</span>
            </h1>
          </div>

          <p className="text-zinc-400 text-xl leading-relaxed max-w-xl italic">
            Especialista en <span className="text-white font-bold">Administración de Sistemas (ASIR)</span>. 
            Me dedico a diseñar arquitecturas de red seguras, gestionar entornos críticos y optimizar infraestructuras IT.
          </p>

          {/* MINI CARDS DE ESPECIALIDAD */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <FaServer className="text-[#e63946] text-xl" />
              <span className="text-xs font-bold uppercase">Sistemas</span>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <FaNetworkWired className="text-[#e63946] text-xl" />
              <span className="text-xs font-bold uppercase">Redes</span>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <FaShieldAlt className="text-[#e63946] text-xl" />
              <span className="text-xs font-bold uppercase">Seguridad</span>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <FaTerminal className="text-[#e63946] text-xl" />
              <span className="text-xs font-bold uppercase">Automation</span>
            </div>
          </div>

          <div className="flex gap-6 pt-6">
            <Link to="/proyectos" className="bg-[#e63946] text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(230,57,70,0.3)]">
              Ver Proyectos
            </Link>
            <Link to="/contacto" className="border-2 border-white text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
              Contacto
            </Link>
          </div>
        </div>

        {/* COLUMNA DERECHA: VISUAL DE CARRERA */}
        <div className="relative group">
          {/* Brillo de fondo */}
          <div className="absolute -inset-4 bg-[#e63946]/20 blur-3xl rounded-full group-hover:bg-[#e63946]/30 transition-all"></div>
          
          <div className="relative bg-zinc-900 border-2 border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl aspect-square flex items-center justify-center">
            <img 
              src="/career-visual.png" 
              alt="Network Infrastructure" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            />
            
            {/* Overlay de "Estatus del Sistema" para darle toque ASIR */}
            <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md border border-[#e63946]/50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase text-green-500">System Online</span>
              </div>
              <p className="text-[9px] text-zinc-400 font-mono">IP: 192.168.1.254</p>
              <p className="text-[9px] text-zinc-400 font-mono">Uptime: 99.9%</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;