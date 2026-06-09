import { Link } from 'react-router-dom';
import { FaTerminal, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background glitch effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[#e63946]/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-2xl shadow-2xl relative z-10">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-900">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-zinc-600 text-xs font-mono font-bold tracking-widest uppercase">root@aaron-server:~</p>
        </div>

        <div className="space-y-6 font-mono">
          <div className="flex items-start gap-4">
            <FaTerminal className="text-[#e63946] mt-1 shrink-0" />
            <p className="text-[#e63946] text-xl md:text-2xl font-bold uppercase tracking-widest">
              Error 404: Conexión Perdida
            </p>
          </div>
          
          <div className="pl-8 space-y-2 text-zinc-400 text-sm md:text-base">
            <p className="typing-effect">&gt; Intentando resolver la ruta actual...</p>
            <p className="typing-effect" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>&gt; Buscando en los directorios del servidor...</p>
            <p className="text-red-500 font-bold typing-effect" style={{ animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>&gt; ERROR CRÍTICO: La página solicitada no existe o ha sido movida.</p>
          </div>

          <div className="pl-8 pt-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700 hover:border-[#e63946] hover:bg-[#e63946]/10 text-white px-6 py-3 rounded-lg text-sm font-black uppercase tracking-widest transition-all"
            >
              <FaHome /> Reiniciar Conexión (Inicio)
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(40, end);
        }
        @keyframes typing {
          from { width: 0; opacity: 1; }
          to { width: 100%; opacity: 1; }
        }
      `}} />
    </section>
  );
};

export default NotFound;
