import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { newDriver } from "../../../actions/driversActions";

import "./style.css";
import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class CreateDriver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      cpf: "",
      rg: "",
      bilingue: false,
      active: true,
      drivers: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newDriver = {};
    this.state.name.length > 0
      ? (newDriver.name = this.state.name)
      : (newDriver.name = "");
    this.state.cpf.length > 0
      ? (newDriver.cpf = this.state.cpf)
      : (newDriver.cpf = "");
    this.state.rg.length > 0
      ? (newDriver.rg = this.state.rg)
      : (newDriver.rg = "");
    newDriver.bilingue = this.state.bilingue ? "true" : "false";
    newDriver.active = this.state.active ? "true" : "false";

    this.props.newDriver(newDriver, this.props.history);
    // console.log(newDriver);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("/editar-empresa/" + id);
  }

  checkClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }
  render() {
    return (
      <div>
        <h1 className="text-left">Motorista</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Motorista</label>
                <TextFieldGroupSmall
                  placeholder="Nome/Tel"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>CPF</label>
                <TextFieldGroupSmall
                  placeholder="CPF"
                  name="cpf"
                  value={this.state.cpf}
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
                <label>RG</label>
                <TextFieldGroupSmall
                  placeholder="RG"
                  name="rg"
                  value={this.state.rg}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-check col-md-3 ml-5 mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="bilingue"
                  checked={this.state.bilingue}
                  onChange={this.checkClick}
                />
                <label className="form-check-label">bilingue?</label>
              </div>
              <div className="controls">
                <button type="submit" className="btn btn-primary mb-1">
                  Salvar
                </button>
                <Link to="/motoristas" className="btn btn-danger mb-1">
                  Cancelar
                </Link>
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
  { newDriver }
)(withRouter(CreateDriver));
