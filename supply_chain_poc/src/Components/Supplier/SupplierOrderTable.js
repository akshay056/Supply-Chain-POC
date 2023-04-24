import { useState, memo, useRef, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import PDFViewer from '../PDFViewer';
import React from 'react'
import Campaign from '../../ethereum/campaign'
import SupplierOrderListModal from './SupplierOrderListModal';
import axios from 'axios';
import fileDownload from 'js-file-download';

function Table() {
  let gridApi;
  const gridRef = useRef();
  let parameter;

  const onDownloadClicked = (params) => {
    console.log('download clicked',params.target.getAttribute('data-download'));
    let pdf;
        if(params.target.getAttribute('data-col') == 'Invoice'){
            const info = params.target.getAttribute('data-download')
             pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
        }
    const fileName = "file.pdf";
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
    if (params.target.getAttribute('data-col') == 'Invoice') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    setOpenPDFModal(true);
  }

  const [rowData, setRowData] = useState()
  const [columnDefs] = useState([
    { field: 'orderID', headerName: 'Order ID', filter: true, flex: 1, filter: true, floatingFilter: true },
    { field: 'manufacturerName', headerName: 'Manufacturer Name', filter: true, flex: 1, filter: true, floatingFilter: true },
    { field: 'logisticsName', headerName: 'Logistics Name', flex: 1.5, filter: true, floatingFilter: true },
    { field: 'status', headerName: 'Status', flex: 0.75, filter: true, floatingFilter: true,
      cellRendererFramework:(params)=> {
      if(params.data.status){
        return <p>delivered</p>
      }else{
        return <p>in progress</p>
      }} 
    },
    { field: 'invoiceReport', headerName: 'Invoice', filter: true, flex: 1.5,
      cellRendererFramework: (params) => {
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
    (async () => {
      const requestCount = await campaign.methods.getSupplyChainDataCount().call();
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            
            return campaign.methods.supplyChainDatas(index).call();
          })
      );
      setRequest(requests)
      setSupplyData(requests)
      setRowData(requests);
      return { address, requests, requestCount };
      } )();
      return () => {}
  },[])
  
  const [shipmentCreate, setShipmentCreate] = useState(false);
  const createBtnClicked = () => {
    setShipmentCreate(true);
  }

  return (
    <>
      <>
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