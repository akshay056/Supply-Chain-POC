import { useState, memo, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import "./ManufacturerTable.css";
import Campaign from '../../ethereum/campaign';
import eye from '../../Assets/view2.png';
import downloadLogo from '../../Assets/dwnld1.png';
import axios from 'axios';
import fileDownload from 'js-file-download';
import PDFViewer from '../PDFViewer';
// import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import FilePreviewer from 'react-file-previewer';

// import FileViewer from 'react-file-viewer';
// // import { CustomErrorComponent } from 'custom-error';

// const file = 'orderplace (14).pdf'
// const type = 'pdf'

function Table(props) {
    let rowValue;
//  const [people, setPeople] = useState([
//     {SlNo:1,OrderId:1,OrderBy:"Sonata",OrderDate:"04-04-23",SupplierName:"Sunil",Invoice:12345},
    
//   ])
  const [rowdata,setRowdata] = useState();
  const[show,setShow]=useState(false)

  const [campaigns, setCampaigns] = useState([]);

  const address = '0xCfc149935fc57b5172E388d80bC0638462EdBe0f';
  const [request, setRequest] = useState([])
  const[viewpdf, setViewpdf] = useState();
  const [openPDFModal, setOpenPDFModal] = useState(false);

 useEffect( () => {

 },[])

    let gridApi;
    const gridRef = useRef();

    const onGridReady = (params) => {
        console.log("grid is ready");
        gridApi = params.api
    //     fetch("https://mocki.io/v1/fa7a4c7f-a693-4565-acd8-94eb33c6c5dd").then(resp=>resp.json())
    //     .then(resp=>{
    //         console.log("resp",resp)
    //         params.api.applyTransaction({add:resp})
    //     }
    //  )

    const address = '0x8A59B3f39129379D39eC22cA815cA726BB395338'
    const campaign = Campaign(address);
    console.log('use effect campaign',campaign);
    (async () => {
      const requestCount = await campaign.methods.getSupplyChainDataCount().call();
      console.log('req count', requestCount);
    //   const approversCount = await campaign.methods.approversCount().call();
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            const req = campaign.methods.supplyChainDatas(index).call();
            return req;
            // return campaign.methods.requests(index).call();
          })
      );
      setRequest(requests)
      console.log('grid requests', requests);
      props.getAllOrderCount(requests.length)
      params.api.applyTransaction({add:requests})
      return { address, requests, requestCount };
    } )();
    
      
      return () => {
          
      }
     
    }
    const removeRenderer = memo((props) => {
        return <div>
            <i class="fa fa-eye"  onClick={handlepreview}  ></i> &nbsp;&nbsp;<i class="fa fa-download" onClick={onDownloadClicked} ></i> 
            
            </div>
    });
    const [columnDefs] = useState([
         {field: 'orderID', headerName: 'OrderID', filter: true, flex: 1, filter: true,floatingFilter: true},
        { field: 'manufacturerName',headerName: 'OrderBy', filter: true, sortable: true, floatingFilter: true, flex: 1 },
           { field: 'supplierName', filter: true, sortable: true, floatingFilter: true, flex: 1 },
            {field:'invoiceReport', headerName: 'invoiceReport',  flex: 1.5, filter: true,floatingFilter: true, cellRendererFramework:(params)=>{
            console.log("report param", params)
            rowValue = params;
            return(
                <div >
                    <img  src={eye} title="view" onClick={onViewClicked} style={{ height: 35, width: 30 }} data-view={params.data.invoiceReport}/> &nbsp;&nbsp;
                    <img src={downloadLogo} title="download " onClick={onDownloadClicked} style={{ height: 30, width: 30 }} data-download={params.data.invoiceReport}/>
                          </div>
                
            )
          }}
   
    ]);
    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        console.log("gridRef", gridRef, selectedRows)
       

    }, []);
    function onError(e) {
      
      }
      function handlepreview(){
        props.previewTriggered(true)
      }
      const onDownloadClicked = (params) => {
        debugger;
        console.log("check file", params);
        const info = params.target.getAttribute('data-download')
        console.log("check info", info);
        let pdf=`https://gateway.pinata.cloud/ipfs/${info}`;
        
        const fileName = "file.pdf";
        axios.get(pdf, {
        responseType: 'blob',
        })
        .then((res) => {
        fileDownload(res.data, fileName)
        })
      
     }

     
  const [pdfValue, setPdfValue] = useState('');
  
  const onViewClicked = (params)=> {
    setPdfValue(params.target.getAttribute('data-view'))
    setOpenPDFModal(true);
  }
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
                        
                        pagination={true}
                        
                        rowSelection={'single'}
                        
                        onGridReady={onGridReady}
                        paginationPageSize={10}
                        onSelectionChanged={onSelectionChanged} 
                    >
                    </AgGridReact>
                </div>
                <PDFViewer open={openPDFModal} onClose={() => {setOpenPDFModal(false)}} info={pdfValue}/>
            </>
        </>
    )
}
export default Table;