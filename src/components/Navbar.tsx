// src/components/Navbar.tsx

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  // Estado para el toggle del menú móvil
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Lista de enlaces para mapear en lugar de harcodearlos
  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre mi', path: '/sobre-mi' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    // Efecto cristal de la nav
    <nav className="bg-[#0a0a0a] bg-opacity-70 backdrop-blur-md border-b border-zinc-800 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-28">
        
        {/* Logo */}
        <div className="shrink-0 z-50">
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-[#e63946] to-red-900 rounded-xl shadow-[0_0_15px_rgba(230,57,70,0.5)] group-hover:shadow-[0_0_25px_rgba(230,57,70,0.8)] transition-all duration-300 border border-white/10">
              <div className="absolute inset-0 bg-black/20 rounded-xl pointer-events-none"></div>
              <FaTerminal className="text-white text-xl md:text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
              {/* Pill verde simulando servidor online */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a] animate-pulse"></div>
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-400 leading-none">
                Aaron<span className="text-[#e63946]">MCM</span>
              </span>
              <span className="text-[10px] md:text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase font-bold mt-1 group-hover:text-[#e63946] transition-colors">
                SysAdmin &middot; Dev
              </span>
            </div>
          </Link>
        </div>

        {/* Links PC */}
        <div className="hidden xl:flex items-center gap-6 xl:gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              // Resaltar en rojo si estamos en la ruta actual
              className={`whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-[#e63946]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
              {/* Barrita inferior hover */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e63946] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
          
          <a 
            href="/CV_Aaron_Cruz_Medrano.pdf" 
            download 
            className="whitespace-nowrap border-2 border-white px-6 py-3 text-xs font-black uppercase hover:bg-[#e63946] hover:border-[#e63946] hover:text-white transition-all duration-300 shadow-lg shadow-white/5"
          >
            Descargar CV
          </a>
        </div>

        {/* Toggle Menú móvil */}
        <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-[#e63946] text-3xl z-50 relative p-2">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown móvil con framer-motion para que quede smooth */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="xl:hidden absolute top-28 left-0 w-full bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-zinc-800 p-10 flex flex-col gap-6 shadow-2xl z-40"
        >
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
            href="/CV_Aaron_Cruz_Medrano.pdf" 
            download 
            className="bg-[#e63946] text-white text-center py-4 font-black uppercase text-sm rounded-lg"
          >
            Descargar CV
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;