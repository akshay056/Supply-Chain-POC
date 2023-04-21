import React from "react";
//import Create from "./Test";
import Table from "./ManufacturerShipmentStatusTable"
import Modal from "./ManufacturerShipmentModal";
import { useState } from "react";

function ManufacturerShipment() {
    const [openModal, setOpenModal] = useState(false);
    const [orderID, setOrderID] = useState();
    let parameter;
    const onUploadClicked = () => {
        console.log("cell clicked", parameter);
        setOpenModal(true);
        // setOrderID(parameter.data.orderID);
        //setReportName(parameter.data.)
        
     };
    return (
        <>
            <div className='maincontentdiv'>
                <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}> Shipment Status</h3></div>
                {/* <Card />
                <br /><br />
                <button onClick={onUploadClicked}>Create Delivery Reciept</button>
                <br /><br /><br /><br />
                <h4>Order List</h4>
                <br /> */}
                {/* <Create /> */}
                <Table />
                <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={[orderID]}/>
            </div>
        </>
    )
}
export default ManufacturerShipment;