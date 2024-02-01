import React from 'react';
import Image from './Image';

const Tabular = () => {
    return (
        <div className='tabular'>
            <div className="row_item head">
                <span>File Title</span>
                <span>Course</span>
                <span>Format</span>
                <span></span>
            </div>

            <div className="row_item">
                <span>
                    <Image src='file.svg' icon/>
                    Joint CBT Questions for 100 Level First Semester
                </span>
                <span data-empty>---</span>
                <span>PDF</span>
                <span>
                    {/* <Image src='pending.svg' icon/> */}
                    {/* <Image src='cross.svg' icon/> */}
                    <Image src='tick.svg' icon/>
                </span>
            </div>

            <div className="row_item">
                <span>
                    <Image src='file.svg' icon/>
                    CSC 305 _CONTROL STRUCTURES IN C_
                </span>
                <span>CSC 305</span>
                <span>PDF</span>
                <span></span>
            </div>
        </div>
    )
}

export default Tabular;
