const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Viagem = new Schema({
    titulo: {type: String, required: true},
    subtitulo: {type: String, required: true},
    descricao: {type: String, required: true},
    conteudo: {type: String, required: true},
    data: {type: Date, default: Date.now()}
})

mongoose.model('viagens', Viagem)