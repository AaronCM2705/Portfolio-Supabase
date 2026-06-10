import { supabase } from '../supabase/supabaseClient';

// Definimos una "Interfaz" en TypeScript para obligar a que todos los proyectos
// tengan exactamente esta estructura de datos. Así evitamos errores.
export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  link: string;
}

// Función ASÍNCRONA que se conecta a Supabase para obtener el listado de proyectos.
export const obtenerProyectos = async (): Promise<{ data: Proyecto[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Proyectos').select('*').order('id', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obteniendo proyectos desde Supabase:', error);
    return { data: null, error: error as Error };
  }
};

// Crear un nuevo proyecto
export const crearProyecto = async (proyecto: Omit<Proyecto, 'id'>): Promise<{ data: Proyecto[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Proyectos').insert([proyecto]).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creando proyecto:', error);
    return { data: null, error: error as Error };
  }
};

// Actualizar un proyecto existente
export const actualizarProyecto = async (id: number, proyecto: Partial<Omit<Proyecto, 'id'>>): Promise<{ data: Proyecto[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Proyectos').update(proyecto).eq('id', id).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizando proyecto:', error);
    return { data: null, error: error as Error };
  }
};

// Eliminar un proyecto
export const eliminarProyecto = async (id: number): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.from('Proyectos').delete().eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error eliminando proyecto:', error);
    return { error: error as Error };
  }
};
