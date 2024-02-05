import { FileCategory, IDirFile, Material, MaterialDetail, MaterialMeta } from "./types";
import config from '../config.json';

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

    // if ()
    //  TODO: Validate that it contains course, course code, and description;

    if (!standard_check_pattern.test(file.basename)) {
        return FileCategory.FIX
    }

    return FileCategory.VALID;
}

export function processFiles(files:IDirFile[]): MaterialDetail[] {


    const materials:MaterialDetail[] = [];

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

        const meta: MaterialMeta = {
            category: determineCategory(item),
            status: null,
            size: item.size,
            path: item.path
        }


        materials.push({
            ...data,
            meta
        })
        

    });


    return materials;
}