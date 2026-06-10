import { supabase } from '../supabase/supabaseClient';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  detalles: string;
  imagen_url: string;
}

export const obtenerServicios = async (): Promise<{ data: Servicio[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Servicios').select('*').order('id', { ascending: true });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obteniendo servicios:', error);
    return { data: null, error: error as Error };
  }
};

export const crearServicio = async (servicio: Omit<Servicio, 'id'>): Promise<{ data: Servicio[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Servicios').insert([servicio]).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creando servicio:', error);
    return { data: null, error: error as Error };
  }
};

export const actualizarServicio = async (id: number, servicio: Partial<Omit<Servicio, 'id'>>): Promise<{ data: Servicio[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Servicios').update(servicio).eq('id', id).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizando servicio:', error);
    return { data: null, error: error as Error };
  }
};

export const eliminarServicio = async (id: number): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.from('Servicios').delete().eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error eliminando servicio:', error);
    return { error: error as Error };
  }
};
