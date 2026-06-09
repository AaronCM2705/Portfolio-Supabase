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
