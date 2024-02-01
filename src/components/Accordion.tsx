import React, { useEffect, useId } from "react";
import Image from "./Image";
import useAccordionController from "../context/AccordionContext";


interface IAccordion {
    leftHeader: React.ReactNode
    rightHeader?: React.ReactNode,
    children: React.ReactNode
}

const Accrodion = (props:IAccordion) => {
    const {registerAccordion, active, setActive} = useAccordionController()

        // ! The use of useId() to identify accordion could be a bug
    const id = useId();

    const isActive = active === id;

    useEffect(()=>{
        registerAccordion(id);
    }, []);

    return (
        <div className="accordion container" onClick={()=>setActive(isActive ? null : id)}>
            <div className="_header d-flex align-center justify-between">

                {/* Left header */}
                <div className="d-flex align-center">

                    {props.leftHeader}
                </div>


                <div className="d-flex align-center">
                    {props.rightHeader}

                    <button
                        className="chevron"
                        onClick={()=>{
                          setActive(isActive ? null : id);
                        }}
                        data-active={isActive}
                    >
                        <Image src="chevron-down.svg" icon/>
                    </button>
                </div>
            </div>


            <div className="_content" data-active={isActive}>
                {props.children}
            </div>
        </div>
    )
}


export default Accrodion;