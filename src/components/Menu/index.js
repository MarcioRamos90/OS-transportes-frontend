import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./style.css";

class Menu extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-left">Cadastros</h1>
        <div className="row">
          <Link
            to="/empresas"
            class="card bg-light mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div class="card-body">
              <h5 class="card-title">Empresas</h5>
              <i className="fas fa-building" />
            </div>
          </Link>
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">Carros</h5>
              <i class="fas fa-car" />
            </div>
          </div>
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">Motoristas</h5>
              <i class="fab fa-creative-commons-by" />
            </div>
          </div>
        </div>
        <h1 className="text-left">Serviços</h1>
        <div className="row">
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">Ordem de Serviço</h5>
              <i class="fas fa-wrench" />
            </div>
          </div>
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">OS's Canceladas</h5>
              <i class="fas fa-ban" />
            </div>
          </div>
        </div>
        <h1 className="text-left">Controles</h1>
        <div className="row">
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">Recebimento</h5>
              <i class="far fa-money-bill-alt" />
            </div>
          </div>
          <div class="card bg-light mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">Pagamentos</h5>
              <i class="fas fa-credit-card" />
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
