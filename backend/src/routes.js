const express = require('express');

const EmpresasController = require('./controllers/EmpresasController');
const SolicitacoesController = require('./controllers/SolicitacoesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);


routes.get('/empresas', EmpresasController.index);
routes.post('/empresas', EmpresasController.create); 

routes.get('/profile', ProfileController.index);

routes.get('/solicitacoes', SolicitacoesController.index);
routes.post('/solicitacoes', SolicitacoesController.create);
routes.delete('/solicitacoes/:id', SolicitacoesController.delete);

module.exports = routes;