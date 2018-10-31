import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./styleMenu.css";

class Menu extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-left">Cadastros</h1>
        <div className="row">
          <Link
            to="/empresas"
            className="card bg-light mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Empresas</h5>
              <i className="fas fa-building" />
            </div>
          </Link>
          <Link
            to="/carros"
            className="card bg-light mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Carros</h5>
              <i className="fas fa-car" />
            </div>
          </Link>
          <Link
            to="/motoristas"
            className="card bg-light mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Motoristas</h5>
              <i className="fab fa-creative-commons-by" />
            </div>
          </Link>
        </div>
        <h1 className="text-left">Serviços</h1>
        <div className="row">
          <Link
              to="/servicos"
              className="card bg-light mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">Ordem de Serviço</h5>
                <i className="fas fa-wrench" />
              </div>
          </Link>
        </div>
        <h1 className="text-left">Controles</h1>
        <div className="row">
          <Link t
            to="/contas"
            className="card bg-light mb-3"
            style={{ maxWidth: "18rem" }}
            >
            <div className="card-body">
              <h5 className="card-title">Contas</h5>
              <i className="fas fa-money-bill-alt" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(Menu);
