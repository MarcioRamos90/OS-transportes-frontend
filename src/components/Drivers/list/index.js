import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDrivers } from "../../../actions/driversActions";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class ListDrivers extends Component {
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

  editClick(id) {
    this.props.history.push("/editar-motorista/" + id);
  }

  checkClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  renderDriver() {
    return this.state.drivers.map(comp => (
      <tr onClick={() => this.editClick(comp._id)} key={comp._id}>
        <td>{comp.name}</td>
        <td>{comp.cpf}</td>
        <td>{comp.rg}</td>
        <td>{comp.bilingue ? <p>Sim</p> : <p>Não</p>}</td>
        <td>{comp.active ? <p>Sim</p> : <p>Não</p>}</td>
      </tr>
    ));
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
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>

          <div
            className="btn-group mb-4"
            role="group"
            style={{ marginBotton: 0 }}
          >
            <Link to="/novo/motorista" className="btn btn-light">
              <i className="fab fa-creative-commons-by" />- Adicionar Motorista
            </Link>
          </div>

          <table className="table">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drivers: state.drivers.list
});

export default connect(
  mapStateToProps,
  { getDrivers }
)(withRouter(ListDrivers));
