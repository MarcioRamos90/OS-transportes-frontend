import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment'
import { 
  getServiceById,
  editService, 
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

class EditService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
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
        drivers: nextProps.driver
      })
    }
    if(nextProps.local){
      this.setState({
        local: nextProps.local
      })
    }
    
    if(nextProps.service){
      this.setState({
        company: nextProps.service.company,
        requester: nextProps.service.requesters,
        date: moment(nextProps.service.os_date).add(1, 'day').format('YYYY-MM-DD'),
        car: nextProps.service.car,
        reserve: nextProps.service.reserve,
        driver: nextProps.service.driver,
        observation: nextProps.service.observation,
        passengers: nextProps.service.passengers,
        hour: nextProps.service.hour || '',
        id: nextProps.service.id.toString(),
      })
    }
  }

  componentDidMount(){
    this.props.getServiceById(this.props.match.params.id)
  }

  onSubmit(e) {
    e.preventDefault();
    const editService = {};
    editService.id = this.props.match.params.id
    
    this.state.company ? 
      editService.company = this.state.company : editService.company = []
    
    this.state.requester.length ? 
      editService.requester = this.state.requester : editService.requester = []

    this.state.driver.name || this.state.driver.length ?
     editService.driver = this.state.driver : editService.driver = []

    this.state.car.name || this.state.car.length? 
      editService.car = this.state.car : editService.car = []

    this.state.local.length 
      ? editService.destiny = this.state.local : editService.destiny = []

    this.state.passengers.length ? 
      editService.passenger = this.state.passengers : editService.passenger = []

    this.state.reserve ? 
      editService.reserve = this.state.reserve : editService.reserve = ""

    this.state.hour ? 
      editService.hour = this.state.hour : editService.hour = ""

    this.state.observation ? 
      editService.observation = this.state.observation : editService.observation = ""

    editService.date = this.state.date 
    editService.status = this.state.status;

    this.props.editService(editService, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("editar-carro/" + id);
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Serviços</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row mb-3">
            <div className="col-md-2">
                <label>Código</label>
                <TextFieldGroupSmall
                  placeholder="Nº Reserva"
                  name="id"
                  value={this.state.id}
                  disabled={'true'}
                  onChange={this.onChange}
                />
              </div>
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
              <div className="col-md-3 ">
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

              {/*---------- SOLICITANTE ----------*/}
              <PopupRequester />

            </div>

            <div className="form-row mb-3">
              {/* -----------PASSAGEIROS----------- */}
              <PopupPassenger />

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
            <div className="form-row">
              <div className="controls">
                <a 
                  className="btn btn-primary mb-1" 
                  style={{ color: 'white'}}
                  onClick={this.onSubmit}
                  >
                  Confirma
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
  driver: state.services.service.driver,
  local: state.services.service.destinys,
  service: state.services.service
})

export default connect(
  mapStateToProps,
  { editService, newDestiny, delDestiny, getServiceById }
)(withRouter(EditService));