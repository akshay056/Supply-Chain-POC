
// import React, { useState } from 'react';
// import "./Modal.css";

// const ShipmentModal = ({open, onClose, rowInfo}) => {
//     const [file, setFile] = useState();
//     if(!open) return null

//     function handleFile(event){
//         setFile(event.target.files[0])
//         console.log(file)   
//     }

//     return(
//         <div onClick={onClose} className='overlay'>
//             <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
                
//                 <h5>Create Shipment </h5>
//                 {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}
//                 <br></br>
//                 <form>
//                     <div class="form-group row">
//                         <label for="orderID" class="col-sm-2 col-form-label">Order ID</label>
//                         <div class="col-sm-10">
//                              <input type="text" class="form-control" id="orderID" placeholder="1"/>
//                          </div>
//                     </div>
//                     <br></br>
//                     <div class="form-group row">
//                         <label for="logisticsProvider" class="col-sm-2 col-form-label">Logistics Provider</label>
//                         <div class="col-sm-10">
//                              <input type="text" class="form-control" id="logisticsProvider" placeholder="abc"/>
//                          </div>
//                     </div>

//                     <div class="form-group row">
//                         <label for="deliveryDate" class="col-sm-2 col-form-label">Delivery Date</label>
//                         <div class="col-sm-10">
//                             <input type="date" class="form-control" id="deliveryDate" placeholder="today"/>
//                         </div>
//                     </div>

//                     <div class="form-group row">
//                         <label for="status" class="col-sm-2 col-form-label">Status</label>
//                         <div class="col-sm-10">
//                             <input type="text" class="form-control" id="status" placeholder=""/>
//                         </div>
//                     </div>
//                     <br></br>
//                     <div class="form-group row">
//                         <label for="upload" class="col-sm-2 col-form-label">Upload</label>
//                         <div class="col-sm-10">
//                             <input name='file' onChange={handleFile} type="file" class="form-control" id="upload" placeholder="file"/>
//                         </div>
//                     </div>
//                     <br></br>
//                     <button type="submit" class="btn btn-primary btn-block">Submit</button>
//                     <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                    
//                 </form>

//                 {/* <br/>
//                 <p > <b>Order ID : </b> {rowInfo[0]}</p>
//                 <p> <b>Logistics Provider :</b> <input></input> </p>
//                 <p> <b>Delivery Date :</b> <input></input> </p>
//                 <p> <b>Status :</b> <input></input> </p>
//                 <p> <b>Upload  : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span> */}
//                 {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
//                 {/* <br/>
//                 <button>submit</button>
//                 <button type="button"  onClick={onClose} className='close-modal' >close</button> */}
//             </div>
            
//         </div>
//     )

// }

// export default ShipmentModal



import { useState } from "react";
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";


const Test3Modal = ({open, onClose, rowInfo}) => {
      
  const [state, setState] = useState({
    minimumContribution: "",
    loading: false,
    errorMessage: ""
  })
  if(!open) return null

  const onSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, loading: true, errorMessage: "" });

    try {
        const accounts = await web3.eth.getAccounts();
        console.log('accounts', accounts);
        await factory.methods
          .createCampaign(state.minimumContribution)
          .send({
            from: accounts[0],
          });
       // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
     } 
    catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
    setState({ ...state, loading: false });
  };



  return (
    <>
            <div  className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Create a Request</h3>

          <Form onSubmit={onSubmit} error={!!state.errorMessage}>

          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={state.minimumContribution}
              onChange={(event) =>
                setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          
            
            <Message error header="Oops!" content={state.errorMessage} />
            <Button primary loading={state.loading}>
              Create!
            </Button>
            <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
             </Form>
      </div>
      </div>

    </>
  )
}
export default Test3Modal;