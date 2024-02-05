import { SupabaseClient } from "@supabase/supabase-js";
import { IDirFile, IDirectoryInfo } from "./utils/types";
import { MaterialTbRow } from "./lib/supabase/types";

export {};


export interface IAPI {
    getAppVersion: ()=>Promise<string>,
    
    getStaticPath: ()=>Promise<string>,

    selectDirectory: ()=>Promise<string>,

    isDirReadable: (dir:string)=>Promise<boolean>,
    getDirdetails: (dir:string)=>Promise<[IDirectoryInfo, IDirFile[]]>,
    openPath: (path:string)=>Promise<void>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendFile: (params:FileSendParams)=>Promise<MaterialTbRow>,

    envVersion: {
        chrome: string,
        node: string,
        electron: string,
    },
}


declare global {
    // eslint-disable-next-line no-var
    var _supabaseInstance: SupabaseClient;

    interface Window {
        api: IAPI,
    }
}
