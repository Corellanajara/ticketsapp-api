const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Empresachema = new Schema({
nombre : String,
codigo : String,
rut : String,
direccion : String,
comuna : String,
ciudad : String,
contacto : String,
estado : Boolean,
fechaInicio : Date,
fechaFin : Date,

}, { timestamps: true }
);
Empresachema.virtual('id').get(function () {
return this._id.toHexString();
});
Empresachema.set('toJSON', {
virtuals: true
});

Empresachema.findById = function (cb) {
return this.model('Empresa').find({id: this.id}, cb);
};
const Empresa = mongoose.model('Empresa', Empresachema);
exports.findById = (id) => {
return Empresa.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createEmpresa = (EmpresaData) => {
const empresa = new Empresa(EmpresaData);
return empresa.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Empresa.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, empresa) {
if (err) {
reject(err);
} else {
resolve(empresa);
}
})
});
};
exports.patchEmpresa = (id, EmpresaData) => {
return new Promise((resolve, reject) => {
Empresa.findById(id, function (err, empresa) {
if (err) reject(err);

console.log(EmpresaData);
for (let i in EmpresaData) {
empresa[i] = EmpresaData[i];
}
empresa.save(function (err, updatedEmpresa) {
if (err) return reject(err);
resolve(updatedEmpresa);
});
});
})
};
exports.removeById = (EmpresaId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: EmpresaId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
