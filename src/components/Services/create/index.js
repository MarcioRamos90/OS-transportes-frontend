import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { 
  newService, 
  newDestiny,
  delDestiny
} from "../../../actions/servicesActions";

import PopupLocal from '../PopupLocal';
import PopupCompany from '../PopupCompany';
import PopupCar from '../PopupCar';
import PopupDriver from '../PopupDriver';
import PopupPassenger from '../PopupPassenger'
import PopupRequester from '../PopupRequester'

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
      car: "",
      observation: "",
      destiny:"",
      adress:"",
      reserve:"",
      status: true,
      services: [],
      passengers: [],
      requesters:[],
      local:[],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.passengers){
      this.setState({
        passengers: nextProps.passengers
      })
    }
    if(nextProps.driver){
      this.setState({
        driver: nextProps.driver
      })
    }
    if(nextProps.local){
      this.setState({
        local: nextProps.local
      })
    }
    if(nextProps.service){
      this.setState({
        company: nextProps.service.company ? nextProps.service.company : "",
        car:nextProps.service.car ? nextProps.service.car : "",
        requester:nextProps.service.requesters,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newService = {};
    newService.company = this.state.company 
    newService.passenger = this.state.passengers
    newService.requester = this.state.requester
    newService.reserve = this.state.reserve 
    newService.driver = this.state.driver 
    newService.date = this.state.date 
    newService.car = this.state.car
    newService.destiny = this.state.local
    newService.hour = this.state.hour
    newService.observation = this.state.observation
    newService.status = this.state.status;

    this.props.newService(newService, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("editar-carro/" + id);
  }

  pdfPrint(){
    return 
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Serviços</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row mb-3">
            <div className="col-md-2">
                <label>Reserva</label>
                <TextFieldGroupSmall
                  placeholder="Nº Reserva"
                  name="reserve"
                  value={this.state.reserve}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col-md-2 ">
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
              {/*---------- Empresa ----------*/}
              <PopupCompany />
              {/*---------- Fim - Empresa ----------*/}

              {/*---------- SOLICITANTE ----------*/}
              <PopupRequester />
              {/*---------- Fim ----------*/}
              
            </div>

            <div className="form-row mb-3">
          {/* -----------PASSAGEIROS----------- */}
            <PopupPassenger />
          {/* -----------END----------- */}
            </div>  
            <div className="form-row mb-3">

              <div className="col-md-2">
                <label>Hora</label>
                <TextFieldGroupSmall
                  placeholder="Hora"
                  name="hour"
                  value={this.state.hour}
                  onChange={this.onChange}
                />
              </div>
              {/* -----------LOCAL----------- */}
              <PopupLocal />
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
              <div className="form-row mb-3">

            {/* -----------MOTORISTAS----------- */}
              <PopupDriver />
            {/* -----------  CARROS ------------ */}
              <PopupCar />
            </div>
          {/* -----------END----------- */}
            <div className="form-row">
              
                <div className="controls">
                  <a 
                    className="btn btn-primary mb-1" 
                    style={{ color: 'white'}}
                    onClick={this.onSubmit}
                    >
                    <p>Confirma</p>
                  </a>
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
  local: state.services.service.destinys,
  service: state.services.service
})

export default connect(
  mapStateToProps,
  { newService, newDestiny, delDestiny }
)(withRouter(CreateService));
