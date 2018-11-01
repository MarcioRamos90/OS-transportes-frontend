import React, {Component} from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment'
import isEmpty from '../../../validation/is-empty'

const padding = 3

const styles = StyleSheet.create({
  page: { padding: 10 },
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
    flexGrow: 1,
    width: 100,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmDestinys: {
    flexGrow: 1,
    width: 90,
    borderRight: '1px solid black',
    padding: padding,
    },
  collunmDate: {
    width: 55,
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    padding: padding,
  },
  columnHour: {
    width: 30,
    borderRight: '1px solid black',
    padding: padding,
  },
  collunmCompany: {
    width: 90,
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

})

class MyDocument extends Component {
  componentDidMount(){
    console.log(this.props.services)
  }

  destiny(destinys){
    return(
      <View>
        {destinys.map(destiny =>(
          <View key={destiny._id}>{!isEmpty(destiny.local) && <Text>{destiny.local}</Text>}</View>
          ))}
      </View>
    )
  }

  passengers(passengers){
    return(
      <View >
        {passengers.map(passenger => 
          (
          <View key={passenger._id}>{!isEmpty(passenger) && 
            <Text>{passenger.name}</Text>}
          </View>)
        )}
      </View>
    )
  }

  renderOS() {
    return(
      <View >
        {this.props.services.map(os => (
            <View style={styles.row} key={os._id}>

              <View style={styles.collunmDate}>
                <Text >
                  {os.os_date && moment(os.os_date).add(1, 'day').format('DD/MM/YYYY')}
                </Text>
              </View>
              <Text style={styles.columnHour}>{!isEmpty(os.hour) && os.hour}</Text>
              <View style={styles.collunmCompany}>
                <Text>{os.company.length > 0 && os.company[0].name}</Text>
              </View>
              <View style={styles.collunmPassengers}>
                {!isEmpty(os.passengers) && this.passengers(os.passengers)}
              </View>
              <View style={styles.collunmDestinys}>
                {!isEmpty(os.destinys) && this.destiny(os.destinys)}
              </View>
              <View style={styles.collunmDriver}>
                <Text>{os.driver.length > 0 && os.driver[0].name}</Text>
              </View>
              <View style={styles.collunmCar}>
                <Text>{os.car.length > 0 && os.car[0].name}</Text>
              </View>
            </View>
          ))
        }
      </View>)
      
  }

  render(){
    return(
      <PDFViewer>
        <Document>
          <Page style={styles.page} size="A4" wrap>
            <View>
              <View style={styles.title}>
                <Text>Relatorio Geral</Text>
              </View>
              <View style={styles.row}>
                <Text  style={styles.collunmDate}>Data</Text>
                <Text  style={styles.columnHour}>Hora</Text>
                <Text  style={styles.collunmCompany}>Empresa</Text>
                <Text  style={styles.collunmPassengers}>Passgeiros</Text>
                <Text  style={styles.collunmDestinys}>Destinos</Text>
                <Text  style={styles.collunmDriver}>Motorista</Text>
                <Text  style={styles.collunmCar}>Carro</Text>
              </View>
              {this.renderOS()}
            </View>
            </Page>
        </Document>
      </PDFViewer>
    )
  }
}

export default MyDocument