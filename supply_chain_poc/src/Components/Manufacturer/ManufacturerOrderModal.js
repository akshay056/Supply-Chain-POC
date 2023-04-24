import { useState, useEffect } from "react";
import './Modalpopup.css';
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";
import { Buffer } from "safe-buffer";
import { create as ipfsClient } from 'ipfs-http-client';

function Modalpoppup(props) {
  const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth, }, });
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState({
    orderId: "",
    manufacturerName: '',
    supplierName: '',
    invoiceReport: '',
  })

  const closeHandler = () => {
    props.closeFunction(true)
  }

  const onSubmit = async () => {
    const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
    const { orderId, manufacturerName, supplierName, invoiceReport } = state;

    try {
      const accounts = await web3.eth.getAccounts();
      const addPdfToIpfs = async (pdfFile) => {
        const result = await ipfs.add(pdfFile);
        return result.path;
      };
      const ipfsHash = await addPdfToIpfs(invoiceReport);
      await campaign.methods
        .createManufacturerInvoice(orderId, manufacturerName, supplierName, ipfsHash)
        .send({
          from: accounts[0],
        });
    }
    catch (err) {
      console.log(err.message)
      setState({ ...state, errorMessage: err.message });
    }
  };

  return (
    <>
      <div id="myModal" class="modal1">
        <div class="modal-content1">
          <div className='cross'>
            <span class="close" onClick={closeHandler}>&times;</span>
          </div>
          <h3 className='popup-header'>New Order Request</h3>
          <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <Form.Field >
              <label className='form-label'>Order Id</label>
              <Input
                value={state.orderId}
                placeholder="Enter OrderId"
                onChange={(event) =>
                  setState({ ...state, orderId: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label className='form-label'>Order By</label>
              <Input
                value={state.manufacturerName}
                placeholder="Enter OrderBy"
                onChange={(event) =>
                  setState({ ...state, manufacturerName: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label className='form-label'>Supplier Name</label>
              <Input
                value={state.supplierName}
                placeholder="Enter Supplier Name"
                onChange={(event) =>
                  setState({ ...state, supplierName: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label className='form-label'>invoice Report</label>
              <Input
                type="file"
                onChange={(event) =>
                  setState({ ...state, invoiceReport: event.target.files[0] })
                }
              />
            </Form.Field>
            <Message error header="" content={state.errorMessage} /><br></br>
            <Button primary loading={state.loading}>
              Create!
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Modalpoppup;