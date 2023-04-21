import { useEffect, useState } from "react";
import './SupplierOrderCard.css';
import axios from 'axios';
import React from 'react'
import Campaign from "../../ethereum/campaign";
function Card() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const address = '0x780c66A89ae42514c9e54bb7Ce95Dff7A5332816'
        const campaign = Campaign(address);
        console.log('use effect campaign', campaign);
        (async () => {
            const requestCount = await campaign.methods.getSupplyChainDataCount().call();
            console.log('req count', requestCount);
            const requests = await Promise.all(
                Array(parseInt(requestCount))
                    .fill()
                    .map((element, index) => {
                        return campaign.methods.supplyChainDatas(index).call();
                    })
            );
            //   setRequest(requests)
            setCount(requestCount)
            console.log('useeffect requests', requestCount, requests);
            return { address, requests, requestCount};
        })();
        return () => {
        }
    }, [])
    //GET SHIPPED COUNT
    const [shippedOrderCount, setShippedOrderCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:4000/posts?status=Shipped')
            .then(response => {
                setShippedOrderCount(response.data.length);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }} className="usercard">
                <div className="card text-dark bg-i mb-3" style={{ maxWidth: "18rem", }}>
                    <div className="card-heade">
                        <span className='nftsspan'>
                            <i className='fa fa-users usersicon'></i>
                            {/* {order && <img className="order" src={order} />} */}
                        </span>
                    </div><br />
                    <div className="card-footer bg-transparent border-success">
                        <p className="card-text"><b><h3>Orders: {count}</h3></b></p>
                        {/* <h5 className="card-title">{count}</h5> */}
                    </div>
                    {/* <div style={{float:"left"}}>Orders</div><div style={{float:"right"}}>Right Text</div> */}
                </div>
                {/* <div className="card carduser2 card-user text-dar bg-info-2 mb-3" style={{ maxWidth: "18rem", marginLeft: "20px" }}>
                    <div className="card-heade">
                        <span className='nftsspan'>
                            <i className='fa fa-users usersicon'></i>
                            {ship && <img className="order" src={ship} />}
                        </span>
                    </div>
                    <div class="card-footer bg-transparent border-success">
                        <p className="card-text"><b><h3>Shipped</h3></b></p>
                        <h5 className="card-title">{shippedOrderCount}</h5>
                    </div>
                </div> */}
            </div>
        </>
    )
}
export default Card;
