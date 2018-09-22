import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCars } from "../../actions/carsAction";
import { newServiceCar, delServiceCar } from "../../actions/servicesActions";
import Popup from "reactjs-popup";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpty from "../../validation/is-empty";
import { Container, Listul} from "../commonStyles/PopupStyles"

class PopupCar extends Component {
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
    this.checkClick = this.checkClick.bind(this);
    this.renderListCar = this.renderListCar.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cars) {
      this.setState({
        cars: nextProps.cars
      });
    }
    if(nextProps.car){
      this.setState({
        car: nextProps.car.name
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.name = this.state.name
    filter.active = true
    
    this.props.getCars(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  selectClick(car) {
    this.props.newServiceCar(car)
  }

  checkClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  delCar(){
    this.props.delServiceCar()
  }

  renderListCar() {
    const { car } = this.props
    if (!isEmpty(car)){
      return (
        <div className="li-trash">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {car.name}
          </li>
          <a>
            <i 
              onClick={() => {this.delCar()}}
              className="fas fa-trash"
            />
          </a>
        </div>
        )
      }else{
      return (
        <li  
          className="empty list-group-item d-flex justify-content-between align-items-center"
        >
          Nenhum Carro Selecionado
        </li>
      )
    }
  }

  renderCar(close) {
    return this.state.cars.map(car => (
      <tr onClick={() => {this.selectClick(car); close()}} key={car._id}>
        <td>{car.name}</td>
        <td>{car.yearfab}</td>
        <td>{car.renavam}</td>
        <td>{car.chassi}</td>
        <td>{car.active ? <p>Sim</p> : <p>Não</p>}</td>
      </tr>
    ));
  }

  renderSearchCars(close){
    return (
      <div>
        <div className="container search">            
          <div className="form-row">
            <div className="col-md-3">
              <label>Carro</label>
              <TextFieldGroupSmall
                placeholder="Nome"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="controls">
              <button type="button" onClick={this.onSubmit} className="btn btn-primary">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
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
          <tbody>{this.renderCar(close)}</tbody>
        </table>
    </div>)
  }

  render() {
    return (
      <Container>
        <label>Carro</label>
        <div className='content'>
          <Popup  trigger={
            <a className="plus-button">
              <i className="fas fa-search" />
            </a>} modal closeOnDocumentClick>
            {close => (
              <div>
               {this.renderSearchCars(close)}
              </div>
            )}
          </Popup>

          <Listul>
            {this.renderListCar()}
          </Listul>

        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cars: state.cars.list,
  car: state.services.service.car,
});

export default connect(
  mapStateToProps,
  { getCars, newServiceCar, delServiceCar }
)(withRouter(PopupCar));