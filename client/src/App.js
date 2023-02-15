import * as React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProducts from "./components/edit";
import CreateProducts from "./components/create";
import ListProducts from "./components/listProducts";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Login from "./components/login";


import Register from "./components/register";
import { useAuth } from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";
import Loggin from "./context/Loggin";
function App() {

  const { currentUser, logout } = useAuth();
  console.log(currentUser)


  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light text-capitalize">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {currentUser ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/"
                      >
                        all products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/create">
                        create product
                      </Link>
                    </li>

                    <li className="nav-item">
                      <h3  >{currentUser.name}</h3>
                    </li>

                    <li className="nav-item">
                      <Link onClick={logout} className="nav-link" to="/login">
                        logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/sinup">
                        sinup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/edit/:id" element={
            <RequireAuth><EditProducts /></RequireAuth>
          } />
          <Route path="/" element={<RequireAuth><ListProducts /></RequireAuth>} />
          <Route path="/create" element={<RequireAuth><CreateProducts /></RequireAuth>} />
          <Route path="/login" element={<Loggin><Login /></Loggin>} />

          <Route path="/sinup" element={<Loggin><Register /></Loggin>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
