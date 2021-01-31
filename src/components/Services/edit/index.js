import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { 
  getServiceById,
  editService, 
  newDestiny,
  delDestiny,
  cleanService
} from "../../../actions/servicesActions";

import PopupLocal from '../PopupLocal';
import PopupCompany from '../PopupCompany';
import PopupCar from '../PopupCar';
import PopupDriver from '../PopupDriver';
import PopupPassenger from '../PopupPassenger'
import PopupRequester from '../PopupRequester'

import { formattedDate } from '../../../helpers/date.helper'
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
      custCenter: "",
      status: true,
      services: [],
      passengers: [],
      requesters:[],

      local:[],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.cancelEditClick = this.cancelEditClick.bind(this)
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
        date: formattedDate(nextProps.service.os_date, 1, 'YYYY-MM-DD'),
        car: nextProps.service.car,
        reserve: nextProps.service.reserve,
        driver: nextProps.service.driver,
        observation: nextProps.service.observation,
        passengers: nextProps.service.passengers,
        custCenter: nextProps.service.custCenter || '',
        hour: nextProps.service.hour || '',
        log: nextProps.service.log || [],
        id: nextProps.service.id.toString(),
      })
    }
  }

  componentDidMount(){
    this.props.getServiceById(this.props.match.params.id)
    // this.props.defaultAction();
  }

  onSubmit(e) {
    e.preventDefault();
    const editService = {};
    editService._id = this.props.match.params.id
    
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

    this.state.custCenter ? 
      editService.custCenter = this.state.custCenter : editService.custCenter = ""

    this.state.observation ? 
      editService.observation = this.state.observation : editService.observation = ""

    editService.date = this.state.date 
    editService.status = this.state.status;

    // add logs
    editService.log = this.state.log

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

  cancelEditClick(){
    const { id:_id } = this.props.match.params
    this.props.cleanService();
    this.props.history.push('/visualizar-servico/' + _id)
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
              <PopupCompany isEdit={true}/>

              {/*---------- SOLICITANTE ----------*/}
              <PopupRequester isEdit={true}/>

            </div>

            <div className="form-row mb-3">
              {/* -----------PASSAGEIROS----------- */}
              <PopupPassenger isEdit={true}/>

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
              <PopupDriver isEdit={true} />

              {/* -----------  CARROS ------------ */}
              <PopupCar isEdit={true} />
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
            <div className="form-row">
              <div className="controls">
                <a 
                  className="btn btn-primary mb-1" 
                  style={{ color: 'white'}}
                  onClick={this.onSubmit}
                  >
                  <p>Confirma</p>
                </a>
                <button
                  className="cancel btn btn-danger mb-1"
                  onClick={this.cancelEditClick}
                  >Cancelar
                </button>
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
  service: state.services.service,
  user: state.auth.user.name
})

export default connect(
  mapStateToProps,
  { editService, newDestiny, delDestiny, getServiceById, cleanService }
)(withRouter(EditService));
