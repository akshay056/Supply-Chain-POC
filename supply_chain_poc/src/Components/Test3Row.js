import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";


const Test3Row = ({address}) => {
    const { Row, Cell } = Table;
    // let dStatus;
    // if(!status){
    //     dStatus = 'not delivered';
    // }
    // else{
    //     dStatus = 'delivered';
    // }


    return (

        <Row>
        <Cell>{address}</Cell>
      </Row>
    )
}

export default Test3Row;
