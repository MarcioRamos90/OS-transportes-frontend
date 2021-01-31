import React, {Component} from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

import isEmpty from '../../../validation/is-empty'
import { formattedDate } from '../../../helpers/date.helper'

const padding = 3

const styles = StyleSheet.create({
  page: { padding: 10, paddingLeft: 15 },
  title:{
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 12,
    borderBottom: '1px solid black',
  },
  header: {
    marginTop: 10,
    borderBottom: '1px solid black',
    flexDirection: 'row',
    fontSize: 10,
  },
  row: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-bettween',
    fontSize: 8,
    borderBottom: '1px solid black',
  },
  collunmPassengers: {
    width: 80,
    flexGrow: 1,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmDestinys: {
      width: 80,
      flexGrow: 1,
      borderRight: '1px solid black',
      padding: padding,
    },
  collunmDate: {
    width: 55,
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    padding: padding,
  },

  collunmName: {
    width: 60,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmCompany: {
    width: 60,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmCar: {
    width: 50,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmDriver: {
    width: 65,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmValue: {
    width: 45,
    borderRight: '1px solid black',
    padding: padding,
  },
  total:{
    padding: padding,
    borderBottom: '1px solid black',
    position: 'relative',
    textAlign: 'right'
  },
  collunmReserve: {
    width: 50,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmObservation: {
      width: 80,
      borderRight: '1px solid black',
      padding: padding,
    },

})

class MyDocument extends Component {
  destiny(destinys){
    return(
      <Text>
        {destinys.map(destiny =>(
          <Text key={destiny._id}>{!isEmpty(destiny.local) && <Text> / {destiny.local}</Text>}</Text>
          ))}
      </Text>
    )
  }

  passengers(passengers){
    return(
      <Text >
        {passengers.map(passenger => 
          (
          <Text key={passenger._id}>{!isEmpty(passenger) && 
            <Text>{passenger.name}</Text>}
          </Text>)
        )}
      </Text>
    )
  }

  renderBill() {
    return(
      <View >
        {this.props.bills.map(bill => (
            <View style={styles.row} key={bill._id}>
              <View style={styles.collunmDate}>
                <Text >
                  {bill.os_date && formattedDate(bill.os_date, 1, 'DD/MM/YYYY')}
                </Text>
              </View>
              
              <View style={styles.collunmName}>
                <Text>{bill.name}</Text>
              </View>

              {!isEmpty(bill.company) && this.props.type === 'payment' && 
                <View style={styles.collunmCompany}>
                  <Text>{bill.company}</Text> 
                </View>
              }

              {this.props.type === 'receive' && 
                <View style={styles.collunmPassengers}>
                  {!isEmpty(bill.requesters) && this.passengers(bill.requesters)}
                </View> 
              }
              <View style={styles.collunmPassengers}>
                {!isEmpty(bill.passengers) && this.passengers(bill.passengers)}
              </View>
              <View style={styles.collunmDestinys}>
                {!isEmpty(bill.destinys) && this.destiny(bill.destinys)}
              </View>
              {this.props.type === 'payment' && 
                <View style={styles.collunmCar}>
                  <Text>{bill.car.length > 0 && bill.car[0].name}</Text>
                </View>
              }
              <View style={styles.collunmValue}>
              
                <Text>R$ {(!isEmpty(bill.value) && Number(bill.value).toFixed(2)) || (0).toFixed(2)}</Text>
              </View>
              {this.props.type === 'receive' && 
                <View style={styles.collunmReserve}>
                  <Text>{!isEmpty(bill.reserve) && bill.reserve}</Text>
                  <Text>{!isEmpty(bill.custCenter) && bill.custCenter}</Text>
                </View>
              }
              <View style={styles.collunmObservation}>
                <Text>{bill.observation}</Text> 
              </View>
            </View>
            
          ))
        }
        <View style={styles.total}>
          <Text>Total: R$ {this.props.total ? this.props.total : 0}</Text>
        </View>
      </View>)
      
  }

  render(){
    return(
      <PDFViewer>
        <Document>
          <Page style={styles.page} size="A4" wrap>
            <View>
              <View style={styles.title}>
                <Text>Relatorio de {this.props.type === 'receive'? "Empresas" : "Motoristas"}</Text>
              </View>
              <View style={styles.row}>
                <Text  style={styles.collunmDate}>Data</Text>
                <Text  style={styles.collunmName}>Nome</Text>
                {this.props.type === 'payment' && <Text  style={styles.collunmCompany}>Empresa</Text>}
                {this.props.type === 'receive' && <Text  style={styles.collunmPassengers}>Solicitantes</Text>}
                <Text  style={styles.collunmPassengers}>Passageiros</Text>
                <Text  style={styles.collunmDestinys}>Destinos</Text>
                {this.props.type === 'payment' && <Text  style={styles.collunmCar}>Carro</Text>}
                <Text  style={styles.collunmValue}>Valor</Text>
                {this.props.type === 'receive' && <Text  style={styles.collunmReserve}>Reserva/CC/CTE</Text>}
                <Text  style={styles.collunmObservation}>Observação</Text>
              </View>
              {this.renderBill()}
            </View>
            </Page>
        </Document>
      </PDFViewer>
    )
  }
}

export default MyDocument