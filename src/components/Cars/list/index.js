import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getCars } from "../../../actions/carsAction";

import "./style.css";
import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class ListCars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      renavam: "",
      yearfab: "",
      chassi: "",
      active: true,
      cars: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderCar = this.renderCar.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cars) {
      this.setState({
        cars: nextProps.cars
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    this.state.name.length > 0
      ? (filter.name = this.state.name)
      : (filter.name = "");
    this.state.renavam.length > 0
      ? (filter.renavam = this.state.renavam)
      : (filter.renavam = "");
    this.state.yearfab.length > 0
      ? (filter.yearfab = this.state.yearfab)
      : (filter.yearfab = "");
    this.state.chassi.length > 0
      ? (filter.chassi = this.state.chassi)
      : (filter.chassi = "");
    filter.active = this.state.active ? "true" : "false";

    this.props.getCars(filter);
    // console.log(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("editar-carro/" + id);
  }

  checkClick() {
    this.setState({
      active: !this.state.active
    });
  }

  renderCar() {
    return this.state.cars.map(car => (
      <tr onClick={() => this.editClick(car._id)} key={car._id}>
        <td>{car.name}</td>
        <td>{car.yearfab}</td>
        <td>{car.renavam}</td>
        <td>{car.chassi}</td>
        <td>{car.active ? <p>Sim</p> : <p>Não</p>}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Carros</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Carros</label>
                <TextFieldGroupSmall
                  placeholder="Carro/placa"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Renavam</label>
                <TextFieldGroupSmall
                  placeholder="Renavam"
                  name="renavam"
                  value={this.state.renavam}
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
                <label>Ano Fabricação</label>
                <TextFieldGroupSmall
                  placeholder="Ano"
                  name="yearfab"
                  value={this.state.yearfab}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Chassi</label>
                <TextFieldGroupSmall
                  placeholder="Chassi"
                  name="chassi"
                  value={this.state.chassi}
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
            className="btn-group mb-4"
            role="group"
            style={{ marginBotton: 0 }}
          >
            <Link to="/novo/carro" className="btn btn-light">
              <i className="fas fa-car " />- Adicionar Carro
            </Link>
          </div>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Carros</th>
                <th scope="col">Ano Fab</th>
                <th scope="col">Renavam</th>
                <th scope="col">Chassi</th>
                <th scope="col">Ativo</th>
              </tr>
            </thead>
            <tbody>{this.renderCar()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cars: state.cars.list
});
export default connect(
  mapStateToProps,
  { getCars }
)(withRouter(ListCars));
