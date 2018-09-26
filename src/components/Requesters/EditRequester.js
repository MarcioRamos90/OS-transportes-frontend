import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequesterById, putRequester } from "../../actions/requesterActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";

class EditRequester extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requester) {
      
      const requester = nextProps.requester;
      const name = requester.name ? requester.name : "";
      
      this.setState({
        name: name,
      });
    }
  }

  componentDidMount() {
    this.props.getRequesterById(this.props.id);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {

    const putRequester = {
      id: this.props.id,
      name: this.state.name,
    };
    this.props.putRequester(putRequester);
    this.props.close()
  }


  render() {
    return (
      <div>
        <div className="col-md-3 mb-3">
          <label>Solicitante</label>
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
  requester: state.requester.requester
})

export default connect(
  mapStateToProps,
  { getRequesterById, putRequester }
)(EditRequester)