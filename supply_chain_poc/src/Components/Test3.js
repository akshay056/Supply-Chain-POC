import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import factory from '../ethereum/factory'
import { Table } from "semantic-ui-react";
import Test3Modal from './Test3Modal';
import Test3Row from './Test3Row';

const Test3 = () => {

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    (async () => {
      const deployments = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(deployments)
      console.log('deployments is ', deployments);
    })();
    return () => {
    }
  }, [])

  const renderRows = () => {
    console.log(campaigns);
    return campaigns.map((request) => {
      console.log('reuest is ', request);
      return (
        <Test3Row
          address={request}
        />
      );
    });
  }

  const [shipmentCreate, setShipmentCreate] = useState(false);

  const createBtnClicked = () => {
    setShipmentCreate(true);
  }

  return (
    <div>
      <h3>Requests</h3>
      <button type="button" class="btn btn-primary mb-2" style={{ position: 'absolute', top: '13px', right: '25px' }} onClick={createBtnClicked}>Create</button>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Addressss</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderRows()}</Table.Body>
      </Table>
      <Test3Modal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]} />
    </div>
  )
}

export default Test3