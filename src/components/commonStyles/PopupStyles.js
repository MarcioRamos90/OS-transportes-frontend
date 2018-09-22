import styled from 'styled-components';

export const Container = styled.div`
	margin-left: 5px;

	.content{
		// margin-left:10px;
		display: flex;
		flex-direction:row;
	}

	.content a i {
		margin: 5px;
		margin-right:10px;
		font-size:30px !important;

		&:hover{
			color: blue;
		}
	}

` 

export const Listul = styled.ul`
	-webkit-padding-start: 0px;

	.empty{
		color: #bbbfd0 !important;
	}
	li{
			height: 40px;
			width: 100%;
			padding: 5px;
			width: 300px;
	}

	.li-trash{
		display: flex;
		flex-direction:row;

		a i{
			 &:hover{
				color: red;
			}
	}
`