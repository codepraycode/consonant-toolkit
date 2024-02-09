import { SupabaseClient, createClient } from "@supabase/supabase-js";


const { SUPERBASE_URL, SUPERBASE_API_KEY } =  process.env;

const supabase = ((): SupabaseClient =>{

    if (!global._supabaseInstance) {
        global._supabaseInstance = createClient(SUPERBASE_URL, SUPERBASE_API_KEY);
    }

    return global._supabaseInstance;
})();


export default supabase;