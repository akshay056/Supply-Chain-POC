import React, { useState } from 'react';
import "./SupplierModal.css";
import { Form, Message } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Buffer } from "safe-buffer";
import { create as ipfsClient } from 'ipfs-http-client';

const Modal = ({ open, onClose, rowInfo }) => {

  const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth, }, });

  const [state, setState] = useState({
    rmReport: "",
    qualityReport: '',
    insuranceReport: '',
  })
  if (!open) return null

  const onSubmit = async () => {
    const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
    const { rmReport, qualityReport, insuranceReport } = state;

    try {
      const accounts = await web3.eth.getAccounts();
      const addPdfToIpfs = async (pdfFile) => {
        const result = await ipfs.add(pdfFile);
        return result.path;
      };

      const ipfsHash = await addPdfToIpfs(rmReport);
      const ipfsHash2 = await addPdfToIpfs(qualityReport);
      const ipfsHash3 = await addPdfToIpfs(insuranceReport);

      await campaign.methods
        .createSupplierReports(ipfsHash, ipfsHash2, ipfsHash3, rowInfo)
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
    <div>
      <div className='overlay'>
        <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Upload reports</h3>
          <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">RM Report</label>
              <div class="col-sm-10">
                <input type="file" class="form-control"
                  onChange={(event) =>
                    setState({ ...state, rmReport: event.target.files[0] })
                  }
                  placeholder="file" />
              </div>
            </div>
            <br />
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Quality Report</label>
              <div class="col-sm-10">
                <input type="file" class="form-control"
                  onChange={(event) =>
                    setState({ ...state, qualityReport: event.target.files[0] })
                  }
                  placeholder="file" />
              </div>
            </div>
            <br />
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Insurance Report</label>
              <div class="col-sm-10">
                <input type="file" class="form-control"
                  onChange={(event) =>
                    setState({ ...state, insuranceReport: event.target.files[0] })
                  }
                  placeholder="file" />
              </div>
            </div>
            <Message error  content={state.errorMessage} />
            <br/>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
            <button type="button" onClick={onClose} class="btn btn-danger mb-2 " style={{ position: 'absolute', top: '10px', right: '10px' }}>close</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Modal