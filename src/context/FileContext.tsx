
import React, { FC, ReactNode, createContext, useContext } from 'react';
import FileStore from '../store/FileStore';


// ================================================

interface IContext {
    filestore: FileStore,
}

const FileContext = createContext<IContext | null>(null);

const useFileStore = ()=>useContext(FileContext) as IContext;
export default useFileStore;


export const FileWrapper: FC<{ children: ReactNode}> = ({ children }) => {

    const filestore = new FileStore();


    const context = {
        filestore
    }

    return (
        <FileContext.Provider value={context}>
            { children }
        </FileContext.Provider>
    )
}
