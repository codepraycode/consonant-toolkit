import React from 'react';
// import { debounce } from "lodash";


interface IEditable {
    value:string
    editable?:boolean,
    onChange?: (val:string)=>void;
}

// const DEBOUNCE_TIMEOUT = 300;

const EditableInput = (props:IEditable) =>{


    const {value, editable, onChange} = props;
    
    // const [val, setVal] = useState(value);


    // const handleChange = useCallback(debounce(onChange, DEBOUNCE_TIMEOUT), []);

    return (
        <input
            value={value}
            onChange={(e)=>{
                // setVal(()=>e.target.value);
                onChange(e.target.value);
            }}
            readOnly={!editable}
            type='text'
        />
    )
}

export default EditableInput;
