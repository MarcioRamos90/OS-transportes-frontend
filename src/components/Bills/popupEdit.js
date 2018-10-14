import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'

import { editBill } from "../../actions/billsActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";

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
      value: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
  }

  componentDidMount(){
    // console.log(this.props.bill)
    this.setState({
      service: this.props.bill.service,
      os_code: this.props.bill.os_code.toString(),
      name: this.props.bill.name,
      os_date: moment(this.props.bill.os_date).add(1, 'day').format('DD/MM/YYYY'),
      status: this.props.bill.status,
      type: this.props.bill.type,
      value: this.props.bill.value
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
                <TextFieldGroupSmall
                  placeholder="Aberto/Fechado"
                  name="value"
                  value={this.state.value}
                  onChange={this.onChange}
                />
              </div>
              

              <div className="controls">
                <a type="submit" onClick={() => {this.onSubmit(); this.props.cancel()}} className="btn btn-primary mb-1">
                  <p>Confirmar</p>
                </a>
                <a onClick={() => this.props.cancel()} className="btn btn-danger mb-1">
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

export default connect(
  null,
  {editBill}
)(ListBills);
