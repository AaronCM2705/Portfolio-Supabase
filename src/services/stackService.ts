import { supabase } from '../supabase/supabaseClient';

export interface StackItem {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  created_at?: string;
}

export const obtenerStack = async (): Promise<{ data: StackItem[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Stack').select('*').order('id', { ascending: true });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obteniendo stack desde Supabase:', error);
    return { data: null, error: error as Error };
  }
};

export const crearStack = async (item: Omit<StackItem, 'id' | 'created_at'>): Promise<{ data: StackItem[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Stack').insert([item]).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creando item del stack:', error);
    return { data: null, error: error as Error };
  }
};

export const actualizarStack = async (id: number, item: Partial<Omit<StackItem, 'id' | 'created_at'>>): Promise<{ data: StackItem[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Stack').update(item).eq('id', id).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizando item del stack:', error);
    return { data: null, error: error as Error };
  }
};

export const eliminarStack = async (id: number): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.from('Stack').delete().eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error eliminando item del stack:', error);
    return { error: error as Error };
  }
};
