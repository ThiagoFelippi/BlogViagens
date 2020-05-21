const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

const admin = require("./routes/admin")
const nome = "Thiago"
const porta = 3000

require("./models/Viagem")
const Viagem = mongoose.model("viagens")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/blogViagens", {
    useNewUrlParser: true
})
    .then(() => console.log(`Banco conectado com sucesso`))
    .catch(err => console.log(`Erro ao se conectar com o banco de dados ${err}`))

app.use(session({
    secret: "blogDeViagem",
    resolve: true,
    saveUninitialized: true
}))
app.use(flash())
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.engine("handlebars", handlebars({defaultLayout: 'main'}))
app.set("view engine", "handlebars")

app.use(express.static('public'))

app.get("/", (req,res) => {
    const viagens = [
        {img: "assets/imgsProducao/EstatuaLiberdade.png",titulo: "New york", paragrafo: "Um lugar incrível, cheio de novas experiências"},
        {img: "assets/imgsProducao/Holanda.png", titulo: "Amsterdam", paragrafo: "Um dos lugares mais lindos que já visitei"},
        {img: "assets/imgsProducao/TradeCenter.png", titulo: "New york", paragrafo: "Um lugar incrível, cheio de novas experiências"}
    ]
    Viagem.find({}).lean().sort([['_id', -1]]).limit(3)
        .then(recentes => res.render("site/index", {viagens, recentes}))
        .catch(() => res.render("site/index", {viagens}))
   
})

app.get("/viagens", (req,res) => {
    Viagem.find({}).lean().sort([['_id', -1]])
        .then(viagens => {
            res.render("site/viagens", {viagens})
        })
})

app.get("/exibir/:id", (req,res) => {
    const id = req.params.id
    Viagem.findOne({'_id' : id}).lean()
        .then(viagem => res.render("site/viagem", viagem))
        .catch(err => {
            req.redirect("error_msg", "Erro -> Viagem ainda não existe")
        })
})

app.use("/admin", admin)


app.listen(porta, () => {
    console.log(`Olá, ${nome}! Sua aplicação está rodando na porta ${porta}`)
})