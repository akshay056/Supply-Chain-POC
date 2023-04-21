import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from '../Assets/admin-logo.jfif';
import { Button } from "bootstrap";
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
                    <span className='name pt-1 px-2'>
                        Akshay
                        {/* {obj.firstName}&nbsp;{obj.lastName} */}
                    </span><br /><br /><br />

                    {/* {(location && location.pathname === "/dashboard") || (location && location.pathname === "/TransactionHistory") ? */}
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                            <li className="nav-item">
                                <Link to="/Logistics/dashboard" className='remove-under-line'>
                                <i className="fs-8 bi-house"></i> 
                                {/* <Button variant="outline-dark"> */}
                                <span className="ms-1 d-none d-sm-inline">
                            Dashboard
                                </span>
                                {/* </Button> */}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/Logistics/ShipmentRequest" className='remove-under-line'>
                                <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">
                            Shipment Orders
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
                                    <span onClick={handleLogout}>Logout</span>
                                </Link>
                            </li>
                        </ul>

                        {/* : (location && location.pathname === "/user") ?
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center " id="menu">
                                <br />
                                <li className="nav-item">
                                    <Link to="/" className="remove-under-line">
                                        <span onClick={handleLogout}>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                            : ""} */}
                </div>
            </div>
        </>
    )
}
export default Sidebar;