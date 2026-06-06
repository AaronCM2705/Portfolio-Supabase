// src/pages/SobreMi.tsx

import { FaDownload, FaServer, FaNetworkWired, FaLinux, FaWindows, FaDatabase, FaReact, FaGraduationCap } from 'react-icons/fa';

const SobreMi = () => {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <h1 className="text-7xl font-black uppercase italic leading-none">
            Sobre <span className="text-[#e63946]">mí</span>
          </h1>
          <div className="w-24 h-2 bg-[#e63946] mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-10">
            
            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e63946]/5 blur-3xl"></div>
              
              <h3 className="text-2xl font-black uppercase italic text-[#e63946]">Perfil Técnico</h3>
              <p className="text-zinc-300 text-lg leading-relaxed italic">
                Soy un apasionado de la tecnología y la infraestructura IT en constante evolución. Actualmente me encuentro cursando <strong className="text-white font-black">1º de Administración de Sistemas Informáticos y Redes (ASIR)</strong>.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Mi enfoque principal es la administración de servidores, la virtualización y la ciberseguridad. Disfruto montando laboratorios (Homelabs), resolviendo problemas complejos de red y desarrollando herramientas web que optimicen los procesos diarios.
              </p>
              
              <div className="pt-4">
                <a 
                  href="/CV_AARON CRUZ MEDRANO_1ºASIR (1).pdf" 
                  download 
                  className="inline-flex items-center gap-3 bg-[#e63946] text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all rounded-xl"
                >
                  <FaDownload /> Descargar CV
                </a>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-10 rounded-3xl">
              <h3 className="text-xl font-black uppercase italic text-white mb-8 flex items-center gap-3">
                <FaGraduationCap className="text-[#e63946]" /> Formación
              </h3>
              <div className="border-l-2 border-zinc-800 pl-6 relative">
                <div className="absolute w-4 h-4 bg-[#e63946] rounded-full -left-2.25 top-0 border-4 border-[#0a0a0a]"></div>
                <h4 className="text-lg font-bold text-white">Técnico Superior en ASIR</h4>
                <p className="text-[#e63946] text-sm font-bold uppercase tracking-widest mb-2">Actualmente cursando (1º Año)</p>
                <p className="text-zinc-500 text-sm">Especialización en sistemas operativos, redes locales, bases de datos y lenguajes de marcas.</p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-10">
            
            <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl shadow-xl">
              <h3 className="text-xl font-black uppercase italic text-[#e63946] mb-8">Stack Tecnológico</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-[#e63946] transition-colors">
                  <FaLinux className="text-3xl text-zinc-400" />
                  <div>
                    <p className="font-bold text-xs uppercase">Linux</p>
                    <p className="text-xs text-zinc-500">Debian, Ubuntu</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-[#e63946] transition-colors">
                  <FaWindows className="text-3xl text-zinc-400" />
                  <div>
                    <p className="font-bold text-xs uppercase">Win Server</p>
                    <p className="text-xs text-zinc-500">AD, GPO</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-[#e63946] transition-colors">
                  <FaNetworkWired className="text-3xl text-zinc-400" />
                  <div>
                    <p className="font-bold text-xs uppercase">Redes Cisco</p>
                    <p className="text-xs text-zinc-500">Routing, VLANs</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-[#e63946] transition-colors">
                  <FaServer className="text-3xl text-zinc-400" />
                  <div>
                    <p className="font-bold text-xs uppercase">Virtualización</p>
                    <p className="text-xs text-zinc-500">Proxmox, VMware</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-[#e63946] transition-colors">
                  <FaDatabase className="text-3xl text-zinc-400" />
                  <div>
                    <p className="font-bold text-xs uppercase">Bases de Datos</p>
                    <p className="text-xs text-zinc-500">SQL, Supabase</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-[#e63946] transition-colors">
                  <FaReact className="text-3xl text-zinc-400" />
                  <div>
                    <p className="font-bold text-xs uppercase">Frontend</p>
                    <p className="text-xs text-zinc-500">React, Tailwind</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-center">
                <span className="text-4xl font-black text-[#e63946] mb-2">+15</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">VMs Desplegadas</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-center">
                <span className="text-4xl font-black text-[#e63946] mb-2">+100</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Horas de Homelab</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-center">
                <span className="text-4xl font-black text-[#e63946] mb-2">4</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Topologías de Red</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-center">
                <span className="text-4xl font-black text-[#e63946] mb-2">2</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">S.O. Dominados</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SobreMi;