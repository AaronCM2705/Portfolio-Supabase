import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre mi', path: '/sobre-mi' },
    { name: 'Servicio', path: '/servicios' },
    { name: 'Proyecto', path: '/proyectos' },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Cursos', path: '/cursos' }
  ];

  return (
    <nav className="bg-[#0a0a0a] border-b border-zinc-800 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-28">
        
        <div className="shrink-0 z-50">
          <Link to="/" className="flex items-center gap-4">
            <img 
              src="/8713478.png" 
              alt="Logo ACM - Aaron Cruz" 
              className="h-16 lg:h-20 w-auto object-contain transition-transform hover:scale-105 duration-300" 
            />
            <span className="hidden xl:block text-4xl font-black text-[#e63946] italic tracking-tighter">
              AaronMCM
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                location.pathname === link.path ? 'text-[#e63946] scale-110' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <a 
            href="/CV_AARON CRUZ MEDRANO_1ºASIR (1).pdf" 
            download 
            className="whitespace-nowrap border-2 border-white px-6 py-3 text-xs font-black uppercase hover:bg-[#e63946] hover:border-[#e63946] hover:text-white transition-all duration-300 shadow-lg shadow-white/5"
          >
            Descargar CV
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#e63946] text-3xl z-50 relative">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-28 left-0 w-full bg-[#0f0f0f] border-b border-zinc-800 p-10 flex flex-col gap-6 animate-in slide-in-from-top duration-300 shadow-2xl">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className="text-lg font-bold uppercase text-zinc-400 hover:text-[#e63946]"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="/CV_AARON CRUZ MEDRANO_1ºASIR (1).pdf" 
            download 
            className="bg-[#e63946] text-white text-center py-4 font-black uppercase text-sm rounded-lg"
          >
            Descargar CV
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;