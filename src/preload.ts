// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

window.addEventListener('DOMContentLoaded', ()=>{
    const replaceText = (selector:string, text:string)=>{
        const element = document.getElementById(selector);

        if (element) element.innerText = text;
    }


    for (const dep of ['chrome', 'node', 'electron']) {
        replaceText(`${dep}--version`, process.versions[dep]);
    }
})