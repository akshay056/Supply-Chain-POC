
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';

import PDFViewer from './SupplierPDFViewer';

import { Button, Table } from "semantic-ui-react";
import Campaign from '../../ethereum/campaign'
import axios from 'axios';
import fileDownload from 'js-file-download'
const SupplierPayment = () => {
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'orderID', headerName: 'Order ID', filter: true, flex: 1.5, filter: true,floatingFilter: true},
   {field: 'manufacturerName', headerName: 'From', filter: true, flex: 1.5, filter: true,floatingFilter: true},
    {field: 'status', headerName:'Status', flex:1.5, cellRendererFramework:(params)=> {
      if(params.data.status){
        return <p>delivered</p>
      }else{
        return <p>in progress</p>
      }}},

    {field:'billOfLanding', headerName: 'Bill Of Landing',  flex: 1.5, cellRendererFramework:(params)=>{
        
        return(
            <div>
                <img src={eye } onClick={onViewClicked} data-view={params.data.billOfLanding} data-col={params.colDef.headerName}
                style={{ height: 35, width: 30 }}/>&nbsp;&nbsp;
                <img src={downloadLogo} data-download={params.data.billOfLanding} data-col={params.colDef.headerName} 
                onClick={onDownloadClicked} style={{ height: 30, width: 30 }} />
            </div>
            
        )
    }},
    
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     
    sortable: true,
       filter: true,
       //autoHeight: true,
       //resizable: true
  }));

  // useEffect(() => {
  //   fetch('http://localhost:4000/posts')
  //   .then(result => result.json())
  //   .then(rowData => setRowData(rowData))
  // }, []);
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
    
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [pdfValue, setPdfValue] = useState('');

  const onViewClicked = (params)=> {
    console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if(params.target.getAttribute('data-col') == 'Bill Of Landing'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    
    //console.log('parameterrrrrr', parameter);
    //console.log("cell clicked", parameter);
    setOpenPDFModal(true);

 }

  const onDownloadClicked = (params) => {
    const info = params.target.getAttribute('data-download')
        var pdf=`https://gateway.pinata.cloud/ipfs/${info}`;

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



    return(
        <div>

    <h3>Payment</h3>
        {/* <button style={{position: 'relative', left:900}}>Create</button> */}
     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>

       <AgGridReact
           
           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           
           //onCellClicked={onCellClicked} 

           pagination={true}
        />

        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue}/>
        
     </div>
   </div>
    )

}

export default SupplierPayment