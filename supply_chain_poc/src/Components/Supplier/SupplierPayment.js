import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import PDFViewer from '../PDFViewer';
import Campaign from '../../ethereum/campaign'
import axios from 'axios';
import fileDownload from 'js-file-download'

const SupplierPayment = () => {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'orderID', headerName: 'Order ID', filter: true, flex: 1.5, filter: true, floatingFilter: true },
    { field: 'manufacturerName', headerName: 'From', filter: true, flex: 1.5, filter: true, floatingFilter: true },
    { field: 'status', headerName: 'Status', flex: 1.5, 
      cellRendererFramework: (params) => {
        if (params.data.status) {
          return <p>delivered</p>
        } else {
          return <p>in progress</p>
        }
      }
    },
    { field: 'billOfLanding', headerName: 'Bill Of Landing', flex: 1.5,
      cellRendererFramework: (params) => {
        return (
          <div>
            <img src={eye} onClick={onViewClicked} data-view={params.data.billOfLanding} data-col={params.colDef.headerName}
              style={{ height: 35, width: 30 }} />&nbsp;&nbsp;
            <img src={downloadLogo} data-download={params.data.billOfLanding} data-col={params.colDef.headerName}
              onClick={onDownloadClicked} style={{ height: 30, width: 30 }} />
          </div>
        )
      }
    },
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
    return () => { }
  }, [])

  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [pdfValue, setPdfValue] = useState('');

  const onViewClicked = (params) => {
    if (params.target.getAttribute('data-col') == 'Bill Of Landing') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    setOpenPDFModal(true);

  }

  const onDownloadClicked = (params) => {
    const info = params.target.getAttribute('data-download')
    var pdf = `https://gateway.pinata.cloud/ipfs/${info}`;
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
      <h3>Payment</h3>
      <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
        <AgGridReact
          rowData={rowData} 
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef} 
          pagination={true}
        />
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
      </div>
    </div>
  )
}

export default SupplierPayment