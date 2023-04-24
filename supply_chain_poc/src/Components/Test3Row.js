import React from "react";
import { Table, Button } from "semantic-ui-react";

const Test3Row = ({ address }) => {
  const { Row, Cell } = Table;

  return (
    <Row>
      <Cell>{address}</Cell>
    </Row>
  )
}

export default Test3Row;
