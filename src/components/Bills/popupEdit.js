import React, { Component } from "react";
import { connect } from "react-redux";

import { editBill } from "../../actions/billsActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpyt from  '../../validation/is-empty'
import { formattedDate } from '../../helpers/date.helper'

class ListBills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: "", // objectId
      os_code:"", // numeric id
      name: "",
      os_date: "",
      status: "",
      type: "",
      observation: "",
      value: 0,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      service: this.props.bill.service,
      os_code: this.props.bill.os_code.toString(),
      name: this.props.bill.name,
      os_date: formattedDate(this.props.bill.os_date, 0, 'DD/MM/YYYY'),
      status: this.props.bill.status,
      type: this.props.bill.type,
      value: String(this.props.bill.value),
      observation: this.props.bill.observation
    })
  }

  onSubmit() {

    const data = {};
    data.id = this.props.bill._id
    data.name = this.state.name
    data.os_code = this.state.os_code
    data.date = this.state.os_date
    data.status = this.state.status
    data.type = this.state.type
    data.value = this.state.value
    data.observation = this.state.observation

    this.props.editBill(data)

    
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkClick() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Contas</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="search">
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>OS</label>
                <TextFieldGroupSmall
                  placeholder="Código os"
                  name="os_code"
                  value={this.state.os_code}
                  onChange={this.onChange}
                  disabled='true'
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Status</label>
                <TextFieldGroupSmall
                  placeholder="Aberto/Fechado"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  disabled='true'
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Tipo de conta</label>
                <TextFieldGroupSmall
                  placeholder="Aberto/Fechado"
                  name="type"
                  value={this.state.type}
                  onChange={this.onChange}
                  disabled='true'
                />
              </div>
              
            </div>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Data</label>
                <TextFieldGroupSmall
                  name="os_date"
                  value={this.state.os_date}
                  onChange={this.onChange}
                  disabled='true'
                  />
              </div>

              <div className="col-md-3 mb-3">
              <label>Valor</label>
              <div style={{ display:'flex', alignItems: 'center' }}>
                <p className="mr-1">R$</p>
                <TextFieldGroupSmall
                  name="value"
                  value={this.state.value === 'undefined' || isEmpyt(this.state.value) ? '': this.state.value}
                  onChange={this.onChange}
                  disabled={this.state.status === 'close' ? 'true' : ''}
                /> 
              </div>
              </div>
            </div>
            <div className="form-row">
              
              <div className="col-md-8 mb-3">
                <label>Observação</label>
                <TextFieldGroupSmall
                  name="observation"
                  value={this.state.observation}
                  onChange={this.onChange}
                  disabled={this.state.status === 'close' ? 'true' : ''}
                  />
              </div>
              {this.state.status === 'open' &&
              <div className="controls">
                <a 
                  type="submit" 
                  onClick={() => {this.onSubmit(); this.props.submit(); this.props.cancel()}} 
                  className="btn btn-primary mb-1"
                  >
                  <p>Confirmar</p>
                </a>
                <a onClick={() => this.props.cancel()} className="btn btn-danger mb-1">
                  <p>Cancelar</p>
                </a>
              </div>

            }
              {this.state.status === 'close' ? <h5>Conta Fechada não altera valor</h5> : ''}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {editBill}
)(ListBills);
