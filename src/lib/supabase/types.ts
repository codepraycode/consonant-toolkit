/* eslint-disable @typescript-eslint/no-explicit-any */
import {StorageError} from '@supabase/storage-js/src/lib/errors'


export type SupaBaseData = Record<string, any> | Array<Record<string, any>>


export type SupaBaseDatabaseReponse<T= any | null> = {
    data: T;
    error: null;
} | {
    data: null;
    error: SupaBaseDatabaseError;
}


export interface Stats {
    duplicates: number,
    uploaded: number,
    failed: number,
    failed_files: string [],
    file_types: {
        [k: string]: number
    }
}
interface StorageAsset {
    asset_access: string,
    asset_download: string,
    asset_id: string,
    asset_type: string
}


export interface MaterialTbRow extends StorageAsset{
    id: string,
    created_at: string | Date,
    updated_at: string | Date,
    title: string,
    course?: string,
    user: string
}


export type SuperBaseStorageReponse = {
    data: Record<string, any>;
    error: null;
} | {
    data: null;
    error: SupaBaseStorageError;
}


export interface SupaBaseStorageError extends StorageError {
    message: string,
    statusCode?: string,
    error?: string,
    stack?: string
}

export interface SupaBaseDatabaseError {
    message: string,
    code: string,
    details: string,
    hint: string
}


export interface StorageAccessConfig {
    path: string,
    options?: {
        download?: string | boolean,
    }
}

export interface StorageUploadConfig {
    path: string,
    asset: File | Blob,
    fileOptions?: {
        cacheControl?: string,
        contentType?: string,
        duplex?: string,
        upsert?: boolean
    }
}

export enum SupaBaseStorageErrorTypes {
    DEFAULT = 'ERROR',
    TIMEOUT = 'TIME-OUT',
    BUCKETNOTFOUND = 'BUCKET-NOT-FOUND',
    FILENOTFOUND="FILE-NOT-FOUND",
    FILETOOLARGE="FILE-TOO-LARGE",
    FILEALREADYEXIST="FILE-ALREADY-EXIST",
}