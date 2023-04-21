import { useLocation } from 'react-router-dom';
import Dashboard from './Logistics/LogisticDashboard';
import Payment from './Logistics/LogisticPayment';
import ShipmentRequest from './Logistics/LogShipmentRequest';

import SupplierReport from './Supplier/SupplierReport';
import SupplierPayment from './Supplier/SupplierPayment';
import SupplierDashboard from './Supplier/SupplierOrderDashboard';
import SupplierShipment from './Supplier/SupplierShipment';
import ManufacturerDashboard from './Manufacturer/ManufacturerDashboard';
import ManufacturerShipment from './Manufacturer/ManufacturerShipment';
function Content() {
    const location = useLocation();
    console.log("location", location);
    return (
        <>
            {location && location.pathname === "/" && <Dashboard />}
            {location && location.pathname === "/Logistics/dashboard" && <Dashboard />}
            {location && location.pathname === "/Logistics/Payment" && <Payment />}
            {location && location.pathname === "/Logistics/ShipmentRequest" && <ShipmentRequest />}
            {location && location.pathname === "/Supplier/Dashboard" && <SupplierDashboard />}
            {location && location.pathname === "/Supplier/ShipmentRequest" && <SupplierShipment />}
            {location && location.pathname === "/Supplier/Report" && <SupplierReport />}
            {location && location.pathname === "/Supplier/Payment" && <SupplierPayment />}
            {location && location.pathname === "/Manufacturer/Dashboard" && <ManufacturerDashboard />}
            {location && location.pathname === "/Manufacturer/ShipmentStatus" && <ManufacturerShipment />}
            
            


            
        </>
    )
}
export default Content;