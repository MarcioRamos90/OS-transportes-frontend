import React , {Component} from 'react'
import Popup from "reactjs-popup";
import { connect } from "react-redux";

import { 
  newPassenger, 
  delPassenger, 
} from "../../actions/servicesActions";

import TextFieldGroupSmall from "../common/TextFieldGroupSmall";
import { Container, Listul} from "../commonStyles/PopupStyles"

class PopupPassenger extends Component {
	constructor(){
		super()

		this.state = {
			passenger: "",
			passengers: []
		}

    this.submitPassenger = this.submitPassenger.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.passengers){
      this.setState({
        passengers: nextProps.passengers
      })
    }
	}

  submitPassenger(){
    this.props.newPassenger(this.state.passenger)
    this.setState({
      passenger: ''
    })
  }

	 listPassengers(){
	 	if(this.state.passengers.length > 0){

 	    return  this.state.passengers.map(pass =>(
        <div className="li-trash">
          <li key={pass}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {pass}
          </li>

          <a>
            <i 
              onClick={() => this.delPassenger(pass)}
              className="fas fa-trash"
            />
          </a>
        </div>
      ));
	 	}else{
	 		return (
	 			 <li  
              className="empty list-group-item d-flex justify-content-between align-items-center"
          >
          	Nenhum Passageiro
          </li>
	 		)
	 	}
  }

	delPassenger(passenger){
    this.props.delPassenger(passenger)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

	render(){
		return(
			<Container >
				 <label>Passageiro</label>
				 	<div className="content">
            <Popup trigger={
                    <a className="plus-button">
                      <i className="fas fa-plus"/>
                    </a>
                  } modal>
              {close => (
                <div>
                  <div className="col-md-6 mb-1">
                    <h5>Passageiro</h5>
                    <TextFieldGroupSmall
                      name="passenger"
                      className="passenger"
                      value={this.state.passenger}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="controls">
                    <button type="button" 
                    className="btn btn-primary mb-1" 
                    onClick={() => this.submitPassenger()}>
                      Adicionar
                    </button>
                    <a 	
                    	className="cancel btn btn-danger mb-1" 
                    	onClick={() => close()}
                    	>
                      <p>Cancelar</p>
                    </a>
                  </div>
                </div>
              )}

            </Popup>

	     		 <Listul className="list-group">
	          {this.listPassengers()}
	         </Listul>
          </div>
			</Container>
			)
	}
}
const mapStateToProps = state => ({
  passengers: state.services.service.passengers,
})

export default 
	connect(
		mapStateToProps, 
		{newPassenger, delPassenger})(PopupPassenger)