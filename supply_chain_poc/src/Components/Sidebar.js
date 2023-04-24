import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from '../Assets/admin-logo.jfif';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    function handleLogout() {
    }
    const location = useLocation();
    let userinfo = localStorage.getItem("user-info");
    const obj = JSON.parse(userinfo);
    return (
        <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
                <div className="d-flex flex-column align-items-center px-2 pt-4 text-white min-vh-100">
                    <span >
                        {logo && <img className='image-logo' src={logo} />}
                    </span>
                    <span className='name pt-3 px-2'>
                        {obj.name}
                    </span><br />

                    {(location && location.pathname === "/Logistics/Dashboard") || (location && location.pathname === "/Logistics/ShipmentRequest") || (location && location.pathname === "/Logistics/Payment") ?

                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                            <li className="nav-item">
                                <Link to="/Logistics/Dashboard" className='remove-under-line'>
                                    <i className="fs-8 bi-house"></i> <br /><br />
                                    <span className="ms-1 d-none d-sm-inline">
                                        Dashboard
                                    </span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/Logistics/ShipmentRequest" className='remove-under-line'>
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                        Shipment Requests
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Logistics/Payment" className='remove-under-line'>
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                        Payments
                                    </span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/" className="remove-under-line">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline" onClick={handleLogout}>
                                        Logout
                                    </span>
                                </Link>
                            </li>
                        </ul>

                        : (location && location.pathname === "/Supplier/Dashboard") || (location && location.pathname === "/Supplier/ShipmentRequest") || (location && location.pathname === "/Supplier/Report") || (location && location.pathname === "/Supplier/Payment") ?

                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                                <li className="nav-item">
                                    <Link to="/Supplier/Dashboard" className='remove-under-line'>
                                        <i className="fs-8 bi-house"></i> <br /><br />
                                        <span className="ms-1 d-none d-sm-inline">
                                            Dashboard
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Supplier/Report" className='remove-under-line'>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                            Report
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Supplier/ShipmentRequest" className='remove-under-line'>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                            Shipment Request
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Supplier/Payment" className='remove-under-line'>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                            Payments
                                        </span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/" className="remove-under-line">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline" onClick={handleLogout}>
                                            Logout
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            : (location && location.pathname === "/Manufacturer/Dashboard") || (location && location.pathname === "/Manufacturer/ShipmentStatus") ?
                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                                    <li className="nav-item">
                                        <Link to="/Manufacturer/Dashboard" className='remove-under-line'>
                                            <i className="fs-8 bi-house"></i> <br /><br />
                                            <span className="ms-1 d-none d-sm-inline">
                                                Dashboard
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/Manufacturer/ShipmentStatus" className='remove-under-line'>
                                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                Shipment Status
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/" className="remove-under-line">
                                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline" onClick={handleLogout}>
                                                Logout
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                                : (location && location.pathname === "/Admin") ?
                                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                                        <li className="nav-item">
                                            <i className="fs-8 bi-house"></i>
                                            <span className="ms-1 d-none d-sm-inline">
                                                ----  Manufacturer  -----
                                            </span>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Manufacturer/Dashboard" className='remove-under-line'>
                                                <i className="fs-8 bi-house"></i>
                                                <span className="ms-1 d-none d-sm-inline">
                                                    Dashboard
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Manufacturer/ShipmentStatus" className='remove-under-line'>
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                    Shipment Status
                                                </span>
                                            </Link>
                                        </li><br />
                                        <li className="nav-item">
                                            <i className="fs-8 bi-house"></i>
                                            <span className="ms-1 d-none d-sm-inline">
                                                -----  Supplier  -----
                                            </span>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Supplier/Dashboard" className='remove-under-line'>
                                                <i className="fs-8 bi-house"></i>
                                                <span className="ms-1 d-none d-sm-inline">
                                                    Dashboard
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Supplier/Report" className='remove-under-line'>
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                    Report
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Supplier/ShipmentRequest" className='remove-under-line'>
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                    Shipment Request
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Supplier/Payment" className='remove-under-line'>
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                    Payments
                                                </span>
                                            </Link>
                                        </li><br />
                                        <li className="nav-item">
                                            <i className="fs-8 bi-house"></i>
                                            <span className="ms-1 d-none d-sm-inline">
                                                ----- Logistics ------
                                            </span>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Logistics/Dashboard" className='remove-under-line'>
                                                <i className="fs-8 bi-house"></i>
                                                <span className="ms-1 d-none d-sm-inline">
                                                    Dashboard
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Logistics/ShipmentRequest" className='remove-under-line'>
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                    Shipment Requests
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Logistics/Payment" className='remove-under-line'>
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                                                    Payments
                                                </span>
                                            </Link>
                                        </li><br />
                                        <li className="nav-item">
                                            <Link to="/" className="remove-under-line">
                                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline" onClick={handleLogout}>
                                                    Logout
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                    : ""}
                </div>
            </div>
        </>
    )
}

export default Sidebar;