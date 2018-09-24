import React, {Component, Fragment} from 'react';
import Popup from "reactjs-popup";
import { connect } from "react-redux";

import { getLocal, getLocalById, newLocal, editLocal } from "../../actions/localActions";
import EditLocal from '../Local/EditLocal'
import CreateLocal from '../Local/CreateLocal'
import { 
  newDestiny,
  delDestiny
} 
	from "../../actions/servicesActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import isEmpty from "../../validation/is-empty";
import { Container, Table } from "../commonStyles/PopupStyles";

class PopupLocal extends Component {
	  constructor(props) {
    super(props);

    this.state = {
      destiny:"",
      adress:"",
      local:[],
      local_searched:[],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this)
    this.delDestiny = this.delDestiny.bind(this)
    this.renderListLocal = this.renderListLocal.bind(this)
    this.renderSearchLocal = this.renderSearchLocal.bind(this)
    this.renderListDestinations = this.renderListDestinations.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.local_searched){
      this.setState({
        local_searched: nextProps.local_searched
      })
    }
    if(nextProps.local){
      this.setState({
        local: nextProps.local
      })
    }
  }

  submitLocal(){
    const newDestiny ={ destiny:this.state.destiny , adress:this.state.adress}
    this.props.newDestiny(newDestiny)
    this.setState({
      destiny: "",
      adress: ""
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

	delDestiny(destiny){
    this.props.delDestiny(destiny)
  }

  onSubmit(e) {
    e.preventDefault();

    const filter = {};
    filter.destiny = this.state.destiny
    filter.adress= this.state.adress
    
    // console.log(filter)
    this.props.getLocal(filter);

  }

  selectClick(destiny){
  	this.props.newDestiny(destiny)
  }


  renderListLocal(close) {
    return this.state.local_searched.map(destiny => (
	      <tr key={destiny.local}>
	      	<td>
	      		<a onClick={() => {this.selectClick(destiny); close()}}>
	      			<i className="fas fa-hand-pointer"></i>
	      		</a>
	      	</td>
	        <td>{destiny.local}</td>
	        <td>{destiny.adress}</td>
	        <td>
	        	<Popup trigger={
			        <a className="plus-button">
			          <i className="fas fa-pen"></i>
			        </a>} modal closeOnDocumentClick>
			        {close => (
			  				<EditLocal id={destiny._id} close={close}/>
			  			)}
			      </Popup>
	        </td>
	      </tr>
    ));
  }

  renderSearchLocal(close){
    return (
      <div>
        <div className="container search">            
          <div className="form-row">
            <div className="col-md-3">
              <label>Local</label>
              <TextFieldGroupSmall
                placeholder="Local"
                name="destiny"
                value={this.state.destiny}
                onChange={this.onChange}
              />
            </div>
            <div className="col-md-3">
              <label>Adress</label>
              <TextFieldGroupSmall
                placeholder="adress"
                name="adress"
                value={this.state.adress}
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
              <button className="btn btn-secondary">
                Adicionar
              </button>} modal closeOnDocumentClick>
              {close => (
                <CreateLocal close={close}/>
              )}
            </Popup>
            
          </div>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">*</th>
              <th scope="col">Local</th>
              <th scope="col">Endereço</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>{this.renderListLocal(close)}</tbody>
        </table>
    </div>)
  }

  renderListDestinations() {
    const { local } = this.state
    if (!isEmpty(local)){
      return local.map(local => (
      	<Fragment key={local.local}>
	        <tr >
	          <td>{local.local}</td>
	          <td>{local.adress}</td>
	        	<td>
			        <a onClick={() => this.delDestiny(local)}>
			          <i className="fas fa-trash text-center"/>
			        </a>
		        </td>
	        </tr>
	      </Fragment>
      ))}else{
      	return (
      	<tr className='empty'>
          <td>Local</td>
          <td>Endereço</td>
        </tr>
      	)
    }
  }

	render() {
		return (
			<Container>
				<label>Local</label>
				<div className='content'>
					<Popup trigger={
						<a className="plus-button">
							<i className="fas fa-search" />
						</a>} modal closeOnDocumentClick>
	          {close => (
	            <div>
             		{this.renderSearchLocal(close)}
            	</div>
	          )}
	        </Popup>
	        <Table className="table table-bordered" >
	          <tbody>
	            {this.renderListDestinations()}
	            
	          </tbody>
	        </Table>
	      </div>
			</Container>
		)
	}
}


const mapStateToProps = state => ({
  local_searched: state.local.list,
  local: state.services.service.local,
})

export default connect(
  mapStateToProps,
  { newDestiny, delDestiny, getLocal, getLocalById, newLocal, editLocal }
)(PopupLocal)
