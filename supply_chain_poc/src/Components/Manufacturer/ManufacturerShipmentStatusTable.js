import { useState, memo, useRef,useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import "./ManufacturerShipmentStatusTable.css";
import downloadLogo from '../../Assets/dwnld1.png';
import eye from '../../Assets/view2.png';
import uploadLogo from '../../Assets/upload.png';
import PDFViewer from '../PDFViewer';
import React from 'react'
import Campaign from '../../ethereum/campaign'
import TestModal from './ManufacturerShipmentModal';
import axios from 'axios';
import fileDownload from 'js-file-download';

function Table() {
  let rowValue;
  const gridRef = useRef();
  let parameter;

  const onDownloadClicked = (params) => {
    const fileName = 'file.pdf';
    let pdf;
    if (params.target.getAttribute('data-col') == 'Bill of Landing') {
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    if (params.target.getAttribute('data-col') == 'Delivery Receipt') {
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    axios.get(pdf, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
  }

  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [pdfValue, setPdfValue] = useState('');

  const onViewClicked = (params) => {
    if (params.target.getAttribute('data-col') == 'Bill of Landing') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    else if (params.target.getAttribute('data-col') == 'Delivery Receipt') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    setOpenPDFModal(true);
  }

  const [request, setRequest] = useState([])
  const [CellValue, setCellValue] = useState()
  const [supplyData, setsupplyData] = useState();
  const [rowData, setRowData] = useState()
  const [arrayIndex, SetArrayIndex] = useState();

  const onCellClicked = (params) => {
    setCellValue(params.data.orderID);
    if (params.colDef.headerName == "Upload") {
      let arrFind = supplyData.findIndex((e, i) => {
        return e.orderID === params.data.orderID
      })
      setShipmentCreate(true);
      SetArrayIndex(arrFind);
    }
  }

  const [columnDefs] = useState([
    { field: 'orderID', headerName: 'Order ID', filter: true, flex: 1, filter: true, floatingFilter: true },
    { field: 'logisticsName', headerName: 'Logistics Name', flex: 1.5, filter: true, floatingFilter: true },
    { field: 'status', headerName: 'Status', flex: 1.2, filter: true, floatingFilter: true, 
      cellRendererFramework: (params) => {
        if (params.data.status) {
          return <p>Delivered</p>
        } else {
          return <p>In progress</p>
        }
      }
    },
    { field: 'billOfLanding', headerName: 'Bill of Landing', filter: true, flex: 1.5,
      cellRendererFramework: (params) => {
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
    { field: 'deliveryRecipt', headerName: 'Delivery Receipt', flex: true, flex: 1.5,
      cellRendererFramework: (param) => {
        rowValue = param;
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={param.data.deliveryRecipt} data-col={param.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={param.data.deliveryRecipt} data-col={param.colDef.headerName} data-no={param.data.orderID}
              onClick={onDownloadClicked} />
          </div>

        )
      }
    },
    {
      headerName: 'Upload', flex: 1.2, cellRendererFramework: () => {
        return (
          <img src={uploadLogo} style={{ height: 30, width: 30 }} />
        )
      }
    }
  ]);
  useEffect(() => {
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
      setsupplyData(requests)
      setRowData(requests)
      return { address, requests, requestCount };
    })();
    return () => {
    }
  }, [])

  const [shipmentCreate, setShipmentCreate] = useState(false);

  return (
    <>
      <>
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
            onCellClicked={onCellClicked}
            paginationPageSize={8}>
          </AgGridReact>
        </div>
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
        <TestModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={arrayIndex} />
      </>
    </>
  )
}

export default Table;