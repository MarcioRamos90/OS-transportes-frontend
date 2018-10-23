import React, {Component} from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment'
import isEmpty from '../../../validation/is-empty'
// Create styles

// Create styles
const styles = StyleSheet.create({
  title:{
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottom: '1px solid black',
    fontWeight:'bolder',
  },
  heading: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
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
    marginTop: 10,
    flexDirection: 'row',

    borderBottom: '1px solid black'
  },
  hour:{
    marginRight: 15,
  },
  observation:{
    fontSize: 25,
    fontWeight:'bolder',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 15,
    marginTop:5,
    paddingBottom: 10,
    borderBottom: '1px solid black'
  },
  list:{
    borderBottom: '1px solid black',
    marginTop: 5,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    padding:5,
    border: '1px solid black',
    
  },
  blankLine:{
    height:20,
    marginLeft: 5,
    marginRight: 5,
    borderBottom: '1px solid black'
  }
});


class MyDocument extends Component {
  componentDidMount(){
    console.log(this.props.os)
  }

  passengers(passengers){
    return(
      <View style={styles.passengers}>
        {passengers.map(passenger => 
          (<View>{!isEmpty(passenger)&& <Text key={passenger._id}>Passageiro(a): {passenger.name}</Text>}</View>)
        )}
      </View>
    )
  }

  destiny(hour, destinys){
    return(
      <View style={styles.destiny}>
        <Text style={styles.hour}>{!isEmpty(hour) && hour}</Text>
        {destinys.map(destiny =>(
          <View>{!isEmpty(destiny.local) && <Text key={destiny._id}>{destiny.local} /</Text>}</View>
          ))}
      </View>
    )
  }

  adress(destinys){
    return(
      <View style={styles.passengers}>
        {destinys.map(destiny =>
          (<View>{!isEmpty(destiny.adress) && <Text style={styles.list} key={destiny._id}>{destiny.adress}</Text>}</View>)
          )}
      </View>
    )
  }

  render(){
    return(
      <PDFViewer>
        <Document>
          <Page size="A4">
            <View style={styles.title}>
              <Text>Nº: {this.props.os.id} / Ordem de Serviço:{!isEmpty(this.props.os.reserve) && this.props.os.reserve}</Text> 
            </View>
            <View style={styles.heading}>
              <Text>Data: {this.props.os.os_date && moment(this.props.os.os_date).add(1, 'day').format('DD/MM/YYYY')}</Text>
              <Text>Empresa: {this.props.os.company.length > 0 && this.props.os.company[0].name}</Text>
              <Text>Solicitante: {this.props.os.requesters.length > 0 && this.props.os.requesters[0].name}</Text>
            </View>
            <View>
              {!isEmpty(this.props.os.passengers) && this.passengers(this.props.os.passengers)}
            </View>

            <View style={styles.blankLine}></View>
            
            <View>
              {!isEmpty(this.props.os.destinys) && this.destiny(this.props.os.hour, this.props.os.destinys)}
            </View>

            <View style={styles.blankLine}></View>
            
            <View>
              {this.props.os.destinys.length > 0 && this.adress(this.props.os.destinys)}
            </View>

            <View style={styles.blankLine}></View>

            <View>
              <Text style={styles.observation} >{!isEmpty(this.props.os.observation) && this.props.os.observation}</Text>
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
                {this.props.os.driver.length > 0 && this.props.os.driver[0].bilingue && <Text>Biligue: Sim</Text>}
                <Text>Carro: {this.props.os.car.length > 0 && this.props.os.car[0].name}</Text>
                
              </View>
            </View>

          </Page>
        </Document>
      </PDFViewer>
    )
  }
}

export default MyDocument