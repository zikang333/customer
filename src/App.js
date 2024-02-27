import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustListing from './CustListing';
import CustCreate from './CustCreate';

function App() {
  return (
    <div className="App">
      <h1>Customer Phone System</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CustListing />}></Route>
          <Route path='/customer/create' element={<CustCreate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
