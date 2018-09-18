import React , {Component} from 'react'
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import './styleServiceConfirm.css'

class ServiceConfirm extends Component {
	
	renderListPassenger() {
		if(this.props.fields.passengers.length > 0){
	    return this.props.fields.passengers.map(pass => (
	      <div style={{backgroundColor:'white'}} key={pass}>
	        <div>Passageiro: {pass}</div>
	      </div>
	    ));
  	}else{
  		return (<div>Passageiro:</div>)
  	}
  }

  renderDestiny() {
  	 return this.props.fields.local.map(local => (
      <div style={{backgroundColor:'white'}} key={local.destiny}>
       <div className='destiny'>{local.destiny} /</div>
      </div>
    ));
  }

  renderAdress() {
  	 return this.props.fields.local.map(local => (
      <div style={{backgroundColor:'white'}} key={local.adress}>
       <div className='adress'>{local.adress}</div>
      </div>
    ));
  }

	render(){
		return (
			<div >
			<div className="service">
				<div className="title">
					Ordem de Serviço
				</div>
				<hr/>
				<div className="info header">
					<div className='info'>Data: {this.props.fields.date}</div>
					<div className='info'>Empresa: {this.props.fields.company}</div>
					<div className='info'>Solicitante: {this.props.fields.requester}</div>
				</div>
				<hr/>
					<br/>
				<hr/>
				<div>
					{this.renderListPassenger()}
				</div>	
				<hr/>
					<br/>
				<hr/>
				<div className="local">
					<div className="destiny-hour">
						<div className='hour'>Hora: {this.props.fields.hour}</div>
						
						{this.renderDestiny()}
					</div>
					<hr/>
					<br/>
					<hr/>
					<div><h5>{this.props.fields.observation}</h5></div>
					<hr/>
					<br/>
					<hr/>
					<div>
						{this.renderAdress()}
					</div>
				</div>
				
				<hr/>
					<br/>
				<hr/>
				<div className="footer">
					<div>
						<div>Motorista: {this.props.fields.driver}</div>
						<div>Carro: {this.props.fields.car}</div>
					</div>
				</div>
						
			</div>

				
				<button onClick={this.props.submit} type="submit" className="btn btn-primary mb-1">
          Salvar
        </button>
				<a onClick={() => this.props.cancel()} className="cancel btn btn-danger mb-1">Cancel</a>
			</div>
			)
	}
}


const mapStateToProps = state => ({
  service: state.services.service
})
export default connect(
  mapStateToProps,
  {}
)(withRouter(ServiceConfirm));