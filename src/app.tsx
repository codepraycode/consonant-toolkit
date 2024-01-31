import React from 'react';
import {createRoot} from 'react-dom/client';
import { resolveIcon } from './utils/resolveAsset';
import { useAsync } from "react-async"



const loadVersion = async () => {
    const appVersion = await window.api.getAppVersion();
    const envVersions = window.api.envVersion;

    return {
        ...envVersions,
        app: appVersion
    };
}


const App = () => {


    const {data:version} = useAsync({ 
        promiseFn: loadVersion,
        playerId: 1 
    });

    return (
        <>
            <img src={resolveIcon("rocket.svg")}/>
            <h1>💖 Hello World!</h1>
            <p>Welcome to your Electron application.</p>


            <h2>Versions</h2>

            {
                version && (
                    <>
                        <span id="chrome--version">Chrome Version: {version.chrome}</span><br/>
                        <span id="node--version">Node version: {version.node}</span><br/>
                        <span id="electron--version">Electron version: {version.electron}</span>
                        <span id="electron--version">Consonant toolkit version: {version.app}</span>
                    </>
                )
            }
        </>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <App />
    </React.Fragment>
);
