import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment'
import Popup from "reactjs-popup";

import { getServices, finishOS } from "../../../actions/servicesActions";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";
import { Container, Table } from "../../commonStyles/PopupStyles";
import PopupCancel from '../PopupCancel';
import isEmpyt from  '../../../validation/is-empty'
import OsPdf from '../../Reports/pdf/report_os'
import ReportPdf from '../../Reports/pdf/reportAll'

class ListServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      company: "",
      passenger: "",
      os_date: "",
      date_init:"",
      date_finish:"",
      car: "",
      driver:"",
      status: true,
      reserve:"",
      requester:"",
      hour:"",
      services: [],
      finalized: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderOS = this.renderOS.bind(this);
    this.checkClick = this.checkClick.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services) {
      this.setState({
        services: nextProps.services
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.date = {};
    this.state.code
      ? (filter.code = this.state.code)
      : (filter.code = "");
    this.state.company.length > 0
      ? (filter.company = this.state.company)
      : (filter.company = "");
    this.state.reserve.length > 0
      ? (filter.reserve = this.state.reserve)
      : (filter.reserve = "");
    this.state.requester.length > 0
      ? (filter.requester = this.state.requester)
      : (filter.requester = "");
    this.state.passenger.length > 0
      ? (filter.passenger = this.state.passenger)
      : (filter.passenger = "");
    this.state.hour.length > 0
      ? (filter.hour = this.state.hour)
      : (filter.hour = "");
    this.state.driver.length > 0
      ? (filter.driver = this.state.driver)
      : (filter.driver = "");
    this.state.date_init.length 
      ? (filter.start = this.state.date_init)
      : (filter.start = "");
    this.state.date_finish.length
      ? (filter.end = this.state.date_finish)
      : (filter.end = "");
    this.state.car.length > 0
      ? (filter.car = this.state.car)
      : (filter.car = "");

    filter.finalized = this.state.finalized;
    filter.status = this.state.status;

    this.props.getServices(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editClick(id) {
    this.props.history.push("/editar-servico/" + id);
  }

  cancelClick(id){
    return 
  }

  checkClick() {
    this.setState({
      status: !this.state.status
    });
  }

  finishOS(os){
    var errorFinish = this.validateFinish(os)

    if(isEmpyt(errorFinish)){
      this.handleError(null)
      this.props.finishOS(os._id)
    }else{
      this.handleError(errorFinish)
    }
  }

  validateFinish(os){
    var errorFinish = ""

    if(isEmpyt(os.driver)) errorFinish = "Sem Motorista a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.car)) errorFinish = "Sem Carro a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.passengers)) errorFinish = "Sem Passageiro a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.requesters)) errorFinish = "Sem Solicitante a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.company)) errorFinish = "Sem Empresa a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.hour)) errorFinish = "Sem hora a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.os_date)) errorFinish = "Sem data a ordem de serviço não pode ser finalizada"
    if(isEmpyt(os.destinys)) errorFinish = "Sem destinos a ordem de serviço não pode ser finalizada"
    

    return errorFinish
  }

  handleError(error){
    this.setState({
      errorMessage: error
    })
    
    setTimeout(
      function() {
          this.setState({errorMessage: null});
      }
      .bind(this),
      5000
      );
    
  }

  retuntOS(os){
    this.handleError('OS finalizada não retorna à em aberto. \nCancele está OS e crie outra para modificações necessárias.')
  }

  renderOS() {
    if(this.state.services){
    return this.state.services.map(os => (
      <tr key={os._id}>
        <td>
          <Popup trigger={
              <a>
                <i className="fas fa-file-pdf"></i>
              </a>
            }  modal closeOnDocumentClick>
              {close => (
                <OsPdf os={os}/>
              )}
            </Popup>
        </td>
        <td>
          <a onClick={() => this.editClick(os._id)}>
            <i className="fas fa-pen"></i>
          </a>
        </td>
        <td>{moment(os.os_date).add(1, 'day').format('DD/MM/YYYY')}</td>
        <td>{os.hour}</td>
        <td>{os.company.length > 0 && os.company[0].name}</td>
        <td style={{padding:'30px !important'}}>{os.passengers.length > 0 
          && os.passengers.map(pass => (
            <p className='list-td' key={pass._id}>{pass.name}</p>))}</td>

        <td className='list-td'>{os.destinys.length > 0 
          && os.destinys.map(dest => ( <p key={dest._id}>{dest.local}</p> ))}</td>

        <td>{os.driver.length > 0 && os.driver[0].name}</td>
        <td>{os.car.length > 0 && os.car[0].name}</td>
        <td>
          {os.finalized ? 
            <a onClick={() => this.retuntOS(os)} >
              <i className="fas fa-times"></i>
            </a>
            :
            <a onClick={() => this.finishOS(os)} >
              <i className="fas fa-check"></i>
            </a>
          }
        </td>
        <td>
          <Popup style={{ position:'absolute' }} trigger={
            <a onClick={() => this.cancelClick(os._id)} >
              <i className="fas fa-ban"></i>
            </a>
          }  modal closeOnDocumentClick>
            {close => (
              <PopupCancel os={os} close={close}/>
            )}
          </Popup>
        </td>
      </tr>
    ))}
  }

  render() {
    return (
      <Container>
      {this.state.errorMessage && 
        <div 
          className="alert alert-danger" 
          style={{ position:'fixed', top:30, right:30, zIndex: 5}} role="alert">
          {this.state.errorMessage}
        </div>
      }

        <h1 className="text-left">Serviços</h1>
        <Popup trigger={
          <a 
            className="btn btn-success" 
            style={{ color: 'white', position: 'absolute', right: 30, top:90}}>
            Ralatório Geral
          </a>
        } modal closeOnDocumentClick>
          {close => (
            <ReportPdf services={this.props.services}/>
          )}
        </Popup>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">
              <div className="col-md-2 mb-3">
                <label>Código</label>
                <TextFieldGroupSmall
                  placeholder="Código"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Empresa</label>
                <TextFieldGroupSmall
                  placeholder="Empresa"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                />
              </div>

              <div className="col-md-2 mb-3">
                <label>Reserva</label>
                <TextFieldGroupSmall
                  placeholder="Nº Reserva"
                  name="reserve"
                  value={this.state.reserve}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Solicitante</label>
                <TextFieldGroupSmall
                  placeholder="Solicitante"
                  name="requester"
                  value={this.state.requester}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Hora</label>
                <TextFieldGroupSmall
                  placeholder="Hora"
                  name="hour"
                  value={this.state.hour}
                  onChange={this.onChange}
                />
              </div>
              
            </div>

            <div className="form-row">
              <div className="col-md-2 mb-3">
                <label>Passageiro</label>
                <TextFieldGroupSmall
                  placeholder="Passageiro"
                  name="passenger"
                  value={this.state.passenger}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Carro</label>
                <TextFieldGroupSmall
                  placeholder="Carro"
                  name="car"
                  value={this.state.car}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Motorista</label>
                <TextFieldGroupSmall
                  placeholder="Motorista"
                  name="driver"
                  value={this.state.driver}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Data inicial</label>
                <TextFieldGroupSmall
                  name="date_init"
                  type="date"
                  className="date"
                  value={this.state.date_init}
                  onChange={this.onChange}
                  style={{ width:30, borderRadius: 0 }}
                />
              </div>
               <div className="col-md-2 mb-3">
                <label>Data final</label>
                <TextFieldGroupSmall
                  name="date_finish"
                  type="date"
                  className="date"
                  value={this.state.date_finish}
                  onChange={this.onChange}
                  style={{ width:30, borderRadius: 0 }}
                />
              </div>
              </div>
              <div className="form-row">
               <div className="form-group col-md-2">
                <label htmlFor="inputStatus">Tipo</label>
                <select onChange={this.onChange} name="finalized" id="inputStatus" className="form-control">
                  <option value={false} defaultValue>Em Aberto</option>
                  <option value={true}>Finalizada</option>
                </select>
              </div>

             <div className="controls">
                <button type="submit" className="btn btn-primary mb-1">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>

          <div
            className="btn-group mt-2"
            role="group"
            style={{ marginBotton: 0 }}
          >
            <Link to="/novo/servico" className="btn btn-secondary" style={{marginBottom:10}}>
               Adicionar Serviço
            </Link>
          </div>

          <Table className="table">
            <thead className="thead-dark">
              <tr>

                <th scope="col">PDF</th>
                <th scope="col">Edit</th>
                <th scope="col">Data</th>
                <th scope="col">HR</th>
                <th scope="col">Empresa</th>
                <th scope="col">Passageiros</th>
                <th scope="col">Destinos</th>
                <th scope="col">Motoristas</th>
                <th scope="col">Carro</th>
                <th scope="col">Finalizar</th>
                <th scope="col">Cancelar</th>

              </tr>
            </thead>
            <tbody>{this.renderOS()}</tbody>
          </Table>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  services: state.services.list
});
export default connect(
  mapStateToProps,
  { getServices, finishOS }
)(withRouter(ListServices));
