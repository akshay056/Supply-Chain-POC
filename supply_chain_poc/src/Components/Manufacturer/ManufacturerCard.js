
import { useEffect,useState } from "react";
import './ManufacturerCard.css';
function Card(props) {
    function handleclick(){

        console.log("ok");
        props.neworder(true);
    }

    return (
        <>
            <div style={{ display: "flex" }} className="usercard1">
                <div className="card text-dark bg-i mb-3" style={{ maxWidth: "18rem",marginLeft: "20px" }}>
                    
                    <div className="card-heade">
                    <span className='nftsspan'>
                        </span>
                    </div>


                    <div className="card-footer bg-transparent border-success">
                        <p className="card-text1">Order Placed</p>
                        <p className="card-text1">{props.ordercount}</p>

                    </div>
                </div>

                


                {/* <div className="card carduser2 card-user text-dar bg-info-2 mb-3" style={{ maxWidth: "18rem", marginLeft: "20px" }} onClick={handleclick}>
                    <div className="card-heade">
                        <span className='nftsspan'>
                        </span>
                    </div>
                    <div class="card-footer bg-transparent border-success">
                        <p className="card-text"><span className="plus">+</span> New Order</p>
                         

                    </div>
                </div> */}
                {/* <button onClick={handleclick}>+New Order</button> */}
               
            </div>

        </>
    )
}
export default Card;