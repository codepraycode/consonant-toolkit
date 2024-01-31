import React from 'react';
import Image from './Image';



interface IButton {
    label: string,
    icon?: string,
    onClick: ()=> void
}


const Button = ({label, icon, onClick}:IButton) => {
    return (
        <button
            className='btn'
            onClick={onClick} title={label}
        >
            {icon && (
                <Image src={icon} icon/>
            )}
            { label }
        </button>
    )
}

export default Button;
