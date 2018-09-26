import React, { Component } from "react";
import { connect } from "react-redux";
import { getPassengerById, editPassenger } from "../../actions/passengerActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";

class EditPassenger extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.passenger) {
      
      const passenger = nextProps.passenger;
      const name = passenger.name ? passenger.name : "";
      
      this.setState({
        name: name,
      });
    }
  }

  componentDidMount() {
    this.props.getPassengerById(this.props.id);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {

    const editPassenger = {
      id: this.props.id,
      name: this.state.name,
    };
    this.props.editPassenger(editPassenger);
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

const mapStateToProps = state => ({
  passenger: state.passenger.passenger,
})

export default connect(
  mapStateToProps,
  { getPassengerById, editPassenger }
)(EditPassenger)