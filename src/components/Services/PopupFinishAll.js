import React,  { Component} from 'react';

import { Table } from "../commonStyles/PopupStyles";
import { formattedDate } from "../../helpers/date.helper"

class PopupFinishAll extends Component {

	constructor(props){
		super(props)

		this.state = {
			finishing: false,
			services: []
		}
	}

	componentDidMount() {
		this.setState({
			services: [...this.props.services]
		})		
	}

	finishOS = (os) => {
    return this.props.finishOS(os._id)
  }


	passengerTextHandler(passenger = []){
    return passenger.map(val => val.name + ' /').join('\n') || ''
  }
  
  localTextHandler(destiny = []){
    return destiny.map(val => val.local + ' /').join('\n') || ''
  }

  renderOS() {
    if(this.state.services){
    return this.state.services.map((os,index) => (

      <tr key={os._id} style={{ color: os.finalized === true ? 'blue' : 'black' }}>

        <td>{formattedDate(os.os_date, 0, 'DD/MM/YYYY')}</td>
        <td>{os.hour}</td>
        <td>{os.id}</td>
        <td>{os.custCenter}</td>
        <td>{os.company.length > 0 && os.company[0].name}</td>
        <td style={{padding:'30px !important', maxWidth:250}}>
          {this.passengerTextHandler(os.passengers)}
        </td>
        <td style={{padding:'30px !important', maxWidth:250}}>
          {this.localTextHandler(os.destinys)}
        </td>
        <td>{os.driver.length > 0 && os.driver[0].name}</td>
        <td>{os.car.length > 0 && os.car[0].name}</td>
      </tr>
    ))}
  }

  removeFirstItemFromState = () => {
  	const services = [...this.state.services]
  	services.shift()
  	this.setState({
  		services: [...services]
  	})
	}

	handleMsgFinal(msg){
  	console.log(msg)
  }

  handleError(msg){
  	console.log(msg)
  }


  finislAll = () =>{
  	if(this.state.services.length > 0){
	  	this.setState({
	  		finishing: true
	  	})
	  	this.finishOS(this.state.services[0])
	  		.then(() => this.removeFirstItemFromState())
	  		.then(() => {
	  			if(this.state.services.length > 0){
	  				this.finislAll()
	  			}else{
	  				this.handleMsgFinal("OS's finalizadas")
	  				this.props.close()
	  				this.props.cleanSelecteds()
	  				this.props.submit()
	  			}
	  		})
	  		.catch(err => {
	  			console.log(err);
	  			this.handleError("Erro no processo de finalização")
	  		})
	  	

	  }
  }

 

	render(){
		return (
			<div>
				<Table className="table">
	        <thead className="thead-dark">
	          <tr>
	            <th scope="col">Data</th>
	            <th scope="col">HR</th>
	            <th scope="col">Cód</th>
	            <th scope="col">CC</th>
	            <th scope="col">Empresa</th>
	            <th scope="col">Passageiros</th>
	            <th scope="col">Destinos</th>
	            <th scope="col">Motoristas</th>
	            <th scope="col">Carro</th>
	          </tr>
	        </thead>
	        <tbody>{this.renderOS()}</tbody>
	      </Table>
	      {!this.state.finishing ?
	      <button
	      	className="btn btn-success"
	      	style ={{ width:'100%', margin: 0}}
	      	onClick={this.finislAll}
	      >Finalizar Todas</button>: undefined }
      </div>
		)
	}
}

export default PopupFinishAll