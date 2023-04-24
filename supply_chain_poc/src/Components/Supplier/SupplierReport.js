import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from './SupplierModal.js';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import uploadLogo from '../../Assets/upload.png';
import PDFViewer from '../PDFViewer';
import Campaign from '../../ethereum/campaign'
import axios from 'axios';
import fileDownload from 'js-file-download';

const SupplierReport = () => {

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'orderID', headerName: 'Order ID', filter: true, flex: 1.5 },
    { field: 'rmReport', headerName: 'RM Report', filter: true, flex: 1.5,
      cellRendererFramework: (params) => {
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.rmReport} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.rmReport} data-col={params.colDef.headerName}
              onClick={onDownloadClicked} />
          </div>

        )
      }
    },
    {
      field: 'qualityReport', headerName: 'Quality Report', filter: true, flex: 1.5,
        cellRendererFramework: (params) => {
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.qualityReport} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.qualityReport} data-col={params.colDef.headerName}
              onClick={onDownloadClicked} />
          </div>

        )
      }
    },
    {
      field: 'insuranceReport', headerName: 'Insurance Report', filter: true, flex: 1.5,
        cellRendererFramework: (params) => {
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.insuranceReport} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.insuranceReport} data-col={params.colDef.headerName}
              onClick={onDownloadClicked} />
          </div>

        )
      }
    },
    {
      headerName: 'Upload', flex: 1.5,
        cellRendererFramework: () => {
        return (
          <img src={uploadLogo} style={{ height: 30, width: 30 }} />
        )
      }
    }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }));

  const [request, setRequest] = useState([])
  const [supplyData, setSupplyData] = useState();
  
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
      setSupplyData(requests)
      setRowData(requests);
      return { address, requests, requestCount };
    })();
    return () => {
    }
  }, [])

  const [openModal, setOpenModal] = useState(false);
  const [orderID, setOrderID] = useState();
  let parameter;

  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [pdfValue, setPdfValue] = useState();
  const onViewClicked = (params) => {
    if (params.target.getAttribute('data-col') == 'RM Report') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    if (params.target.getAttribute('data-col') == 'Quality Report') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    if (params.target.getAttribute('data-col') == 'Insurance Report') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    setOpenPDFModal(true);
  }

  const [cellValue, setCellValue] = useState();
  const [arrayIndex, SetArrayIndex] = useState();

  const onCellClicked = (params) => {
    setCellValue(params.data.orderID);
    if (params.colDef.headerName == "Upload") {
      let arrFind = supplyData.findIndex((e, i) => {
        return e.orderID === params.data.orderID
      })
      setOpenModal(true);
      SetArrayIndex(arrFind);
    }
  }

  const onDownloadClicked = (params) => {
    let pdf;
    if (params.target.getAttribute('data-col') == 'RM Report') {
      const info = params.target.getAttribute('data-download')
      pdf = `https://gateway.pinata.cloud/ipfs/${info}`;
    }
    if (params.target.getAttribute('data-col') == 'Quality Report') {
      const info = params.target.getAttribute('data-download')
      pdf = `https://gateway.pinata.cloud/ipfs/${info}`;
    }
    if (params.target.getAttribute('data-col') == 'Insurance Report') {
      const info = params.target.getAttribute('data-download')
      pdf = `https://gateway.pinata.cloud/ipfs/${info}`;
    }
    const fileName = "file.pdf";
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
      <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
        <AgGridReact
          rowData={rowData} 
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef} 
          onCellClicked={onCellClicked}
          pagination={true}
        />
        <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={arrayIndex} />
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
      </div>
    </div>
  );
};

export default SupplierReport;