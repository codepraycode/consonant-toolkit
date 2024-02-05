import React from 'react';
import Image from './Image';
import EditableInput from './EditableInput';
import Preloader from './Preloader';
import { MaterialDetail } from '../utils/types';



interface ITabular {
    row_items: MaterialDetail[],
    loading?:boolean
}

const Tabular = ({row_items, loading}:ITabular) => {



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
                                window.api.openPath(item.meta.path)
                            }}
                            className='selectable'
                        >
                            <Image src='preview.svg' icon/>
                        </span>
                        
                        <EditableInput value={item.title}/>
                    </div>
                    <div data-empty>{item.course} { item.code }</div>

                    <div>{item.format}</div>
                    <div>
                        {item.meta.status === 'pending' && <Image src='pending.svg' icon/>}
                        {item.meta.status === 'failed' && <Image src='cross.svg' icon/>}
                        {item.meta.status === 'success' && <Image src='tick.svg' icon/>}
                        {/* <Image src='tick.svg' icon/> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tabular;
