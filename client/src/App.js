import * as React from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import EditProducts from './components/edit';
import CreateProducts from './components/create';
import ListProducts from './components/listProducts';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light text-capitalize">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">all products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">create product</Link>
                </li>


              </ul>

            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/edit/:id' element={<EditProducts />} />
          <Route path='/' element={<ListProducts />} />
          <Route path='/create' element={<CreateProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
