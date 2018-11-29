import React, {Component, Fragment} from 'react';
import Popup from "reactjs-popup";
import { connect } from "react-redux";

import 
{ 
  getPassenger, 
  getPassengerById, 
} 
from "../../actions/passengerActions";

import EditPassenger from '../Passenger/EditPassenger'
import CreatePassenger from '../Passenger/CreatePassenger'
import { 
  newServicePassenger,
  delServicePassenger
} 
  from "../../actions/servicesActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpty from "../../validation/is-empty";
import { Container, Table } from "../commonStyles/PopupStyles";

class PopupPassenger extends Component {
    constructor(props) {
    super(props);

    this.state = {
      name:"",
      passenger:[],
      passenger_searched:[],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delPassenger = this.delPassenger.bind(this)
    this.renderListPassengerSearched = this.renderListPassengerSearched.bind(this)
    this.renderSearchPassenger = this.renderSearchPassenger.bind(this)
    this.renderListPassenger = this.renderListPassenger.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.passenger_searched){
      this.setState({
        passenger_searched: nextProps.passenger_searched
      })
    }
    if(nextProps.passenger){
      this.setState({
        passenger: nextProps.passenger
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  delPassenger(passenger){
    this.props.delPassenger(passenger)
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.name = this.state.name || ""
    
    this.props.getPassenger(filter);

  }

  selectClick(passenger){
    this.props.newServicePassenger(passenger)
  }


  renderListPassengerSearched(close) {
    return this.state.passenger_searched.map(passenger => (
        <tr key={passenger.name}>
          <td>
            <a onClick={() => {this.selectClick(passenger); close()}}>
              <i className="fas fa-hand-pointer"></i>
            </a>
          </td>
          <td>{passenger.name}</td>
          <td>
            <Popup trigger={
              <a className="plus-button">
                <i className="fas fa-pen"></i>
              </a>} modal closeOnDocumentClick>
              {close => (
                <EditPassenger id={passenger._id} close={close}/>
              )}
            </Popup>
          </td>
        </tr>
    ));
  }

  renderSearchPassenger(close){
    return (
      <div>
        <div className="container search">            
          <div className="form-row">
            <div className="col-md-3">
              <label>Passageiro</label>
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
          <div className="form-row">
            <Popup trigger={
              <a className="btn btn-secondary">
                Adicionar
              </a>} modal closeOnDocumentClick>
              {close => (
                <CreatePassenger close={close}/>
              )}
            </Popup>
            
          </div>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">*</th>
              <th scope="col">Passageiro</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>{this.renderListPassengerSearched(close)}</tbody>
        </table>
    </div>)
  }

  renderListPassenger() {
    const { passenger } = this.state;
    const { isEdit } = this.props;

    if (!isEmpty(passenger)){
      return passenger.map(passenger => (
        <Fragment key={passenger.name}>
          <tr >
            <td>{passenger.name}</td>
            {isEdit && 
              <td>
                <a onClick={() => this.props.delServicePassenger(passenger)}>
                  <i className="fas fa-trash text-center"/>
                </a>
              </td>
            }
          </tr>
        </Fragment>
      ))}
      else{
        return (
        <tr className='empty'>
          <td>Passageiro</td>
        </tr>
        )
    }
  }

  render() {
    const { isEdit } = this.props
    return (
      <Container>
        <label>Passageiro</label>
        <div className='content'>

          {isEdit &&
            <Popup trigger={
              <a className="plus-button">
                <i className="fas fa-search" />
              </a>} modal closeOnDocumentClick>
              {close => (
                <div>
                  {this.renderSearchPassenger(close)}
                </div>
              )}
            </Popup>
          }
          <Table className="table table-bordered" disabled={!isEdit}>
            <tbody>
              {this.renderListPassenger()}
            </tbody>
          </Table>
          </div>
      </Container>
    )
  }
}


const mapStateToProps = state => ({
  passenger_searched: state.passenger.list,
  passenger: state.services.service.passengers,
})

export default connect(
  mapStateToProps,
  { 
    newServicePassenger, 
    delServicePassenger, 
    getPassenger, 
    getPassengerById, 
  }
)(PopupPassenger)
