import React from 'react';
import { createPortal } from 'react-dom';

interface IPrompt {
    children: React.ReactNode
}

const Prompt = ({children}:IPrompt) => {

    return (
        <>
            {

                createPortal(
                    <>
                        { children }
                    </>,
                    document.querySelector('dialog')
                )
            }
        </>
    )
    
    
}

export default Prompt;