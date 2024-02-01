import React from "react";
import Image from "../components/Image";
import Button from "../components/Button";
import useFileStore from "../context/FileContext";


const Onboard = () => {
    
    
    const filestore = useFileStore();




    return (

    <section className='text-center reset'>

        <div className="grand_image">
            <Image src={"rocket.png"} />
        </div>

        <h4 className='reset_description'>
            Open a folder containing your documents to get started
            <br/><br/><br/>
            <Button 
                icon='folder.svg'
                label='Open New Directory'
                onClick={()=>{
                    filestore.updateSelected(true);
                }}
            />
        </h4>

    </section>
)}

export default Onboard;