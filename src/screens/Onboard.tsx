import React from "react";
import Image from "../components/Image";
import Button from "../components/Button";
import Preloader from "../components/Preloader";
import useFileStore from "../context/FileContext";
import { observer } from "mobx-react-lite";


const Onboard = () => {
    
    
    const filestore = useFileStore();


    const cta = (<Button 
                    icon='folder.svg'
                    label='Open New Directory'
                    onClick={()=>{

                        // filestore.resetState();

                        window.api.selectDirectory()
                        .then((path)=> {

                            filestore.updateWorkingDir(path);
                        })
                    }}
                />)

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

                {cta}
            </>
        )
    }

    if (filestore.error) {
        template = <span className="onboard-issue">


            <span className="big-icon"><Image src="warning.svg" icon/></span>
            <br/>
            {filestore.error} <br/>
            <small>Path: {filestore.working_dir}</small>

            <br/><br/>

            {cta}
        </span>
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