import fs from 'fs';
import path from 'path';


const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

function bytesToSize(bytes:number) {
    if(bytes === 0) return '0 Byte';


    const unit = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, unit)).toFixed(2);

    return `${size} ${sizes[unit]}`
}

const dir = __dirname;

// const dir = '/home/codepraycode/Downloads/Telegram Desktop/ChatExport_2024-01-29/files'

fs.readdir(dir, (err, files)=> {
    if (err) {
        console.error("Error occured:", err);
        return
    }


    // console.log(files.length, "file(s)");

    const details: {size: number, files:string[]} = {
        size: 0,
        files: []
    }

    files.forEach((file:string)=>{
        const fileDetails = fs.lstatSync(path.join(dir, file));

        if (fileDetails.isDirectory()) return;

        details.size += fileDetails.size;
        details.files.push(file);
    });


    console.log(`
    ${dir}

    ${details.files.length} file${details.files.length > 1 ? 's': ''}
    size: ${bytesToSize(details.size)}
    `)

})

// const info = fs.lstatSync(dir);

// console.log(info.size, bytesToSize(info.size));