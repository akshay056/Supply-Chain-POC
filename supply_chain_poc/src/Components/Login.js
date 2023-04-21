import React, { useState } from "react";
import '../App.css';
import { Form, Button } from 'react-bootstrap';
import logo from'../Assets/sonata-logo.png';
import { Navbar,Container,Nav } from 'react-bootstrap';


async function loginUser(credentials) {
  return fetch('https://172.29.91.71/api/home/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(resp=>resp.json())

  // .then(json => console.log(json))
}

const Login = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  //const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    console.log("dc",response);
    // debugger;
    localStorage.setItem("user-info",JSON.stringify(response))
    if ( response && response['status'] == 200) {
          if(response['participantType'] == 'Manufacturer') {
          // localStorage.setItem('code', response['code']);
          // localStorage.setItem('email', JSON.stringify(response.data.Email));
          window.location.href="/Manufacturer/Dashboard";
       }
       if(response['participantType'] == 'Manufacturer' && response['isAdmin'] == true) {
        // localStorage.setItem('code', response['code']);
        // localStorage.setItem('email', JSON.stringify(response.data.Email));
        window.location.href="/Manufacturer/Dashboard";
     }
       else if(response['participantType'] == 'Supplier') {
        // localStorage.setItem('code', response['code']);
        // localStorage.setItem('email', JSON.stringify(response.data.Email));
        window.location.href="/Supplier/Dashboard";
     }
     else if(response['participantType'] == 'Logistics') {
      // localStorage.setItem('code', response['code']);
      // localStorage.setItem('email', JSON.stringify(response.data.Email));
      window.location.href="/Logistics/Dashboard";
   }
       else{
        window.location.href="/";
       }
     //navigate("/dashboard");
       }
    else{
    alert("Incorrect Email/Password");
    }
    }
  /*
   const handleSubmit = (e)=>{
       e.preventDefault();
       console.log(email);
   }*/
  return (
    <><><Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="#home"><img className='logo1' style={{ height: "100px", width: "150px" }} src={logo}></img></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </><>
        <div className="container mt-3">
          <section className='d-flex justify-content-between'>
            <div className="left_data mt-3 p-3" style={{ width: "80%" }}>
              <h2>Supply Chain Management</h2><br />
              <p class='fw-bold'>A perfect way to say "kudos"</p>
              <span>Supply chain management is the handling of the entire production flow of a good or service — starting from the raw components all the way to delivering the final product to the consumer.</span>
              <p><a href="#">Read More.</a></p>
            </div>

            <div className="right_data mt-3 p-3" style={{ width: "100%" }}>
              <h2 className='text-left col-lg-8'>Sign In</h2>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3 col-lg-8" controlId="formBasicName">
                  <Form.Label>User Email</Form.Label>
                  <Form.Control required value={username} onChange={(e) => setName(e.target.value)} type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-8" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <div className="d-flex justify-content-between mb-3 col-lg-8">
                    <Form.Check type="checkbox" label="Remember me" />
                    <Form.Check><a href="#">Forgot password</a></Form.Check></div>
                </Form.Group>
                <Button disabled={!username} type="submit" onclick={handleSubmit} variant="outline-dark">
                  Sign in

                </Button>

              </Form>
            </div>
          </section>
        </div>
      </></>
  )
}
export default Login;