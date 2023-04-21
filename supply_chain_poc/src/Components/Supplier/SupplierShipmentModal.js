import { useState } from "react";
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';


const ShipmentModal = ({open, onClose, rowInfo}) => {
  const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
      
  const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });
  
  const [state, setState] = useState({
    logisticsName: '',
    shipmentDetailsReport: '',
  })
  if(!open) return null

  const onSubmit = async () => {
    
    const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
    const { logisticsName, shipmentDetailsReport } = state;

    //setState({ ...state, loading: true, errorMessage: "" });

    try {
        const accounts = await web3.eth.getAccounts();

        const addPdfToIpfs = async (pdfFile) => {
          const result = await ipfs.add(pdfFile);
          return result.path;
        };

        const ipfsHash = await addPdfToIpfs(shipmentDetailsReport);
      
        console.log('ipfs hash', ipfsHash);

        await campaign.methods
          .createSupplierShipment(logisticsName, ipfsHash,rowInfo)
          .send({
            from: accounts[0],
          });
       // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
     } 
    catch (err) {
      console.log(err.message)
      setState({ ...state, errorMessage: err.message });
    }
    //setState({ ...state, loading: false });
  };



  return (
    <>
            <div  className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Create a Request</h3>

          <Form onSubmit={onSubmit} error={!!state.errorMessage}>
          <div class="form-group row">
              <label  class="col-sm-2 col-form-label">Logistics Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control"  
                            alue={state.logisticsName}
                            onChange={(event) =>
                                setState({ ...state, logisticsName: event.target.value })
                             }
                    />
                </div>
            </div>
            <br/>
          <div class="form-group row">
              <label  class="col-sm-2 col-form-label">Shipment Details</label>
                <div class="col-sm-10">
                  <input  type="file" class="form-control"  
                  onChange={(event) =>
                    setState({ ...state, shipmentDetailsReport: event.target.files[0] })
                  }
                  placeholder="file"/>
              </div>
          </div>
          {/* <Form.Field>
            <label>Logistics Name</label>
            <Input
              value={state.logisticsName}
              onChange={(event) =>
                setState({ ...state, logisticsName: event.target.value })
              }
            />
          </Form.Field>
          <br/>
          
          <Form.Field>
            <label>Shipment Details</label>
            <Input
              type="file"
              onChange={(event) =>
                setState({ ...state, shipmentDetailsReport: event.target.files[0] })
              }
            />
          </Form.Field>
          <br/>
            <Message error  content={state.errorMessage} />
            <br/>
            <Button primary loading={state.loading}>
              Create!
            </Button> */}

            <br></br>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
            <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
             </Form>
      </div>
      </div>
    </>
  )
}
export default ShipmentModal;