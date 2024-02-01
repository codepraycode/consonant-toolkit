import React, { useState } from 'react';


const EditableInput = ({value}:{value:string}) =>{

    const [val, setVal] = useState(value);


    return (
        <input
            value={val}
            onChange={(e)=>{
                setVal(()=>e.target.value);
            }}
            type='text'
        />
    )
}

export default EditableInput;
