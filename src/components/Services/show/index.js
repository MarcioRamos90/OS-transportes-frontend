import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment'
import Popup from "reactjs-popup";

import { getServiceById } from "../../../actions/servicesActions";
import { createLogPrintAction } from '../../../actions/logsActions'
import OsPdf from '../../Reports/pdf/report_os'
import PopupLocal from '../PopupLocal';
import PopupCompany from '../PopupCompany';
import PopupCar from '../PopupCar';
import PopupDriver from '../PopupDriver';
import PopupPassenger from '../PopupPassenger'
import PopupRequester from '../PopupRequester'
import LogsComponent from  '../LogsComponent'

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class ShowService extends Component {
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
        custCenter: nextProps.service.custCenter || '',
        hour: nextProps.service.hour || '',
        log: nextProps.service.log || [],
        id: nextProps.service.id ? nextProps.service.id.toString(): '',
      })
    }
  }

  componentDidMount(){
    this.props.getServiceById(this.props.match.params.id)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("editar-carro/" + id);
  }

  printOSHandler(os){    
    return (
      <Popup trigger={
        <button className='btn btn-success'>
          <p>Imprimir</p>
        </button>
      }modal closeOnDocumentClick>
        {close => (
          <OsPdf os={os} createlog={this.props.createLogPrintAction}/>
        )}
      </Popup>)
  }

  renderLog(){
    return (
      <Popup trigger={
        <button className='btn btn-primary'>
          <p>logs</p>
        </button>
      }modal closeOnDocumentClick>
        {close => <LogsComponent logs={this.props.service.log || []}/>}
      </Popup>
    )
  }

  render() {
    const { id:_id } = this.props.match.params
    return (
      <div>
        <Link to={'/servicos'}>
          <i className="fas fa-arrow-left arrow-back"> 
          </i>        </Link>

        <h1 className="text-left">Serviços</h1>
        <div className="container screen text-left">
          <Link className="btn btn-success" to={'/editar-servico/' + _id}>Editar</Link>
          {this.printOSHandler(this.props.service)}
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
                  value={this.state.reserve || ''}
                  onChange={this.onChange}
                  disabled={'true'}
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
                  disabled={'true'}
                  style={{ width:30, borderRadius: 0 }}
                />
              </div>
              <PopupCompany isCreate={false}/> {/*---------- Empresa ----------*/}

              <PopupRequester /> {/*---------- SOLICITANTE ----------*/}

            </div>

            <div className="form-row mb-3">
              <PopupPassenger /> {/* -----------PASSAGEIROS----------- */}

            </div>  
            <div className="form-row mb-3">

              <div className="col-md-2">
                <label>Hora</label>
                <TextFieldGroupSmall
                  placeholder="Hora"
                  name="hour"
                  value={this.state.hour}
                  onChange={this.onChange}
                  disabled={'true'}
                />
              </div>
              <PopupLocal /> {/* -----------LOCAL----------- */}

            </div>
            <div className="form-row">
             <div className="col-md-8 mb-4">
                <label>Observação</label>
                <TextFieldGroupSmall
                  placeholder="Observação"
                  name="observation"
                  value={this.state.observation || ""}
                  onChange={this.onChange}
                  disabled={'true'}
                />
              </div>
            </div>
              <div className="form-row mb-3">
              <PopupDriver /> {/* -----------MOTORISTAS----------- */}
              <PopupCar /> {/* -----------  CARROS ------------ */}
              <div className="col-md-3 ml-4">
                <label>Centro de custo</label>
                <TextFieldGroupSmall
                  placeholder="Centrode custo"
                  name="custCenter"
                  value={this.state.custCenter}
                  onChange={this.onChange}
                  disabled={'true'}
                />
              </div>
            </div> 
          </form>
          {this.renderLog()}
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
  { getServiceById, createLogPrintAction }
)(withRouter(ShowService));
