import { action, makeObservable, observable } from "mobx";

class FileStore {
    selected = false;

    constructor() {
        
        makeObservable(this, {
            selected: observable,
            updateSelected: action,
        });
    }


    updateSelected(b:boolean) {
        this.selected = b;
    }

}

export default FileStore;
