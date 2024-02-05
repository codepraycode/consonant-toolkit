import React, { useState } from "react";
import Button from "../components/Button";
import Accrodion from "../components/Accordion";
import { AccordionProvider } from "../context/AccordionContext";
import Tabular from "../components/Tabular";
import useFileStore from "../context/FileContext";

import Preloader from "../components/Preloader";
import { observer } from "mobx-react-lite";
import { bytesToSize } from "../utils/filesUtils";
import Prompt from "../components/Prompt";


type Fn = ()=>void;

const Manager = observer(({updatePrompt}:{updatePrompt:(onReset:Fn, onConfirm:Fn)=>void}) => {
    
    const {filestore} = useFileStore();

    const directoryMeta = filestore.directoryInfo;
    
    const isLoadingDirectoryMeta = directoryMeta === null;

    const validFiles = filestore.validFiles;
    const invalidFiles = filestore.invalidFiles;
    const fixFiles = filestore.fixFiles;
    const rejectedFiles = filestore.rejectedFiles;


    const handleUpdate = (index:number, value:string) => {
        // console.log(index, value);
        filestore.updateFile(index, value);

        // console.log(fileStore.filelogs[index])
    }

    const handleDelete = (index:number) => {
        // console.log("Delete", index);

        filestore.trashFile(index)
    }

    const handleUpload = (index:number) => {
        // console.log("Upload", index);

        filestore.uploadFile(index)
    }

    return (
        <>
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
                            onClick={()=>{
                                // const res = alert(msg);
                                // console.log(res)
                                // fileStore.resetState()
                                // userPrompt()
                                updatePrompt(
                                    ()=>null,
                                    ()=>filestore.resetState()
                                )
                            }}
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
                        onUpload={handleUpload}
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
                        preview
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
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
                 <br/>

                <Accrodion
                    icon="file-reject.svg"
                    title="Your Rejected files"
                    volume={rejectedFiles?.items || 0}
                    size={rejectedFiles?.size || 0}

                    loading={rejectedFiles === null}

                >
                    <Tabular
                        row_items={rejectedFiles?.materials || []}
                        loading={rejectedFiles === null}
                    />
                    {null}
                </Accrodion>


            </AccordionProvider>
        </>
    )
})



const ManagerWrapper = () => {


    const [listened, setListened] = useState(false);
    // 
    const updatePrompt = (onReset:Fn, onConfirm:Fn)=> {
        const dialog = document.querySelector('dialog');


        dialog.showModal();

        const reset = dialog.querySelector("#resetBtn");
        const confirm = dialog.querySelector("#confirmBtn");


        // ? This is a weak fix for multiple declaring of listeners

        if (listened) return;
        reset.addEventListener('click', ()=>{
            console.log("Reset")
            onReset()
            dialog.close();
        });

        confirm.addEventListener('click', ()=>{
            console.log("confirm")
            onConfirm()
            dialog.close()
        })

        setListened(true);
        // console.log(confirm);
        // handleReturn(dialog.returnValue);
    }

    return (
        <>
            <Manager updatePrompt={updatePrompt}/>
            <Prompt>
                <div>
                    <h3>Are you sure?</h3>
                    <p>All un-remitted changes will be lost</p>
                    <br/>
                    <menu>
                        <button id="resetBtn">Cancel</button>
                        <button id="confirmBtn">Continue</button>
                    </menu>
                </div>
            </Prompt>
        </>
    )
}


export default ManagerWrapper;

// observer(Manager);