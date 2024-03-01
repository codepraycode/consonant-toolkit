import { SupaBaseStorageErrorTypes,
    SuperBaseStorageReponse, SupaBaseDatabaseReponse, 
    SupaBaseData} from "./types";

function handleStorageResponse({data, error}:SuperBaseStorageReponse) {
    const _parsed_error = {code: '', message:''};

    if (error) {
        if (error.stack?.includes("Bucket not found")) {
            _parsed_error.code = SupaBaseStorageErrorTypes.BUCKETNOTFOUND
            _parsed_error.message = "Bucket does not exist"
        }
        else if (error.message === 'Payload too large'){
            _parsed_error.code = SupaBaseStorageErrorTypes.FILETOOLARGE
            _parsed_error.message = "File must not be more than 25mb"
        }
        else if (error.error === 'Duplicate'){
            _parsed_error.code = SupaBaseStorageErrorTypes.FILEALREADYEXIST
            _parsed_error.message = "File already exist"
        }
    }


    return {data, error: error && {..._parsed_error, ...error}}
}


function handleDatabaseReponse<T= SupaBaseData[]>({data, error}: SupaBaseDatabaseReponse<T>) {
    const _parsed_error = {code: '', message:''};


    // Error object seems nice already
    if (error) {
        console.error("DATABASE ERROR OBJECT::", error)
    }


    return {data: data as T, error: error && {..._parsed_error, ...error}}
}

export {handleStorageResponse, handleDatabaseReponse}