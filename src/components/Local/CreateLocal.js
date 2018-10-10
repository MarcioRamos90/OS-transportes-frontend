import React, { Component } from "react";
import { connect } from "react-redux";
import {  newLocal } from "../../actions/localActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";

class CreateCar extends Component {
  constructor() {
    super();

    this.state = {
      destiny: "",
      adress: "",

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
    const newLocal = {
      destiny: this.state.destiny,
      adress: this.state.adress
    };
    this.props.newLocal(newLocal);
    this.props.close()
  }

  render() {
    return (
      <div>
        <div className="col-md-3 mb-3">
          <label>Local</label>
          <TextFieldGroupSmall
            placeholder="Local"
            name="destiny"
            value={this.state.destiny}
            onChange={this.onChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label>Endereço</label>
          <TextFieldGroupSmall
            placeholder="Endereço"
            name="adress"
            value={this.state.adress}
            onChange={this.onChange}
          />
        </div>
        <div className="controls">
          <button 
            onClick={() => {this.onSubmit()}}
            className="btn btn-primary mb-1"
            >
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
  {  newLocal }
)(CreateCar)