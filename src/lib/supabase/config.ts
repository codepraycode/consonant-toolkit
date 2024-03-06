import { SupabaseClient, createClient } from "@supabase/supabase-js";


const { SUPERBASE_URL, SUPERBASE_API_KEY } =  process.env;

if (!SUPERBASE_URL) {
    throw new Error("SUPABASE_URL not provided")
}

if (!SUPERBASE_API_KEY) {
    throw new Error("SUPERBASE_API_KEY not provided")
}

const supabase = ((): SupabaseClient =>{

    if (!global._supabaseInstance) {
        global._supabaseInstance = createClient(SUPERBASE_URL, SUPERBASE_API_KEY);
    }

    return global._supabaseInstance;
})();


export default supabase;