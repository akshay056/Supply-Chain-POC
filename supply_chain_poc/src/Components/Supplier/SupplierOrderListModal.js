import { useState } from "react";
import React from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Buffer } from "safe-buffer";
import { create as ipfsClient } from 'ipfs-http-client';

const OrderListModal = ({ open, onClose, rowInfo }) => {
  const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth, }, });

  const [state, setState] = useState({
    orderID: "",
    manufacturerName: "",
    logisticsName: "",
    invoiceReport: "",
    loading: false,
    errorMessage: ""
  })
  if (!open) return null

  const onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign('0x780c66A89ae42514c9e54bb7Ce95Dff7A5332816');
    const { orderID, manufacturerName, logisticsName, invoiceReport } = state;

    setState({ ...state, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      const addPdfToIpfs = async (pdfFile) => {
        const result = await ipfs.add(pdfFile);
        return result.path;
      };
      const ipfsHash = await addPdfToIpfs(invoiceReport);
      debugger;
      await campaign.methods
        .createRequest(orderID, manufacturerName, logisticsName, ipfsHash)
        .send({ from: accounts[0] });
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
    setState({ ...state, loading: false });
  };

  return (
    <>
      <div className='overlay'>
        <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Create Delivery Reciept</h3>
          <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <Form.Field>
              <label>orderID</label>
              <Input
                value={state.orderID}
                onChange={(event) =>
                  setState({ ...state, orderID: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Manufacturer Name</label>
              <Input
                value={state.manufacturerName}
                onChange={(event) =>
                  setState({ ...state, manufacturerName: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Logistics Name</label>
              <Input
                value={state.logisticsName}
                onChange={(event) =>
                  setState({ ...state, logisticsName: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Upload</label>
              <Input type="file"
                onChange={(event) =>
                  setState({ ...state, invoiceReport: event.target.files[0] })
                }
              />
            </Form.Field>
            <Message error content={state.errorMessage} />
            <Button primary loading={state.loading} >
              Create!
            </Button>
            <button type="button" onClick={onClose} class="btn btn-danger mb-2 " style={{ position: 'absolute', top: '10px', right: '10px' }}>close</button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default OrderListModal;   