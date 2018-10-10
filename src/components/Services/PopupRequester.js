import React, {Component, Fragment} from 'react';
import Popup from "reactjs-popup";
import { connect } from "react-redux";

import 
{ 
  getRequester, 
  getRequesterById, 
} 
from "../../actions/requesterActions";

import EditRequester from '../Requesters/EditRequester'
import CreateRequester from '../Requesters/CreateRequester'
import { 
  newServiceRequester,
  delServiceRequester
} from "../../actions/servicesActions";
import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpty from "../../validation/is-empty";
import { Container, Table } from "../commonStyles/PopupStyles";


class PopupRequester extends Component {
    constructor(props) {
    super(props);

    this.state = {
      name:"",
      requester:[],
      requester_searched:[],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this)
    this.renderListItensSearched = this.renderListItensSearched.bind(this)
    this.renderSearchFieldsPassenger = this.renderSearchFieldsPassenger.bind(this)
    this.renderListItensonService = this.renderListItensonService.bind(this)
  }

	componentWillReceiveProps(nextProps){
    if(nextProps.requester_searched){
      this.setState({
        requester_searched: nextProps.requester_searched
      })
    }
    if(nextProps.requester){
      this.setState({
        requester: nextProps.requester
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

	deleteItem(requester) {
    this.props.delServiceRequester(requester)
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.name = this.state.name || ""
    
    // console.log(filter)
    this.props.getRequester(filter);
  }

  selectClick(requester){
    this.props.newServiceRequester(requester)
  }


  renderListItensSearched(close) {
    // console.log(this.props.requester_searched)
    return this.state.requester_searched.map(item => (
        <tr key={item.name}>
          <td>
            <a onClick={() => {this.selectClick(item); close()}}>
              <i className="fas fa-hand-pointer"></i>
            </a>
          </td>
          <td>{item.name}</td>
          <td>
            <Popup trigger={
              <a className="plus-button">
                <i className="fas fa-pen"></i>
              </a>} modal closeOnDocumentClick>
              {close => (
                <EditRequester id={item._id} close={close}/>
              )}
            </Popup>
          </td>
        </tr>
    ));
  }

  renderSearchFieldsPassenger(close){
    return (
      <div>
        <div className="container search">            
          <div className="form-row">
            <div className="col-md-3">
              <label>Solicitante</label>
              <TextFieldGroupSmall
                placeholder="Nome"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="controls">
              <button type="button" onClick={this.onSubmit} className="btn btn-primary">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          <div className="form-row">
            <Popup trigger={
              <a className="btn btn-secondary">
                Adicionar
              </a>} modal closeOnDocumentClick>
              {close => (
                <CreateRequester close={close}/>
              )}
            </Popup>
            
          </div>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">*</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>{this.renderListItensSearched(close)}</tbody>
        </table>
    </div>)
  }

  renderListItensonService() {
    const { requester } = this.state
    if (!isEmpty(requester)){
      return requester.map(item => (
        <Fragment key={item.name}>
          <tr >
            <td>{item.name}</td>
            <td>
              <a onClick={() => this.props.delServiceRequester(item)}>
                <i className="fas fa-trash text-center"/>
              </a>
            </td>
          </tr>
        </Fragment>
      ))}
      else{
        return (
        <tr className='empty'>
          <td>Solicitante</td>
        </tr>
        )
    }
  }

  render() {
    return (
      <Container>
        <label>Solicitante</label>
        <div className='content'>
          <Popup trigger={
            <a className="plus-button">
              <i className="fas fa-search" />
            </a>} modal closeOnDocumentClick>
            {close => (
              <div>
                {this.renderSearchFieldsPassenger(close)}
              </div>
            )}
          </Popup>
          <Table className="table table-bordered" >
            <tbody>
              {this.renderListItensonService()}
              
            </tbody>
          </Table>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  requester_searched: state.requester.list,
  requester: state.services.service.requesters,
})

export default connect(
  mapStateToProps,
  { 
    newServiceRequester, 
    delServiceRequester, 
    getRequester, 
    getRequesterById, 
  }
)(PopupRequester)
