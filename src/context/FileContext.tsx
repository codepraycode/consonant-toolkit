
import React, { FC, ReactNode, createContext, useContext } from 'react';
import FileStore from '../store/FileStore';


// ================================================

const FileContext = createContext<FileStore | null>(null);

const useFileStore = ()=>useContext(FileContext) as FileStore;
export default useFileStore;


export const FileWrapper: FC<{ children: ReactNode}> = ({ children }) => {

    const searchStore = new FileStore();

    return (
        <FileContext.Provider value={searchStore}>
            { children }
        </FileContext.Provider>
    )
}
