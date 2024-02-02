import React from 'react';
import {createRoot} from 'react-dom/client';
import Onboard from './screens/Onboard';
import useFileStore, { FileWrapper } from './context/FileContext';
import { observer } from 'mobx-react-lite';
import Manager from './screens/Manager';






const App = observer(() => {

    const filestore = useFileStore();


    if( !filestore.ready) return (
        <Onboard />
    )

    return <Manager />
})


const root = createRoot(document.getElementById('root'));
root.render(
    <FileWrapper>
        <App />
        {/* <Manager /> */}
    </FileWrapper>
);
