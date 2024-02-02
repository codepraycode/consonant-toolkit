import { action, makeObservable, observable } from "mobx";

class FileStore {
    selected = false;
    working_dir:string | null = null;

    constructor() {
        
        makeObservable(this, {
            selected: observable,
            working_dir: observable,
            updateSelected: action,
        });
    }


    updateSelected(b:boolean) {
        this.selected = b;
    }

    updateWorkingDir(selected_path:string | undefined) {
        this.working_dir = selected_path;
    }

}

export default FileStore;
