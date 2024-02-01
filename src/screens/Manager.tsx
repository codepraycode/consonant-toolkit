import React from "react";
import Button from "../components/Button";
import Accrodion from "../components/Accordion";
import { AccordionProvider } from "../context/AccordionContext";
import Image from "../components/Image";
import Tabular from "../components/Tabular";


const Manager = () => {
    
    
    return (

        <AccordionProvider>
            {/* Header */}
            <div className="title_bar d-flex align-center justify-between">
                <h3>
                    100 level document
                    <span>13.2MB <span className="sep"> | </span>21 items </span>
                </h3>

                <div>

                    <Button
                        label="Change Directory"
                        icon="revert.svg"
                        onClick={()=>null}
                    />
                </div>
            </div>


            {/* Valid and can fly */}
            <Accrodion
                leftHeader={(
                    <>
                        <span className="mr-1"> <Image src="check.svg" icon/></span>
                        <span>

                            Valid File
                        </span>

                        <span className="dot-sep">{"•"}</span>

                        <span>10 items</span>

                        <span className="dot-sep">{"•"}</span>

                        <span>7.2MB</span>
                    </>
                )}


                rightHeader={(
                    <Button
                        label="Upload materials"
                        icon="upload.svg"
                        onClick={()=>console.log("Upload material")}
                        transparent
                    />
                )}
            >
                <Tabular row_items={[]}/>
            </Accrodion>

            <br/>

            {/* Pending fix */}
            <Accrodion
                leftHeader={(
                    <>
                        <span className="mr-1"> <Image src="warning.svg" icon/></span>
                        <span>

                            Waiting to be fixed
                        </span>

                        <span className="dot-sep">{"•"}</span>

                        <span>7 items</span>

                        <span className="dot-sep">{"•"}</span>

                        <span>7.2MB</span>
                    </>
                )}
            >
                <Tabular row_items={[]}/>
            </Accrodion>
            
            <br/>

            {/* Not supported */}
            <Accrodion
                leftHeader={(
                    <>
                        <span className="mr-1"> <Image src="bad_info.svg" icon/></span>
                        <span>

                            Not supported
                        </span>

                        <span className="dot-sep">{"•"}</span>

                        <span>4 items</span>

                        <span className="dot-sep">{"•"}</span>

                        <span>7.2MB</span>
                    </>
                )}
            >
                <Tabular row_items={[]}/>
            </Accrodion>


        </AccordionProvider>
    )}

export default Manager;