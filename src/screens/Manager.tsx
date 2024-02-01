import React from "react";
import Button from "../components/Button";
import Accrodion from "../components/Accordion";
import { AccordionProvider } from "../context/AccordionContext";
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
                icon="check.svg"
                title="Valid"
                volume={0}
                size={0}

                // bulkAction={{
                //     label: "Upload materials",
                //     icon: "upload.svg",
                //     onClick: ()=>console.log("Upload material")
                // }}
            >
                <Tabular row_items={[]}/>
            </Accrodion>

            <br/>

            {/* Pending fix */}
            <Accrodion
                icon="warning.svg"
                title="Need fixing"
                volume={0}
                size={0}
            >
                <Tabular row_items={[]}/>
            </Accrodion>
            
            <br/>

            {/* Not supported */}
            <Accrodion
                icon="bad_info.svg"
                title="Not supported"
                volume={0}
                size={0}
            >
                <Tabular row_items={[]}/>
            </Accrodion>


        </AccordionProvider>
    )}

export default Manager;