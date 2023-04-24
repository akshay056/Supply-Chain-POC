import React, { useState, useEffect } from "react";
import LCard from "./LogisticCard";
import Table from "./LogisticTable";
import Campaign from "../../ethereum/campaign";

function Dashboard() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

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
      var i = 0, j = 0;
      requests.forEach(ele => {
        if (ele.status == false) { i = i + 1; }
        else { j = j + 1; }
      });
      setCount1(i)
      setCount2(j)
      return { address, requests, requestCount };
    })();
    return () => { }
  }, [])

  return (
    <>
      <div className='maincontentdiv'>
        <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}>Logistics Dashboard</h3></div>
        <LCard ordcount={count} inprogcount={count1} delivcount={count2} />
        <br />
        <Table />
      </div>
    </>
  )
}
export default Dashboard;