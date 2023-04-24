import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../Table.css';
import Campaign from '../../ethereum/campaign'
import PDFViewer from '../PDFViewer';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import fileDownload from 'js-file-download';

const Table = () => {

  const [request, setRequest] = useState([])
  const [columnDefs, setColumnDefs] = useState([
    { field: 'orderID', headerName: 'OrderID', sortable: true, filter: true, flex: 1, floatingFilter: true },
    { field: 'manufacturerName', headerName: 'To(Manufacturer)', sortable: true, filter: true, flex: 1.6, filter: true, floatingFilter: true },
    {
      field: 'status', headerName: 'Status', sortable: true, filter: true, floatingFilter: true, flex: 1.25,
      cellRendererFramework: (params) => {
        if (params.data.status) {
          return <p>Delivered</p>
        } else {
          return <p>In progress</p>
        }
      }
    },
    {
      field: 'shipmentDetailsReport', headerName: 'Shipment Details', flex: 1.65,
      cellRendererFramework: (params) => {
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
      field: 'billOfLanding', headerName: 'Bill of Landing', flex: 1.5,
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
    {
      field: 'deliveryRecipt', headerName: 'Delivery Receipt', flex: 1.65,
      cellRendererFramework: (params) => {
        return (
          <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.deliveryRecipt} data-col={params.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.deliveryRecipt} data-col={params.colDef.headerName} data-no={params.data.orderID}
              onClick={onDownloadClicked} />
          </div>
        )
      }
    },
  ]);

  const defaultColDef = useMemo(() => ({
    // sortable: true,
    // filter: true,
  }));

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
      return { address, requests, requestCount };
    })();
    return () => { }
  }, [])

  let parameter;
  const [pdfValue, setPdfValue] = useState();
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const onViewClicked = (params) => {
    if (params.target.getAttribute('data-col') == 'Shipment Details') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    if (params.target.getAttribute('data-col') == 'Delivery Receipt') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    if (params.target.getAttribute('data-col') == 'Bill of Landing') {
      setPdfValue(params.target.getAttribute('data-view'))
    }
    setOpenPDFModal(true);
  }

  const onDownloadClicked = (params) => {
    const fileName = `${params.target.getAttribute('data-col')}_${params.target.getAttribute('data-no')}.pdf`;
    let pdf;
    if (params.target.getAttribute('data-col') == 'Shipment Details') {
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    if (params.target.getAttribute('data-col') == 'Delivery Receipt') {
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    if (params.target.getAttribute('data-col') == 'Bill of Landing') {
      pdf = `https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
    }
    axios.get(pdf, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, fileName)
      })
  }

  return (
    <div>
      <div><h5 className="header" style={{ color: "#023b6d" }}>Shipment List </h5></div>
      <br />
      <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>
        <AgGridReact
          rowData={request} 
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
        />
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue} />
      </div>
    </div>
  )
}

export default Table;