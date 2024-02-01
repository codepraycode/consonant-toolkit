import React from 'react';
import Image from './Image';



interface IButton {
    label: string,
    icon?: string,
    onClick: ()=> void,
    transparent?:boolean
}


const Button = ({label, icon, onClick, transparent}:IButton) => {
    return (
        <button
            className='btn'
            onClick={onClick} title={label}
            data-transparent={transparent}
        >
            {icon && (
                <Image src={icon} icon/>
            )}
            { label }
        </button>
    )
}

export default Button;
