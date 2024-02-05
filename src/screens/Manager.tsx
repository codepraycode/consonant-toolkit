import React from "react";
import Button from "../components/Button";
import Accrodion from "../components/Accordion";
import { AccordionProvider } from "../context/AccordionContext";
import Tabular from "../components/Tabular";
import useFileStore from "../context/FileContext";

import Preloader from "../components/Preloader";
import { observer } from "mobx-react-lite";
import { bytesToSize } from "../utils/filesUtils";


const Manager = () => {
    
    const fileStore = useFileStore();

    const directoryMeta = fileStore.directoryInfo;
    
    const isLoadingDirectoryMeta = directoryMeta === null;

    const validFiles = fileStore.validFiles;
    const invalidFiles = fileStore.invalidFiles;
    const fixFiles = fileStore.fixFiles;

    return (

        <AccordionProvider>
            {/* Header */}
            <div className="title_bar d-flex align-center justify-between">
                <h3 data-loading={isLoadingDirectoryMeta}>
                    {
                        isLoadingDirectoryMeta ? <Preloader />: 
                        <>
                            {directoryMeta.name}
                            <span>
                                {bytesToSize(directoryMeta.size)}
                                <span className="sep"> | </span>
                                {directoryMeta.items} item{directoryMeta.items > 1 ? 's':null}
                            </span>
                        </>
                    }

                </h3>

                <div>

                    <Button
                        label="Change Directory"
                        icon="revert.svg"
                        onClick={()=>fileStore.resetState()}
                    />
                </div>
            </div>


            {/* Valid and can fly */}
            <Accrodion
                icon="check.svg"
                title="Valid"
                volume={validFiles?.items || 0}
                size={validFiles?.size || 0}

                loading={validFiles === null}

                // bulkAction={{
                //     label: "Upload materials",
                //     icon: "upload.svg",
                //     onClick: ()=>console.log("Upload material")
                // }}
            >
                <Tabular
                    row_items={validFiles?.materials || []}
                    loading={validFiles === null}
                />
            </Accrodion>

            <br/>

            {/* Pending fix */}
            <Accrodion
                icon="warning.svg"
                title="Need fixing"
                volume={fixFiles?.items || 0}
                size={fixFiles?.size || 0}

                loading={fixFiles === null}

            >
                <Tabular
                    row_items={ fixFiles?.materials  || []}
                    loading={fixFiles === null}
                    editable
                />
            </Accrodion>
            
            <br/>

            {/* Not supported */}
            <Accrodion
                icon="bad_info.svg"
                title="Not supported"
                volume={invalidFiles?.items || 0}
                size={invalidFiles?.size || 0}

                loading={invalidFiles === null}

            >
                <Tabular
                    row_items={invalidFiles?.materials || []}
                    loading={invalidFiles === null}
                />
                {null}
            </Accrodion>


        </AccordionProvider>
    )}

export default observer(Manager);