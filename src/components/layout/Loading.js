import React from 'react';

const Loading = () => {
	return (
		<div className="loading text-center" style={{
			height: '100vh',
			weidth: '100vw',
			background: '#fff',
			display: 'flex',
			alignContent: 'center',
			justifyContent: 'center'
		}}> 
      <i class="fas fa-spinner fa-spin" style={{
      	fontSize: '200px',
      	lineHeight: "100vh"
      }}></i>
    </div>
	)}

export default Loading;