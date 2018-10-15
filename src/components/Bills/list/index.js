import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import moment from 'moment'
import { getBills } from "../../../actions/billsActions";

import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";
import PopupEdit from '../popupEdit'
class ListBills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: "", // objectId
      os_code:"", // numeric id
      name: "",
      os_date: "",
      date_init: "",
      date_finish: "",
      status: "",
      typeInput: "",
      statusInput:"",
      value: "",
      bills: [],
      selected: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderBills = this.renderBills.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bills) {
      this.setState({
        bills: nextProps.bills
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
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

  checkClick(e) {

    console.log('fui chacado')
  }

  popuEditValue(){
      return (<Popup trigger={
                  <a className="plus-button">
                    <i className="fas fa-search" />
                  </a>} modal closeOnDocumentClick>
                  {close => (
                     <PopupEdit bill={this.state} cancel={close}/>
                  )}
                </Popup>)
    
  }

  renderBills() {
    return this.state.bills.map(bill => (
      <tr key={bill._id}>
        <td>
          <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox"
            name="checked"
            onChange={() => this.checkClick()}
            checked={bill.checked}
            />
          </div>
        </td>
        <td>{bill.type}</td>
        <td>{bill.os_code}</td>
        <td>{bill.name}</td>
        <td>{moment(bill.os_date).add(1, 'day').format('DD/MM/YYYY')}</td>
        <td>{bill.status}</td>
        <td>{bill.value}</td>
         <td>
          <Popup trigger={
            <a>
              <i style={{ fontSize:'30px', marginTop: 0, hover:{color:'blue'}}} className="fas fa-pen"></i>
            </a>
          }  modal closeOnDocumentClick>
            {close => (
              <PopupEdit bill={bill} cancel={close}/>
            )}
          </Popup>
        </td>
      </tr>
    ));
  }

  checkClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Carros</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="container search">
            <div className="form-row">
              <div className="col-md-2 mb-3">
                <label>Contas</label>
                <TextFieldGroupSmall
                  placeholder="Código os"
                  name="os_code"
                  value={this.state.os_code}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputStatus">Status</label>
                <select onChange={this.onChange} name="statusInput" id="inputStatus" className="form-control">
                  <option value='' defaultValue>Todos</option>
                  <option value='open'>Abertos</option>
                  <option value='close'>Fechados</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label htmlFor="inputType">Tipo</label>
                <select onChange={this.onChange} name="typeInput" id="inputType" className="form-control">
                  <option value='' defaultValue>Todos</option>
                  <option value='payment'>Pagamentos</option>
                  <option value='receive'>Recebimetos</option>
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
                <th scope="col">OS</th>
                <th scope="col">Nome</th>
                <th scope="col">Data</th>
                <th scope="col">Status</th>
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
  { getBills }
)(ListBills);
