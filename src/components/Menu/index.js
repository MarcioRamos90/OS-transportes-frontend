import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style.css";

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
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Carros</h5>
              <i className="fas fa-car" />
            </div>
          </div>
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Motoristas</h5>
              <i className="fab fa-creative-commons-by" />
            </div>
          </div>
        </div>
        <h1 className="text-left">Serviços</h1>
        <div className="row">
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Ordem de Serviço</h5>
              <i className="fas fa-wrench" />
            </div>
          </div>
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">OS's Canceladas</h5>
              <i className="fas fa-ban" />
            </div>
          </div>
        </div>
        <h1 className="text-left">Controles</h1>
        <div className="row">
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Recebimento</h5>
              <i className="far fa-money-bill-alt" />
            </div>
          </div>
          <div className="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Pagamentos</h5>
              <i className="fas fa-credit-card" />
            </div>
          </div>
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
