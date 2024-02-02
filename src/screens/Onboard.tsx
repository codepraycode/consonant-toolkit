import React from "react";
import Image from "../components/Image";
import Button from "../components/Button";
import Preloader from "../components/Preloader";
import useFileStore from "../context/FileContext";
import { observer } from "mobx-react-lite";


const Onboard = () => {
    
    
    const filestore = useFileStore();


    let template = (
        <span className="onboard-loader">
            <Preloader /> Loading...
        </span>
    )


    if (!filestore.working_dir) {
        template = (
            <>
                Open a folder containing your documents to get started
                <br/><br/>
                <Button 
                    icon='folder.svg'
                    label='Open New Directory'
                    onClick={()=>{
                        // filestore.updateSelected(true);

                        window.api.selectDirectory()
                        .then((path)=> {
                            // console.log("Open:", path);

                            filestore.updateWorkingDir(path);
                        })
                    }}
                />
            </>
        )
    }


    return (

    <section className='text-center reset'>

        <div className="grand_image">
            <Image src={"rocket.png"} />
        </div>

        <br/>

        <h4 className='reset_description'>
            { template }
        </h4>

    </section>
)}

export default observer(Onboard);