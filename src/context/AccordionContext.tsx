import React, {ReactNode, createContext, useContext, useState}  from 'react';


interface IAccordion { 
    ids: string[],
    active: string | null
}

interface IAccordionContext {
    total: number,
    active: string | null,
    registerAccordion: (id:string)=>void,
    setActive: (id:string)=>void
}

const initilState:IAccordion = {
    ids: [],
    active: null
}

const AccordionContext = createContext<IAccordionContext | null>({
    total: 0,
    active: null,
    registerAccordion: (id:string)=>(console.log(id)),
    setActive: (id:string)=>(console.log(id))
})


const useAccordionController = () => useContext(AccordionContext);

export default useAccordionController;


export const AccordionProvider = ({children}: {children: ReactNode}) => {
    const [accordionState, setAccordionState] = useState<IAccordion>(initilState);

    const context = {
        ...accordionState,
        total: accordionState.ids.length,
        active: accordionState.active,
        registerAccordion: (id:string)=>{
            if (accordionState.ids.includes(id)) return;

            setAccordionState((p)=>({
                ...p,
                ids:[...p.ids, id]
            }));
        },
        setActive: (id:string | null)=>{

            if (!id) {
                setAccordionState((p)=>({
                    ...p,
                    active: null
                }))
                return;
            }

            if (!accordionState.ids.includes(id)) return;

            setAccordionState((p)=>({
                ...p,
                active: id
            }))
        }
    }

    return (
        <AccordionContext.Provider value={context}>
            {children}
        </AccordionContext.Provider>
    )
}