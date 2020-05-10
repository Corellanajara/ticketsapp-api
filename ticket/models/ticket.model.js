const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Ticketchema = new Schema({
categoria : Object,
cliente : Object,
correo : String,
nombre : String,
descripcion : String,
sujeto : String,
usuario : Object,
empresa : String,
estado : Number,

}, { timestamps: true }
);
Ticketchema.virtual('id').get(function () {
return this._id.toHexString();
});
Ticketchema.set('toJSON', {
virtuals: true
});

Ticketchema.findById = function (cb) {
return this.model('Ticket').find({id: this.id}, cb);
};
const Ticket = mongoose.model('Ticket', Ticketchema);
exports.findById = (id) => {
return Ticket.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createTicket = (TicketData) => {
const ticket = new Ticket(TicketData);
return ticket.save();
};
exports.list = (perPage, page,empresa) => {
return new Promise((resolve, reject) => {
Ticket.find({empresa:empresa})
.limit(perPage)
.skip(perPage * page)
.exec(function (err, ticket) {
if (err) {
reject(err);
} else {
resolve(ticket);
}
})
});
};
exports.patchTicket = (id, TicketData) => {
return new Promise((resolve, reject) => {
Ticket.findById(id, function (err, ticket) {
if (err) reject(err);

console.log(TicketData);
for (let i in TicketData) {
ticket[i] = TicketData[i];
}
ticket.save(function (err, updatedTicket) {
if (err) return reject(err);
resolve(updatedTicket);
});
});
})
};
exports.removeById = (TicketId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: TicketId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
