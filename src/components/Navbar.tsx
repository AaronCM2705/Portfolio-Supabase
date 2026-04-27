// src/components/Navbar.tsx

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre mi', path: '/sobre-mi' },
    { name: 'Cursos', path: '/cursos' }, // <--- AÑADIDO
    { name: 'Servicio', path: '/servicios' },
    { name: 'Proyecto', path: '/proyectos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    // GLASSMORPHISM: backdrop-blur-md, bg-opacity-70 y borde fino
    <nav className="bg-[#0a0a0a] bg-opacity-70 backdrop-blur-md border-b border-zinc-800 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-28">
        
        {/* === LOGO === */}
        <div className="shrink-0 z-50">
          <Link to="/" className="flex items-center gap-4 group">
            <img 
              src="/8713478.png" // Tu logo rojo redondo
              alt="Logo Aaron" 
              className="h-16 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105 duration-300" 
            />
            {/* Ocultamos el texto en pantallas medianas (tablets) para evitar el espachurramiento */}
            <span className="hidden xl:block text-4xl font-black text-[#e63946] italic tracking-tighter">
              AaronMCM
            </span>
          </Link>
        </div>

        {/* === LINKS PC === */}
        {/* Usamos lg:flex para que colapse antes y whitespace-nowrap para que no se partan las palabras */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-[#e63946]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
              {/* Barra inferior animada del segundo vídeo */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#e63946] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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

        {/* === BOTÓN MÓVIL === */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#e63946] text-3xl z-50 relative p-2">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* === MENÚ MÓVIL (ANIMADO) === */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden absolute top-28 left-0 w-full bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-zinc-800 p-10 flex flex-col gap-6 shadow-2xl z-40"
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
            href="/CV_AARON CRUZ MEDRANO_1ºASIR (1).pdf" 
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