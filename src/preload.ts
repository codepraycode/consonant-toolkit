// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

window.addEventListener('DOMContentLoaded', ()=>{
    const replaceText = (selector:string, text:string)=>{
        const element = document.getElementById(selector);

        if (element) element.innerText = text;
    }


    for (const dep of ['chrome', 'node', 'electron']) {
        replaceText(`${dep}--version`, process.versions[dep]);
    }
})


contextBridge.exposeInMainWorld('api', {

    envVersion: {
        chrome: process.versions['chrome'],
        node: process.versions['node'],
        electron: process.versions['electron'],
    },

    getAppVersion: async () => {
        const response = await ipcRenderer.invoke("app:version");

        return response;
    },

    getStaticPath: async () => {
        const response = await ipcRenderer.invoke("static:path");

        return response;
    },

    selectDirectory: async () => {
        const response = await ipcRenderer.invoke("dialog:openDirectory");

        return response && response[0];
    }
});