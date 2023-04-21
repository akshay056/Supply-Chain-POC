import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

//import './Report.css';
//import { Button } from 'react-bootstrap';

import Modal from './SupplierModal.js';

import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import uploadLogo from '../../Assets/upload.png';

import { Link } from "react-router-dom";
import PDFViewer from './SupplierPDFViewer';


import { Button, Table } from "semantic-ui-react";
import Campaign from '../../ethereum/campaign'

import axios from 'axios';
import fileDownload from 'js-file-download';

const SupplierReport = () => {
 const pdfURL = 'http://localhost:4000/orders';

 const [reportName, setReportName] = useState("rmReport");
 
 const [rowData, setRowData] = useState(); 
 
 
 const [columnDefs, setColumnDefs] = useState([
   {field: 'orderID', headerName: 'Order ID', filter: true, flex: 1.5},
//    {headerName: 'Reports', flex: 1.5, 
//             cellRendererFramework: (param) => {
//                 // console.log('param is', param);
//                 return (
//                     <ReportDropdown param={param} selectValue={(r) => setReportName(r)}/>
//                     // <ReportDropdown param={param}/>
//                 );
//     }},
{field: 'rmReport', headerName: 'RM Report', filter: true, flex: 1.5, cellRendererFramework:(params)=>{
    //parameter = params;
    return(
        <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.rmReport} data-col={params.colDef.headerName} 
            onClick={onViewClicked}/> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.rmReport} data-col={params.colDef.headerName}
            onClick={onDownloadClicked} /> 
        </div>
        
    )
}},
{field: 'qualityReport', headerName: 'Quality Report', filter: true, flex: 1.5, cellRendererFramework:(params)=>{
    return(
        <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.qualityReport} data-col={params.colDef.headerName}
            onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.qualityReport} data-col={params.colDef.headerName}
            onClick={onDownloadClicked} /> 
        </div>
        
    )
}},
{field: 'insuranceReport', headerName: 'Insurance Report', filter: true, flex: 1.5, cellRendererFramework:(params)=>{
    return(
        <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.insuranceReport} data-col={params.colDef.headerName} 
            onClick={onViewClicked}/> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.insuranceReport} data-col={params.colDef.headerName}
            onClick={onDownloadClicked} /> 
        </div>
        
    )
}},
    { headerName:'Upload', flex:1.5, cellRendererFramework:()=>{
        return(
            <img src={uploadLogo} style={{ height: 30, width: 30 }} />
        )
    }}
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     
     sortable: true,
        filter: true,
        //autoHeight: true,
        //resizable: true
   }));

 // Example of consuming Grid Event
//  const cellClickedListener = useCallback( event => {
//    console.log('cellClicked', event);
//  }, []);

 // Example load data from server
//  useEffect(() => {
//    fetch('http://localhost:4000/posts')
//    .then(result => result.json())
//    .then(rowData => setRowData(rowData))
//  }, []);

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

 
 const [openModal, setOpenModal] = useState(false);

 const [orderID, setOrderID] = useState();
 

 let parameter;

 const onUploadClicked = () => {
    console.log("cell clicked", parameter);
    setOpenModal(true);
    setOrderID(parameter.data.model);
    //setReportName(parameter.data.)
    
 };

 

 const [openPDFModal, setOpenPDFModal] = useState(false);
//  const fileType = ['application/pdf']
//  const [pdfFile, setPDFFile] = useState();
const [pdfValue, setPdfValue] = useState();
const onViewClicked = (params)=> {
    console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if(params.target.getAttribute('data-col') == 'RM Report'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    if(params.target.getAttribute('data-col') == 'Quality Report'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    if(params.target.getAttribute('data-col') == 'Insurance Report'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    //console.log('parameterrrrrr', parameter);
    //console.log("cell clicked", parameter);
    setOpenPDFModal(true);

 }

 

 const [openTestModal, setOpenTestModal] = useState(false);
 const[cellValue, setCellValue] = useState()  ;
const [arrayIndex, SetArrayIndex] = useState();

const onCellClicked = (params) => {
  console.log('oncell clicked', params);
  setCellValue(params.data.orderID) ;
  
  if(params.colDef.headerName == "Upload"){
    let arrFind = supplyData.findIndex((e, i) => {
      console.log('eeeeeee',e, i);
      return e.orderID === params.data.orderID 
    })
    console.log('arrFindindex',arrFind);
    setOpenModal(true);
    SetArrayIndex(arrFind);
  }
    
  }
  

  const onDownloadClicked = (params) => {
    console.log('download clicked',params.target.getAttribute('data-download'));
    let pdf;
        if(params.target.getAttribute('data-col') == 'RM Report'){
            const info = params.target.getAttribute('data-download')
             pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
        }
        if(params.target.getAttribute('data-col') == 'Quality Report'){
            const info = params.target.getAttribute('data-download')
             pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
        }
        if(params.target.getAttribute('data-col') == 'Insurance Report'){
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

 return (
   <div>
    <h3>Reports</h3><br />
     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
       <AgGridReact
           rowData={rowData} // Row Data for Rows
           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           
           onCellClicked={onCellClicked} 

           pagination={true}
        />

        <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={arrayIndex}/>
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue}/>
     </div>
   </div>
 );
};

export default SupplierReport;