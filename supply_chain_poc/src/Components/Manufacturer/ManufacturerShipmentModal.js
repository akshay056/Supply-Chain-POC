import { useState } from "react";
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';

const TestModal = ({open, onClose, rowInfo}) => {
    const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
    const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
    const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
        
    const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });

    const [state, setState] = useState({
        orderID: "",
        manufacturerName: "",
        logisticsName: "",
        deliveryReceipt:"",
        loading: false,
        errorMessage: ""
      })
      if(!open) return null
    
      const onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
        const { deliveryReceipt } = state;

        setState({ ...state, loading: true, errorMessage: "" });
        
        try {
          const accounts = await web3.eth.getAccounts();
          const addPdfToIpfs = async (pdfFile) => {
            const result = await ipfs.add(pdfFile);
            return result.path;
          };
          const ipfsHash = await addPdfToIpfs(deliveryReceipt);
          if(deliveryReceipt == '')
          { alert('Please choose a file!!')}
          else{
          console.log('ipfs hash', ipfsHash);
          await campaign.methods
            .createManufacturerDelivery(ipfsHash,rowInfo)
            .send({ from: accounts[0] });
          }
            console.log("dsf");
        } catch (err) {
          setState({ ...state, errorMessage: err.message });
        }
        setState({ ...state, loading: false });
      };
    
      return (
        <>
                <div  className='overlay'>
                <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
              <h3>Upload DeliveryRecipt Report</h3>
              <br></br>
              <Form onSubmit={onSubmit} error={!!state.errorMessage}>
              {/* <Form.Field>
                <p > <b>Order ID : </b> {rowInfo[0]}</p>
                </Form.Field>*/}
                <Form.Field>
                {/* <label>DeliveryRecipt Report</label> */}
                    <Input type="file"
                    onChange={(event) =>
                        setState({...state, deliveryReceipt: event.target.files[0] })
                    }
                    />
                </Form.Field> 
                <Message error  content={state.errorMessage} />
                <Button loading={state.loading} class="btn btn-primary mb-2 ">
                  Upload
                </Button>
                <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                 </Form>
          </div>
          </div>
        </>
      )
}
export default TestModal;   