import React from 'react';
import { resolveAsset, resolveIcon } from '../utils/resolveAssets';

interface IconProps {
    src: string,
    alt?:string,
}


interface ImageProps extends IconProps {
    icon?:boolean
}



const Icon = ({src, alt}:IconProps) => {
    const value = resolveIcon(src);
    return (
        <span className='icon'>
            <img
                src={value}
                alt={alt || 'An Image'}
            />
        </span>
    )
}


const Image = ({src, alt, icon}: ImageProps) => {

    if (icon) return <Icon src={src} alt={alt}/>

    const value = resolveAsset(src);

    return (
        <img
            src={value}
            alt={alt || 'An Image'}
        />
    )
}


export default Image;
