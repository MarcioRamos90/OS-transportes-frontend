import React, {Component, Fragment} from 'react';
import Popup from "reactjs-popup";
import { connect } from "react-redux";

import { 
  newService, 
  
  newDestiny,
  delDestiny
} from "../../actions/servicesActions";
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
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
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

  renderListDestinations() {
    const { local } = this.state
    if (!isEmpty(local)){
      return local.map(Destiny => (
      	<Fragment>
	        <tr key={Destiny.destiny}>
	          <td>{Destiny.destiny}</td>
	          <td>{Destiny.adress}</td>
	        	<td>
			        <a onClick={() => this.delDestiny(Destiny)}>
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
				<div className="content">
					<Popup 
						trigger={<a className="plus-button"> <i className="fas fa-plus" /></a>} modal>
		          {close => (
		            <div>
		              <div className="col-md-4">
		                <h5 style={{ margin: 0}}>Nome Local</h5>
		                <TextFieldGroupSmall
		                  name="destiny"
		                  value={this.state.destiny}
		                  onChange={this.onChange}
		                />
		              </div>
		              <div className="col-md-4">
		                <h5 style={{ margin: 0}}>Endereço</h5>
		                <TextFieldGroupSmall
		                  name="adress"
		                  value={this.state.adress}
		                  onChange={this.onChange}
		                />
		              </div>
		              <div className="controls">
		                <button type="button" 
		                className="btn btn-primary" 
		                onClick={() => this.submitLocal()}>
		                  Adicionar
		                </button>
		                <a className="cancel btn btn-danger mb-1" onClick={() => close()}>
		                  <p>Cancelar</p>
		                </a>
		              </div>
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
  local: state.services.service.local,
})

export default connect(
  mapStateToProps,
  { newDestiny, delDestiny }
)(PopupLocal)
