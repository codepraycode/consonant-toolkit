import { action, autorun, makeObservable, observable } from "mobx";



class FileStore {
    ready = false;
    working_dir:string | null = null;
    error: string | null = null;

    constructor() {
        
        makeObservable(this, {
            ready: observable,
            working_dir: observable,
            error: observable,

            updateReady: action,
            updateError: action,
            analyzeDirectory: action,

            resetState: action,
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
                error: this.error
            })
        })
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
        } else {
            this.updateReady(true);
        }




    }


}

export default FileStore;
