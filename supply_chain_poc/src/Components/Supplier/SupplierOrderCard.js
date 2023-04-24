import { useEffect, useState } from "react";
import './SupplierOrderCard.css';
import React from 'react'
import Campaign from "../../ethereum/campaign";

function Card() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const address = '0x8A59B3f39129379D39eC22cA815cA726BB395338'
        const campaign = Campaign(address);
        (async () => {
            const requestCount = await campaign.methods.getSupplyChainDataCount().call();
            const requests = await Promise.all(
                Array(parseInt(requestCount))
                    .fill()
                    .map((element, index) => {
                        return campaign.methods.supplyChainDatas(index).call();
                    })
            );
            setCount(requestCount)
            return { address, requests, requestCount};
        })();
        return () => {
        }
    }, [])

    return (
        <>
            <div style={{ display: "flex" }} className="usercard">
                <div className="card text-dark bg-i mb-3" style={{ maxWidth: "18rem", }}>
                    <div className="card-heade">
                        <span className='userspan'>
                            <i className='fa fa-users usersicon'></i>
                        </span>
                    </div><br />
                    <div className="card-footer bg-transparent border-success">
                        <p className="card-text"><b><h3>Orders: {count}</h3></b></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
