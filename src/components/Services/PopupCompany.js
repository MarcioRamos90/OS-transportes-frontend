import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCompanies } from "../../actions/companiesAction";
import { newServiceCompany, delServiceCompany } from "../../actions/servicesActions";
import Popup from "reactjs-popup";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpty from "../../validation/is-empty";
import { Container, Listul} from "../commonStyles/PopupStyles"

class PopupCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      adress: "",
      tel: "",
      cnpj: "",
      active: true,
      companies: [],
      company:{}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkClick = this.checkClick.bind(this);
    this.renderListCompany = this.renderListCompany.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.companies) {
      this.setState({
        companies: nextProps.companies
      });
    }
    if(nextProps.company && nextProps.company.length){
      this.setState({
        company: nextProps.company[0]
      })
    }else{
      this.setState({
        company: nextProps.company
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.name = this.state.name
    filter.active = true
    
    this.props.getCompanies(filter);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  selectClick(car) {
    this.props.newServiceCompany(car)
  }

  checkClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  delCompany(){
    this.props.delServiceCompany()
  }

  renderListCompany() {
    const { company } = this.state
    if (!isEmpty(company)){
      return (
        <div className="li-trash">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {company.name}
          </li>
          <a>
            <i 
              onClick={() => {this.delCompany()}}
              className="fas fa-trash"
            />
          </a>
        </div>
        )
      }else{
      return (
        <li  
          className="empty list-group-item d-flex justify-content-between align-items-center"
        >
          Nenhuma Empresa Selecionada
        </li>
      )
    }
  }

  renderComp(close) {
    
    console.log(this.state.companies)
    if(this.state.companies){
      return this.state.companies.map(comp => (
        <tr onClick={() => {this.selectClick(comp); close()}}  key={comp._id}>
          <td>{comp.name}</td>
          <td>{comp.phone}</td>
          <td>{comp.adress}</td>
          <td>{comp.cnpj}</td>
        </tr>
      ))
    };
  }

  renderSearchCompany(close){
    return (
      <div>
        <div className="container search">            
          <div className="form-row">
            <div className="col-md-3">
              <label>Empresa</label>
              <TextFieldGroupSmall
                placeholder="Nome"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3">
              <label>Telefone</label>
              <TextFieldGroupSmall
                placeholder="Telefone"
                name="tel"
                value={this.state.tel}
                onChange={this.onChange}
              />
            </div>
            <div className="controls">
              <button type="button" onClick={this.onSubmit} className="btn btn-primary">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>

        <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Empresa</th>
                <th scope="col">Telefone</th>
                <th scope="col">Endereço</th>
                <th scope="col">CNPJ</th>
              </tr>
            </thead>
            <tbody>{this.renderComp(close)}</tbody>
          </table>
    </div>)
  }

  render() {
    return (
      <Container>
        <label>Empresa</label>
        <div className='content'>
          <Popup trigger={
            <a className="plus-button">
              <i className="fas fa-search" />
            </a>} modal closeOnDocumentClick>
            {close => (
              <div>
                {this.renderSearchCompany(close)}
              </div>
            )}
          </Popup>

          <Listul>
            {this.renderListCompany()}
          </Listul>

        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies.list,
  company: state.services.service.company,
});

export default connect(
  mapStateToProps,
  { getCompanies, newServiceCompany, delServiceCompany }
)(withRouter(PopupCompany));