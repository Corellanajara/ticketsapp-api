const EmpresaModel = require('../models/empresa.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
EmpresaModel.createEmpresa(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
EmpresaModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
EmpresaModel.findById(req.params.empresaId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
EmpresaModel.patchEmpresa(req.params.empresaId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
EmpresaModel.removeById(req.params.empresaId)
.then((result)=>{
res.status(204).send({});
});
};