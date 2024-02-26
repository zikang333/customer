import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustListing from './CustListing';
import CustCreate from './CustCreate';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';

function App() {
  return (
    <div className="App">
      <h1>Customer Phone System</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CustListing />}></Route>
          <Route path='/customer/create' element={<CustCreate />}></Route>

          <Route path='/employee/detail/:empid' element={<EmpDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
