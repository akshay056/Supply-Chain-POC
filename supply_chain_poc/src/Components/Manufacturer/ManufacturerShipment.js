import React from "react";
import Table from "./ManufacturerShipmentStatusTable"

function ManufacturerShipment() {
   
    return (
        <>
            <div className='maincontentdiv'>
                <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}> Shipment Status</h3></div>
                <Table />
            </div>
        </>
    )
}

export default ManufacturerShipment;