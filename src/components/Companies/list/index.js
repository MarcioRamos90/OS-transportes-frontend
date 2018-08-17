import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
class ListCompanies extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  redirectEdit(id) {
    this.props.history.push("empresa/" + id);
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Empresas</h1>
        <div className="container screen text-left">
          <form className="container search">
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
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>

          <div class="btn-group mb-4" role="group" style={{ marginBotton: 0 }}>
            <Link to="/nova/empresa" class="btn btn-light">
              <i class="fas fa-building " />- Adicionar Empresa
            </Link>
          </div>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Empresa</th>
                <th scope="col">Telefone</th>
                <th scope="col">Endereço</th>
                <th scope="col">CNPJ</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => this.redirectEdit(1)}>
                <td>Empresa 1</td>
                <td>1532123456</td>
                <td>Rua: nome, SP</td>
                <td>789.783.0001-3</td>
              </tr>
              <tr>
                <td>Empresa 2</td>
                <td>1532123456</td>
                <td>Rua: nome, SP</td>
                <td>789.783.0001-3</td>
              </tr>
              <tr>
                <td>Empresa 3</td>
                <td>1532123456</td>
                <td>Rua: nome, SP</td>
                <td>789.783.0001-3</td>
              </tr>
            </tbody>
          </table>
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
)(ListCompanies);
