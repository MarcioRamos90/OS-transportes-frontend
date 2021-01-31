import React, { Component } from "react";
import { formattedDate } from '../../helpers/date.helper'
class LogComponent extends Component {
	constructor(props){
		super(props)

		this.renderLogs = this.renderLogs.bind(this)
	}

	getDateFormatted(date){
		return formattedDate(date, 0, 'DD/MM/YYYY')
	}

	renderLogs(log){
		const dateStr = this.getDateFormatted(log.when)
		const action = {create: 'criou', update:'editou', finish: 'finalizou', cancel: 'cancelou', print: 'imprimiu'}
		return <li key={log._id}>o usuário {log.who}, {action[log.what]} um serviço, em {dateStr}</li>
	}

	render(){
		return <ul style={{ listStyle: 'none' }} >{this.props.logs.map(log => this.renderLogs(log))}</ul>
	}
};

export default LogComponent;