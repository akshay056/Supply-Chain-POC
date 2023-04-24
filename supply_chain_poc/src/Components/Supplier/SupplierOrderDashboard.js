import React from "react";
import Card from "./SupplierOrderCard";
import Table from "./SupplierOrderTable";

function SupplierDashboard() {
    return (
        <>
            <div className='maincontentdiv'>
                <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}>Supplier Dashboard</h3></div>
                <Card />
                <Table />
            </div>
        </>
    )
}

export default SupplierDashboard;
