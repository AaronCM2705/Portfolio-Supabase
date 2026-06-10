import { supabase } from '../supabase/supabaseClient';

export interface Curso {
  id: number;
  nombre: string;
  institucion: string;
  descripcion: string;
  fecha: string;
  certificado_url: string;
  imagen_logo: string;
}

export const obtenerCursos = async (): Promise<{ data: Curso[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('Cursos')
      .select('*')
      .order('id', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obteniendo cursos desde Supabase:', error);
    return { data: null, error: error as Error };
  }
};

// Crear un nuevo curso
export const crearCurso = async (curso: Omit<Curso, 'id'>): Promise<{ data: Curso[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Cursos').insert([curso]).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creando curso:', error);
    return { data: null, error: error as Error };
  }
};

// Actualizar un curso existente
export const actualizarCurso = async (id: number, curso: Partial<Omit<Curso, 'id'>>): Promise<{ data: Curso[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.from('Cursos').update(curso).eq('id', id).select();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizando curso:', error);
    return { data: null, error: error as Error };
  }
};

// Eliminar un curso
export const eliminarCurso = async (id: number): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.from('Cursos').delete().eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error eliminando curso:', error);
    return { error: error as Error };
  }
};
