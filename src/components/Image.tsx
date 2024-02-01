import React from 'react';
import { resolveAsset } from '../utils/resolveAssets';
import { useAsync } from 'react-async';

interface IconProps {
    src: string,
    alt?:string,
}


interface ImageProps extends IconProps {
    icon?:boolean
}



const Icon = ({src, alt}:IconProps) => {    
    return (
        <span className='icon'>
            <img
                src={src}
                alt={alt || 'An Image'}
            />
        </span>
    )
}


const Image = ({src, alt, icon}: ImageProps) => {

    const {data:value} = useAsync({promiseFn: resolveAsset, asset: src, icon: icon })

    if (icon) return <Icon src={value} alt={alt}/>

    return (
        <img
            src={value}
            alt={alt || 'An Image'}
        />
    )
}


export default Image;
