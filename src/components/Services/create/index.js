import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "reactjs-popup";

import { 
  newService, 
  newPassenger, 
  delPassenger, 
  delServiceDriver, 
  newDestiny,
  delDestiny
} from "../../../actions/servicesActions";

import ServiceDriver from '../serviceDriver';
import Service from '../Service';

import "../styleServices.css";
import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class CreateService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      company: "",
      passenger: "",
      requester: "",
      driver:"",
      date: "",
      hour: "",
      date_init:"",
      car: "",
      observation: "",
      destiny:"",
      adress:"",
      status: true,
      services: [],
      passengers: [],
      local:[],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
    this.submitPassenger = this.submitPassenger.bind(this);
    this.renderDriver = this.renderDriver.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.passengers){
      this.setState({
        passengers: nextProps.passengers
      })
    }
    if(nextProps.driver){
      this.setState({
        driver: nextProps.driver.name
      })
    }
    if(nextProps.local){
      this.setState({
        local: nextProps.local
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newService = {};
    this.state.company.length > 0
      ? (newService.company = this.state.company)
      : (newService.company = "");
    this.state.passengers.length > 0
      ? (newService.passengers = this.state.passengers)
      : (newService.passengers = "");
    this.state.requester.length > 0
      ? (newService.requester = this.state.requester)
      : (newService.requester = "");
    this.state.driver.length > 0
      ? (newService.driver = this.state.driver)
      : (newService.driver = "");
    this.state.date.length 
      ? (newService.date = this.state.date)
      : (newService.date = "");
    this.state.car.length > 0
      ? (newService.car = this.state.car)
      : (newService.car = "");
    this.state.local.length > 0
      ? (newService.local = this.state.local)
      : (newService.local = "");
    this.state.observation.length > 0
      ? (newService.observation = this.state.observation)
      : (newService.observation = "");
    newService.status = this.state.status;

    // this.props.newService(newService);
    console.log(newService)

  }

  submitPassenger(){
    this.props.newPassenger(this.state.passenger)
    this.setState({
      passenger: ''
    })
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
      status: !this.state.status
    });
  }

  delPassenger(passenger){
    this.props.delPassenger(passenger)
  }


  renderListPassenger() {
    return this.state.passengers.map(pass => (
      <tr style={{backgroundColor:'white'}} key={pass}>
        <td>{pass}</td>
        <td className="trash-td">
          <a onClick={() => this.delPassenger(pass)}><i className="fas fa-trash" style={{ fontSize:'20px'}}/></a>
        </td>
      </tr>
    ));
  }

  submitLocal(){
    const newDestiny ={ destiny:this.state.destiny , adress:this.state.adress}
    this.props.newDestiny(newDestiny)
    this.setState({
      destiny: "",
      adress: ""
    })
  }

  delDestiny(destiny){
    this.props.delDestiny(destiny)
  }

  renderListDestinations() {
    const { local } = this.state
    if (local){
    return local.map(Destiny => (
      <tr style={{backgroundColor:'white'}} key={Destiny.destiny}>
        <td>{Destiny.destiny}</td>
        <td>{Destiny.adress}</td>
        <td className="trash-td">
          <a onClick={() => this.delDestiny(Destiny)}><i className="fas fa-trash" style={{ fontSize:'20px'}}/></a>
        </td>
      </tr>
    ));
  }
  }

  delDriver(){
    this.props.delServiceDriver()
  }

  renderDriver() {
    const { driver } = this.state
    if (driver){
      return (
        <tr style={{backgroundColor:'white'}} >
          <td>{driver}</td>
          <td className="trash-td">
            <a onClick={() => this.delDriver()}><i className="fas fa-trash" style={{ fontSize:'20px'}}/></a>
          </td>
        </tr>)
      }
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Serviços</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">
              <div className="col-md-2 mb-3">
                <label>Data OS</label>
                <TextFieldGroupSmall
                  name="date"
                  type="date"
                  className="date"
                  value={this.state.date}
                  onChange={this.onChange}
                  style={{ width:30, borderRadius: 0 }}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Empresa</label>
                <TextFieldGroupSmall
                  placeholder="Empresa"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                />
              </div>
               <div className="col-md-3 mb-3">
                <label>Solicitante</label>
                <TextFieldGroupSmall
                  placeholder="Solicitante"
                  name="requester"
                  value={this.state.requester}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-check col-md-3 ml-5 mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="status"
                  checked={this.state.status}
                  onChange={this.checkClick}
                />
                <label className="form-check-label">Ativo?</label>
              </div>
            </div>

            <div className="form-row">

            {/* -----------PASSAGEIROS----------- */}
            <Popup trigger={
                    <a className="plus-button">
                      <i className="fas fa-plus"/>
                    </a>
                  } modal>
              {close => (
                <div>
                  <div className="col-md-8 mb-1">
                    <h5 style={{ margin: 0}}>Passageiro</h5>
                    <TextFieldGroupSmall
                      name="passenger"
                      className="passenger"
                      value={this.state.passenger}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="controls">
                    <button type="button" 
                    className="btn btn-primary mb-1" 
                    onClick={() => this.submitPassenger()}>
                      Adicionar
                    </button>
                    <a style={{ color: '#fff'}} className="cancel btn btn-danger mb-1" onClick={() => close()}>
                      <p>Cancelar</p>
                    </a>
                  </div>
                </div>
              )}
            </Popup>
             <table className="table table-bordered mr-3" style={{ width: '200px'}}>
                <thead>
                  <tr style={{backgroundColor:'white'}}>
                    <th scope="col">Passageiros</th>
                    <th scope="col">Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderListPassenger()}
                  
                </tbody>
              </table>
            {/* -----------END----------- */}

            </div>  
            <div className="form-row">

              <div className="col-md-3 mb-3">
                <label>Hora</label>
                <TextFieldGroupSmall
                  placeholder="Hora"
                  name="hour"
                  value={this.state.hour}
                  onChange={this.onChange}
                />
              </div>
              {/* -----------LOCAL----------- */}
              <Popup trigger={<a className="plus-button"> <i className="fas fa-plus" /></a>} modal>
                  {close => (
                    <div>
                      <div className="col-md-8 mb-1">
                        <h5 style={{ margin: 0}}>Nome Local</h5>
                        <TextFieldGroupSmall
                          name="destiny"
                          value={this.state.destiny}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-md-8 mb-1">
                        <h5 style={{ margin: 0}}>Endereço</h5>
                        <TextFieldGroupSmall
                          name="adress"
                          value={this.state.adress}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="controls">
                        <button type="button" 
                        className="btn btn-primary mb-1" 
                        onClick={() => this.submitLocal()}>
                          Adicionar
                        </button>
                        <a style={{ color: '#fff'}} className="cancel btn btn-danger mb-1" onClick={() => close()}>
                          <p>Cancelar</p>
                        </a>
                      </div>
                    </div>
                  )}
                </Popup>
                <table className="table table-bordered" style={{ width: '500px'}}>
                  <thead>
                    <tr style={{backgroundColor:'white'}}>
                      <th scope="col">Local</th>
                      <th scope="col">Endereço</th>
                      <th scope="col">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderListDestinations()}
                    
                  </tbody>
                </table>
              {/* -----------END----------- */}
            </div>
            <div className="form-row">
             <div className="col-md-8 mb-4">
                <label>Observação</label>
                <TextFieldGroupSmall
                  placeholder="Observação"
                  name="observation"
                  value={this.state.observation}
                  onChange={this.onChange}
                />
              </div>
            </div>
              <div className="form-row">

            {/* -----------MOTORISTAS----------- */}
              <Popup  trigger={
                        <a className="plus-button">
                          <i className="fas fa-search" />
                        </a>} modal closeOnDocumentClick>

                  {close => (
                    <div>
                     <ServiceDriver />
          
                    </div>
                  )}
              </Popup>

              <table className="table table-bordered mr-3" style={{ width: '200px'}}>
                <thead>
                  <tr style={{backgroundColor:'white'}}>
                    <th scope="col">Motorista</th>
                    <th scope="col">Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderDriver()}
                  
                </tbody>
              </table>
               <div className="col-md-3 mb-3">
                <label>Carro</label>
                <TextFieldGroupSmall
                  placeholder="Carro"
                  name="car"
                  value={this.state.car}
                  onChange={this.onChange}
                />
              </div>
            </div>
          {/* -----------END----------- */}
            <div className="form-row">

          
              

              
                <div className="controls">
                  <Popup  
                    trigger={
                      <a className="btn btn-primary mb-1" style={{ color: 'white'}}>
                        <p>Confirma</p>  
                      </a>} style={{ width: '2000px'}}  modal closeOnDocumentClick>
                      {close => (
                        <div>
                         <Service cancel={close} submit={this.onSubmit} fields={this.state}/>
                        </div>
                    )}
                   </Popup>
                  <Link to="/servicos/" className="cancel btn btn-danger mb-1">
                    <p>Cancelar</p>
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
  passengers: state.services.service.passengers,
  driver: state.services.service.driver,
  local: state.services.service.local,
})

export default connect(
  mapStateToProps,
  { newService, newPassenger, delPassenger, delServiceDriver, newDestiny, delDestiny }
)(withRouter(CreateService));
