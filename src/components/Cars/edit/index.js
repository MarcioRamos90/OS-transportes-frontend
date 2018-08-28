import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editCar, getCarById } from "../../../actions/carsAction";

import "./style.css";
import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class EditCar extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      renavam: "",
      yearfab: "",
      chassi: "",
      active: "",
      cars: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.car) {
      const car = nextProps.car;

      const name = car.name ? car.name : "";
      const renavam = car.renavam ? car.renavam : "";
      const yearfab = car.yearfab ? car.yearfab : "";
      const chassi = car.chassi ? car.chassi : "";
      const active = car.active ? car.active : "";

      this.setState({
        name: name,
        renavam: renavam,
        yearfab: yearfab,
        chassi: chassi,
        active: active
      });
    }
  }

  componentDidMount() {
    this.props.getCarById(this.props.match.params.id);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const editCar = {
      id: this.props.match.params.id,
      name: this.state.name,
      renavam: this.state.renavam,
      yearfab: this.state.yearfab,
      chassi: this.state.chassi,
      active: this.state.active
    };
    this.props.editCar(editCar, this.props.history);
    // console.log(editCar);
  }

  checkClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Editar Carro</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="edit">
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
                  onChange={this.checkClick}
                  checked={this.state.active}
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
                  Salvar
                </button>
                <Link to="/carros" className="btn btn-danger mb-1">
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

const mapStateToProps = state => ({
  car: state.cars.car
});
export default connect(
  mapStateToProps,
  { editCar, getCarById }
)(withRouter(EditCar));
