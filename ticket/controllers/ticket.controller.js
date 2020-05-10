const TicketModel = require('../models/ticket.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
  var empresa = req.headers.empresa;
  req.body.empresa = empresa;
  TicketModel.createTicket(req.body)
    .then((result) => {
      res.status(201).send({id: result._id});
    });
};
exports.insertAndSendEmail = (req, res) => {
  var empresa = req.params.codigo
  console.log(req.query);  
  var nombreCategoria = req.body.categoria;
  req.body.categoria = {nombre:nombreCategoria};
  req.body.empresa = empresa;
  console.log(req.body);
  TicketModel.createTicket(req.body)
    .then((result) => {
      res.status(201).send({id: result._id});
    });
};
exports.list = (req, res) => {
var empresa = req.headers.empresa;
let limit = req.query.limit && req.query.limit <= 10000 ? parseInt(req.query.limit) : 1000;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
TicketModel.list(limit, page,empresa)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
TicketModel.findById(req.params.ticketId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
TicketModel.patchTicket(req.params.ticketId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
TicketModel.removeById(req.params.ticketId)
.then((result)=>{
res.status(204).send({});
});
};
