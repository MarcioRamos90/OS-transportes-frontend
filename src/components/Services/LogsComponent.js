import React, { Component } from "react";
import moment from "moment"

class Logscomponent extends Component {
	constructor(props){
		super(props)

		this.renderlogs = this.renderlogs.bind(this)
	}

	componentDidMount(){
		console.log(this.props.logs)
	}

	getDateFormated(date){
		date = new Date(date)
		return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
	}

	renderlogs(log){
		const dateStr = this.getDateFormated(log.when)
		const acao = {create: 'criou', update:'editou', finish: 'finalizou', canceled: 'cancelou', print: 'imprimiu'}
		return <li key={log._id}>o usuário {log.who}, {acao[log.what]} um serviço, em {dateStr}</li>
	}

	render(){
		return <ul style={{ listStyle: 'none' }} >{this.props.logs.map(log => this.renderlogs(log))}</ul>
	}
};

export default Logscomponent;