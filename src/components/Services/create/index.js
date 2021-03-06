import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { 
  newService, 
  newDestiny,
  delDestiny,
  cleanService
} from "../../../actions/servicesActions";

import { defaultAction } from "../../../actions/default"

import PopupLocal from '../PopupLocal';
import PopupCompany from '../PopupCompany';
import PopupCar from '../PopupCar';
import PopupDriver from '../PopupDriver';
import PopupPassenger from '../PopupPassenger'
import PopupRequester from '../PopupRequester'

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";
import { formattedDate } from '../../../helpers/date.helper'

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
      custCenter: "",
      reserve:"",
      status: true,
      services: [],
      passengers: [],
      requesters:[],
      local:[],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
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

  componentDidMount(){

    if("service" in this.props && "_id" in this.props.service){
      // copying the informations
      let { hour, observation, os_date:date , reserve, custCenter, 
        company, passengers, requesters, car, driver, destinys:local } = this.props.service 
      // company.length > 0 ? company = company[0].name : company = ""
      this.setState({
        reserve: reserve,
        hour: hour,
        date: formattedDate(date, 1, 'YYYY-MM-DD'),
        custCenter: custCenter,
        observation: observation,

        company: company,
        passengers:passengers,
        requester: requesters,
        car: car,
        local:local,
        driver: driver,
      });
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
    newService.custCenter = this.state.custCenter
    newService.observation = this.state.observation
    newService.status = this.state.status;

    newService.user = this.props.username
    newService.tipo = "criado"
    
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

  onCancel(){
    this.props.cleanService()
    this.props.history.push('/servicos/')
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
              <PopupCompany isEdit={true} />
              {/*---------- Fim - Empresa ----------*/}

              {/*---------- SOLICITANTE ----------*/}
              <PopupRequester isEdit={true} />
              {/*---------- Fim ----------*/}
              
            </div>

            <div className="form-row mb-3">
          {/* -----------PASSAGEIROS----------- */}
            <PopupPassenger isEdit={true}/>
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
              <PopupLocal isEdit={true}/>
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
              <PopupDriver isEdit={true}/>
            {/* -----------  CARROS ------------ */}
              <PopupCar isEdit={true}/>
              <div className="col-md-3 ml-4">
                <label>Centro de custo</label>
                <TextFieldGroupSmall
                  placeholder="Centrode custo"
                  name="custCenter"
                  value={this.state.custCenter}
                  onChange={this.onChange}
                />
              </div>
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
                  <a
                    style={{ color: 'white'}}
                    className="cancel btn btn-danger mb-1"
                    onClick={this.onCancel}
                    >
                    <p>Cancelar</p>
                  </a>
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
  service: state.services.service,
  username: state.auth.user.name
})

export default connect(
  mapStateToProps,
  { newService, newDestiny, delDestiny, defaultAction, cleanService }
)(withRouter(CreateService));
