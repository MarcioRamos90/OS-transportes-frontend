import React, { Component, Fragment } from 'react'
import moment from 'moment'

import isEmpty from "../../validation/is-empty";
import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import { 
  editService, 
} from "../../actions/servicesActions";
import { Table } from "../commonStyles/PopupStyles";

class PopupCancel extends Component{
	constructor(props){
		super(props)

		this.state = {
			message:"",
			status: false
		}

		this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
	}

	onSubmit(){
		const cancelSubmit = {}
		cancelSubmit.message = this.state.message
		cancelSubmit.status = this.status
		this.props.editService(editService, this.props.history);
	}

	onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMout(){
  	console.log(this.props.os)
  }

  renderListDestinations() {
  	console.log('')
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
				<div className="form-row mb-3">
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
              value={this.props.os.company[0].name}
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
        <div className="form-row mb-3">
	        <div className="col-md-3 ">
	          <label>Data OS</label>
	          <TextFieldGroupSmall
	            name="date"
	            value={moment(this.props.os.os_date).format('DD/MM/YYYY')}
	            onChange={this.onChange}
	            disabled={'true'}
	          />
	        </div>
	        <div className="col-md-3 ">
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
	      <div className="form-row mb-3">
		      <div className="col-md-8 mb-4">
	          <label>Observação</label>
	          <TextFieldGroupSmall
	            placeholder="Observação"
	            name="observation"
	            value={this.props.os.observation}
	            onChange={this.onChange}
	            disabled={'true'}
	          />
	        </div>
	      </div>
        <h5>Tem certeza que deseja concluir o Cancelamento desta OS?</h5>
        <div className="col-md-8 mb-3">
          <TextFieldGroupSmall
            placeholder="Motivo"
            name="code"
            value={this.state.message}
            onChange={this.onChange}
          />
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
            <button onClick={() => {this.props.close(); console.log(this.props.os)}} className="cancel btn btn-danger mb-1">
              Cancelar
            </button>
          </div>             
        </div> 
      </div>
		)
	}
}

export default PopupCancel