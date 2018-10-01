import React, { Component } from "react";
import { connect } from "react-redux";
import { getDrivers } from "../../actions/driversActions";
import { newServiceDriver, delServiceDriver } from "../../actions/servicesActions";
import Popup from "reactjs-popup";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpty from "../../validation/is-empty";
import { Container, Listul} from "../commonStyles/PopupStyles"

class PopupDriver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      tel:"",
      cpf: "",
      rg: "",
      bilingue: false,
      drivers: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
    this.renderListDriver = this.renderListDriver.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.drivers) {
      this.setState({
        drivers: nextProps.drivers
      });
    }
    if(nextProps.driver.length){
      this.setState({driver: nextProps.driver[0]})
    }else{
      this.setState({driver: nextProps.driver})
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.name = this.state.name
    filter.tel = this.state.tel
    filter.cpf = this.state.cpf
    filter.rg = this.state.rg
    filter.bilingue = this.state.bilingue;
    filter.active =  "true";

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

  delDriver(){
    this.props.delServiceDriver()
  }

  renderListDriver() {
    const { driver } = this.state
    if (!isEmpty(driver)){
      return (
        <div className="li-trash">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {driver.name}
          </li>
          <a>
            <i 
              onClick={() => this.delDriver()}
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
          Nenhum Passageiro
        </li>
      )
    }
  }

  renderDriver(close) {
    return this.state.drivers.map(driver => (
      <tr onClick={() =>{ this.selectClick(driver); close()}} key={driver._id}>
        <td>{driver.name}</td>
        <td>{driver.tel}</td>
        <td>{driver.rg}</td>
        <td>{driver.bilingue ? 'Sim': 'Não'}</td>
      </tr>
    ));
  }

  renderSearchDrivers(close){
    return (
      <div>
        <div className="container search">            
          <div className="form-row">
            <div className="col-md-3">
              <label>Motorista</label>
              <TextFieldGroupSmall
                placeholder="Nome"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3 ">
                <label>Telefone</label>
                <TextFieldGroupSmall
                  placeholder="Telefone"
                  name="tel"
                  value={this.state.tel}
                  onChange={this.onChange}
                />
              </div>
            <div className="form-check col-md-3 ml-4">
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

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Motoristas</th>
              <th scope="col">Telefone</th>
              <th scope="col">RG</th>
              <th scope="col">Bilingue</th>
            </tr>
          </thead>
          <tbody>{this.renderDriver(close)}</tbody>
        </table>
    </div>)
  }

  render() {
    return (
      <Container>
        <label>Motorista</label>
        <div className='content'>
          <Popup  trigger={
            <a className="plus-button">
              <i className="fas fa-search" />
            </a>} modal closeOnDocumentClick>
            {close => (
              <div>
               {this.renderSearchDrivers(close)}
              </div>
            )}
          </Popup>

          <Listul>
            {this.renderListDriver()}
          </Listul>

        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  drivers: state.drivers.list,
  driver: state.services.service.driver,
});

export default connect(
  mapStateToProps,
  { getDrivers, newServiceDriver, delServiceDriver }
)(PopupDriver);
