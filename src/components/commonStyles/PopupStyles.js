import styled from 'styled-components';

export const Container = styled.div`
	margin-left: 5px;

	.content{
		margin-left:10px;
		display: flex;
		flex-direction:row;
	}

	.content a i {
		margin: 5px;
		margin-right:0px;
		font-size: 25px !important;

		&:hover{
			color: blue;
		}
	}

` 

export const Listul = styled.ul`
	-webkit-padding-start: 0px;
	padding-left: 0px;
	margin-left:0px;

	.empty{
		color: #bbbfd0 !important;
	}
	li{
			height: 40px;
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
	.list-edit{
		diplay:flex
	}
`

export const Table = styled.table`
	
	height:40px;
	margin-top: 0 !important;
	margin-left: 0px !important;

	tr { 
		background-color: #fff !important;		
	}

	.empty{
		color: #bbbfd0 !important;
	}

	td {
		vertical-align: middle !important;
		padding: 0 !important;
		padding-rigth: 0px !important;
		padding-left: 10px !important;
		min-width: 50px !important;
				
		a i{
			font-size: 20px !important;
			margin-right: 15px !important;
			&:hover{
				color: red !important;
			}
		}
		a .fas.fa-hand-pointer{
			&:hover{
				color: blue !important;
			}
		}

		.fas.fa-search{
			color:red;
			margin-right: 10px !important;
		}

		a .fas.fa-pen{
			&:hover{
				color: blue !important;
			}
		}
	}

	
`