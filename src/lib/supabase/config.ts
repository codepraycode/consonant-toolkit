import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { DEFAULT_SUPERBASE_URL, DEFAULT_SUPERBASE_API_KEY } from '../../../env.config.json'

let { SUPERBASE_URL, SUPERBASE_API_KEY } =  process.env;

if (!SUPERBASE_URL) {
    console.warn("SUPABASE_URL not provided")
    SUPERBASE_URL = DEFAULT_SUPERBASE_URL;
}

if (!SUPERBASE_API_KEY) {
    console.warn("SUPERBASE_API_KEY not provided")
    SUPERBASE_API_KEY = DEFAULT_SUPERBASE_API_KEY
}

const supabase = ((): SupabaseClient =>{

    if (!global._supabaseInstance) {
        global._supabaseInstance = createClient(SUPERBASE_URL, SUPERBASE_API_KEY);
    }

    return global._supabaseInstance;
})();


export default supabase;