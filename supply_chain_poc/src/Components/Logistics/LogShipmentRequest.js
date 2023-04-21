import React, { useState, useEffect, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PDFViewer from '../PDFViewer';
import TestModal from './LogisticModal';
import Campaign from '../../ethereum/campaign';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import '../Table.css';
import axios from 'axios';
import fileDownload from 'js-file-download';

const ShipmentRequest = () => {

  const [request, setRequest] = useState([])
  let rowValue;

  const [columnDefs, setColumnDefs] = useState([
    { field: 'orderID', headerName: 'OrderID', filter: true, flex: 1, filter: true, floatingFilter: true },
    {field: 'supplierName', headerName: 'From(Supplier)', filter: true, flex: 1.5, filter: true,floatingFilter: true},
    { field: 'manufacturerName', headerName: 'To(Manufacturer)', flex: 1.6 },
    {
      field: 'shipmentDetailsReport', headerName: 'Shipment Details', filter: true, flex: 1.6, cellRendererFramework: (params) => {
        console.log(params.data);
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.shipmentDetailsReport} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.shipmentDetailsReport} data-col={params.colDef.headerName} data-no={params.data.orderID}
              onClick={onDownloadClicked} />
          </div>
        )
      }
    },
    {
      field: 'insuranceReport', headerName: 'FG Insurance', filter: true, flex: 1.4, cellRendererFramework: (params) => {
        console.log(params.data);
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.insuranceReport} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.insuranceReport} data-col={params.colDef.headerName} data-no={params.data.orderID}
              onClick={onDownloadClicked} />
          </div>
        )
      }
    },
    {
      field: 'Bill', headerName: 'Billing', filter: true, flex: 1.5, cellRendererFramework: (params) => {

        return (
          // <button onClick={navigateToPaybill} >Proceed To Bill</button>
          <button class="btn btn-primary mb-2 " onClick={onClickProceedToBill} >Proceed To Bill</button>

        )

      }
    }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    //autoHeight: true,
    //resizable: true
  }));
  const [supplyData, setSupplyData]  = useState();

  useEffect( () => {
    const address = '0x8A59B3f39129379D39eC22cA815cA726BB395338'
    const campaign = Campaign(address);
    console.log('use effect campaign',campaign);
    (async () => {
      const requestCount = await campaign.methods.getSupplyChainDataCount().call();
      console.log('req count', requestCount);
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
      return { address, requests, requestCount };
    } )();
    
      
      return () => {}
  }, [])
  
  
  const [openModal, setOpenModal] = useState(false);
  console.log('requestcscscsdc is', request);
  const onClickProceedToBill = () => {
    setOpenModal(true);
  }
  
  let parameter;
  const [pdfValue, setPdfValue] = useState();
  const [openPDFModal, setOpenPDFModal] = useState(false);
  
  const onViewClicked = (params) => {
    console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if (params.target.getAttribute('data-col') == 'Shipment Details') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    if (params.target.getAttribute('data-col') == 'FG Insurance') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    console.log('parameterrrrrr', parameter);
    setOpenPDFModal(true);
  }
  
  const onDownloadClicked = (params) => {
    // var pdf = "https://gateway.pinata.cloud/ipfs/QmaNxbQNrJdLzzd8CKRutBjMZ6GXRjvuPepLuNSsfdeJRJ";
    const fileName = `${params.target.getAttribute('data-col')}_${params.target.getAttribute('data-no')}.pdf`;
    
    let pdf;
    if (params.target.getAttribute('data-col') == 'Shipment Details') {
      // setPdfValue(params.target.getAttribute('data-view'))
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    if (params.target.getAttribute('data-col') == 'FG Insurance') {
      // setPdfValue(params.target.getAttribute('data-view'))
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    console.log("nadkncksndc", pdf);
    axios.get(pdf, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
  }
  const[cellValue, setCellValue] = useState()  ;

const [arrayIndex, SetArrayIndex] = useState();
const onCellClicked = (params) => {
  console.log('oncell clicked', params);
  setCellValue(params.data.orderID) ;
  if(params.colDef.headerName == 'Billing'){
    
    setOpenModal(true);
    
    let arrFind = supplyData.findIndex((e, i) => {
      console.log('eeeeeee',e, i);
      return e.orderID === params.data.orderID 
    })
    console.log('arrFind',arrFind);
    SetArrayIndex(arrFind);
  }
  }

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
        <div><h3 className="header" style={{ color: "#023b6d", marginBottom: "20px" }}>Shipment Requests</h3></div>
        <br />
        <AgGridReact

          rowData={request} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          onCellClicked={onCellClicked}
          animateRows={true}
          pagination={true}
        />
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
        <TestModal open={openModal} onClose={() => setOpenModal(false)} rowInfo={arrayIndex} ordID={cellValue}/>
      </div>
    </div>
  )
}

export default ShipmentRequest
