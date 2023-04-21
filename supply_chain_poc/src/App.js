import { React } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import Table from './Components/Logistics/LogisticTable';
import Test3 from './Components/Test3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" element={<Landingpage />} />
        <Route path="/Logistics/dashboard" element={<Landingpage />} />
        <Route path="/Logistics/Payment" element={<Landingpage />} />
        <Route path="/Logistics/ShipmentRequest" element={<Landingpage />} />
        <Route path="/Supplier/Dashboard" element={<Landingpage />} />
        <Route path="/Supplier/Report" element={<Landingpage />} />
        <Route path="/Supplier/Payment" element={<Landingpage />} />
        <Route path="/Supplier/ShipmentRequest" element={<Landingpage />} />
        <Route path="/Manufacturer/Dashboard" element={<Landingpage />} />
        <Route path="/Manufacturer/ShipmentStatus" element={<Landingpage />} />
        <Route path="/table" element={<Table />} />
        <Route path="/test" element={<Test3 />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
