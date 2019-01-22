import React,  { Component} from 'react';


import { Table } from "../commonStyles/PopupStyles";
import isEmpyt from  '../../validation/is-empty'

class PopupFinishAll extends Component {

	constructor(props){
		super(props)

		this.state = {
			finishing: false,
			bills: []
		}
	}

	componentDidMount() {
		this.setState({
			bills: [...this.props.bills]
		})		
	}

	finishBill = (bill) => {
    const data = {};
      data.id = bill._id
      data.name = bill.name
      data.os_code = bill.os_code
      data.date = bill.os_date
      data.status = 'close'
      data.type = bill.type
      data.custCenter = bill.custCenter
      data.passengers = bill.passengers
      data.destinys = bill.destinys
      data.value = bill.value
    return this.props.finishBill(data)
  }


	passengerTextHandler(passenger = []){
    return passenger.map(val => val.name + ' /').join('\n') || ''
  }
  
  localTextHandler(destiny = []){
    return destiny.map(val => val.local + ' /').join('\n') || ''
  }

  renderBill() {
    return this.state.bills.map(bill => (
      <tr key={bill._id}>
        <td>{bill.reserve}</td>
        <td>{bill.custCenter}</td>
        <td>{bill.os_code}</td>
        <td>{bill.name}</td>
        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.requesters.length) 
          && bill.requesters.map(req => (
            <p className='list-td' key={req._id}>{req.name}</p>))}</td>       

        <td style={{padding:'30px !important'}}>{!isEmpyt(bill.passengers.length) 
          && bill.passengers.map(pass => (
            <p className='list-td' key={pass._id}>{pass.name}</p>))}</td>
        <td className='list-td'>{!isEmpyt(bill.destinys) 
          && bill.destinys.map(dest => ( <p key={dest._id}>{dest.local}</p> ))}</td>
        <td>{!isEmpyt(bill.car) && bill.car[0].name}</td>
        {bill.type === 'receive' ? <td>{bill.driver}</td> : <td>{bill.company}</td> }
        <td>R$ {bill.value || '_'}</td>
      </tr>
    ));
  }

  removeFirstItemFromState = () => {
  	const bills = [...this.state.bills]
  	bills.shift()
  	this.setState({
  		bills: [...bills]
  	})
	}

	handleMsgFinal(msg){
  	console.log(msg)
  }

  handleError(msg){
  	console.log(msg)
  }


  finislAll = () =>{
  	if(this.state.bills.length > 0){
	  	this.setState({
	  		finishing: true
	  	})
	  	this.finishBill(this.state.bills[0])
	  		.then(() => this.removeFirstItemFromState())
	  		.then(() => {
	  			if(this.state.bills.length > 0){
	  				this.finislAll()
	  			}else{
	  				this.handleMsgFinal("Contas finalizadas")
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
              <th scope="col">Reserva</th>
              <th scope="col">CC</th>
              <th scope="col">OS</th>
              <th scope="col">Nome</th>
              <th scope="col">Solicitantes</th>
              <th scope="col">Passageiros</th>
              <th scope="col">Destinos</th>
              <th scope="col">Carro</th>
              {this.props.typeInput === 'receive'? <th scope="col">Motorista</th>
                :<th scope="col">Empresa</th>}
              <th scope="col">Valor</th>
	          </tr>
	        </thead>
	        <tbody>{this.renderBill()}</tbody>
	      </Table>
	      {!this.state.finishing ?
	      <button
	      	className="btn btn-success btn-excel"
	      	style ={{ width:'100%', margin: 0}}
	      	onClick={this.finislAll}
	      >Finalizar Todas</button>: undefined }
      </div>
		)
	}
}

export default PopupFinishAll