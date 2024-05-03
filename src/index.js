const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors({ origin: 'http://localhost:3333' }))
app.use(express.json())
app.use(routes)

app.listen(3333)

/**
 * req/request = REQUISIÇÃO
 * res/response = RESPOSTA
 * 
 * ------------------------------------------------------------------
 * 
 * Métodos HTTP:
 * 
 * get(pegar, receber)
 * post(criar,salvar)
 * put(editar)
 * delete(deletar)
 * 
 * ------------------------------------------------------------------
 * 
 * Tipos de parâmetros:
 * 
 * Query Params: request.query (Filtros, ordenação, paginação, ...)
 * Rout Params: request.params (Identificar um recurso na alteração ou remoção)
 * Body: request.body (Dados para criação ou alteração de um registro)
 * 
 * ------------------------------------------------------------------
 * 
 * index (mostrar LISTA de registros)
 * show (exibir registro UNICO)
 * store (CRIAR registro)
 * update (ALTERAR registro)
 * destroy (DELETAR registro)
 * 
 * MongoDB (Não-relacional)
 * */