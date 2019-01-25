import React from 'react';

const Loading = () => {
	return (
		<div className="loading text-center" 
			style={{
				position:'absolute',
				top:0,
				left:'42vw',
				zIndex: '150*',
				background: 'transparent',
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center',
			}}
		> 
      <i className="fas fa-spinner fa-spin" style={{
      	fontSize: '200px',
      	lineHeight: "100vh"
      }}></i>
    </div>
	)}

export default Loading;