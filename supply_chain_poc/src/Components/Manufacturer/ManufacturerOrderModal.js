
import { useState, useEffect } from "react";
import './Modalpopup.css';
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';

function Modalpoppup(props){
  const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
      
  const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });
const [startDate, setStartDate] = useState(new Date());
const [state, setState] = useState({
  orderId: "",
  manufacturerName: '',
  supplierName: '',
  invoiceReport:'',
})
// useEffect(()=>{
//   console.log("date", startDate);
//   let date = new Date(startDate).toISOString()
//   console.log("date1", date);
//   setState({orderdate:date})
// },[startDate])
  const [file, setFile] = useState();
    const closeHandler =()=>{
        props.closeFunction(true)   
    }
  //   const handleFileChange = (e) => {
  //     if (e.target.files) {
  //       console.log("choose file",e.target.files)
  //       localStorage.setItem('filetype', e.target.files[0].name);
  //       setFile(e.target.files[0]);
  //     }
  //   };
  //   const handleUploadClick = () => {
  //     if (!file) {
  //       return;
  //     }
      
  //      // 👇 Uploading the file using the fetch API to the server
  //   fetch('https://httpbin.org/post', {
  //     method: 'POST',
  //     body: file,
  //     // 👇 Set headers manually for single file upload
  //     headers: {
  //       'content-type': file.type,
  //       'content-length': `${file.size}`, // 👈 Headers need to be a string
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data",data)
  //       localStorage.setItem("files",data.data)

  //      props.closeFunction(true)  
  //     })

  //     .catch((err) => console.error(err));
  // };

  // static async getInitialProps(props) {
  //   const { address } = props.query;

  //   return { address };
  // }

//   const onSubmit = async (event) => {
//     event.preventDefault();

//     const campaign = Campaigndata(this.props.address);
//     const { orderId, inspectedby,approvedby, value, recipient } = state;

//     setState({ ...state, loading: true, errorMessage: "" });

//     try {
//       const accounts = await web3.eth.getAccounts();
//         await campaign.methods
//           // .createRequest(orderId, inspectedby,approvedby, web3.utils.toWei(value, "ether"), recipient)
//           .createMenufacturerrequest(orderId, inspectedby,approvedby, web3.utils.toWei(value, "ether"), recipient)
//           .send({ from: accounts[0] });
//         // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
 
//     } catch (err) {
//       setState({...state, errorMessage: err.message });
//     }
//  setState({...state, loading: false });
//   };

   const handleFileChange = (e) => {
      if (e.target.files) {
        console.log("choose file",e.target.files)
        setState({ ...state,invoice: e.target.files[0].name })
      }
    };

// const onSubmit = async (event) => {
//   // const campaign = Campaign('0xCfc149935fc57b5172E388d80bC0638462EdBe0f');
//   // console.log("date", startDate);
//   // let date = new Date(startDate).toISOString()
//   // console.log("date1", date);
//   // setState({...state, orderdate: date })
//   console.log("state", state);
//   const campaign = Campaign('0x1dB40cF4F4Abac69249b5CaCe46c6275ED1F845b');
//   const { orderId, orderBy, orderdate, suppliername, invoice } = state;
// console.log("state", state);
//   try {
//     const accounts = await web3.eth.getAccounts();

//     await campaign.methods
//       .createRequest(orderId, orderBy, orderdate, suppliername, invoice)
//       .send({ from: accounts[0] });
    
      
      
//     // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
//   } catch (err) {
//     console.log("error", err)
//   }
// };
const onSubmit = async () => {
    
  const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
  const { orderId, manufacturerName, supplierName, invoiceReport } = state;

  //setState({ ...state, loading: true, errorMessage: "" });

  try {
      const accounts = await web3.eth.getAccounts();

      const addPdfToIpfs = async (pdfFile) => {
        const result = await ipfs.add(pdfFile);
        return result.path;
      };

      const ipfsHash = await addPdfToIpfs(invoiceReport);
      
      console.log('ipfs hash', ipfsHash);

      await campaign.methods
        .createManufacturerInvoice(orderId, manufacturerName, supplierName, ipfsHash)
        .send({
          from: accounts[0],
        });
     // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
   } 
  catch (err) {
    console.log(err.message)
    setState({ ...state, errorMessage: err.message });
  }
};
   
    return(
    <>

<div id="myModal" class="modal1">
  <div class="modal-content1">
    {/* <div className='cross'>
    <span class="close" onClick={closeHandler}>&times;</span>
    </div>
   <div>
   <div className='orderid'>
    <p>Order Id</p>
    <input type='text' placeholder='01234' />
   </div>
   <div className='orderid'>
   <p>Order Name</p>
    <input type='text' placeholder='Trupti' />
   </div>
   <div className='orderid'>
   <p>Upload Invoice</p>
  
   <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

    
          
   </div>
   <div className='sub'>
   <button className="button" onClick={handleUploadClick}>Submit</button>
   </div>
 
   </div> */}



           <div className='cross'>
    <span class="close" onClick={closeHandler}>&times;</span>
    </div>
        <h3 className = 'popup-header'>New Order Request</h3>
        <Form onSubmit={onSubmit} error={!!state.errorMessage}>
          <Form.Field >
            <label className = 'form-label'>Order Id</label>
            <Input
              value={state.orderId}
              placeholder="Enter OrderId"
              onChange={(event) =>
                setState({ ...state,orderId: event.target.value })
              }
            />
          </Form.Field>
           <Form.Field>
            <label  className = 'form-label'>Order By</label>
            <Input
              value={state.manufacturerName}
              placeholder="Enter OrderBy"
              onChange={(event) =>
                setState({ ...state, manufacturerName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label className = 'form-label'>Supplier Name</label>
            <Input
              value={state.supplierName}
              placeholder="Enter Supplier Name"
              onChange={(event) =>
                setState({ ...state, supplierName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label className = 'form-label'>invoice Report</label>
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