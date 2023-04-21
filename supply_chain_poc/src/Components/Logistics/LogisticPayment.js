import React,{ useState, useRef, useEffect, useMemo, useCallback} from "react";
import PaymentCards from './LogPaymentCards'
import PaymentList from './LogPaymentList'
import Campaign from "../../ethereum/campaign";

function Payment(){
    const[count,setCount]=useState(0);
    const[count1,setCount1]=useState(0);
    const[count2,setCount2]=useState(0);

    useEffect( () => {
      const address = '0x8A59B3f39129379D39eC22cA815cA726BB395338'
      const campaign = Campaign(address);
      console.log('use effect campaign',campaign);
      (async () => {
        const requestCount = await campaign.methods.getSupplyChainDataCount().call();
        console.log('req count', requestCount);
        //const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(
          Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
              
              return campaign.methods.supplyChainDatas(index).call();
            })
        );
        setCount(requestCount)
        console.log('useeffect requests', requests);
        var i = 0, j = 0;
      requests.forEach(ele => {
        console.log("dbj", ele.status);
        if (ele.status == false) { i = i + 1; } 
        else { j = j + 1; }

      });
      console.log("cdc", i, j); 
      setCount1(i)
      setCount2(j)
        return { address, requests, requestCount };
      } )();
        
          
          return () => {
              
          }
         
       },[])
    return(
        <>
         <div className='maincontentdiv'>
       <PaymentCards ordcount={count} inprogcount={count1} delivcount={count2}/>
       <PaymentList/>
       </div>
       </>
    )
}

export default Payment