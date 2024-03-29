export enum FileCategory {    
    VALID='valid',
    FIX = 'fix',
    INVALID='invalid',
    REJECTED='rejected',
}
export enum Status {
    UPLOAD='upload',
    PENDING='pending',
    FAILED='failed',
    SUCCESS='success'
}


export interface IDirectoryInfo {
    name:string,
    size: number,
    items: number
}

export interface IDirFile {
    name: string,
    size: number,
    ext: string,
    basename: string,
    path: string
}


export interface Material {
    id: string | null,
    title: string,
    course: string,
    code: number | null,
    format: string,
}

export interface MaterialMeta {
    category: FileCategory,
    status: Status | null,
    size: number,
    path: string
}

export interface MaterialDetail extends Material {
    meta: MaterialMeta
}


export type FileIndex = string;

export interface IndexedMaterials extends MaterialDetail {
    index: FileIndex
}

export interface FileByCategory {
    size: number,
    items: number,
    materials: IndexedMaterials[]
}

export interface FileSendParams {
    name: string,
    path:string,
    format: string
}

export interface EnvCred {
    supabase: {
        SUPERBASE_API_KEY: string;
        SUPERBASE_URL: string;
    }
}