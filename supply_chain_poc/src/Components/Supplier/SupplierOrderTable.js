// import { useState, memo, useRef, useCallback, useEffect } from "react";
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles//ag-grid.css';
// import 'ag-grid-community/styles//ag-theme-alpine.css';
// import "./OrderTable.css";
// import downloadLogo from '../Assets/download-logo.png';
// import eye from '../Assets/eye.png';
// import pdf from '../Assets/Supplier.pdf'
// import OrderPDFViewer from './OrderPDFViewer';
// import ReactDOM from 'react-dom'
// import React from 'react'

// function Table() {
//     let gridApi;
//     const gridRef = useRef();
//     let parameter;
//     const onExportClick = () => {
//         gridApi.exportDataAsCsv();
//     }

//     const [openModal, setOpenModal] = useState(false);
//     const [clickedRowDataEmployeeId, setclickedRowDataEmployeeId] = useState();
//     const [clickedRowDataFirstName, setclickedRowDataFirstName] = useState();
//     const [clickedRowDatAddress, setclickedRowDatAddress] = useState();

//     const onButtonClick = () => {
//         // using Java Script method to get PDF file
//         fetch('http://localhost:4000/orders').then(response => {
//             response.blob().then(blob => {
//                 // Creating new object of PDF file
//                 const fileURL = window.URL.createObjectURL(blob);
//                 // Setting various property values
//                 let alink = document.createElement('a');
//                 alink.href = fileURL;
//                 alink.download = 'http://localhost:4000/orders';
//                 alink.click();
//             })
//         })
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
//      const [openPDFModal, setOpenPDFModal] = useState(false);
//      //  const fileType = ['application/pdf']
//      //  const [pdfFile, setPDFFile] = useState();
//       const onViewClicked = ()=> {
//          // if(samplePDF){
//          //     if(samplePDF && fileType.includes(samplePDF.type)){
//          //         let reader = new FileReader()
//          //         reader.readAsDataURL(samplePDF)
//          //         reader.onload = ()=>{
//          //             setPDFFile(samplePDF)
//          //         }
//          //     }
//          //     else{
//          //         setPDFFile(null);
//          //     }
//          // }
//          console.log("cell clicked", parameter);
//          setOpenPDFModal(true);
     
//       }
//     // function handleClick(params) {
//     //     setOpenModal(true);
//     //     setclickedRowDataEmployeeId(params.data.employeeId);
//     //     setclickedRowDataFirstName(params.data.firstName);
//     //     setclickedRowDatAddress(params.data.address);
//     //     console.log("menu clicked", params.data);

//     // }

//     useEffect(() => {
//         fetch(`http://localhost:4000/posts`)
//             .then(response => response.json())
//             .then(response => {

//                 console.log("response is ", response);
//                 setRowData(response)
//             })
//     }, [])

//     const removeRenderer = memo((props) => {
//         return <i class="fa fa-times-circle"></i>;
//     });

//     const [rowData, setRowData] = useState()

//     const [columnDefs] = useState([
//         { field: 'orderID', headerName: 'Order ID', filter: true, sortable: true, checkboxSelection: true, headerCheckboxSelection: true, floatingFilter: true, flex: 1 },
//         // { field: 'orderID', headerName: 'Order ID', filter: true, sortable: true, floatingFilter: true, flex: 1 },
//         { field: 'from', filter: true, sortable: true, floatingFilter: true, flex: 1.50 },
//         { field: 'date', filter: true, sortable: true, floatingFilter: true, flex: 1.50  },
//         { field: 'status', filter: true, sortable: true, floatingFilter: true, flex: 1 },
//         // { field: 'address', floatingFilter: true, flex: 2 },
//         // {
//         //     flex: 0.75, cellRendererFramework: (param) =>
//         //         <button type="button" class="btn btn-primary" onClick={() => handleClick(param)}>send</button>
//         // },
//         // {
//         //     field:'view Invoice', flex: 1, cellRendererFramework: (param) =>
//         //           <button type="button" class="btn btn-primary" style={{width:'50%',backgroundColor:'white', border:'none'}}><a href={pdf} target="_blank" ><img src={view} style={{width:'100%' ,height:'100%'}} onClick={onViewClicked}></img> </a></button>
//         //     },

//         {
//             field:'view Invoice', flex: 1, cellRendererFramework: (param) =>
//             <img src={eye } onClick={onViewClicked} style={{ height: 35, width: 30 }}/>
            
//             },
            
//            //  {
//            //     field:'download Invoice', flex: 1.75, cellRendererFramework: (param) =>
//            //           <button type="button" class="btn btn-primary" >Download</button>
//            //     }
   
//            {
//                field:'download Invoice', flex: 1.75, cellRendererFramework: (param) =>
//                <img src={downloadLogo} onClick={onDownloadClicked} style={{ height: 30, width: 30 }} />
//                }

//     ]);

//     // const onSelectionChanged = useCallback(() => {
//     //     const selectedRows = gridRef.current.api.getSelectedRows();
//     //     console.log("gridRef", gridRef, selectedRows)

//     // }, []);
//     // function getData(data) {
//     //     console.log("data Received",data);
//     //     setgetdatafromchild(data);
//     // }

//     return (
        // <>
        //     <>
        //         <br />
        //         <h4 style={{ color: "" }}>Order List</h4>
        //         <div
        //             className="ag-theme-alpine"
        //             style={{
        //                 height: '500px',
        //                 width: 'auto'
        //             }}
        //         >
        //             <AgGridReact style={{ width: '100%', height: '100%;' }}
        //                 ref={gridRef}
        //                 columnDefs={columnDefs}
        //                 rowData={rowData}
        //                 pagination={true}
        //                 // onSelectionChanged={onSelectionChanged}
        //                 paginationPageSize={8}>
        //             </AgGridReact>
        //         </div>
        //         {/* <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={[clickedRowDataEmployeeId, clickedRowDataFirstName, clickedRowDatAddress]} /> */}
        //         <OrderPDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={[1]}/>
        //     </>
        // </>
//     )
// }
// export default Table;
import { useState, memo, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
//import pdf from '../Assets/Supplier.pdf'
import PDFViewer from '../PDFViewer';
import ReactDOM from 'react-dom'
import React from 'react'
import Campaign from '../../ethereum/campaign'
import SupplierOrderListModal from './SupplierOrderListModal';
import axios from 'axios';
import fileDownload from 'js-file-download';


function Table() {
  let gridApi;
  const gridRef = useRef();
  let parameter;
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }

  const [openModal, setOpenModal] = useState(false);
  const [clickedRowDataEmployeeId, setclickedRowDataEmployeeId] = useState();
  const [clickedRowDataFirstName, setclickedRowDataFirstName] = useState();
  const [clickedRowDatAddress, setclickedRowDatAddress] = useState();
  const onDownloadClicked = (params) => {
    console.log('download clicked',params.target.getAttribute('data-download'));
    let pdf;
        if(params.target.getAttribute('data-col') == 'Invoice'){
            const info = params.target.getAttribute('data-download')
             pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
        }
      
    // console.log(pdf);
    // const linkSource =pdf;
    // const downloadLink = document.createElement("a");
    const fileName = "file.pdf";
    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.click();
    axios.get(pdf, {
    responseType: 'blob',
    })
    .then((res) => {
    fileDownload(res.data, fileName)
    })
  }  


  const [openPDFModal, setOpenPDFModal] = useState(false);
  const[pdfValue, setPdfValue] = useState();
  const onViewClicked = (params) => {
  console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if (params.target.getAttribute('data-col') == 'Invoice') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    console.log('parameterrrrrr', parameter);
    setOpenPDFModal(true);
  }
  const [campaigns, setCampaigns] = useState([]);
  // const address = '0x3B9913F0BA1e1bea71f8dc1266046Cc87c1B5cD1';
  const removeRenderer = memo((props) => {
    return <i class="fa fa-times-circle"></i>;
  });
  const [rowData, setRowData] = useState()
  const [columnDefs] = useState([
    { field: 'orderID', headerName: 'Order ID', filter: true, flex: 1, filter: true, floatingFilter: true },
    { field: 'manufacturerName', headerName: 'Manufacturer Name', filter: true, flex: 1, filter: true, floatingFilter: true },
    { field: 'logisticsName', headerName: 'Logistics Name', flex: 1.5, filter: true, floatingFilter: true },
    { field: 'status', headerName: 'Status', flex: 0.75, filter: true, floatingFilter: true, cellRendererFramework:(params)=> {
      if(params.data.status){
        return <p>delivered</p>
      }else{
        return <p>in progress</p>
      }} },
    {
      field: 'invoiceReport', headerName: 'Invoice', filter: true, flex: 1.5, cellRendererFramework: (params) => {
      console.log(params.data);
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.invoiceReport} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.invoiceReport} data-col={params.colDef.headerName}
              onClick={onDownloadClicked} />
          </div>
        )
      }
    },
  ]);
  const [request, setRequest] = useState([])
  const [supplyData, setSupplyData]  = useState();
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
      setRequest(requests)
      setSupplyData(requests)
      console.log('useeffect requests', requests);
      setRowData(requests);
      return { address, requests, requestCount };
    } )();
    
      
      return () => {
          
      }
     
   },[])
  const [shipmentCreate, setShipmentCreate] = useState(false);
  const createBtnClicked = () => {
    setShipmentCreate(true);
  }
  return (
    <>
      <>
        {/* <button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'13px', right:'25px'}} onClick={createBtnClicked}>Create Delivery Reciept</button> */}
        <br />
        <h4 style={{ color: "" }}>Order List</h4>
        <div
          className="ag-theme-alpine"
          style={{
            height: '500px',
            width: 'auto'
          }}
        >
          <AgGridReact style={{ width: '100%', height: '100%;' }}
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={rowData}
            pagination={true}
            paginationPageSize={8}>
          </AgGridReact>
        </div>
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
        <SupplierOrderListModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]} />
      </>
    </>
  )
}
export default Table;