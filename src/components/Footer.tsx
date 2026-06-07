import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaTerminal } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] border-t border-zinc-800 text-zinc-400 py-12 px-6 mt-20 relative overflow-hidden">
      {/* Detalle de neón en el fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#e63946]/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Lado izquierdo: Marca */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#e63946] to-red-900 rounded-lg shadow-[0_0_10px_rgba(230,57,70,0.5)] group-hover:shadow-[0_0_15px_rgba(230,57,70,0.8)] transition-all duration-300 border border-white/10">
              <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none"></div>
              <FaTerminal className="text-white text-lg relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 leading-none">
                Aaron<span className="text-[#e63946]">MCM</span>
              </span>
            </div>
          </Link>
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 text-center md:text-left">
            Transformando complejidad en eficiencia.
          </p>
        </div>

        {/* Centro: Navegación Rápida */}
        <div className="flex justify-center gap-6">
          <Link to="/proyectos" className="text-sm font-bold uppercase tracking-widest hover:text-[#e63946] transition-colors">Proyectos</Link>
          <Link to="/cursos" className="text-sm font-bold uppercase tracking-widest hover:text-[#e63946] transition-colors">Cursos</Link>
          <Link to="/contacto" className="text-sm font-bold uppercase tracking-widest hover:text-[#e63946] transition-colors">Contacto</Link>
        </div>

        {/* Lado derecho: Redes y Contacto */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <a href="https://github.com/AaronCM2705" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#e63946] hover:text-white transition-all shadow-lg hover:-translate-y-1">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/aaron-cruz-medrano-b83b11386" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#e63946] hover:text-white transition-all shadow-lg hover:-translate-y-1">
              <FaLinkedin className="text-xl" />
            </a>
            <Link to="/contacto" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#e63946] hover:text-white transition-all shadow-lg hover:-translate-y-1">
              <FaEnvelope className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase font-mono tracking-widest">
        <p>&copy; {currentYear} Aaron Cruz Medrano. Todos los derechos reservados.</p>
        <p>1º ASIR - Lenguaje de Marcas</p>
      </div>
    </footer>
  );
};

export default Footer;
