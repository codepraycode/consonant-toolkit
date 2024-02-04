export enum FileCategory {    
    VALID='valid',
    FIX = 'fix',
    INVALID='invalid',
}
export enum Status {
    PENDING='pending',
    FAIELD='failed',
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
    basename: string
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
    size: number
}

export interface MaterialDetail extends Material {
    meta: MaterialMeta
}

export interface FileByCategory {
    size: number,
    items: number,
    materials: MaterialDetail[]
}