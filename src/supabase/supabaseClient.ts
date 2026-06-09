import { createClient } from '@supabase/supabase-js';

// Importamos las variables de entorno de Vite de forma segura (las que empiezan por VITE_)
// Esto evita que nuestras contraseñas se suban directamente a GitHub.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializamos y exportamos el "cliente" de Supabase.
// Este objeto 'supabase' es el que importaremos en el resto de la aplicación
// para hacer consultas a la base de datos (SELECT, INSERT, DELETE, etc.)
export const supabase = createClient(supabaseUrl, supabaseKey);