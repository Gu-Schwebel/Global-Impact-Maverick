import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Card} from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import {Table, Row, Rows} from 'react-native-table-component'

const data = require("./assets/Dados.json")

export default function App() {

  const [sistema, setSistema] = useState(0)
  const [tratamento, setTratamento] = useState(0)
  const sistemas = [
    "ALTO TIETÊ", 
    "CANTAREIRA", 
    "GUARAPIRANGA", 
    "MARSILAC", 
    "ORIENTAL", 
    "RIO CLARO", 
  ]
  const tratamentos = [
    "turbidez", 
    "cor aparente", 
    "cloro residual livre", 
    "coliforme total", 
    "ecoli", 
  ]
  const meses = [
      "Jan",
      "Fev", 
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
  ]
  const tableHead = [
    "",
    "Exigido",
    "Realizado",
    "Conforme"
  ]
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let dadosNovos = []
    for( let i in data[sistemas[sistema]]["dados"][tratamentos[tratamento]]) {
        dadosNovos.push([
            meses[i], 
            data[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["exigido"], 
            data[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["realizado"], 
            data[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["conforme"], 
        ])
    }
    setTableData(dadosNovos)
}, [sistema, tratamento])

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.titles}>
            <Text style={styles.title}>Global Impact - APMD</Text>
            <Text style={styles.subtitle}>Relatório mensal de qualidade do tratamento da água do estado de São Paulo</Text>
        </View>
        <View style={styles.inputs}>
            <View style={styles.sistema}> 
                <Text style={styles.inputText}>Sistema:</Text>    
                <SelectDropdown
                  data={sistemas}
                  onSelect={(selectedItem, index) => {
                    setSistema(index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  defaultButtonText="ALTO TIETÊ"
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  dropdownStyle={{marginTop: -87}}
                />
            </View>
            <View style={styles.tratamento}> 
              <Text style={styles.inputText}>Tratamento:</Text>    
              <SelectDropdown
                  data={tratamentos}
                  onSelect={(selectedItem, index) => {
                    setTratamento(index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  defaultButtonText="turbidez"
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  dropdownStyle={{marginTop: -87}}
                />
            </View>
        </View>
        <View style={styles.table}>
          <Table borderStyle={{borderWidth:1, borderColor: "#c8e1ff"}}>
            <Row data={tableHead}></Row>
            <Rows data={tableData}></Rows>
          </Table>
        </View>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
  },
  titles: {
    alignItems: "center",
  },
  title: {
    fontSize: 42, 
  }, 
  subtitle: {
    fontSize: 21,
    textAlign: 'center'
  },
  inputs: {
    marginTop: 10,
  },
  inputText: {
    fontSize: 25,
    marginLeft: 8,
    width: '80%'
  },
  sistema: {
    flexDirection: "row",
    width: "50%",
    alignItems: 'center'
  },
  tratamento: {
    marginTop: 10,
    flexDirection: "row",
    width: "50%",
    alignItems: 'center'
  },
  table: {
    marginTop: 20
  }
});
