
export {};


export interface IAPI {
    getAppVersion: ()=>Promise<string>,
    
    getStaticPath: ()=>Promise<string>,

    selectDirectory: ()=>Promise<string>,

    isDirReadable: (dir:string)=>Promise<boolean>,

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