import { FileCategory, IDirFile, IndexedMaterials, Material, MaterialMeta, Status } from "./types";
import config from '../config.json';
import { slugify } from "./slugify";
// import { slugify } from "./slugify";

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

const dupicate_check_pattern = /\(\d+\)/;
const standard_check_pattern = /^[A-Z]{3}\s\d{3}\s-\s.*$/;

export function bytesToSize(bytes:number) {
    if(bytes === 0) return '0 Byte';


    const unit = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, unit)).toFixed(2);

    return `${size} ${sizes[unit]}`
}


const isDuplicate = (file:IDirFile) => {
    return dupicate_check_pattern.test(file.name);
}

const isSupported = (file:IDirFile) => {
    return config.supportedFilesTypes.includes(file.ext);
}


function determineCategory(file:IDirFile): FileCategory {

    if (!isSupported(file)) {
        return FileCategory.INVALID;
    }    

    if (!standard_check_pattern.test(file.basename)) {
        return FileCategory.FIX
    }

    return FileCategory.VALID;
}


// On consequent changes to file title, we check if valid or need fix
export function isFileFixed(file_label:string){
    if (!standard_check_pattern.test(file_label)) {
        return FileCategory.FIX
    }

    return FileCategory.VALID;
}

export function processFiles(files:IDirFile[]): IndexedMaterials[] {


    const materials:IndexedMaterials[] = [];

    // Process files here accoring to standard
    files.forEach((item)=>{
        const data:Material = {
            id:null,
            title: item.basename,
            course: '',
            code: null,
            format: item.ext.replace('.',''),
        };

        if (isDuplicate(item)) return;


        // File category is done once, to know the nature of the file
        const category = determineCategory(item);
        const meta: MaterialMeta = {
            category,
            status: category !== FileCategory.VALID ? null:Status.UPLOAD,
            size: item.size,
            path: item.path
        }


        materials.push({
            ...data,
            index:slugify(item.path),
            meta
        })
        

    });


    return materials;
}
