const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Clientechema = new Schema({
nombre : String,
rut : String,
direccion : String,
comuna : String,
ciudad : String,
contacto : String,
estado : Boolean,
fechaInicio : Date,
fechaFin : Date,
empresa : String,

}, { timestamps: true }
);
Clientechema.virtual('id').get(function () {
return this._id.toHexString();
});
Clientechema.set('toJSON', {
virtuals: true
});

Clientechema.findById = function (cb) {
return this.model('Cliente').find({id: this.id}, cb);
};
const Cliente = mongoose.model('Cliente', Clientechema);
exports.findById = (id) => {
return Cliente.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createCliente = (ClienteData) => {
const cliente = new Cliente(ClienteData);
return cliente.save();
};
exports.list = (perPage, page,empresa) => {
return new Promise((resolve, reject) => {
Cliente.find({empresa:empresa})
.limit(perPage)
.skip(perPage * page)
.exec(function (err, cliente) {
if (err) {
reject(err);
} else {
resolve(cliente);
}
})
});
};
exports.patchCliente = (id, ClienteData) => {
return new Promise((resolve, reject) => {
Cliente.findById(id, function (err, cliente) {
if (err) reject(err);

console.log(ClienteData);
for (let i in ClienteData) {
cliente[i] = ClienteData[i];
}
cliente.save(function (err, updatedCliente) {
if (err) return reject(err);
resolve(updatedCliente);
});
});
})
};
exports.removeById = (ClienteId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: ClienteId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
