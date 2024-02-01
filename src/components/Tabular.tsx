import React from 'react';
import Image from './Image';
import EditableInput from './EditableInput';


type Status = 'pending' | 'failed' | 'success';
interface IRowItem {
    id:string,
    title:string,
    course: string,
    code: number,
    format: string,
    status?: Status
}


interface ITabular {
    row_items: IRowItem[]
}

const Tabular = ({row_items}:ITabular) => {
    return (
        <div className='tabular'>
            <div className="row_item head">
                <span>File Title</span>
                <span>Course</span>
                <span>Format</span>
                <span></span>
            </div>


            {row_items.map((item)=>(
            <div className="row_item" key={item.id}>
                <div className='d-flex align-center'>
                    <Image src='file.svg' icon/>
                    
                    <EditableInput value={item.title}/>
                </div>
                <div data-empty>{item.course} ({item.code})</div>

                <div>{item.format}</div>
                <div>
                    {item.status === 'pending' && <Image src='pending.svg' icon/>}
                    {item.status === 'failed' && <Image src='cross.svg' icon/>}
                    {item.status === 'success' && <Image src='tick.svg' icon/>}
                    {/* <Image src='tick.svg' icon/> */}
                </div>
            </div>
            ))}
        </div>
    )
}

export default Tabular;
