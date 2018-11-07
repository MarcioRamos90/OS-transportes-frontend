import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import moment from 'moment'
import { getBills, editBill } from "../../../actions/billsActions";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";
import PopupEdit from '../popupEdit'
import isEmpyt from  '../../../validation/is-empty'
import ReportBill from '../../Reports/pdf/reportBill'

class ListBills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: "", // objectId
      os_code:"", // numeric id
      reserve: "",
      name: "",
      os_date: "",
      date_init: "",
      date_finish: "",
      status: "",
      typeInput: "receive",
      statusInput:"open",
      value: "",
      errorMessage: "",
      bills: [],
      total: 0,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderBills = this.renderBills.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  async componentWillReceiveProps(nextProps) {

    if (nextProps.bills) {
      await this.setState({
        bills: nextProps.bills,
        total: nextProps.bills.reduce( function(prev=0, cur){
                  if(cur.type === 'receive')
                    return cur.value == null ? prev : prev + Number(cur.value);
                  if(cur.type === 'payment')
                    return cur.value == null ? prev : prev - Number(cur.value);
                  return 0;
                }, 0)
      });
    }
    
    if(this.state.typeInput === "payment"){
      console.log(this.state.total)
      this.setState({
        total: Math.abs(this.state.total)
      })
    }
  }

  onSubmit(e) {
    if(!isEmpyt(e))
      e.preventDefault();

    const filter = {};
    filter.reserve = this.state.reserve
    filter.name = this.state.name
    filter.os_code = this.state.os_code
    filter.start = this.state.date_init
    filter.end = this.state.date_finish
    filter.status = this.state.statusInput
    filter.type = this.state.typeInput

    this.props.getBills(filter);
    // console.log(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  popuEditValue(){
    return (
      <Popup trigger={
        <a className="plus-button">
          <i className="fas fa-search" />
        </a>} modal closeOnDocumentClick>
        {close => (
           <PopupEdit bill={this.state} cancel={close}/>
        )}
      </Popup>)
}

  async filter(status) {
    const filter = {};
    filter.name = this.state.name
    filter.os_code = this.state.os_code
    filter.start = this.state.date_init
    filter.end = this.state.date_finish
    filter.status = status
    filter.type = this.state.typeInput

    this.props.getBills(filter);
  }

  async finishBill(bill, status){

    var error = this.validateFinish(bill, status);

    if(!error){ 
      const data = {};
      data.id = bill._id
      data.name = bill.name
      data.os_code = bill.os_code
      data.date = bill.os_date
      data.status = status
      data.type = bill.type
      data.value = bill.value
      this.handleError('')
       try {
         await this.props.editBill(data)
         await this.filter(status)
       }catch (error){
         console.log(error)
       }
    }else{
      this.handleError(error)
    }
    
  }

  handleError(error){
    this.setState({
      errorMessage: error
    })    
  }

  validateFinish(bill, status){
    var errorFinish = ""

    if(status === "close"){
      if(isEmpyt(bill.value)) errorFinish = "Conta sem valor não pode ser fechada"
    }

    return errorFinish
  }

  renderBills() {
    return this.state.bills.map(bill => (
      <tr key={bill._id}>
        <td >
          {bill.status === 'close' ? 
            <a 
              onClick={() => this.finishBill(bill, "open")} >
              <i 
                style={{ fontSize:'30px', marginTop: 0, hover:{color:'blue'}}} 
                className="fas fa-undo"></i>
            </a>
            :
            <a 
              onClick={() => this.finishBill(bill, "close")} >
              <i 
                style={{ fontSize:'30px', marginTop: 0, hover:{color:'blue'}}} 
                className="fas fa-check"></i>
            </a>
          }  
        </td>
        <td>{bill.type === 'receive'? "Recebimento" : "Pagamento"}</td>
        <td>{bill.reserve}</td>
        <td>{bill.os_code}</td>
        <td>{bill.name}</td>
        <td>{moment(bill.os_date).add(1, 'day').format('DD/MM/YYYY')}</td>
        <td>{bill.status === 'open'? "Aberta" : "Fechada" }</td>
        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.passengers.length) 
          && bill.passengers.map(pass => (
            <p className='list-td' key={pass._id}>{pass.name}</p>))}</td>
        <td className='list-td'>{!isEmpyt(bill.destinys) 
          && bill.destinys.map(dest => ( <p key={dest._id}>{dest.local}</p> ))}</td>
        <td>{!isEmpyt(bill.car) && bill.car[0].name}</td>
        {<td>{bill.driver}</td> || <td>{bill.company}</td> }
        <td>R$ {bill.value || '_'}</td>
         <td>
          <Popup trigger={
            <a>
              <i 
                style={{ fontSize:'30px', marginTop: 0, hover:{color:'blue'}}} 
                className="fas fa-pen">
              </i>
            </a>
          }  modal closeOnDocumentClick>
            {close => 
              (<PopupEdit 
                bill={bill} 
                cancel={close}
                submit={this.onSubmit}
              />)
            }
          </Popup>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        {this.state.errorMessage && 
          <div 
            class="alert alert-danger" 
            style={{ position:'fixed', top:30, right:30, zIndex: 5}} 
            role="alert"
            >
            {this.state.errorMessage}
          </div>
        }
        <h1 className="text-left">Contas</h1>
        <Popup trigger={
            <a className="btn btn-success" style={{ color: 'white', position: 'absolute', right: 30, top:90}}>
              Relatório de Contas
            </a>
          } modal closeOnDocumentClick>
            {close => (
              <ReportBill bills={this.state.bills} total={this.state.total} type={this.state.typeInput}/>
            )}
        </Popup>
        <div className="screen text-left">
          <h4 style={{ textAlign:'right' }}>Total: {this.state.total}</h4>
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">

              <div className="col-md-2 mb-3">
                <label>Código</label>
                <TextFieldGroupSmall
                  placeholder="Código os"
                  name="os_code"
                  value={this.state.os_code}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Nome</label>
                <TextFieldGroupSmall
                  placeholder="Nome"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2 mb-3">
                <label>Reserva</label>
                <TextFieldGroupSmall
                  placeholder="Numero reserva"
                  name="reserve"
                  value={this.state.reserve}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputStatus">Status</label>
                <select onChange={this.onChange} name="statusInput" id="inputStatus" className="form-control">
                  <option value='open' defaultValue>Abertos</option>
                  <option value='close'>Fechados</option>
                  <option value=''>Todos</option>

                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label htmlFor="inputType">Tipo</label>
                <select onChange={this.onChange} name="typeInput" id="inputType" className="form-control">
                  <option value='receive' defaultValue>Empresas</option>
                  <option value='payment'>Motoristas</option>
                </select>
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
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">*</th>
                <th scope="col">Tipo</th>
                <th scope="col">Reserva</th>
                <th scope="col">OS</th>
                <th scope="col">Nome</th>
                <th scope="col">Data</th>
                <th scope="col">Status</th>
                <th scope="col">Passageiros</th>
                <th scope="col">Destinos</th>
                <th scope="col">Carro</th>
                {this.state.typeInput === 'receive'? <th scope="col">Motorista</th>
                  :<th scope="col">Empresa</th>}
                <th scope="col">Valor</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>{this.renderBills()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bills: state.bills.list
});
export default connect(
  mapStateToProps,
  { getBills, editBill }
)(ListBills);
