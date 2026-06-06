import { supabase } from '../supabase/supabaseClient';

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  link: string;
}

export const obtenerProyectos = async (): Promise<{ data: Proyecto[] | null; error: any }> => {
  try {
    const { data, error } = await supabase.from('Proyectos').select('*');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obteniendo proyectos desde Supabase:', error);
    return { data: null, error };
  }
};
