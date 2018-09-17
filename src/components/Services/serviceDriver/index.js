import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDrivers } from "../../../actions/driversActions";
import { newServiceDriver } from "../../../actions/servicesActions";

import "../styleServices.css";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class ServiceListDrivers extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.drivers) {
      this.setState({
        drivers: nextProps.drivers
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    this.state.name.length > 0
      ? (filter.name = this.state.name)
      : (filter.name = "");
    this.state.cpf.length > 0
      ? (filter.cpf = this.state.cpf)
      : (filter.cpf = "");
    this.state.rg.length > 0 ? (filter.rg = this.state.rg) : (filter.rg = "");
    filter.bilingue = this.state.bilingue ? "true" : "false";
    filter.active = this.state.active ? "true" : "false";

    this.props.getDrivers(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  selectClick(driver) {
    this.props.newServiceDriver(driver)
  }

  checkClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  renderDriver() {
    return this.state.drivers.map(driver => (
      <tr onClick={() => this.selectClick(driver)} key={driver._id}>
        <td>{driver.name}</td>
        <td>{driver.cpf}</td>
        <td>{driver.rg}</td>
        <td>{driver.bilingue ? 'Sim': 'Não'}</td>
        <td>{driver.active ? 'Sim' : 'Não'}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
          <div className="container search">
            <div className="form-row">
              <div className="col-md-3">
                <label>Motorista</label>
                <TextFieldGroupSmall
                  placeholder="Nome/Tel"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3">
                <label>CPF</label>
                <TextFieldGroupSmall
                  placeholder="CPF"
                  name="cpf"
                  value={this.state.cpf}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-check col-md-3 ml-5 ">
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
              <div className="col-md-3 mb-1">
                <label>RG</label>
                <TextFieldGroupSmall
                  placeholder="RG"
                  name="rg"
                  value={this.state.rg}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-check col-md-3 ml-5">
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
                <button type="button" onClick={this.onSubmit} className="btn btn-primary">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>

          <table className="table" style={{overflow: 'auto', width:'100%'}} >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Motoristas</th>
                <th scope="col">CPF</th>
                <th scope="col">RG</th>
                <th scope="col">Bilingue</th>
                <th scope="col">Ativo</th>
              </tr>
            </thead>
            <tbody>{this.renderDriver()}</tbody>
          </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drivers: state.drivers.list
});

export default connect(
  mapStateToProps,
  { getDrivers, newServiceDriver }
)(withRouter(ServiceListDrivers));
