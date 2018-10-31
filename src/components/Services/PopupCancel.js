import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { connect } from "react-redux";

import isEmpty from "../../validation/is-empty";
import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import { 
  cancelService, 
} from "../../actions/servicesActions";

class PopupCancel extends Component{
	constructor(props){
		super(props)

		this.state = {
			message:"",
      errorMessage:"",
			status: false,
      createBill: false,
      valuetoPay:'',
      valuetoReceive: ''
		}

		this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlerError = this.handlerError.bind(this);
    this.checkClick = this.checkClick.bind(this)
	}

	onSubmit(){

    var error = this.validate();

    if(!error){
        this.handlerError("");
        var cancelSubmit = {};

        cancelSubmit = {...this.props.os}
        cancelSubmit.message = this.state.message;
        cancelSubmit.status = false;
        cancelSubmit.id = cancelSubmit._id;

        cancelSubmit.createBill = this.state.createBill
        cancelSubmit.valuetoReceive = this.state.valuetoReceive
        cancelSubmit.valuetoPay = this.state.valuetoPay
        
        this.props.cancelService(cancelSubmit);
        this.props.close();
        
      }else{
        this.handlerError(error)
      }
	}

  validate(){
    var error = "";
    if(this.state.message.length < 16) error = "Menssagem precisa ter no mínimo 15 caracteres!";
    if(this.props.os.finalized) error = "OS finalizada não cancela";

    if( Number.isNaN(Number(this.state.valuetoReceive)) || 
        Number.isNaN(Number(this.state.valuetoPay))){
        
        error = "insira valores válidos nos campos de contas"
    }
    return error;
  }

  handlerError(message){
    this.setState({
      errorMessage: message
    })
  }

	onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  renderListDestinations() {
    const { destinys } = this.props.os
    if (!isEmpty(destinys)){
      return destinys.map(local => (
      	<Fragment key={local.local}>
	        <tr >
	          <td>{local.local}</td>
	          <td>{local.adress}</td>
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

	render(){
		return (
			<div>
        {this.state.errorMessage && 
          <div 
            className="alert alert-danger" 
            style={{ position:'fixed', top:30, right:30, zIndex: 5}} role="alert">
            {this.state.errorMessage}
          </div>
        }
				<div className="form-row">
          <div className="col-md-2">
            <label>Código</label>
            <TextFieldGroupSmall
              placeholder="Nº Reserva"
              name="id"
              value={(this.props.os.id).toString()}
              disabled={'true'}
              onChange={this.onChange}
            />
          </div>
          <div className="col-md-3">
            <label>Empresa</label>
            <TextFieldGroupSmall
              placeholder="Nome"
              name="name"
              disabled={'true'}
              value={!isEmpty(this.props.os.company) ? this.props.os.company[0].name : ""}
              onChange={this.onChange}
            />
          </div>
          <div className="col-md-2">
            <label>Reserva</label>
            <TextFieldGroupSmall
              placeholder="Nº Reserva"
              name="reserve"
              value={this.props.os.reserve}
              disabled={'true'}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="form-row">
	        <div className="col-md-3 ">
	          <label>Data OS</label>
	          <TextFieldGroupSmall
	            name="date"
	            value={moment(this.props.os.os_date).format('DD/MM/YYYY')}
	            onChange={this.onChange}
	            disabled={'true'}
	          />
	        </div>
	        <div className="col-md-3">
	          <label>Hora</label>
	          <TextFieldGroupSmall
	            name="hour"
	            value={this.props.os.hour}
	            onChange={this.onChange}
	            disabled={'true'}
	          />
	      	</div>
	      	<table className="table table-bordered" style={{width:'500px !important'}}>
	          <thead className="thead-light">
	            <tr>
	              <th scope="col">Local</th>
	              <th scope="col">Endereço</th>
	            </tr>
	          </thead>
	          <tbody>
	            {this.renderListDestinations()}
	            
	          </tbody>
	        </table>
	      </div>
	      <div className="form-row">
		      <div className="col-md-8">
	          <label>Observação</label>
	          <TextFieldGroupSmall
	            placeholder="Observação"
	            name="observation"
	            value={this.props.os.observation}
	            onChange={this.onChange}
	            disabled={'false'}
	          />
	        </div>
	      </div>
        <h5 className="text-center">Tem certeza que deseja concluir o Cancelamento desta OS?</h5>
        <div className="col-md-8 mb-3" style={{ width: "100%"}}>
          <TextFieldGroupSmall
            placeholder="Motivo"
            name="message"
            value={this.state.message}
            onChange={this.onChange}
            style={{ width: "100%"}}
          />
        </div>
        <div className="form-row">
          {!this.props.os.finalized && 
            <div style={{display:"flex"}}>
              <div className="form-check col-md-3 ml-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="createBill"
                  checked={this.state.createBill}
                  onChange={this.checkClick}
                />
                <label className="form-check-label">Gera conta?</label>
              </div>
              <div className="col-md-3">
                <label>Valor a pagar</label>
                <TextFieldGroupSmall
                  placeholder="R$"
                  name="valuetoPay"
                  value={this.state.valuetoPay}
                  onChange={this.onChange}
                  disabled={!this.state.createBill}
                  className="ml-5"
                />
              </div>
              <div className="col-md-3">
                <label>Valor a Receber</label>
                <TextFieldGroupSmall
                  placeholder="R$"
                  name="valuetoReceive"
                  value={this.state.valuetoReceive}
                  onChange={this.onChange}
                  disabled={!this.state.createBill}
                  className="ml-5"
                />
              </div>
            </div>
          }
        </div>
        <div className="form-row">
          <div className="controls">
            <button 
              className="btn btn-primary mb-1" 
              style={{ color: 'white'}}
              onClick={this.onSubmit}
              >
              Confirma
            </button>
            <button onClick={() => this.props.close()} className="cancel btn btn-danger mb-1">
              Cancelar
            </button>
          </div>             
        </div> 
      </div>
		)
	}
}

export default connect(null, {cancelService})(PopupCancel)