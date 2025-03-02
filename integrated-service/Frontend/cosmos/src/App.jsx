import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import '../public/index.css'
import { CustomerPage } from './pages/Customers';
import { ProductPage } from './pages/Products';
import { OrdersPage } from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar" style={{justifyContent:'space-between'}}>
          <h3 style={{margin:0,color:'white',marginLeft:20}}>Code With Krish</h3>
          <ul className="nav-list">
            <Navigation nav="Order Management" url="/order-management" />
            <Navigation nav="Customer Management" url="/customer-management" />
            <Navigation nav="Product Management" url="/product-management" />
          </ul>
        </nav>

        <div className="content-container">
          <Routes>
            <Route path='/' element={<h2>Welcome to the Dashboard</h2>} />
            <Route path='/order-management' element={<OrdersPage />} />
            <Route path='/customer-management' element={<CustomerPage />} />
            <Route path='/product-management' element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function Navigation({ nav, url }) {
  return (
    <li className="nav-item">
      <Link to={url} className="nav-link">
        {nav}
      </Link>
    </li>
  );
}



export default App;
