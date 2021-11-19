const fs = require("fs")

var data = require("./Dados.json")
let tratamentos = [
    "turbidez",
    "cor aparente",
    "cloro residual livre",
    "coliforme total",
    "ecoli"
]
let meses = [
    "Janeiro",
    "Fevereiro", 
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]
let tipos = [
    "exigido",
    "realizado",
    "conforme"
]
let newArray = []
for (let i in data) {
    let newDados = {
        "municipio": data[i].municipio, 
        "sistema":data[i].sistema,
        "dados": {
            "turbidez" : [],
            "cor aparente" : [],
            "cloro residual livre" : [],
            "coliforme total" : [],
            "ecoli" : []
        }
    }
    for (let tratamento of tratamentos) {
        for (let tipo of tipos){
            for (let arrays in data[i][tratamento][tipo]){ 
                if (!newDados["dados"][tratamento][arrays]) newDados["dados"][tratamento].push({"mes": meses[arrays], "exigido": 0, "realizado": 0,  "conforme": 0 })
                newDados["dados"][tratamento][arrays][tipo] = data[i][tratamento][tipo][arrays]
            }

        }

    }
    console.log(newDados)
    newArray.push(newDados)
}
fs.writeFileSync("new.json", JSON.stringify(newArray, null, 4))



