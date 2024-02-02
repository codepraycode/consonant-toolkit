

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export function bytesToSize(bytes:number) {
    if(bytes === 0) return '0 Byte';


    const unit = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, unit)).toFixed(2);

    return `${size} ${sizes[unit]}`
}
