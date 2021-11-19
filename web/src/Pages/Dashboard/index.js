import React, { useState, useEffect } from 'react'

import {Card, Select, MenuItem,Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Chart from "react-google-charts";

import "./styles.css"




const tableData = require("../../Assets/Dados.json")


export default function Dashboard() {
const [dados, setDados] = useState()
const [sistema, setSistema] = useState(0)
const [tratamento, setTratamento] = useState(0)
const sistemas = [
    "ALTO TIETÊ",
    "CANTAREIRA",
    "GUARAPIRANGA",
    "MARSILAC",
    "ORIENTAL",
    "RIO CLARO"
]
const tratamentos = [
    "turbidez",
    "cor aparente",
    "cloro residual livre",
    "coliforme total",
    "ecoli"
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

const [rows, setRows ] = useState ([])
const [graphData, setGraphData] = useState([])

useEffect(() => {
    setRows(tableData[sistemas[sistema]]["dados"][tratamentos[tratamento]])
    let dadosNovos = [["meses", "Exigido", "Realizado", "Conforme"]]
    for( let i in tableData[sistemas[sistema]]["dados"][tratamentos[tratamento]]) {
        console.log(i)
        console.log(tableData[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["exigido"])
        dadosNovos.push([
            meses[i], 
            tableData[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["exigido"], 
            tableData[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["realizado"], 
            tableData[sistemas[sistema]]["dados"][tratamentos[tratamento]][i]["conforme"], 
        ])
    }
    setGraphData(dadosNovos)
}, [sistema, tratamento])

return (
    <div id="main">
        <Card id="card">
        <div id="titles">
            <h1>Global Impact - APMD</h1>
            <h3 id="subtitle">Relatório mensal de qualidade do tratamento da água do estado de São Paulo</h3>
        </div>
        <div id="input">
            <div id="sistema"> 
                <h3>Sistema:</h3>    
                <Select
                    value={sistema}
                    onChange={(e) => setSistema(e.target.value)}
                    defaultValue={0}
                    id="sistemaSelect"
                    label={null}
                    >
                    {sistemas.map((sys, index) => (
                        <MenuItem value={index}>{sys}</MenuItem>
                    ))}
                </Select>
            </div>
            <div id="tratamento"> 
                <h3>Tratamento:</h3>    
                <Select
                    value={tratamento}
                    onChange={(e) => setTratamento(Number(e.target.value))}
                    defaultValue={0}
                    id="tratamentoSelect"
                    label={null}
                    >
                    {tratamentos.map((trat, index) => (
                        <MenuItem value={index}>{trat}</MenuItem>
                    ))}
                </Select>
            </div>
        </div>
        <div id="data">
            <div id="table">
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Exigido</TableCell>
                        <TableCell align="center">Realizado</TableCell>
                        <TableCell align="center">Conforme</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.mes}</TableCell>
                            <TableCell align="center">{row.exigido}</TableCell>
                            <TableCell align="center">{row.realizado}</TableCell>
                            <TableCell align="center">{row.conforme}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
            <div id="graph">
            <Chart
                width={'700px'}
                height={'450px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={graphData}
                options={{
                    vAxis: {
                        gridlines: {
                            color: 'transparent'
                        }
                    } 
                }}
                />
            </div>

        </div>

        </Card>
    </div>
)}