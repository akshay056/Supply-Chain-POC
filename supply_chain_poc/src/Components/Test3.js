
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import factory from '../ethereum/factory'

import { Button, Table } from "semantic-ui-react";
import Test3Modal from './Test3Modal';
import Test3Row from './Test3Row';

const Test3 = () => {
    //const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 //const [columnDefs, setColumnDefs] = useState([
//    {field: 'orderId', headerName: 'OrderID', filter: true, flex: 1.2, filter: true,floatingFilter: true},
//    {field: 'from', headerName: 'Logistics Provider', filter: true, flex: 1.5, filter: true,floatingFilter: true},
//     {field: 'date', headerName:'Delivery Date', flex:1.5},
//     {field:'status', headerName: 'Status',  flex: 1.5, filter: true,floatingFilter: true},
//     { headerName: 'Shipment Details',  flex: 1.5, cellRendererFramework:(params)=>{
        
//         return(
//             <div>
//                 <img src={eye} title="view" onClick={onViewClicked} style={{ height: 35, width: 30 }}/> &nbsp;&nbsp;
//                 <img src={downloadLogo} title="download " onClick={onDownloadClicked}style={{ height: 30, width: 30 }}/>
//             </div>
            
//         )
//     }},
//     {headerName:'Bill of Landing', flex: 1.5, cellRendererFramework:(params)=>{
       
//         return(
//             <div>
//                 <img src={eye} title="view" onClick={onViewClicked} style={{ height: 35, width: 30 }} />&nbsp;&nbsp;
//                 <img src={downloadLogo} title="download " onClick={onDownloadClicked} style={{ height: 30, width: 30 }}/>
//             </div>
            
//         )
//     }},
//     {headerName:'Delivery Recipt', flex: 1.5, cellRendererFramework:(params)=>{
        
//         return(
//             <div>
//                 <img src={eye} title="view" onClick={onViewClicked} style={{ height: 35, width: 30 }}/>&nbsp;&nbsp;
//                 <img src={downloadLogo} title="download " onClick={onDownloadClicked} style={{ height: 30, width: 30 }}/>
//             </div>
            
//         )
//     }}
//     {headerName: 'address'}
//  ]);

 const [campaigns, setCampaigns] = useState([]);

 useEffect( () => {
    (async () => {
        const deployments = await factory.methods.getDeployedCampaigns().call();
        setCampaigns(deployments)
        console.log('deployments is ', deployments);
        
    })();
    
    return () => {
        
    }
   
 },[])

//  const deploymentCampaigns = async () => {
//     const deployments = await factory.methods.getDeployedCampaigns().call();
//         setCampaigns(deployments)
//         console.log('deployments is ', deployments);
//         const something = renderRows()
//         return something;
//  }

 const renderRows =  () => {
        console.log(campaigns);
        return campaigns.map((request) => {
            console.log('reuest is ',request);
            return (
              <Test3Row
                address={request}
              />
            );
          });
    }
     
 

 

 // DefaultColDef sets props common to all Columns
//  const defaultColDef = useMemo( ()=> ({
     
//     sortable: true,
//        filter: true,
//        //autoHeight: true,
//        //resizable: true
       
//   }));

//   useEffect(() => {
//     fetch('http://localhost:4000/posts')
//     .then(result => result.json())
//     .then(rowData => setRowData(rowData))
//   }, []);

  const [shipmentCreate, setShipmentCreate] = useState(false);

  const createBtnClicked = () => {
    setShipmentCreate(true);
  }
    
//   const [openPDFModal, setOpenPDFModal] = useState(false);
//   const onViewClicked = ()=> {
//     //console.log("cell clicked", parameter);
//     setOpenPDFModal(true);
//   }

//   const onDownloadClicked = () => {
//     var pdf="data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";
    
//     console.log(pdf);
//     const linkSource =pdf;
//     const downloadLink = document.createElement("a");
//     const fileName = "file.pdf";
//     downloadLink.href = linkSource;
//     downloadLink.download = fileName;
//     downloadLink.click();
//  }


    return(
//         <div>

//     <h3>Shipment</h3>
//         {/* <button style={{position: 'relative', left:900}}>Create</button> */}
        //<button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'13px', right:'25px'}} onClick={createBtnClicked}>Create</button>
//      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
//      <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>

//        <AgGridReact
           
//            rowData={rowData} // Row Data for Rows

//            columnDefs={columnDefs} // Column Defs for Columns
//            defaultColDef={defaultColDef} // Default Column Properties

//            //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           
//            //onCellClicked={onCellClicked} 

//            pagination={true}
//         />

//         <ShipmentModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]}/>
//         <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={[1]}/>
//      </div>
//    </div>


        <div>
            <h3>Requests</h3>
        <button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'13px', right:'25px'}} onClick={createBtnClicked}>Create</button>

            
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Addressss</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{renderRows()}</Table.Body>
        </Table>
        {/* <div>Found {this.props.requestCount} requests.</div> */}

         <Test3Modal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]}/>

        </div>

        
    )

}

export default Test3