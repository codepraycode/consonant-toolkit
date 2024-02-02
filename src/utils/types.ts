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

export interface IFilelog {
    category: FileCategory,
    
    name: string,
    size: number,
}