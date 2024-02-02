import React, { useEffect, useId } from "react";
import Image from "./Image";
import useAccordionController from "../context/AccordionContext";
import Button from "./Button";
import Preloader from "./Preloader";


interface IAccordion {
    icon: string,
    title:string,
    volume: number,
    size: number, // size in bytes

    bulkAction?: {
        label: string,
        icon: string,
        onClick: ()=>void
    },

    loading?:boolean

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
        <div className="accordion">
            <div className="_header d-flex align-center justify-between" onClick={()=>setActive(isActive ? null : id)}>

                {/* Left header */}
                <div className="d-flex align-center" data-loading>

                    {props.loading ? <Preloader />: (
                        <>
                            <span className="mr-1">
                                <Image src={props.icon} icon/>
                            </span>

                            <span>

                                {props.title}
                            </span>

                            <span className="dot-sep">{"•"}</span>

                            <span>{props.volume} item{props.volume > 1 ? 's':''}</span>

                            <span className="dot-sep">{"•"}</span>

                            {/* Should be calculated */}
                            <span>{props.size}</span>
                        </>
                        )
                    }

                </div>


                <div className="d-flex align-center">
                    {
                        props.bulkAction && (

                            <Button
                                label={props.bulkAction.label}
                                icon={props.bulkAction.icon}
                                onClick={props.bulkAction.onClick}
                                transparent
                            />
                        )
                    }

                    <button
                        className="chevron"
                        // onClick={()=>{
                        //   setActive(isActive ? null : id);
                        // }}
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