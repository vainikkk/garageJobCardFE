import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JobCards from './pages/JobCardDetails';
// import Customers from './pages/Customers';
// import Vehicles from './pages/Vehicles';
import Services from './pages/Services';
// import Settings from './pages/Settings';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import ForgotPassword from './pages/ForgotPassword';
// import NewJobCard from './pages/NewJobCard';
import AppSettings from './pages/AppSettings';
import Testing from './pages/Testing';
import CustomerList from './pages/CustomerList';
import VehicleNew from './pages/VehicleNew';
import JobCardNew from './pages/JobCardNew';
import CustomerNew from './pages/CustomerNew';
import VehicleList from './pages/VehicleList';
import JobCardList from './pages/JobCardList';
import InventoryList from './pages/InventoryList';
import InventoryNew from './pages/InventoryNew';
import MechanicList from './pages/MechanicList';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} /> */}
        {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/job-cards' element={<JobCardList />} />
        <Route path='/job-cards/new' element={<JobCardNew />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/customers/new' element={<CustomerNew />} />
        <Route path='/vehicles' element={<VehicleList />} />
        <Route path='/vehicles/new' element={<VehicleNew />} />
        <Route path='/inventory' element={<InventoryList />} />
        <Route path='/inventory/new' element={<InventoryNew />} />
        <Route path='/mechanics' element={<MechanicList />} />
        <Route path='/services' element={<Services />} />
        <Route path='/settings' element={<AppSettings />} />
        <Route path='/testing' element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App;
