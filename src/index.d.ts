import { IDirFile, IDirectoryInfo } from "./utils/types";

export {};


export interface IAPI {
    getAppVersion: ()=>Promise<string>,
    
    getStaticPath: ()=>Promise<string>,

    selectDirectory: ()=>Promise<string>,

    isDirReadable: (dir:string)=>Promise<boolean>,
    getDirdetails: (dir:string)=>Promise<[IDirectoryInfo, IDirFile[]]>,
    openPath: (path:string)=>Promise<void>,

    envVersion: {
        chrome: string,
        node: string,
        electron: string,
    },
}


declare global {
    interface Window {
        api: IAPI
    }
}