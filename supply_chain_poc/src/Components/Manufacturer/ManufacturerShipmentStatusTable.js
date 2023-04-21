import { useState, memo, useRef, useCallback, useEffect } from "react";
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

let rowValue;

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
        const fileName='file.pdf';
        let pdf;
        if (params.target.getAttribute('data-col') == 'Bill of Landing') {
          // setPdfValue(params.target.getAttribute('data-view'))
           pdf=`https://gateway.pinata.cloud/ipfs/${params.target.getAttribute('data-download')}`;
        }
        if (params.target.getAttribute('data-col') == 'Delivery Receipt') {
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

     const [openPDFModal, setOpenPDFModal] = useState(false);
     const [pdfValue, setPdfValue] = useState('');
     
        const onViewClicked = (params) => {
            console.log('params viewwwww', params.target.getAttribute('data-view'));
            console.log('params collll', params.target.getAttribute('data-col'));
            
            if (params.target.getAttribute('data-col') == 'Bill of Landing') {
              setPdfValue(params.target.getAttribute('data-view'))
            }
            else if (params.target.getAttribute('data-col') == 'Delivery Receipt') {
              setPdfValue(params.target.getAttribute('data-view'))
            }
            console.log('parameterrrrrr', pdfValue, parameter);
            setOpenPDFModal(true);
          }

    const [campaigns, setCampaigns] = useState([]);
    // const address = '0x3B9913F0BA1e1bea71f8dc1266046Cc87c1B5cD1';
    const [request, setRequest] = useState([])

    const removeRenderer = memo((props) => {
        return <i class="fa fa-times-circle"></i>;
    });
    
    const [CellValue, setCellValue] = useState()
    const[supplyData,setsupplyData]=useState();
    const [rowData, setRowData] = useState()
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
         //setOpenModal(true);
         setShipmentCreate(true);
         SetArrayIndex(arrFind);
         }
         }

    const [columnDefs] = useState([
        {field: 'orderID', headerName: 'Order ID', filter: true, flex: 1, filter: true,floatingFilter: true},
        // {field: 'manufacturerName', headerName: 'Manufacturer Name', filter: true, flex: 1, filter: true,floatingFilter: true},
         {field:'logisticsName', headerName: 'Logistics Name',  flex: 1.5, filter: true,floatingFilter: true},
         {field: 'status', headerName:'Status', flex:1.2,filter: true,floatingFilter: true, cellRendererFramework:(params)=> {
            if(params.data.status){
                return <p>Delivered</p>
            }else{
                return <p>In progress</p>
            }
        }},
        {
          field: 'billOfLanding', headerName: 'Bill of Landing', filter: true, flex: 1.5, cellRendererFramework: (params) => {
            console.log(params.data);
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
            field:'deliveryRecipt', headerName: 'Delivery Receipt', flex: true, flex:1.5, cellRendererFramework: (param) =>{
                rowValue=param;
            return(
              <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={param.data.deliveryRecipt} data-col={param.colDef.headerName}
              onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={param.data.deliveryRecipt} data-col={param.colDef.headerName} data-no={param.data.orderID}
              onClick={onDownloadClicked} />
            </div>
            
            )
        }},
        { headerName:'Upload', flex:1.2, cellRendererFramework:()=>{
           return(
              <img src={uploadLogo} style={{ height: 30, width: 30 }} />
            )
        }}
    ]);
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
        setsupplyData(requests)
        setRowData(requests)
        console.log('useeffect requests', requests);
        return { address, requests, requestCount };
      } )();
        return () => {
        }
     },[])

     const [shipmentCreate, setShipmentCreate] = useState(false);
     
    return (
        <>
            <>
            {/* <button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'13px', right:'25px'}} onClick={createBtnClicked}>Create Delivery Reciept</button> */}
                {/* <h4 style={{ color: "" }}>Order List</h4> */}
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
                <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue}/>
                <TestModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={arrayIndex}/>
            </>
        </>
    )
}
export default Table;