import React, {Component} from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment'
// Create styles

// Create styles
const styles = StyleSheet.create({
  heading: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottom: '1px solid black'
  },
  passengers: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    flexGrow: 1,
    borderBottom: '1px solid black'
  },
  destiny:{
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    flexDirection: 'row',
    borderBottom: '1px solid black'
  },
  hour:{
    marginRight: 15,
  },
  observation:{
    fontSize: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    borderBottom: '1px solid black'
  },
  table:{

  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    padding:5,
    border: '1px solid black'

  }
});


class MyDocument extends Component {
  componentDidMount(){
    console.log(this.props.os)
  }

  passengers(passengers){
    return(
      <View style={styles.passengers}>
        {passengers.map(passenger => (
          <Text key={passenger._id}>Passageiro(a): {passenger.name}</Text>
        ))}
      </View>
    )
  }

  destiny(hour, destinys){
    return(
      <View style={styles.destiny}>
        <Text style={styles.hour}>{hour}</Text>
        {destinys.map(destiny =>(
          <Text key={destiny._id}>{destiny.local.length > 0 && destiny.local} /</Text>
          ))}
      </View>
    )
  }

  adress(destinys){
    return(
      <View style={styles.passengers}>
        {destinys.map(destiny =>(
          <Text key={destiny._id}>{destiny.adress.length > 0 && destiny.adress}</Text>
          ))}
      </View>
    )
  }

  render(){
    return(
      <PDFViewer>
        <Document>
          <Page size="A4">
            <View style={styles.heading}>
              <Text>Data: {this.props.os.os_date && moment(this.props.os.os_date).add(1, 'day').format('DD/MM/YYYY')}</Text>
              <Text>Empresa: {this.props.os.company[0].name && this.props.os.company[0].name}</Text>
              <Text>Solicitante: {this.props.os.requesters[0].name && this.props.os.requesters[0].name}</Text>
            </View>
            <View>
              {this.props.os.passengers.length > 0 && this.passengers(this.props.os.passengers)}
            </View>
            <View>
              {this.props.os.destinys.length > 0 && this.destiny(this.props.os.hour, this.props.os.destinys)}
            </View>
            <View>
              {this.props.os.destinys.length > 0 && this.adress(this.props.os.destinys)}
            </View>
            <View>
              <Text style={styles.observation} >{this.props.os.observation}</Text>
            </View>
            <View style={styles.footer}>
              <View>
                <Text>Horário inicial:</Text>
                <Text>Horário final:</Text>
                <Text>Centro de custo:</Text>
              </View>
              <View>
                <Text>Km inicial:</Text>
                <Text>Km final:</Text>
                <Text>Valores das despesas:</Text>
              </View>
              <View>
                <Text>Motorista: {this.props.os.driver.length > 0 && this.props.os.driver[0].name}</Text>
                <Text>Carro: {this.props.os.car.length > 0 && this.props.os.car[0].name}</Text>
                {this.props.os.driver[0].bilingue && <Text>Biligue: Sim</Text>}
              </View>
            </View>

          </Page>
        </Document>
      </PDFViewer>
    )
  }
}

export default MyDocument