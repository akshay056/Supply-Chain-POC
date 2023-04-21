
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';

import ShipmentModal from './SupplierShipmentModal';
import PDFViewer from './SupplierPDFViewer';

import './SupplierShipment.css';


import { Button, Table } from "semantic-ui-react";
import Campaign from '../../ethereum/campaign'

import axios from 'axios';
import fileDownload from 'js-file-download';

const SupplierShipment = () => {
  const [rowData, setRowData] = useState(); 
  let rowValue;
  let rowValue2;
  let rowValue3;

  const [columnDefs, setColumnDefs] = useState([
  {field: 'orderID', headerName: 'OrderID', filter: true, flex: 1, filter: true,floatingFilter: true},
  {field: 'logisticsName', headerName: 'Logistics Provider', filter: true, flex: 1, filter: true,floatingFilter: true},
    {field: 'status', headerName:'Status', flex:1, cellRendererFramework:(params)=> {
      if(params.data.status){
        return <p>delivered</p>
      }else{
        return <p>In progress</p>
      }
    }},
    {field:'shipmentDetailsReport', headerName: 'Shipment Details',  flex: 1, filter: true,floatingFilter: true, cellRendererFramework:(params)=>{
      rowValue = params;
      return(
          <div >
              <img  src={eye} title="view" data-view={params.data.shipmentDetailsReport} data-col={params.colDef.headerName} 
              onClick={onViewClicked} style={{ height: 35, width: 30 }}/> &nbsp;&nbsp;
              <img src={downloadLogo} title="download " data-download={params.data.shipmentDetailsReport} data-col={params.colDef.headerName}
              onClick={onDownloadClicked} style={{ height: 30, width: 30 }}/> 
          </div>
          
      )
    }},
    {field:'billOfLanding', headerName: 'Bill Of Landing',  flex: 1, cellRendererFramework:(params)=>{
      rowValue = params;
        return(
            <div >
                <img  src={eye} title="view" data-view={params.data.billOfLanding} data-col={params.colDef.headerName}
                onClick={onViewClicked} style={{ height: 35, width: 30 }}/> &nbsp;&nbsp;
                <img src={downloadLogo} title="download " data-download={params.data.billOfLanding} data-col={params.colDef.headerName}
                onClick={onDownloadClicked} style={{ height: 30, width: 30 }}/>
            </div>
            
        )
    }},
    {field:'deliveryRecipt', headerName:'Delivery Recipt', flex: 1, cellRendererFramework:(params)=>{
      rowValue = params;
        return(
            <div>
                <img  src={eye} title="view" data-view={params.data.deliveryRecipt} data-col={params.colDef.headerName}
                onClick={onViewClicked} style={{ height: 35, width: 30 }}/> &nbsp;&nbsp;
                <img src={downloadLogo} title="download " data-download={params.data.deliveryRecipt} data-col={params.colDef.headerName}
                onClick={onDownloadClicked} style={{ height: 30, width: 30 }}/>
            </div>
            
        )
    }},
    { headerName:'Upload', flex: 1.5, cellRendererFramework:(params)=>{
      rowValue = params;
        return(
            <div>
              <button class="btn btn-primary mb-2 "  >Shipment Request</button>
                {/* <img src={uploadLogo} title="upload "  style={{ height: 30, width: 30 }}/> */}
            </div>
            
        )
    }},
    
  ]);

  const defaultColDef = useMemo( ()=> ({
     
    sortable: true,
       filter: true,
       //autoHeight: true,
       //resizable: true
       
  }));
   
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
    
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [pdfValue, setPdfValue] = useState('');
  
  const onViewClicked = (params)=> {
    console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if(params.target.getAttribute('data-col') == 'Shipment Details'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    if(params.target.getAttribute('data-col') == 'Bill Of Landing'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    if(params.target.getAttribute('data-col') == 'Delivery Recipt'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    //console.log('parameterrrrrr', parameter);
    //console.log("cell clicked", parameter);
    setOpenPDFModal(true);

 }

 const onDownloadClicked = (params) => {
  console.log('download clicked',params.target.getAttribute('data-download'));
  let pdf;
      if(params.target.getAttribute('data-col') == 'Shipment Details'){
          const info = params.target.getAttribute('data-download')
           pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
      }
      if(params.target.getAttribute('data-col') == 'Bill Of Landing'){
          const info = params.target.getAttribute('data-download')
           pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
      }
      if(params.target.getAttribute('data-col') == 'Delivery Recipt'){
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

 const [openTestModal, setOpenTestModal] = useState(false);
 const[cellValue, setCellValue] = useState()  ;

const [arrayIndex, SetArrayIndex] = useState();
const onCellClicked = (params) => {
  console.log('oncell clicked', params);
  setCellValue(params.data.orderID) ;
  if(params.colDef.headerName == 'Upload'){
    
    setShipmentCreate(true);
    
    let arrFind = supplyData.findIndex((e, i) => {
      console.log('eeeeeee',e, i);
      return e.orderID === params.data.orderID 
    })
    console.log('arrFind',arrFind);
    SetArrayIndex(arrFind);
  }
  }

    return(
      <div>

    <h3>Shipment Request</h3>
        {/* <button style={{position: 'relative', left:900}}>Create</button> */}
        {/* <button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'13px', right:'25px'}} onClick={createBtnClicked}>Create</button> */}
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

        <ShipmentModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={arrayIndex}/>
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue}/>
     </div>
   </div>

    )
}

export default SupplierShipment