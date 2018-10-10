import React, {Component} from 'react'
import moment from 'moment'
import { connect } from "react-redux";
import Popup from "reactjs-popup";

import { getServices } from "../../../actions/servicesActions";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";
import { Container, Table } from "../../commonStyles/PopupStyles";


class ServiceListReport extends Component{
	constructor(props) {
		super(props)

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
      services: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderOS = this.renderOS.bind(this);
    // this.checkClick = this.checkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  	console.log(nextProps)
    if (nextProps.services) {
      this.setState({
        services: nextProps.services
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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
    filter.status = this.state.status;

    this.props.getServices(filter);
  }

  renderOS() {
  	console.log(this.state)
    if(this.state.services){
    return this.state.services.map(os => (
      <tr key={os._id}>
        <td>
          <Popup trigger={
            <a onClick={() => this.addBills(os._id)} >
              <i className="fas fa-pen"></i>
            </a>
          }  modal closeOnDocumentClick>
            {close => (
              <div>
              	<h1>Recebimentos</h1>
              	<input type="text"/>
              	<h1>Pagamentos</h1>
              	<input type="text"/>

              </div>
            )}
          </Popup>
        </td>
        <td>{os.id}</td>
        <td>{os.company.length > 0 && os.company[0].name}</td>
        <td>{moment(os.os_date).add(1, 'day').format('DD/MM/YYYY')}</td>
        <td>{os.car.length > 0 && os.car[0].name}</td>
      </tr>
    ))}
  }

	render() {
    return (
      <Container>
        <h1 className="text-left">Receber e Pagar</h1>
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
             <div className="controls">
                <button type="submit" className="btn btn-primary mb-1">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>

          <Table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">*</th>
                <th scope="col">Código</th>
                <th scope="col">Empresa</th>
                <th scope="col">Data</th>
                <th scope="col">Car</th>
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
export default connect
	(mapStateToProps, {getServices})
	(ServiceListReport)