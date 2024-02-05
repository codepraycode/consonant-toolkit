import { action, autorun, computed, makeObservable, observable } from "mobx";
// import { wait } from "../utils/wait";
import { FileByCategory, FileCategory, FileIndex, IDirectoryInfo, IndexedMaterials, Status } from "../utils/types";
import { isFileFixed, processFiles } from "../utils/filesUtils";




type FileType = IndexedMaterials;

class FileStore {
    ready = false;
    working_dir:string | null = null;
    error: string | null = null;


    directoryInfo:IDirectoryInfo | null = null;
    filelogs:FileType[] | null = null;

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
            updateAFile: action,
            trashFile: action,
            uploadFile: action,

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
            response.materials.push({
                // index: slugify(item.title),
                ...item 
            });
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
            response.materials.push({
                // index: slugify(item.title),
                ...item 
            });
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
            response.materials.push({
                // index: slugify(item.title),
                ...item 
            });
        })

        return response;
    }

    get rejectedFiles() {

        if (!this.filelogs) return null;

        const response:FileByCategory = {
            size: 0,
            items: 0,
            materials: []
        }

        this.filelogs.forEach((item)=>{
            if (item.meta.category !== FileCategory.REJECTED) return;

            response.size += item.meta.size;
            response.items += 1;
            response.materials.push({
                // index: slugify(item.title),
                ...item 
            });
        })

        return response;
    }


    async updateDirectoryInfo(details: IDirectoryInfo) {
        
        this.directoryInfo = details;
    }

    async updateFileLogs(files:FileType[]) {
        
        // console.log(files);
        this.filelogs = files;
    }


    getFileIndex(index:FileIndex): [number, FileType] | [null, null] {
        // let file:IndexedMaterials | null = null;

        const fileindex = this.filelogs.findIndex((p) => {
            // console.log(index, p.index === index);
            return p.index === index
        });

        // console.log(index, fileindex)

        if (fileindex !== -1) {
            const file = this.filelogs[fileindex];

            // console.log(index, file)

            return [fileindex, file];
        }

        return [null, null];
    }

    updateAFile(index: FileIndex, new_file:FileType) {

        const [fileIndex] = this.getFileIndex(index);

        if (!fileIndex) return console.error("File does not exist");


        this.filelogs[fileIndex] = {...new_file};
    }


    updateFileTitle(index:FileIndex, title:string) {
        const [fileIndex, file] = this.getFileIndex(index);

        if (!fileIndex) return console.error("File does not exist");

        let status:Status;

        const category = isFileFixed(title);

        if (category === FileCategory.VALID) {
            status = Status.UPLOAD;
        }


        const {meta, ...rest} = file;

        const new_data = {
            ...rest,
            title,
            meta: {
                ...meta,
                category,
                status
            }
        }

        // console.log(index, new_data)

        this.updateAFile(index, new_data);


    }


    trashFile(index:FileIndex) {
        
        const [fileIndex, file] = this.getFileIndex(index);

        if (!fileIndex) return console.error("File does not exist");

        const {meta, ...rest} = file;


        this.updateAFile(index, {
            ...rest,
            meta: {
                ...meta,
                category: FileCategory.REJECTED,
            }
        });

            
    }

    async uploadFile(index:FileIndex) {

        const [fileIndex, file] = this.getFileIndex(index);

        if (!fileIndex) return console.error("File does not exist");

        // this.filelogs[index].title = title;
        // console.log(this.filelogs[index]);

        const {meta, ...rest} = file;
        const new_file = {
            ...rest,
            meta: {
                ...meta,
                status: Status.PENDING
            }
        }

        this.updateAFile(index, {
            ...rest,
            meta: {
                ...meta,
                status: Status.PENDING
            }
        })


        // this.filelogs[index] = {...new_file};

        try {

            const material = await window.api.sendFile({
                path: file.meta.path,
                name: `${file.title}.${file.format}`,
                format: file.format
            });

            console.log(material)


            const {meta, ...rest} = new_file;

            this.updateAFile(index, {
                ...rest,
                id: material.id,
                meta: {
                    ...meta,
                    status: Status.SUCCESS
                }
            })

            // this.filelogs[index] = {
            //     ...new_file,
            //     id: material.id
            // };
        } catch(err) {
            console.error(err);

            let status: Status;

            if (err.message.includes('duplicate')) {
                status = Status.SUCCESS;
            } else {
                status = Status.FAILED;
            }

            this.updateAFile(index, {
                ...new_file,
                meta: {
                    ...new_file.meta,
                    status
                }
            })

        }

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
