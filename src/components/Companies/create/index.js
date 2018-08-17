import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.css";
class CreateCompanie extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Adicionar Nova Empresa</h1>
        <div className="container screen text-left">
          <form className="edit">
            <div class="form-row">
              <div class="col-md-3 mb-3">
                <label>Empresas</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nome empresa"
                />
              </div>
              <div class="col-md-3 mb-3">
                <label>Endereço</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Endereço"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-3 mb-3">
                <label>Telefone</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Telefone"
                />
              </div>
              <div class="col-md-3 mb-3">
                <label>CNPJ</label>
                <input type="text" class="form-control" placeholder="CNPJ" />
              </div>
              <div className="controls">
                <button type="submit" class="btn btn-primary mb-1">
                  Salvar
                </button>
                <button type="submit" class="btn btn-danger mb-1">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
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
)(CreateCompanie);
