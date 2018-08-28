import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { newCompany } from "../../../actions/companiesAction";

import "./style.css";
import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class CreateCompanie extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      adress: "",
      phone: "",
      cnpj: "",
      active: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newCompany = {
      name: this.state.name,
      adress: this.state.adress,
      phone: this.state.phone,
      cnpj: this.state.cnpj,
      active: this.state.active
    };
    this.props.newCompany(newCompany, this.props.history);
  }
  checkClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Adicionar Nova Empresa</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="edit">
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
                  onChange={this.checkClick}
                  checked={this.state.active}
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
                  Salvar
                </button>
                <button className="btn btn-danger mb-1">Cancelar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { newCompany }
)(withRouter(CreateCompanie));
