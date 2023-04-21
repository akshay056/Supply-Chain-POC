/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
// import React, { useState,useEffect,useMemo,useCallback} from 'react'
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// // import view from '../Assets/view2.png';
// import download from '../Assets/dwnld1.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PDFViewer from './PDFViewer';
// import Campaign from '../ethereum/campaign'
// import eye from '../Assets/view2.png';
// import downloadLogo from '../Assets/dwnld1.png';



// const PaymentList = () => {
//     let parameter;

//     // const [rowData] = useState([
//     //     {billno:'0123',materialname:'xyz',to:'trupti',amount:'3000',oderstatus:'delivered',paymentstatus:'done',billoflanding:''},
//     //     {billno:'0124',materialname:'xyz',to:'trupti',amount:'3000',oderstatus:'delivered',paymentstatus:'done',billoflanding:''},
//     //     {billno:'0125',materialname:'xyz',to:'trupti',amount:'3000',oderstatus:'delivered',paymentstatus:'done',billoflanding:''},
//     //     {billno:'0126',materialname:'xyz',to:'trupti',amount:'3000',oderstatus:'delivered',paymentstatus:'done',billoflanding:''},
//     //     {billno:'0127',materialname:'xyz',to:'trupti',amount:'3000',oderstatus:'delivered',paymentstatus:'done',billoflanding:''},
//     // ],
//     // );
//     const [openPDFModal, setOpenPDFModal] = useState(false);
//     const [rowData, setRowData] = useState();

//     const [columnDefs] = useState([
//         {
//             headerName: 'Sl.No',
//             valueGetter: "node.rowIndex + 1",
//             // flex: 1.5,
//             width:150
//         },
//         { field: 'billno', headerName: 'Bill No ', filter: true, width:150, sortable:true },
//         { field: 'make', headerName: 'To ', filter: true,  width:150,sortable:true },
//         { field: 'model', headerName: 'Material ', filter: true,  width:150,sortable:true },
//         { field: 'price', headerName: 'Amount ', filter: true,  width:150,sortable:true },
//         { field: 'oderstatus', headerName: 'Order Status ', filter: true,  width:150,sortable:true },
//         { field: 'paymentstatus', headerName: 'Payment Status ', filter: true,  width:150,sortable:true },
//         {field: 'billoflanding', headerName:'Bill Of Landing', flex:1.5, cellRendererFramework:()=>{

//             return(

//             //   <img src={view} alt="View" style={{width:15,height:15}} />, 
//             //   <img src={download} alt="Download" style={{width:15,height:15}} />

//              <><img src={view} alt="View" onClick={onViewClicked}  style={{width:25,height:20}}/>&nbsp;<img src={download} alt="Download" onClick={onDownloadClicked}  style={{width:25,height:20}} /></>


//                )

//          }},


//     ]);

//     const onViewClicked = ()=> {
//         // if(samplePDF){
//         //     if(samplePDF && fileType.includes(samplePDF.type)){
//         //         let reader = new FileReader()
//         //         reader.readAsDataURL(samplePDF)
//         //         reader.onload = ()=>{
//         //             setPDFFile(samplePDF)
//         //         }
//         //     }
//         //     else{
//         //         setPDFFile(null);
//         //     }
//         // }
//         console.log("cell clicked", parameter);
//         setOpenPDFModal(true);
//     }
//     const onDownloadClicked = () => {

//         // const aTag = document.createElement('a');

//         // document.body.appendChild(aTag);
//         // aTag.click();
//         // aTag.remove();
//         var pdf="data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";

//         console.log(pdf);
//         const linkSource =pdf;
//         const downloadLink = document.createElement("a");
//         const fileName = "file.pdf";
//         downloadLink.href = linkSource;
//         downloadLink.download = fileName;
//         downloadLink.click();
//      }

//     useEffect(() => {

//         fetch('https://www.ag-grid.com/example-assets/row-data.json')

//         .then(result => result.json())

//         .then(rowData => setRowData(rowData))

//     }, []);

//     return (
//         <div>
//              <h4>Payment List</h4><br />
//             <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
//                 <AgGridReact
//                     rowData={rowData}
//                     columnDefs={columnDefs}
//                     pagination={true}
//                     // defaultColDef={defaultColDef}

//                 />


//             </div>
//             <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} rowInfo={[1]}/>
//         </div>

//     )



// }
// export default PaymentList
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import TestModal from './TestModal';
// import './Table.css';
import Campaign from '../../ethereum/campaign'
// import TestRow from './TestRow';
// import { Button, Table } from "semantic-ui-react";
import PDFViewer from '../PDFViewer';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';
import fileDownload from 'js-file-download';


const PaymentList = () => {

  const [campaigns, setCampaigns] = useState([]);
  // const address = '0x3B9913F0BA1e1bea71f8dc1266046Cc87c1B5cD1';
  const [request, setRequest] = useState([])

  const [columnDefs, setColumnDefs] = useState([
    { field: 'orderID', headerName: 'OrderID', filter: true, flex: 1, filter: true, floatingFilter: true },
    { field: 'manufacturerName', headerName: 'To(Manufacturer)', filter: true, flex: 1.5, filter: true, floatingFilter: true },
    { field: 'supplierName', headerName: 'From(Supplier)', flex: 1.5 },
    {
      field: 'status', headerName: 'status', flex: 1.5, filter: true, floatingFilter: true, cellRendererFramework: (params) => {

        if (params.data.status) {
return <p>delivered</p>
} else {
return <p>In progress</p>
}
}},
    //  {
    //         field: 'doc', headerName: 'Documents', flex: 2,
    //         cellRendererFramework: (props) => {
    //           return (
    //             <Documents param={props} />
    //           );
    //         }
    //       },
    {
      field: 'billOfLanding', headerName: 'Bill of Landing', filter: true, flex: 1.5, cellRendererFramework: (params) => {
        console.log(params.data);
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.billOfLanding} data-col={params.colDef.headerName} 
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.billOfLanding} data-col={params.colDef.headerName} data-no={params.data.orderID}
              onClick={onDownloadClicked} />
          </div>
        )
      }
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    //autoHeight: true,
    //resizable: true
  }));
  useEffect(() => {
    const address = '0x8A59B3f39129379D39eC22cA815cA726BB395338'
    const campaign = Campaign(address);
    console.log('use effect campaign', campaign);
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
      setRequest(requests)
      console.log('useeffect requests', requests);
      return { address, requests, requestCount };
    })();


    return () => {

    }

  }, [])


  let parameter;
  const [pdfValue, setPdfValue] = useState();

  const [openPDFModal, setOpenPDFModal] = useState(false);
  const onViewClicked = (params) => {
    console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if (params.target.getAttribute('data-col') == 'Bill of Landing') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    console.log('parameterrrrrr', parameter);
    setOpenPDFModal(true);
  }

  const onDownloadClicked = (params) => {
    // var pdf = "https://gateway.pinata.cloud/ipfs/QmaNxbQNrJdLzzd8CKRutBjMZ6GXRjvuPepLuNSsfdeJRJ";
    const fileName = `${params.target.getAttribute('data-col')}_${params.target.getAttribute('data-no')}.pdf`;
    let pdf;
    if (params.target.getAttribute('data-col') == 'Bill of Landing') {
      // setPdfValue(params.target.getAttribute('data-view'))
       pdf=`https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    console.log("nadkncksndc",pdf);
    axios.get(pdf, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
  }


  return (
    <div>

      {/* <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}>Shipment  </h3></div><br /> */}
      {/* <button style={{position: 'relative', left:900}}>Create</button> */}
      {/* <button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'60px', right:'25px'}} onClick={createBtnClicked}>Create Request</button> */}
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <br />
      <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>

        <AgGridReact

          rowData={request} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties

          animateRows={true}
          // Optional - set to 'true' to have rows animate when sorted

          //onCellClicked={onCellClicked} 

          pagination={true}
        />

        {/* <RequestNew onClick={createBtnClicked} /> */}
        {/* <ShipmentModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]}/> */}
        {/* <TestModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]}/> */}
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
      </div>

    </div>
  )
}
export default PaymentList


