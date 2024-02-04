import { action, autorun, computed, makeObservable, observable } from "mobx";
// import { wait } from "../utils/wait";
import { FileByCategory, FileCategory, IDirectoryInfo, MaterialDetail } from "../utils/types";
import { processFiles } from "../utils/filesUtils";





class FileStore {
    ready = false;
    working_dir:string | null = null;
    error: string | null = null;


    directoryInfo:IDirectoryInfo | null = null;
    filelogs:MaterialDetail[] | null = null;

    constructor() {
        
        makeObservable(this, {
            ready: observable,
            working_dir: observable,
            error: observable,
            directoryInfo: observable,
            filelogs: observable,

            updateReady: action,
            updateError: action,
            analyzeDirectory: action,
            resetState: action,
            updateDirectoryInfo: action,
            updateFileLogs: action,

            validFiles: computed,
            fixFiles: computed,
            invalidFiles: computed


        });

        autorun(()=>{
            if (this.working_dir && !this.ready) {
                this.analyzeDirectory();
            }

        })


        autorun(()=>{
            console.log({
                ready: this.ready,
                working_dir: this.working_dir,
                error: this.error,
                filelogs: this.filelogs
            })
        })
    }


    get validFiles() {

        if (!this.filelogs) return null;

        const response:FileByCategory = {
            size: 0,
            items: 0,
            materials: []
        }

        this.filelogs.forEach((item)=>{
            if (item.meta.category !== FileCategory.VALID) return;

            response.size += item.meta.size;
            response.items += 1;
            response.materials.push(item);
        })

        return response;
    }

    get fixFiles() {

        if (!this.filelogs) return null;

        const response:FileByCategory = {
            size: 0,
            items: 0,
            materials: []
        }

        this.filelogs.forEach((item)=>{
            if (item.meta.category !== FileCategory.FIX) return;

            response.size += item.meta.size;
            response.items += 1;
            response.materials.push(item);
        })

        return response;
    }


    get invalidFiles() {

        if (!this.filelogs) return null;

        const response:FileByCategory = {
            size: 0,
            items: 0,
            materials: []
        }

        this.filelogs.forEach((item)=>{
            if (item.meta.category !== FileCategory.INVALID) return;

            response.size += item.meta.size;
            response.items += 1;
            response.materials.push(item);
        })

        return response;
    }

    async updateDirectoryInfo(details: IDirectoryInfo) {
        
        this.directoryInfo = details;
    }

    async updateFileLogs(files:MaterialDetail[]) {
        
        // console.log(files);
        this.filelogs = files;
    }


    updateReady(b:boolean) {
        this.ready = b;
    }
    
    updateError(error: string | null) {
        this.error = error;
    }

    updateWorkingDir(selected_path:string | undefined) {
        this.working_dir = selected_path;
        if(this.error) this.updateError(null);
    }

    resetState() {
        if(this.working_dir) this.updateWorkingDir(null);

        if(this.error) this.updateError(null)

        if(this.ready) this.updateReady(false);
    }


    async analyzeDirectory() {

        const isready = await window.api.isDirReadable(this.working_dir);

        if (!isready) {
            this.updateError("Directory is not accessible, consider using another directory");
            return;
        }

        this.updateReady(true);

        const [details, files] = await window.api.getDirdetails(this.working_dir);

        this.updateDirectoryInfo(details);

        // console.log( `${files.length} file${files.length > 1? 's':''}`, files.slice(0,5));
        this.updateFileLogs(processFiles(files));


    }


}

export default FileStore;
