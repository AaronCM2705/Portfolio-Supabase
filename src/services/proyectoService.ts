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
    // Aquí ejecutamos la consulta equivalente en SQL a: SELECT * FROM Proyectos;
    // await hace que el código "espere" a que el servidor de Supabase responda.
    const { data, error } = await supabase.from('Proyectos').select('*');
    if (error) throw error;
    
    // Si todo va bien, devolvemos los datos
    return { data, error: null };
  } catch (error) {
    // Si hay un fallo de red o la tabla no existe, capturamos el error
    console.error('Error obteniendo proyectos desde Supabase:', error);
    return { data: null, error: error as Error };
  }
};
