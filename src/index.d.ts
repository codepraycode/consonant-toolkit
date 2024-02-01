
export {};


export interface IAPI {
    getAppVersion: ()=>Promise<string>,
    getStaticPath: ()=>Promise<string>,
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