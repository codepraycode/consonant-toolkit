import {handleDatabaseReponse} from "./handlers";
import { SupaBaseData } from './types';
import supabase from './config';
import config from '../../config.json';


/**
 * Inserts new data into database
 * @param	object 	new_data	Row data
 * @return  FacultyModel	   Instance with newly created data
 */
async function insertDbRow<T=SupaBaseData>(doc: T): Promise<T> {

    const { data, error } =  handleDatabaseReponse(
        await supabase
        .from(config.tables.materials)
        .upsert(doc)
        .select()
    );
    

    if (error) throw error;

    return data[0] as T;
}


export {
    insertDbRow
}