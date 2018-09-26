import React , {Component} from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from 'moment'

import './styleServiceConfirm.css'

class ServiceConfirm extends Component {
	
	renderListPassenger() {
		if(this.props.fields.passengers.length > 0){
	    return this.props.fields.passengers.map(pass => (
	      <div style={{backgroundColor:'white'}} key={pass.name}>
	        <div>Passageiro: {pass.name}</div>
	      </div>
	    ));
  	}else{
  		return (<div>Passageiro:</div>)
  	}
  }

  renderDestiny() {
  	console.log(this.props.fields.local)
  	 return this.props.fields.local.map(local => (
      <div style={{backgroundColor:'white'}} key={local.local}>
       <div className='destiny'> {local.local} /</div>
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

  renderDate(){
  	return moment(this.props.fields.date).format('DD/MM/YYYY')
  }

	render(){
		const company = this.props.service.company.name
		return (
			<div >
			<div className="service">
				<div className="title">
					Ordem de Serviço: {this.props.fields.reserve}
				</div>
				<hr/>
				<div className="info header">
					<div className='info'>Data: {this.renderDate()}</div>
					<div className='info'>Empresa: {company ? company : ""}</div>
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
					<div>
						{this.renderAdress()}
					</div>
					<hr/>

					{this.props.fields.observation && 
						<div>
							<h5>{this.props.fields.observation}</h5>
						</div>}

				
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