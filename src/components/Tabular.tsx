import React from 'react';
import Image from './Image';
import EditableInput from './EditableInput';
import Preloader from './Preloader';
import { IndexedMaterials } from '../utils/types';



interface ITabular {
    row_items: IndexedMaterials[],
    loading?:boolean,
    preview?:boolean,
    upload?:boolean,
    onUpdate?:(index:number, value:string)=>void;
    onDelete?:(index:number)=>void;
}

const Tabular = ({row_items, preview, upload, loading, onUpdate, onDelete}:ITabular) => {

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


    const editable = Boolean(onUpdate);


    return (
        <div className='tabular'>
            <div className="row_item head">
                <span>File Title</span>
                <span>Course</span>
                <span>Format</span>
                <span></span>
            </div>


            {row_items.map((item, i)=>(
                <div className="row_item" key={i}>
                    <div className='d-flex align-center'>


                        <span
                            onClick={()=>{
                                if(!preview) return
                                window.api.openPath(item.meta.path)
                            }}
                            className='selectable'
                        >
                            {!preview ?
                                <Image src='file.svg' icon/>
                            :
                                <Image src='preview.svg' icon/>}
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
                            upload && (
                                <>
                                    {item.meta.status === 'pending' && <Image src='pending.svg' icon/>}
                                    {item.meta.status === 'failed' && <Image src='cross.svg' icon/>}
                                    {item.meta.status === 'success' && <Image src='tick.svg' icon/>}
                                    {item.meta.status === 'upload' && <Image src='upload.svg' icon/>}
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
            ))}
        </div>
    )
}

export default Tabular;
