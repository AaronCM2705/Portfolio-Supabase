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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Perfil (Ocupa 2 columnas en LG) */}
          <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 p-10 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-[#e63946]/50 hover:shadow-[0_0_30px_rgba(230,57,70,0.15)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#e63946]/10 blur-3xl group-hover:bg-[#e63946]/20 transition-colors"></div>
            
            <h3 className="text-3xl font-black uppercase italic text-[#e63946] mb-6">Perfil Técnico</h3>
            <div className="space-y-4 relative z-10">
              <p className="text-zinc-300 text-lg leading-relaxed italic">
                Soy un apasionado de la tecnología y la infraestructura IT. Actualmente cursando <strong className="text-white font-black">1º de Administración de Sistemas Informáticos y Redes (ASIR)</strong>.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Mi enfoque principal es la administración de servidores, la virtualización y la ciberseguridad. Disfruto montando laboratorios (Homelabs), resolviendo problemas complejos de red y desarrollando herramientas web que optimicen los procesos diarios.
              </p>
            </div>
            
            <div className="pt-8 relative z-10">
              <a 
                href="/CV_Aaron_Cruz_Medrano.pdf" 
                download 
                className="inline-flex items-center gap-3 bg-[#e63946] text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all rounded-xl shadow-[0_0_20px_rgba(230,57,70,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                <FaDownload /> Descargar CV
              </a>
            </div>
          </div>

          {/* Bento Item 2: Formación (Ocupa 1 columna) */}
          <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 p-10 rounded-3xl shadow-2xl group hover:border-[#e63946]/50 hover:shadow-[0_0_30px_rgba(230,57,70,0.15)] transition-all duration-300 relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#e63946]/5 blur-3xl group-hover:bg-[#e63946]/10 transition-colors"></div>
            <h3 className="text-xl font-black uppercase italic text-white mb-8 flex items-center gap-3 relative z-10">
              <FaGraduationCap className="text-[#e63946] text-3xl" /> Formación
            </h3>
            <div className="border-l-2 border-[#e63946]/30 pl-6 relative z-10 group-hover:border-[#e63946] transition-colors">
              <div className="absolute w-4 h-4 bg-[#e63946] rounded-full -left-[9px] top-0 border-4 border-[#0a0a0a] shadow-[0_0_10px_rgba(230,57,70,0.8)]"></div>
              <h4 className="text-lg font-bold text-white">Técnico Superior en ASIR</h4>
              <p className="text-[#e63946] text-xs font-black uppercase tracking-widest mb-3 mt-1">Actualmente cursando (1º Año)</p>
              <p className="text-zinc-400 text-sm leading-relaxed">Especialización en sistemas operativos, redes locales, bases de datos y lenguajes de marcas.</p>
            </div>
          </div>

          {/* Bento Item 3: Stack (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 p-10 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-[#e63946]/50 hover:shadow-[0_0_30px_rgba(230,57,70,0.15)] transition-all duration-300">
            <h3 className="text-2xl font-black uppercase italic text-[#e63946] mb-8 relative z-10">Stack Tecnológico</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
              {[
                { icon: FaLinux, name: "Linux", desc: "Debian, Ubuntu" },
                { icon: FaWindows, name: "Win Server", desc: "AD, GPO" },
                { icon: FaNetworkWired, name: "Redes Cisco", desc: "Routing, VLANs" },
                { icon: FaServer, name: "Virtualización", desc: "Proxmox, VMware" },
                { icon: FaDatabase, name: "Bases de Datos", desc: "SQL, Supabase" },
                { icon: FaReact, name: "Frontend", desc: "React, Tailwind" }
              ].map((tech, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-zinc-950/50 backdrop-blur-sm p-4 rounded-2xl border border-zinc-800/50 hover:border-[#e63946] hover:bg-[#e63946]/5 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(230,57,70,0.2)] transition-all cursor-default">
                  <tech.icon className="text-3xl text-[#e63946]" />
                  <div>
                    <p className="font-bold text-xs uppercase text-white">{tech.name}</p>
                    <p className="text-xs text-zinc-500 font-mono mt-1">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Item 4: Stats (Ocupa 1 columna) */}
          <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 p-10 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-[#e63946]/50 hover:shadow-[0_0_30px_rgba(230,57,70,0.15)] transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-black uppercase italic text-[#e63946] mb-8 relative z-10">Métricas</h3>
            
            <div className="grid grid-cols-2 gap-4 w-full relative z-10 grow">
              {[
                { val: "+15", label: "VMs Desplegadas" },
                { val: "+100", label: "Horas Homelab" },
                { val: "+4", label: "Topologías Red" },
                { val: "+2", label: "S.O. Dominados" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800/50 p-4 rounded-2xl text-center flex flex-col justify-center items-center group-hover:border-zinc-700 transition-all">
                  <span className="text-4xl font-black text-white mb-2">{stat.val}</span>
                  <span className="text-[10px] text-[#e63946] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SobreMi;