// export function resolveIcon(assetPath:string) {
//     return `/static/icons/${assetPath}`;
// }


export async function resolveAsset({ asset, icon }:{asset:string, icon:boolean}) {
    const staticPath = await window.api.getStaticPath();  // ! Optimize this as it's a potential bug

    const assetPath = icon ? `icons/${asset}` : `images/${asset}`;

    return `${staticPath}/${assetPath}`;
}