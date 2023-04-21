
import { Position } from '@react-pdf-viewer/core';
import React, { useState } from 'react';
import "./SupplierModal.css";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';

const Modal = ({ open, onClose, rowInfo }) => {
    // const [file, setFile] = useState();

    // if (!open) return null

    // function handleFile(event) {
    //     setFile(event.target.files[0])
    //     console.log(file)
    // }
    const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
      
  const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });

  const [state, setState] = useState({
    rmReport: "",
    qualityReport: '',
    insuranceReport: '',
  })
  if(!open) return null

  const onSubmit = async () => {
    
    const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
    const { rmReport, qualityReport, insuranceReport} = state;

    //setState({ ...state, loading: true, errorMessage: "" });

    try {
        const accounts = await web3.eth.getAccounts();

        const addPdfToIpfs = async (pdfFile) => {
          const result = await ipfs.add(pdfFile);
          return result.path;
        };

        const ipfsHash = await addPdfToIpfs(rmReport);
        const ipfsHash2 = await addPdfToIpfs(qualityReport);
        const ipfsHash3 = await addPdfToIpfs(insuranceReport);
        
        console.log('ipfs hash', ipfsHash);

        await campaign.methods
          .createSupplierReports(ipfsHash, ipfsHash2, ipfsHash3, rowInfo)
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
        // <div onClick={onClose} className='overlay'>
        //     <div onClick={(e) => e.stopPropagation()} className='modal-content ' >

        //         <h5>Report upload</h5>
        //         {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}

        //         <br />
        //         <form >
        //             <div >
        //                 <div class="form-group row">
        //                     <label for="orderID" class="col-sm-2 col-form-label">Order ID</label>
        //                     <div class="col-sm-10">
        //                         <input type="text" class="form-control" id="orderID" placeholder={rowInfo[0]}/>
        //                     </div>
        //                 </div>
        //                 <br/>
        //                 <div class="form-group row">
        //                     <label for="dateOfInspection" class="col-sm-2 col-form-label">Date of inspection</label>
        //                     <div class="col-sm-10">
        //                         <input type="date" class="form-control" id="dateOfInspection" placeholder="today"/>
        //                     </div>
        //                 </div>
                    
        //                 <div class="form-group row">
        //                     <label for="inspectedBy" class="col-sm-2 col-form-label">Inspected By</label>
        //                     <div class="col-sm-10">
        //                         <input type="text" class="form-control" id="inspectedBy" placeholder="jay"/>
        //                     </div>
        //                 </div>
               
        //                 <div class="form-group row">
        //                     <label for="approvedBy" class="col-sm-2 col-form-label">Approved By</label>
        //                     <div class="col-sm-10">
        //                         <input type="text" class="form-control" id="approvedBy" placeholder="mike"/>
        //                     </div>
        //                 </div>
        //                 <br/>
        //                 <div class="form-group row">
        //                     <label for="upload" class="col-sm-2 col-form-label">Upload</label>
        //                     <div class="col-sm-10">
        //                         <input name='file' onChange={handleFile} type="file" class="form-control" id="upload" placeholder="file"/>
        //                     </div>
        //                 </div>

        //                 {/* <p> <b>Upload : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span> */}
        //                 {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
        //                 <br />
        //                 {/* <button>submit</button>
        //                 <button type="button"  onClick={onClose} className='close-modal' >close</button> */}
        //                 <button type="submit" class="btn btn-primary btn-block">Submit</button>
        //                 <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                        

                        
        //             </div>

        //         </form>

        //     </div>

        // </div>
        <div>
            
            <div  className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Upload reports</h3>

          <Form onSubmit={onSubmit} error={!!state.errorMessage}>

          <div class="form-group row">
              <label  class="col-sm-2 col-form-label">RM Report</label>
                <div class="col-sm-10">
                  <input  type="file" class="form-control"  
                  onChange={(event) =>
                    setState({ ...state, rmReport: event.target.files[0] })
                  }
                  placeholder="file"/>
              </div>
          </div>
          <br/>
          <div class="form-group row">
              <label  class="col-sm-2 col-form-label">Quality Report</label>
                <div class="col-sm-10">
                  <input  type="file" class="form-control"  
                  onChange={(event) =>
                    setState({ ...state, qualityReport: event.target.files[0] })
                  }
                  placeholder="file"/>
              </div>
          </div>
          <br/>
          <div class="form-group row">
              <label  class="col-sm-2 col-form-label">Insurance Report</label>
                <div class="col-sm-10">
                  <input  type="file" class="form-control"  
                  onChange={(event) =>
                    setState({ ...state, insuranceReport: event.target.files[0] })
                  }
                  placeholder="file"/>
              </div>
          </div>

          {/* <Form.Field>
            <label class="col-sm-2 col-form-label">RM Report</label>
            <Input
            class="form-control"
              type="file"
              onChange={(event) =>
                setState({ ...state, rmReport: event.target.files[0] })
              }
            />
          </Form.Field>
          <br/>
          
          <Form.Field>
            <label>Quality Report</label>
            <Input
              type="file"
              onChange={(event) =>
                setState({ ...state, qualityReport: event.target.files[0] })
              }
            />
          </Form.Field>
          <br/>
          
          <Form.Field>
            <label>Insurance Report</label>
            <Input
              type="file"
              onChange={(event) =>
                setState({ ...state, insuranceReport: event.target.files[0] })
              }
            />
          </Form.Field>
          <br/>
          
            <Message error  content={state.errorMessage} />
            <br/>
            <Button primary loading={state.loading}>
              Create!
            </Button> */}
            <br/>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
            <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
             </Form>
      </div>
      </div>
  
        </div>
    )

}

export default Modal