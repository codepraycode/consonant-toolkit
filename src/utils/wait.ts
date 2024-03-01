

export function wait(time = 3) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(null);
        }, time * 1000);
    })
}