import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

import Loading from "./components/layout/Loading";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Menu from "./components/Menu";
import ListCompanies from "./components/Companies/list";
import EditCompanie from "./components/Companies/edit";
import CreateCompanie from "./components/Companies/create";
import ListCars from "./components/Cars/list";
import CreateCar from "./components/Cars/create";
import EditCar from "./components/Cars/edit";
import ListDrivers from "./components/Drivers/list";
import CreateDriver from "./components/Drivers/create";
import EditDriver from "./components/Drivers/edit";
import ListServices from "./components/Services/list";
import CreateService from "./components/Services/create";
import EditService from "./components/Services/edit";
import ShowService from "./components/Services/show";
import ListBills from "./components/Bills/list";

import store from "./store";

// Check for token
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
  state = {
    isLoading: false
  }

  setLoading = (val) => {
    this.setState({
      isLoading: val
    })
  }

  render() {
    return (
      <Provider store={store}>
      
        <Router>

          <div className="App">
          { this.state.isLoading ?
            <Loading />
      
            : undefined
          }
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login"  
              render={() => <Login {...this.props} setLoading={this.setLoading} />}
              />
            <Route exact path="/registro" component={Register} />
            <Switch>
              <PrivateRoute exact path="/menu" component={Menu} />
            </Switch>
            {/* Empresas */}
            <Switch>
              <PrivateRoute exact path="/empresas" component={ListCompanies} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/nova/empresa/"
                component={CreateCompanie}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/editar-empresa/:id/"
                component={EditCompanie}
              />
            </Switch>
            {/* Carros */}
            <Switch>
              <PrivateRoute exact path="/carros/" component={ListCars} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/novo/carro/" component={CreateCar} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/editar-carro/:id/"
                component={EditCar}
              />
            </Switch>
            {/* Motoristas */}
            <Switch>
              <PrivateRoute exact path="/motoristas/" component={ListDrivers} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/novo/motorista/"
                component={CreateDriver}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/editar-motorista/:id/"
                component={EditDriver}
              />
            </Switch>

             {/* Servicos */}
            <Switch>
              <PrivateRoute exact path="/servicos/" component={ListServices} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/novo/servico/"
                component={CreateService}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/editar-servico/:id"
                component={EditService}
              />
            </Switch>
            
            <Switch>
              <PrivateRoute
                exact
                path="/visualizar-servico/:id"
                component={ShowService}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/contas"
                component={ListBills}
              />
            </Switch>
                
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
