import config from '../../config.json';
import supabase from './config';
import { StorageAccessConfig, StorageUploadConfig,
    
    SuperBaseStorageReponse } from './types';
import { handleStorageResponse } from './handlers';




const storage = config.bucketName;



class BucketManager {

    async getFileLink(config:StorageAccessConfig) {
        const {data} =  supabase.storage
            .from(storage).getPublicUrl(config.path, config.options)
        return data.publicUrl
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async upload(config: StorageUploadConfig): Promise<any> {

        let req;
        try {
            req = await supabase.storage.from(storage).upload(
                config.path,
                config.asset,
                config.fileOptions || {}
            ) as SuperBaseStorageReponse
        } catch(err){
            return {
                data: null,
                error: {
                    code: 'UPLOAD ERROR',
                    message: "Could process this file to upload, processing " + config.path,
                }
            }
        }

        const {data, error} = handleStorageResponse(req);

        if (!data) return {data, error};


        // let access:string;

        const access = await this.getFileLink({
            path: data.path,
            options: {
                download: false
            }
        });

        const download = `${access}?download=`;


        data.access = access;
        data.download = download;

        return {
            data,
            error
        }
    }
}


const bucket = new BucketManager();

export default bucket;