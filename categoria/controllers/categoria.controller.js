const CategoriaModel = require('../models/categoria.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
  var empresa = req.headers.empresa;
  req.body.empresa = empresa;
  
CategoriaModel.createCategoria(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
var empresa = req.headers.empresa;
console.log(empresa);
let limit = req.query.limit && req.query.limit <= 100000 ? parseInt(req.query.limit) : 10000;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
CategoriaModel.list(limit, page,empresa)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
CategoriaModel.findById(req.params.categoriaId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
CategoriaModel.patchCategoria(req.params.categoriaId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
CategoriaModel.removeById(req.params.categoriaId)
.then((result)=>{
res.status(204).send({});
});
};
