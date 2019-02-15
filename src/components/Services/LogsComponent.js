import React, { Component } from "react";
import moment from 'moment'

class Logscomponent extends Component {
	constructor(props){
		super(props)

		this.renderlogs = this.renderlogs.bind(this)
	}

	getDateFormated(date){
		return moment(date).add(0, 'days').format('DD/MM/YYYY')
	}

	renderlogs(log){
		const dateStr = this.getDateFormated(log.when)
		const acao = {create: 'criou', update:'editou', finish: 'finalizou', cancel: 'cancelou', print: 'imprimiu'}
		return <li key={log._id}>o usuário {log.who}, {acao[log.what]} um serviço, em {dateStr}</li>
	}

	render(){
		return <ul style={{ listStyle: 'none' }} >{this.props.logs.map(log => this.renderlogs(log))}</ul>
	}
};

export default Logscomponent;