import { useState } from "react";
import React from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

const Test3Modal = ({ open, onClose }) => {

  const [state, setState] = useState({
    minimumContribution: "",
    loading: false,
    errorMessage: ""
  })
  if (!open) return null

  const onSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(state.minimumContribution)
        .send({
          from: accounts[0],
        });
    }
    catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
    setState({ ...state, loading: false });
  };

  return (
    <>
      <div className='overlay'>
        <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Create a Request</h3>
          <Form onSubmit={onSubmit} error={!!state.errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="wei"
                labelPosition="right"
                value={state.minimumContribution}
                onChange={(event) =>
                  setState({ minimumContribution: event.target.value })
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={state.errorMessage} />
            <Button primary loading={state.loading}>
              Create!
            </Button>
            <button type="button" onClick={onClose} class="btn btn-danger mb-2 " style={{ position: 'absolute', top: '10px', right: '10px' }}>close</button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Test3Modal;