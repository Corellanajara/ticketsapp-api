const ClienteModel = require('../models/cliente.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
var empresa = req.headers.empresa;
req.body.empresa = empresa;
ClienteModel.createCliente(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
var empresa = req.headers.empresa;
let limit = req.query.limit && req.query.limit <= 1000 ? parseInt(req.query.limit) : 1000;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
ClienteModel.list(limit, page,empresa)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
ClienteModel.findById(req.params.clienteId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
ClienteModel.patchCliente(req.params.clienteId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
ClienteModel.removeById(req.params.clienteId)
.then((result)=>{
res.status(204).send({});
});
};
