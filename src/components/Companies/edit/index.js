import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getCompanieById,
  editComapany
} from "../../../actions/companiesAction";

import "./style.css";
import TextFieldGroupSmall from "../../common/TextFieldGroupSmall";

class EditCompanie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      adress: "",
      phone: "",
      cnpj: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      const company = nextProps.company;

      const name = company.name ? company.name : "";
      const adress = company.adress ? company.adress : "";
      const phone = company.phone ? company.phone : "";
      const cnpj = company.cnpj ? company.cnpj : "";

      this.setState({
        name: name,
        adress: adress,
        phone: phone,
        cnpj: cnpj
      });
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getCompanieById(this.props.match.params.id);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const editCompany = {
      id: this.props.match.params.id,
      name: this.state.name,
      adress: this.state.adress,
      phone: this.state.phone,
      cnpj: this.state.cnpj
    };
    this.props.editComapany(editCompany, this.props.history);
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Editar Empresa</h1>
        <div className="container screen text-left">
          <form onSubmit={this.onSubmit} className="edit">
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Empresas</label>
                <TextFieldGroupSmall
                  placeholder="Nome empresa"
                  name="name"
                  value={this.state.name}
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
            </div>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Telefone</label>
                <TextFieldGroupSmall
                  placeholder="Telefone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>CNPJ</label>
                <TextFieldGroupSmall
                  placeholder="CNPJ"
                  name="cnpj"
                  value={this.state.cnpj}
                  onChange={this.onChange}
                />
              </div>
              <div className="controls">
                <button type="submit" className="btn btn-primary mb-1">
                  Salvar
                </button>
                <button className="btn btn-danger mb-1">Cancelar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  company: state.companies.company
});
export default connect(
  mapStateToProps,
  { getCompanieById, editComapany }
)(withRouter(EditCompanie));
