import React, { Component } from "react";
import { connect } from "react-redux";
import { getLocalById, editLocal } from "../../actions/localActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";

class EditCar extends Component {
  constructor() {
    super();

    this.state = {
      destiny: "",
      adress: "",

    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.local) {
      const local = nextProps.local;
      const destiny = local.local ? local.local : "";
      const adress = local.adress ? local.adress : "";


      this.setState({
        destiny: destiny,
        adress: adress,

      });
    }
  }

  componentDidMount() {
    this.props.getLocalById(this.props.id);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {

    const editLocal = {
      id: this.props.id,
      destiny: this.state.destiny,
      adress: this.state.adress
    };
    this.props.editLocal(editLocal, this.props.history);
    this.props.close()
  }


  render() {
    return (
      <div>
        <div className="col-md-3 mb-3">
          <label>Carros</label>
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
  local: state.local.local,
})

export default connect(
  mapStateToProps,
  { getLocalById, editLocal }
)(EditCar)