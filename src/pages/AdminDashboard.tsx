import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaEnvelopeOpenText, FaTrash, FaEdit, FaPlus, FaBook, FaProjectDiagram, FaTimes, FaLayerGroup, FaServer } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Servicios
import { obtenerCursos, crearCurso, actualizarCurso, eliminarCurso, type Curso } from '../services/cursoService';
import { obtenerProyectos, crearProyecto, actualizarProyecto, eliminarProyecto, type Proyecto } from '../services/proyectoService';
import { obtenerStack, crearStack, actualizarStack, eliminarStack, type StackItem } from '../services/stackService';
import { obtenerServicios, crearServicio, actualizarServicio, eliminarServicio, type Servicio } from '../services/servicioService';

interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'mensajes' | 'cursos' | 'proyectos' | 'stack' | 'servicios'>('mensajes');

  // Estados
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loadingMensajes, setLoadingMensajes] = useState(true);

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [isCursoModalOpen, setIsCursoModalOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Partial<Curso> | null>(null);

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loadingProyectos, setLoadingProyectos] = useState(true);
  const [isProyectoModalOpen, setIsProyectoModalOpen] = useState(false);
  const [editingProyecto, setEditingProyecto] = useState<Partial<Proyecto> | null>(null);

  const [stack, setStack] = useState<StackItem[]>([]);
  const [loadingStack, setLoadingStack] = useState(true);
  const [isStackModalOpen, setIsStackModalOpen] = useState(false);
  const [editingStack, setEditingStack] = useState<Partial<StackItem> | null>(null);

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [isServicioModalOpen, setIsServicioModalOpen] = useState(false);
  const [editingServicio, setEditingServicio] = useState<Partial<Servicio> | null>(null);

  // Funciones de carga
  const fetchMensajes = async () => {
    const { data, error } = await supabase.from('Mensaje_Contacto').select('*').order('created_at', { ascending: false });
    if (!error && data) setMensajes(data);
    setLoadingMensajes(false);
  };

  const fetchCursosData = async () => {
    const { data } = await obtenerCursos();
    if (data) setCursos(data);
    setLoadingCursos(false);
  };

  const fetchProyectosData = async () => {
    const { data } = await obtenerProyectos();
    if (data) setProyectos(data);
    setLoadingProyectos(false);
  };

  const fetchStackData = async () => {
    const { data } = await obtenerStack();
    if (data) setStack(data);
    setLoadingStack(false);
  };

  const fetchServiciosData = async () => {
    const { data } = await obtenerServicios();
    if (data) setServicios(data);
    setLoadingServicios(false);
  };

  useEffect(() => {
    const loadAllData = async () => {
      await fetchMensajes();
      await fetchCursosData();
      await fetchProyectosData();
      await fetchStackData();
      await fetchServiciosData();
    };
    loadAllData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  // --------------------------------------------------
  // CRUD MENSAJES
  // --------------------------------------------------
  const handleDeleteMensaje = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      const toastId = toast.loading('Eliminando mensaje...');
      const { error } = await supabase.from('Mensaje_Contacto').delete().eq('id', id);
      if (!error) {
        setMensajes(mensajes.filter(m => m.id !== id));
        toast.success('Mensaje eliminado', { id: toastId });
      } else {
        toast.error('Error al eliminar', { id: toastId });
      }
    }
  };

  // --------------------------------------------------
  // CRUD CURSOS
  // --------------------------------------------------
  const openCursoModal = (curso?: Curso) => {
    if (curso) {
      setEditingCurso(curso);
    } else {
      setEditingCurso({ nombre: '', institucion: '', descripcion: '', fecha: '', certificado_url: '', imagen_logo: '' });
    }
    setIsCursoModalOpen(true);
  };

  const handleSaveCurso = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCurso) return;
    
    const toastId = toast.loading('Guardando curso...');
    
    try {
      if (editingCurso.id) {
        // Actualizar
        const { error } = await actualizarCurso(editingCurso.id, editingCurso as Omit<Curso, 'id'>);
        if (error) throw error;
        toast.success('Curso actualizado', { id: toastId });
      } else {
        // Crear
        const { error } = await crearCurso(editingCurso as Omit<Curso, 'id'>);
        if (error) throw error;
        toast.success('Curso creado', { id: toastId });
      }
      setIsCursoModalOpen(false);
      fetchCursosData();
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar el curso', { id: toastId });
    }
  };

  const handleDeleteCurso = async (id: number) => {
    if (window.confirm('¿Eliminar este curso permanentemente?')) {
      const toastId = toast.loading('Eliminando...');
      const { error } = await eliminarCurso(id);
      if (!error) {
        toast.success('Eliminado', { id: toastId });
        fetchCursosData();
      } else {
        toast.error('Error', { id: toastId });
      }
    }
  };

  // --------------------------------------------------
  // CRUD PROYECTOS
  // --------------------------------------------------
  const openProyectoModal = (proyecto?: Proyecto) => {
    if (proyecto) {
      setEditingProyecto(proyecto);
    } else {
      setEditingProyecto({ nombre: '', descripcion: '', imagen_url: '', link: '' });
    }
    setIsProyectoModalOpen(true);
  };

  const handleSaveProyecto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProyecto) return;
    
    const toastId = toast.loading('Guardando proyecto...');
    
    try {
      if (editingProyecto.id) {
        // Actualizar
        const { error } = await actualizarProyecto(editingProyecto.id, editingProyecto as Omit<Proyecto, 'id'>);
        if (error) throw error;
        toast.success('Proyecto actualizado', { id: toastId });
      } else {
        // Crear
        const { error } = await crearProyecto(editingProyecto as Omit<Proyecto, 'id'>);
        if (error) throw error;
        toast.success('Proyecto creado', { id: toastId });
      }
      setIsProyectoModalOpen(false);
      fetchProyectosData();
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar', { id: toastId });
    }
  };

  const handleDeleteProyecto = async (id: number) => {
    if (window.confirm('¿Eliminar este proyecto permanentemente?')) {
      const toastId = toast.loading('Eliminando...');
      const { error } = await eliminarProyecto(id);
      if (!error) {
        toast.success('Eliminado', { id: toastId });
        fetchProyectosData();
      } else {
        toast.error('Error', { id: toastId });
      }
    }
  };

  // --------------------------------------------------
  // CRUD STACK
  // --------------------------------------------------
  const openStackModal = (item?: StackItem) => {
    if (item) {
      setEditingStack(item);
    } else {
      setEditingStack({ nombre: '', descripcion: '', icono: '' });
    }
    setIsStackModalOpen(true);
  };

  const handleSaveStack = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingStack) return;
    
    const toastId = toast.loading('Guardando tecnología...');
    
    try {
      if (editingStack.id) {
        // Actualizar
        const { error } = await actualizarStack(editingStack.id, editingStack as Omit<StackItem, 'id' | 'created_at'>);
        if (error) throw error;
        toast.success('Tecnología actualizada', { id: toastId });
      } else {
        // Crear
        const { error } = await crearStack(editingStack as Omit<StackItem, 'id' | 'created_at'>);
        if (error) throw error;
        toast.success('Tecnología añadida', { id: toastId });
      }
      setIsStackModalOpen(false);
      fetchStackData();
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar', { id: toastId });
    }
  };

  const handleDeleteStack = async (id: number) => {
    if (window.confirm('¿Eliminar esta tecnología permanentemente?')) {
      const toastId = toast.loading('Eliminando...');
      const { error } = await eliminarStack(id);
      if (!error) {
        toast.success('Eliminado', { id: toastId });
        fetchStackData();
      } else {
        toast.error('Error', { id: toastId });
      }
    }
  };

  // --------------------------------------------------
  // CRUD SERVICIOS
  // --------------------------------------------------
  const openServicioModal = (servicio?: Servicio) => {
    if (servicio) {
      setEditingServicio(servicio);
    } else {
      setEditingServicio({ nombre: '', descripcion: '', detalles: '', imagen_url: '' });
    }
    setIsServicioModalOpen(true);
  };

  const handleSaveServicio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingServicio) return;
    
    const toastId = toast.loading('Guardando servicio...');
    
    try {
      if (editingServicio.id) {
        // Actualizar
        const { error } = await actualizarServicio(editingServicio.id, editingServicio as Omit<Servicio, 'id'>);
        if (error) throw error;
        toast.success('Servicio actualizado', { id: toastId });
      } else {
        // Crear
        const { error } = await crearServicio(editingServicio as Omit<Servicio, 'id'>);
        if (error) throw error;
        toast.success('Servicio creado', { id: toastId });
      }
      setIsServicioModalOpen(false);
      fetchServiciosData();
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar', { id: toastId });
    }
  };

  const handleDeleteServicio = async (id: number) => {
    if (window.confirm('¿Eliminar este servicio permanentemente?')) {
      const toastId = toast.loading('Eliminando...');
      const { error } = await eliminarServicio(id);
      if (!error) {
        toast.success('Eliminado', { id: toastId });
        fetchServiciosData();
      } else {
        toast.error('Error', { id: toastId });
      }
    }
  };

  // Utils
  const formatearFecha = (fechaISO: string) => {
    return new Date(fechaISO).toLocaleDateString('es-ES', { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con logout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic text-[#e63946] mb-2">
              Panel de Control
            </h1>
            <p className="text-zinc-400 font-mono text-sm">Sistema de Gestión de Contenidos (CMS)</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-[#e63946] hover:border-[#e63946] px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('mensajes')}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'mensajes' ? 'bg-[#e63946] text-white shadow-[0_0_20px_rgba(230,57,70,0.4)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
          >
            <FaEnvelopeOpenText /> Mensajes
          </button>
          <button 
            onClick={() => setActiveTab('cursos')}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'cursos' ? 'bg-[#e63946] text-white shadow-[0_0_20px_rgba(230,57,70,0.4)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
          >
            <FaBook /> Cursos
          </button>
          <button 
            onClick={() => setActiveTab('proyectos')}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'proyectos' ? 'bg-[#e63946] text-white shadow-[0_0_20px_rgba(230,57,70,0.4)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
          >
            <FaProjectDiagram /> Proyectos
          </button>
          <button 
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'stack' ? 'bg-[#e63946] text-white shadow-[0_0_20px_rgba(230,57,70,0.4)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
          >
            <FaLayerGroup /> Stack Tecnológico
          </button>
          <button 
            onClick={() => setActiveTab('servicios')}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'servicios' ? 'bg-[#e63946] text-white shadow-[0_0_20px_rgba(230,57,70,0.4)]' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}
          >
            <FaServer /> Servicios
          </button>
        </div>

        {/* CONTENIDO DE LAS TABS */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          
          {/* TAB MENSAJES */}
          {activeTab === 'mensajes' && (
            <>
              <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center gap-4">
                <FaEnvelopeOpenText className="text-[#e63946] text-xl" />
                <h2 className="text-xl font-bold uppercase tracking-widest">Bandeja de Entrada ({mensajes.length})</h2>
              </div>
              
              {loadingMensajes ? (
                <div className="p-20 text-center text-zinc-500 font-black animate-pulse">Cargando base de datos...</div>
              ) : mensajes.length === 0 ? (
                <div className="p-20 text-center text-zinc-500 font-black">No tienes mensajes en la bandeja de entrada.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 text-xs uppercase tracking-widest text-zinc-500 font-black">
                        <th className="p-5 border-b border-zinc-800">Fecha</th>
                        <th className="p-5 border-b border-zinc-800">Contacto</th>
                        <th className="p-5 border-b border-zinc-800 w-1/2">Contenido</th>
                        <th className="p-5 border-b border-zinc-800 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mensajes.map((msg) => (
                        <tr key={msg.id} className="hover:bg-zinc-800/30 transition-colors group">
                          <td className="p-5 border-b border-zinc-800/50 align-top text-xs text-zinc-400 whitespace-nowrap">{formatearFecha(msg.created_at)}</td>
                          <td className="p-5 border-b border-zinc-800/50 align-top">
                            <p className="font-bold text-[#e63946] uppercase text-sm mb-1">{msg.nombre}</p>
                            <a href={`mailto:${msg.email}`} className="text-zinc-400 text-xs hover:text-white">{msg.email}</a>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50">
                            <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-sans font-medium">{msg.mensaje}</pre>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50 align-top text-center">
                            <button onClick={() => handleDeleteMensaje(msg.id)} className="text-zinc-600 hover:text-red-500 transition-colors p-2"><FaTrash /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TAB CURSOS */}
          {activeTab === 'cursos' && (
            <>
              <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <FaBook className="text-[#e63946] text-xl" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Gestión de Cursos ({cursos.length})</h2>
                </div>
                <button onClick={() => openCursoModal()} className="bg-[#e63946] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all">
                  <FaPlus /> Nuevo Curso
                </button>
              </div>
              
              {loadingCursos ? (
                <div className="p-20 text-center text-zinc-500 font-black animate-pulse">Cargando cursos...</div>
              ) : cursos.length === 0 ? (
                <div className="p-20 text-center text-zinc-500 font-black">No hay cursos registrados.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 text-xs uppercase tracking-widest text-zinc-500 font-black">
                        <th className="p-5 border-b border-zinc-800">Curso</th>
                        <th className="p-5 border-b border-zinc-800">Institución</th>
                        <th className="p-5 border-b border-zinc-800">Fecha</th>
                        <th className="p-5 border-b border-zinc-800 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cursos.map((curso) => (
                        <tr key={curso.id} className="hover:bg-zinc-800/30 transition-colors group">
                          <td className="p-5 border-b border-zinc-800/50 align-middle">
                            <p className="font-bold text-white text-sm">{curso.nombre}</p>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-sm text-zinc-400">{curso.institucion}</td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-xs text-zinc-500">{curso.fecha}</td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => openCursoModal(curso)} className="text-zinc-400 hover:text-white transition-colors p-2"><FaEdit /></button>
                              <button onClick={() => handleDeleteCurso(curso.id)} className="text-zinc-600 hover:text-red-500 transition-colors p-2"><FaTrash /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TAB PROYECTOS */}
          {activeTab === 'proyectos' && (
            <>
              <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <FaProjectDiagram className="text-[#e63946] text-xl" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Gestión de Proyectos ({proyectos.length})</h2>
                </div>
                <button onClick={() => openProyectoModal()} className="bg-[#e63946] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all">
                  <FaPlus /> Nuevo Proyecto
                </button>
              </div>
              
              {loadingProyectos ? (
                <div className="p-20 text-center text-zinc-500 font-black animate-pulse">Cargando proyectos...</div>
              ) : proyectos.length === 0 ? (
                <div className="p-20 text-center text-zinc-500 font-black">No hay proyectos registrados.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 text-xs uppercase tracking-widest text-zinc-500 font-black">
                        <th className="p-5 border-b border-zinc-800">Proyecto</th>
                        <th className="p-5 border-b border-zinc-800 w-1/2">Descripción</th>
                        <th className="p-5 border-b border-zinc-800 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectos.map((proy) => (
                        <tr key={proy.id} className="hover:bg-zinc-800/30 transition-colors group">
                          <td className="p-5 border-b border-zinc-800/50 align-middle">
                            <p className="font-bold text-white text-sm">{proy.nombre}</p>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-sm text-zinc-400 truncate max-w-xs">{proy.descripcion}</td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => openProyectoModal(proy)} className="text-zinc-400 hover:text-white transition-colors p-2"><FaEdit /></button>
                              <button onClick={() => handleDeleteProyecto(proy.id)} className="text-zinc-600 hover:text-red-500 transition-colors p-2"><FaTrash /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TAB STACK */}
          {activeTab === 'stack' && (
            <>
              <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <FaLayerGroup className="text-[#e63946] text-xl" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Gestión del Stack Tecnológico ({stack.length})</h2>
                </div>
                <button onClick={() => openStackModal()} className="bg-[#e63946] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all">
                  <FaPlus /> Añadir Tecnología
                </button>
              </div>
              
              {loadingStack ? (
                <div className="p-20 text-center text-zinc-500 font-black animate-pulse">Cargando tecnologías...</div>
              ) : stack.length === 0 ? (
                <div className="p-20 text-center text-zinc-500 font-black">No hay tecnologías registradas.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 text-xs uppercase tracking-widest text-zinc-500 font-black">
                        <th className="p-5 border-b border-zinc-800">Tecnología</th>
                        <th className="p-5 border-b border-zinc-800">Descripción / Detalles</th>
                        <th className="p-5 border-b border-zinc-800">Icono (Clave)</th>
                        <th className="p-5 border-b border-zinc-800 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stack.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors group">
                          <td className="p-5 border-b border-zinc-800/50 align-middle">
                            <p className="font-bold text-white text-sm">{item.nombre}</p>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-sm text-zinc-400">{item.descripcion}</td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-sm text-zinc-400">
                            <span className="font-mono bg-zinc-950/50 p-1 px-2 rounded inline-block">{item.icono}</span>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => openStackModal(item)} className="text-zinc-400 hover:text-white transition-colors p-2"><FaEdit /></button>
                              <button onClick={() => handleDeleteStack(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors p-2"><FaTrash /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TAB SERVICIOS */}
          {activeTab === 'servicios' && (
            <>
              <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <FaServer className="text-[#e63946] text-xl" />
                  <h2 className="text-xl font-bold uppercase tracking-widest">Gestión de Servicios ({servicios.length})</h2>
                </div>
                <button onClick={() => openServicioModal()} className="bg-[#e63946] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all">
                  <FaPlus /> Añadir Servicio
                </button>
              </div>
              
              {loadingServicios ? (
                <div className="p-20 text-center text-zinc-500 font-black animate-pulse">Cargando servicios...</div>
              ) : servicios.length === 0 ? (
                <div className="p-20 text-center text-zinc-500 font-black">No hay servicios registrados.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 text-xs uppercase tracking-widest text-zinc-500 font-black">
                        <th className="p-5 border-b border-zinc-800">Servicio</th>
                        <th className="p-5 border-b border-zinc-800">Descripción Corta</th>
                        <th className="p-5 border-b border-zinc-800 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicios.map((s) => (
                        <tr key={s.id} className="hover:bg-zinc-800/30 transition-colors group">
                          <td className="p-5 border-b border-zinc-800/50 align-middle">
                            <p className="font-bold text-white text-sm">{s.nombre}</p>
                          </td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-sm text-zinc-400 truncate max-w-xs">{s.descripcion}</td>
                          <td className="p-5 border-b border-zinc-800/50 align-middle text-center">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => openServicioModal(s)} className="text-zinc-400 hover:text-white transition-colors p-2"><FaEdit /></button>
                              <button onClick={() => handleDeleteServicio(s.id)} className="text-zinc-600 hover:text-red-500 transition-colors p-2"><FaTrash /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* MODAL CURSO */}
      {isCursoModalOpen && editingCurso && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsCursoModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><FaTimes className="text-xl" /></button>
            <h3 className="text-2xl font-black uppercase italic mb-6">{editingCurso.id ? 'Editar Curso' : 'Añadir Nuevo Curso'}</h3>
            
            <form onSubmit={handleSaveCurso} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Nombre del Curso</label>
                <input required type="text" value={editingCurso.nombre || ''} onChange={e => setEditingCurso({...editingCurso, nombre: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Institución (Ej: IBM, CISCO)</label>
                  <input required type="text" value={editingCurso.institucion || ''} onChange={e => setEditingCurso({...editingCurso, institucion: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Fecha (Ej: Mayo 2024)</label>
                  <input required type="text" value={editingCurso.fecha || ''} onChange={e => setEditingCurso({...editingCurso, fecha: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Descripción / Habilidades Aprendidas</label>
                <textarea required value={editingCurso.descripcion || ''} onChange={e => setEditingCurso({...editingCurso, descripcion: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white h-24 focus:outline-none focus:border-[#e63946]"></textarea>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">URL de Credencial / Certificado</label>
                <input required type="url" value={editingCurso.certificado_url || ''} onChange={e => setEditingCurso({...editingCurso, certificado_url: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">URL Logo Institución (Opcional, pegar enlace de internet)</label>
                <input type="url" value={editingCurso.imagen_logo || ''} onChange={e => setEditingCurso({...editingCurso, imagen_logo: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsCursoModalOpen(false)} className="px-6 py-3 font-bold uppercase text-xs text-zinc-400 hover:text-white">Cancelar</button>
                <button type="submit" className="bg-[#e63946] hover:bg-white hover:text-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PROYECTO */}
      {isProyectoModalOpen && editingProyecto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsProyectoModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><FaTimes className="text-xl" /></button>
            <h3 className="text-2xl font-black uppercase italic mb-6">{editingProyecto.id ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}</h3>
            
            <form onSubmit={handleSaveProyecto} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Nombre del Proyecto</label>
                <input required type="text" value={editingProyecto.nombre || ''} onChange={e => setEditingProyecto({...editingProyecto, nombre: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Descripción del Proyecto</label>
                <textarea required value={editingProyecto.descripcion || ''} onChange={e => setEditingProyecto({...editingProyecto, descripcion: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white h-24 focus:outline-none focus:border-[#e63946]"></textarea>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">URL del Repositorio (GitHub, etc)</label>
                <input required type="url" value={editingProyecto.link || ''} onChange={e => setEditingProyecto({...editingProyecto, link: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">URL Imagen de Portada (Pegar enlace de internet)</label>
                <input required type="url" value={editingProyecto.imagen_url || ''} onChange={e => setEditingProyecto({...editingProyecto, imagen_url: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsProyectoModalOpen(false)} className="px-6 py-3 font-bold uppercase text-xs text-zinc-400 hover:text-white">Cancelar</button>
                <button type="submit" className="bg-[#e63946] hover:bg-white hover:text-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL STACK */}
      {isStackModalOpen && editingStack && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsStackModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><FaTimes className="text-xl" /></button>
            <h3 className="text-2xl font-black uppercase italic mb-6">{editingStack.id ? 'Editar Tecnología' : 'Añadir Nueva Tecnología'}</h3>
            
            <form onSubmit={handleSaveStack} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Nombre (Ej: Linux)</label>
                <input required type="text" value={editingStack.nombre || ''} onChange={e => setEditingStack({...editingStack, nombre: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Descripción / Detalles (Ej: Debian, Ubuntu)</label>
                <input required type="text" value={editingStack.descripcion || ''} onChange={e => setEditingStack({...editingStack, descripcion: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Código del Icono (Ej: FaLinux, FaWindows, FaDatabase)</label>
                <input required type="text" value={editingStack.icono || ''} onChange={e => setEditingStack({...editingStack, icono: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-[#e63946]" placeholder="FaTerminal" />
                <p className="text-xs text-zinc-500 mt-2">Busca nombres de iconos en: <a href="https://react-icons.github.io/react-icons/icons/fa/" target="_blank" rel="noreferrer" className="text-[#e63946] hover:underline">FontAwesome React Icons</a></p>
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsStackModalOpen(false)} className="px-6 py-3 font-bold uppercase text-xs text-zinc-400 hover:text-white">Cancelar</button>
                <button type="submit" className="bg-[#e63946] hover:bg-white hover:text-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SERVICIOS */}
      {isServicioModalOpen && editingServicio && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsServicioModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><FaTimes className="text-xl" /></button>
            <h3 className="text-2xl font-black uppercase italic mb-6">{editingServicio.id ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}</h3>
            
            <form onSubmit={handleSaveServicio} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Nombre del Servicio</label>
                <input required type="text" value={editingServicio.nombre || ''} onChange={e => setEditingServicio({...editingServicio, nombre: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Descripción (Breve, para la tarjeta)</label>
                <textarea required value={editingServicio.descripcion || ''} onChange={e => setEditingServicio({...editingServicio, descripcion: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white h-20 focus:outline-none focus:border-[#e63946]"></textarea>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Detalles (Texto completo, soporta saltos de línea)</label>
                <textarea required value={editingServicio.detalles || ''} onChange={e => setEditingServicio({...editingServicio, detalles: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white h-40 focus:outline-none focus:border-[#e63946]"></textarea>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">URL Imagen de Portada</label>
                <input required type="url" value={editingServicio.imagen_url || ''} onChange={e => setEditingServicio({...editingServicio, imagen_url: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e63946]" />
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsServicioModalOpen(false)} className="px-6 py-3 font-bold uppercase text-xs text-zinc-400 hover:text-white">Cancelar</button>
                <button type="submit" className="bg-[#e63946] hover:bg-white hover:text-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default AdminDashboard;
