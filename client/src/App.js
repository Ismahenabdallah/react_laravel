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
function App() {
  const logout = () => {
    localStorage.clear();
  };

  const [loggin, setLoggin] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const isLoggin = localStorage.getItem("isLoggin");
  const user = localStorage.getItem("user");
  console.log(user)

  React.useEffect(() => {

    setInfo(JSON.parse(user));
    setLoggin(true);

  }, [user],);
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
                {user ? (
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
                      <h3  >{info.name}</h3>
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
          <Route path="/edit/:id" element={<EditProducts />} />
          <Route path="/" element={<ListProducts />} />
          <Route path="/create" element={<CreateProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sinup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
