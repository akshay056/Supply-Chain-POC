import Card from "./ManufacturerCard";
import Table from "./ManufacturerOrderTable";
import { useState } from "react";
import Modalpoppup from "./ManufacturerOrderModal";
import './ManufacturerDashboard.css';
function ManufacturerDashboard() {
    const[show, setshow] = useState(false);
    const[ordercount, setOrderCount] = useState(0)
    const [openPDFModal, setOpenPDFModal] = useState(false);
    function neworder(){
        // if(data === true){
            setshow(true);
        // }
    }
    const closeFunction =(data)=>{
        if(data === true){
            setshow(false)
        }
    }

    const previewTriggered = (data)=>{
        if(data === true){
            setOpenPDFModal(true);
        }
    }

    const getAllOrderCount = (data)=>{
        let count = data && data;
        if(count>=1){
            setOrderCount(count);
        }
      
    }
    
    return(
        <div className='maincontentdiv'>
         <div><h4 className="header" style={{color: "#023b6d", marginBottom:"20px",}}>Manufacturer Dashboard</h4></div>

         <div className = 'row'>
            <div className = 'col-3'>
            <Card neworder={neworder} ordercount={ordercount}/>
            </div>
            <div className = 'col-9'>
            <button className = 'new-order' onClick={neworder}>+New Order</button>
            </div>
         </div>
            <Table   previewTriggered={previewTriggered} getAllOrderCount={getAllOrderCount}/>
            {show?<Modalpoppup closeFunction={closeFunction}/>:""}
            {/* {<PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={[1]} />} */}
          
         </div>
    )
}
export default ManufacturerDashboard;