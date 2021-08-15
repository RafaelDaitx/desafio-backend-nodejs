const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/clientes2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //conexao com o banco de dados (mongo db)
}).then(()=> {
    console.log("conexao com sucesso");
}).catch((erro)=>{
    console.log("conexao nao realizada com mongo db");
    //ambos testes de conexao com o mongoDB
});

app.get("/", (req, res) => {
    //retorno dos dados do banco de dados
   
    //criar condição de busca entree as chaves do find...
    //buscando dados no banco pela model artigo
Artigo.find({}).then((artigo)=>{
    return res.json(artigo);
}).catch((erro) => {
    return res.status(400).json({
        errot: true,
        message: "Nenhum artigo encontrado!"
        });
    })
});

app.get("/artigo/:name", (req, res) => {
    //retornadno pelo parametro name, onde for o banco de dados
    Artigo.find({name: req.params.name}).then((artigo) => {
        return res.json(artigo);
    }).catch((err0) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        });
    });
});

app.post("/artigo", (req, res) =>{
    const artigo = Artigo.create(req.body, (err)=>{
        //mando para o banco de dados para salvar
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Usuário não foi cadastrado com sucesso!"
            //teste de erro no salvamento no banco
        });
            return res.status(200).json({
            error: false,
            message: "Usuário cadastrado com sucesso!"
        });
    });
});

app.put("/artigo/:id",(req, res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id}, req.body, (err) => {
    // pega o _id (id do banco) e recebe o id da url para editar
    //realiza a edição no id, do valor que vem na url
        if(err) return res.status(400).json({
            erro: true,
            message:"Error: Artigo não foi editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo editado com sucesso"
        });
    });
});

app.delete("/artigo/:id", (req, res) =>{
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        //exclui o id informado pela url, se for igual ao do banco
        if(err) return res.status(400).json({
            //tratamento de erro
            error: true,
            message: "Error: Artigo não foi apagado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo apagado com sucesso!"
        });
    });
});

app.listen(8080, ()=> {
    console.log("server iniciado: http://localhost:8080/");
    //conexao com a porta
});