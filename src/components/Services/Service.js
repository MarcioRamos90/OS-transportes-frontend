import React , {Component} from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { 
  defaultAction
} from "../../actions/default";

import './styleServiceConfirm.css'
import { formattedDate } from '../../helpers/date.helper'

class ServiceConfirm extends Component {
	constructor(props){
		super(props)

    this.state = {
      code: "",
      reserve:"",
      company: "",
      passenger: "",
      driver:"",
      date: "",
      hour: "",
      car: "",
      observation: "",
      destiny:"",
      adress:"",
      passengers: [],
      local:[],
      requester: [],
      loading:false
    };

	}

	onDocumentLoadSuccess(numPages){
    this.setState({ loading:false });
  }

	componentWillReceiveProps(nextProps){
    if(nextProps.service){
      this.setState({
        company: nextProps.service.company ? nextProps.service.company.name : "",
        reserve:nextProps.service.reserve,
        driver:nextProps.service.driver ? nextProps.service.driver.name : "",
        date:nextProps.service.date,
        hour:nextProps.service.hour,
        car:nextProps.service.car ? nextProps.service.car.name : "",
        observation:nextProps.service.observation,
        destiny:nextProps.service.destiny,
        adress:nextProps.service.adress,
        services:nextProps.service.services,
        passengers:nextProps.service.passengers,
        local:nextProps.service.local,
        requester:nextProps.service.requesters.length > 0  ? nextProps.service.requesters[0].name : "",
      })
    }
  }

  componentDidMount(){
  	this.props.defaultAction()

  }
  
	
	renderListPassenger() {
		if(this.state.passengers.length > 0){
	    return this.state.passengers.map(pass => (
	      <div style={{backgroundColor:'white'}} key={pass.name}>
	        <div>Passageiro: {pass.name}</div>
	      </div>
	    ));
  	}else{
  		return (<div>Passageiro:</div>)
  	}
  }

  renderDestiny() {
  	 return this.state.local.map(local => (
      <div style={{backgroundColor:'white'}} key={local.local}>
       <div className='destiny'> {local.local} /</div>
      </div>
    ));
  }

  renderAddress() {
  	 return this.state.local.map(local => (
      <div style={{backgroundColor:'white'}} key={local._id}>
       <div className='adress'>{local.adress}</div>
      </div>
    ));
  }

  renderDate(){
		return formattedDate(this.state.date || this.props.fields.date, 1, 'DD/MM/YYYY')
	}

	render(){
		return (
			<div >

				<div className="service">
					<div className="title">
						Ordem de Serviço: {this.state.reserve  || this.props.fields.reserve}
					</div>
					<hr/>
					<div className="info header">
						<div className='info'>Data: {this.renderDate()}</div>
						<div className='info'>Empresa: {this.state.company}</div>
						<div className='info'>Solicitante: {this.state.requester}</div>
					</div>
					<hr/>
					<div>
						{this.renderListPassenger()}
					</div>	
					<hr/>
					<div className="local">
						<div className="destiny-hour">
							<div className='hour'>Hora: {this.state.hour || this.props.fields.hour}</div>
							
							{this.renderDestiny()}
						</div>
							<hr/>
						<div>
							{this.renderAddress()}
						</div>

						{(this.state.observation || this.props.fields.observation) && 
							<div>
								<h5>{this.state.observation || this.props.fields.observation}</h5>
							</div>}
						<hr/>
					</div>
					<div className="footer">
						<div>
							<div>Motorista: {this.state.driver}</div>
							<div>Carro: {this.state.car}</div>
						</div>
					</div>
							
				</div>				
				<button onClick={this.state.submit} type="submit" className="btn btn-primary mb-1">
          Salvar
        </button>
				<button onClick={() => this.props.close()} className="cancel btn btn-danger mb-1">Cancel</button>
			</div>
			)
	}
}


const mapStateToProps = state => ({
  service: state.services.service
})
export default connect(
  mapStateToProps,
  {defaultAction}
)(withRouter(ServiceConfirm));