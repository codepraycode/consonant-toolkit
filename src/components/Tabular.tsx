import React from 'react';
import Image from './Image';
import EditableInput from './EditableInput';
import Preloader from './Preloader';
import { FileIndex, IndexedMaterials, Status } from '../utils/types';



interface ITabular {
    row_items: IndexedMaterials[],
    loading?:boolean,
    preview?:boolean,
    onUpdate?:(index:FileIndex, value:string)=>void;
    onDelete?:(index:FileIndex)=>void;
    onUpload?:(index:FileIndex)=>void;
}

const Tabular = ({row_items, onUpload, loading, onUpdate, onDelete}:ITabular) => {

    if (loading || !row_items) {
        return (
            <div className='empty-space text-center'>
                <Preloader />
            </div>
        )
    }

    if (row_items.length < 1) {
        return (
            <div className='empty-space text-center'>
                <p>Nothing here</p>
            </div>
        )
    }

    const updateable = Boolean(onUpdate);
    const uploadable = Boolean(onUpload)
    
    
    const isEditable = (item:IndexedMaterials) => {
        // if (!updateable) return false;

        const isUploadState = item.meta.status === Status.UPLOAD;

        if (updateable && uploadable && isUploadState) return true;
        if (updateable && !uploadable) return true;


        // if () {
        //     return true;
        // }

        return false;
    }


    return (
        <div className='tabular'>
            <div className="row_item head">
                <span>File Title</span>
                <span>Course</span>
                <span>Format</span>
                <span></span>
            </div>


            {row_items.map((item)=>{
                const editable = isEditable(item);
                return (
                <div className="row_item" key={item.index}>
                    <div className='d-flex align-center'>


                        <span
                            onClick={()=>{
                                if(!editable) return
                                window.api.openPath(item.meta.path)
                            }}
                            className='selectable'
                        >
                            {
                                editable &&
                                <Image src={'preview.svg'} icon/>}
                            { !editable &&
                                <Image src={'file.svg'} icon/>
                            }
                            
                        </span>
                        
                        <EditableInput
                            value={item.title}
                            editable={editable}
                            onChange={(value:string)=>onUpdate(item.index, value)}
                        />
                    </div>
                    <div data-empty>{item.course.toUpperCase()} { item.code }</div>

                    <div>{item.format.toUpperCase()}</div>
                    <div>
                        {
                            uploadable && (
                                <>
                                    {item.meta.status === Status.SUCCESS && <Image src='tick.svg' icon/>}
                                    {item.meta.status === Status.PENDING && <Image src='pending.svg' icon/>}
                                    {item.meta.status === Status.UPLOAD && (
                                        <span
                                            onClick={()=>onUpload(item.index)}
                                            className='selectable'
                                        >
                                            <Image src='upload.svg' icon/>
                                        </span>
                                    )}
                                    {item.meta.status === Status.FAILED && <Image src='cross.svg' icon/>}
                                </>
                            )
                        }

                        {onDelete && (
                            <span
                                onClick={()=>onDelete(item.index)}
                                className='selectable'
                            >
                                <Image src='file-reject.svg' icon/>
                            </span>
                            )
                        }
                        {/* <Image src='tick.svg' icon/> */}
                    </div>
                </div>
            )
            })}
        </div>
    )
}

export default Tabular;
