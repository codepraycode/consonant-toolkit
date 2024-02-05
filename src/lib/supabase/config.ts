import { SupabaseClient, createClient } from "@supabase/supabase-js";
import config from '../../config.json';

const { url, apiKey } = config.supabase;


const supabase = ((): SupabaseClient =>{


    if (!global._supabaseInstance) {
        global._supabaseInstance = createClient(url, apiKey);
    }

    return global._supabaseInstance;
})();


export default supabase;