const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

require("../models/Viagem")
const Viagem = mongoose.model("viagens")
require("../models/Historia")
const Historia = mongoose.model("historias")

router.get("/", (req,res) => {
    res.render("admin/index")
})

router.get("/viagens/nova", (req,res) => {
    res.render("admin/novaViagem")
})

router.post("/registrar/viagem", (req,res) => {
    const titulo = req.body.titulo
    const subtitulo = req.body.subtitulo
    const descricao = req.body.descricao
    const conteudo = req.body.conteudo
    new Viagem({ titulo, subtitulo, descricao, conteudo})
        .save()
        .then(() => {
            req.flash("success_msg", "Viagem cadastrada com sucesso")
            res.redirect("/admin")
        })
        .catch(err => {
            req.flash("error_msg", "Erro ao cadastrar viagem, por favor tente novamente!")
            res.redirect("/admin")
        })
})

router.get("/historias/nova", (req,res) => {
    res.render("admin/novaHistoria")
})

router.post("/registrar/historia", (req,res) => {
    const titulo = req.body.titulo
    const conteudo = req.body.conteudo
    new Historia({ titulo, conteudo })
        .save()
        .then(() => {
            req.flash("success_msg", "História registrada com sucesso")
            res.redirect("/admin")
        })
        .catch(err => {
            req.flash("error_msg", "Erro ao cadastrar a história")
            res.redirect("/admin")
        })
})

module.exports = router