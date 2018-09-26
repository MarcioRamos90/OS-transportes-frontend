import React, { Component } from "react";
import { connect } from "react-redux";
import {  newPassenger } from "../../actions/passengerActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";

class CreatePassenger extends Component {
  constructor() {
    super();

    this.state = {
      name: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {
    const newPassenger = {
      name: this.state.name,
    };
    this.props.newPassenger(newPassenger);
    this.props.close()
  }

  render() {
    return (
      <div>
        <div className="col-md-3 mb-3">
          <label>Passageiro</label>
          <TextFieldGroupSmall
            placeholder="Nome"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
        </div>
        <div className="controls">
          <button onClick={() => {this.onSubmit()}} className="btn btn-primary mb-1">
            Salvar
          </button>
          <button onClick={() => {this.props.close()}}
            className="btn btn-danger mb-1">
            Cancelar
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {  newPassenger }
)(CreatePassenger)