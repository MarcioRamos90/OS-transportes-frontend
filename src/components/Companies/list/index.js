import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getCompanies } from "../../../actions/companiesAction";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class ListCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      adress: "",
      phone: "",
      cnpj: "",
      active: true,
      companies: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.companies) {
      this.setState({
        companies: nextProps.companies
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    this.state.name.length > 0
      ? (filter.name = this.state.name)
      : (filter.name = "");
    this.state.adress.length > 0
      ? (filter.adress = this.state.adress)
      : (filter.adress = "");
    this.state.phone.length > 0
      ? (filter.phone = this.state.phone)
      : (filter.phone = "");
    this.state.cnpj.length > 0
      ? (filter.cnpj = this.state.cnpj)
      : (filter.cnpj = "");
    filter.active = this.state.active ? "true" : "false";

    this.props.getCompanies(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("/editar-empresa/" + id);
  }

  checkClick() {
    this.setState({
      active: !this.state.active
    });
  }

  renderComp() {
    return this.state.companies.map(comp => (
      <tr onClick={() => this.editClick(comp._id)} key={comp._id}>
        <td>{comp.name}</td>
        <td>{comp.phone}</td>
        <td>{comp.adress}</td>
        <td>{comp.cnpj}</td>
        <td>{comp.active ? <p>Sim</p> : <p>Não</p>}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Empresas</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Empresas</label>
                <TextFieldGroupSmall
                  placeholder="Nome empresa"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Endereço</label>
                <TextFieldGroupSmall
                  placeholder="Endereço"
                  name="adress"
                  value={this.state.adress}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-check col-md-3 ml-5 mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="active"
                  checked={this.state.active}
                  onChange={this.checkClick}
                />
                <label className="form-check-label">Ativo?</label>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Telefone</label>
                <TextFieldGroupSmall
                  placeholder="Telefone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>CNPJ</label>
                <TextFieldGroupSmall
                  placeholder="CNPJ"
                  name="cnpj"
                  value={this.state.cnpj}
                  onChange={this.onChange}
                />
              </div>
              <div className="controls">
                <button type="submit" className="btn btn-primary mb-1">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>

          <div
            className="btn-group mt-2"
            role="group"
            style={{ padding: 0 }}
          >
            <Link to="/nova/empresa" className="btn btn-secondary">
              Adicionar Empresa
            </Link>
          </div>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Empresa</th>
                <th scope="col">Telefone</th>
                <th scope="col">Endereço</th>
                <th scope="col">CNPJ</th>
                <th scope="col">Ativo</th>
              </tr>
            </thead>
            <tbody>{this.renderComp()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies.list
});
export default connect(
  mapStateToProps,
  { getCompanies }
)(withRouter(ListCompanies));
