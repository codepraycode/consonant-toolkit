import React, { useState } from 'react';


const EditableInput = ({value, editable}:{value:string, editable?:boolean}) =>{

    const [val, setVal] = useState(value);


    return (
        <input
            value={val}
            onChange={(e)=>{
                setVal(()=>e.target.value);
            }}
            readOnly={!editable}
            type='text'
        />
    )
}

export default EditableInput;
