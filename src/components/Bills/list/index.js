import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import moment from 'moment'
import { getBills, finishBill, finishBillWithReturn } from "../../../actions/billsActions";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";
import PopupEdit from '../popupEdit'
import BillExcel from '../ExcelConvert'

import PopupFinishAll from '../PopupFinishAll';
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
      passenger:"",
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

      selectMany: false,
      billsSelected: []
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
    filter.passenger = this.state.passenger
    filter.start = this.state.date_init
    filter.end = this.state.date_finish
    filter.status = this.state.statusInput
    filter.type = this.state.typeInput

    this.props.getBills(filter);
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


  finishBill = (bill, status)=>{

    var error = this.validateFinish(bill, status);

    if(!error){ 
      const data = {};
      data.id = bill._id
      data.name = bill.name
      data.os_code = bill.os_code
      data.date = bill.os_date
      data.status = status
      data.type = bill.type
      data.custCenter = bill.custCenter
      data.passengers = bill.passengers
      data.destinys = bill.destinys
      data.value = bill.value
      this.handleError('')
      
      this.props.finishBill(data)

      this.onSubmit()

    }else{
      this.handleError(error)
    }
    
  }

  handleError(error){
    this.setState({
      errorMessage: error
    })    
  }

  validateFinish(bill, status="close"){
    var errorFinish = ""

    if(status === "close"){
      if(isEmpyt(bill.value)) errorFinish = "Conta sem valor não pode ser fechada";
      if(bill.status === status) errorFinish = "Conta fechada não seleciona!";
    }

    return errorFinish
  }

  checkClickMany = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  cleanSelecteds = ()=> {
    this.setState({
      billsSelected: []
    })
  }

  handleFinishMany = () => {
    return <Popup trigger={
      <a
        className="btn btn-info ml-4"

        >
        {this.state.billsSelected.length } Constas
      </a> 
      } modal closeOnDocumentClick>
        {close => 
          <PopupFinishAll 
            bills={this.state.billsSelected} 
            finishBill={this.props.finishBillWithReturn} 
            submit={this.onSubmit}
            close={close}
            cleanSelecteds={this.cleanSelecteds}
            typeInput={this.state.typeInput}
            />
        }
      </Popup>
  }

  itemsSelectMany = (e,  i) => {
    var errorFinish = this.validateFinish(this.state.bills[i])
    if(e.target.checked && isEmpyt(errorFinish)){
      this.setState({
        billsSelected: [...this.state.billsSelected, this.state.bills[i]]
      })
    }else if (!isEmpyt(errorFinish)) {
      e.target.checked = false;
      this.handleError(errorFinish)
    }else if(!e.target.checked){
      const listBills = [...this.state.billsSelected]
      const newListBills = listBills.filter(item => {
        return item._id !== e.target.id}
      )
      this.setState({
        billsSelected: [...newListBills]
      })
    }
  }

  renderTable(){
    return (
      <div >
        <div style={{ display:"flex",flexDirection: "row"}}>
        <div className="custom-control custom-switch ml-4">
            <input 
              type="checkbox" 
              className="custom-control-input" 
              id="customControlAutosizing"
              name="selectMany"
              onChange={this.checkClickMany}
              checked={this.state.selectMany}
              />
            <label 
              className="custom-control-label" 
              htmlFor="customControlAutosizing">Selecionar várias OS's</label>
          </div>
          { this.state.selectMany ? this.handleFinishMany() : undefined }
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">*</th>
              <th scope="col">Data</th>
              <th scope="col">Hour</th>
              <th scope="col">Reserva</th>
              <th scope="col">CC</th>
              <th scope="col">OS</th>
              <th scope="col">Nome</th>
              <th scope="col">Solicitantes</th>
              <th scope="col">Passageiros</th>
              <th scope="col">Destinos</th>
              <th scope="col">Carro</th>
              {this.state.typeInput === 'receive'? <th scope="col">Motorista</th>
                :<th scope="col">Empresa</th>}
              <th scope="col">Valor</th>
              {!this.state.selectMany ? <th scope="col">Edit</th> : undefined}
            </tr>
          </thead>
          <tbody >{this.renderBills()}</tbody>
        </table>
      </div>
    )
  }

  renderBills() {
    return this.state.bills.map((bill, index) => (
      <tr key={bill._id}>
        {!this.state.selectMany ?
          <td >
            {bill.status === 'close' ? 
              <a 
                onClick={() => this.finishBill(bill, "open")} >
                <i 
                  style={{ fontSize:'25px', marginTop: 0, hover:{color:'blue !important'}}} 
                  className="fas fa-undo"></i>
              </a>
              :
              <a 
                onClick={() => this.finishBill(bill, "close")} >
                <i 
                  style={{ fontSize:'25px', marginTop: 0, hover:{color:'blue'}}} 
                  className="fas fa-check"></i>
              </a>
            }  
          </td> : 
          <td>
              <div className="custom-control custom-switch">
                <input 
                 type="checkbox"  
                 id={`${bill._id}`} 
                 onChange={(bill) => this.itemsSelectMany(bill, index)}
                 checked={
                  !isEmpyt(this.state.billsSelected.filter(
                    item => item._id === bill._id))
                  }
                 />
              </div>
            </td>
        }
        <td>{moment(bill.os_date).add(1, 'day').format('DD/MM/YYYY')}</td>
        <td>{bill.hour}</td>
        <td>{bill.reserve}</td>
        <td>{bill.custCenter}</td>
        <td>{bill.os_code}</td>
        <td>{bill.name}</td>
        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.requesters.length) 
          && bill.requesters.map(req => (
            <p className='list-td' key={req._id}>{req.name}</p>))}</td>       

        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.passengers.length) 
          && bill.passengers.map(pass => (
            <p className='list-td' key={pass._id}>{pass.name}</p>))}</td>
        <td className='list-td'>{!isEmpyt(bill.destinys) 
          && bill.destinys.map(dest => ( <p key={dest._id}>{dest.local}</p> ))}</td>
        <td>{!isEmpyt(bill.car) && bill.car[0].name}</td>
        {bill.type === 'receive' ? <td>{bill.driver}</td> : <td>{bill.company}</td> }
        <td>R$ {bill.value || '_'}</td>

        {!this.state.selectMany ?
           <td>
            <Popup trigger={
              <a>
                <i 
                  style={{ fontSize:'25px', marginTop: 0, hover:{color:'blue'}}} 
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
          </td> : undefined
        }
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
       
        <div className="text-left container">
         <Popup trigger={
            <a  className="btn btn-success btn-bills" style={{color:'#fff'}} >
              Relatório de Contas
            </a>
          } modal closeOnDocumentClick>
            {close => (
              <ReportBill 
                bills={this.state.bills} total={this.state.total} type={this.state.typeInput}/>
            )}
        </Popup>
        
        <Popup trigger={
        <a className="btn btn-success btn-bills ml-3" style={{color:'white'}}>
          Exportar para Excel
        </a>} modal closeOnDocumentClick>
        {close => (
           <BillExcel 
                bills={this.state.bills} 
                total={this.state.total} 
                typeInput={this.state.typeInput}/>
        )}
      </Popup>
          <form onSubmit={this.onSubmit} className="search">
          <h4 style={{ textAlign:'right' }}>Total: {this.state.total}</h4>
            <div className="form-row">

              <div className="col-md-1 mb-3">
                <label>Código</label>
                <TextFieldGroupSmall
                  placeholder="Código"
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
              <div className="col-md-2 mb-3">
                <label>Passageiro</label>
                <TextFieldGroupSmall
                  placeholder="Nome passageiro"
                  name="passenger"
                  value={this.state.passenger}
                  onChange={this.onChange}
                />
              </div>
             
            </div>
            <div className="form-row">
               <div className="form-group col-md-2">
                <label htmlFor="inputStatus">Status</label>
                <select onChange={this.onChange} name="statusInput" id="inputStatus" className="form-control">
                  <option value='open' defaultValue>Abertos</option>
                  <option value='close'>Fechados</option>
                  <option value=''>Todos</option>
                </select>
              </div>
              
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
        </div>
          {this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bills: state.bills.list
});
export default connect(
  mapStateToProps,
  { getBills, finishBill,finishBillWithReturn }
)(ListBills);
