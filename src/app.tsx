import React from 'react';
import {createRoot} from 'react-dom/client';
import Image from './components/Image';
import Button from './components/Button';






const App = () => {



    return (
        <section className='text-center reset'>

            <div className="grand_image">
                <Image src={"rocket.svg"} />
            </div>

            <h4 className='reset_description'>
                Open a folder containing your documents to get started
                <br/><br/><br/>
                <Button 
                    icon='folder.svg'
                    label='Open New Directory'
                    onClick={()=>({})}
                />
            </h4>

        </section>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <App />
    </React.Fragment>
);
