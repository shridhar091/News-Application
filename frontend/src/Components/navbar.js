import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PrivateRoute from "../helper/privateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./login";
import RegistrationForm from "./register";
import Home from "./home";
import Articles from "./articles";
import Post from "./post";
import AddArticle from "./addArticle";

const Navbar = (props) => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      props.history.push("/");
      localStorage.removeItem("token");
    }
  };

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          News-Article
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!localStorage.getItem("token") ? (
              <div className="d-flex flex-row gap-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </div>
            ) : (
              <div className="d-flex flex-row gap-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/articles">
                    All Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/post">
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>

    <Route path="/register" component={RegistrationForm} exact={true} />
    <Route path="/login" component={Login} exact={true} />
    <Route path="/" component={Home} exact={true} />
    <PrivateRoute path="/articles" component={Articles} exact={true} />
    <PrivateRoute path="/post" component={Post} exact={true} />
    <PrivateRoute path="/add" component={AddArticle} exact={true} />
    <ToastContainer />
    </div>
  );
};

export default withRouter(Navbar);
