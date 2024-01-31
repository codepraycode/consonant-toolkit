
export {};


export interface IAPI {
    getAppVersion: ()=>Promise<string>,
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