import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Menu from "./components/Menu";
import ListCompanies from "./components/Companies/list";
import EditCompanie from "./components/Companies/edit";
import CreateCompanie from "./components/Companies/create";

import store from "./store";

// Check for toke
if (localStorage.jwtToken) {
  // Set Auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token and get user info and get expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set User and isAuthenticaded
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.haref = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registro" component={Register} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/empresas" component={ListCompanies} />
            <Route exact path="/nova/empresa/" component={CreateCompanie} />
            <Route exact path="/empresa/:id" component={EditCompanie} />

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
