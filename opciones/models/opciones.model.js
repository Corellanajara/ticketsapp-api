const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Opcioneschema = new Schema({
titulo : String,
accion : String,
estado : Boolean,
inputs : Array,

}, { timestamps: true }
);
Opcioneschema.virtual('id').get(function () {
return this._id.toHexString();
});
Opcioneschema.set('toJSON', {
virtuals: true
});

Opcioneschema.findById = function (cb) {
return this.model('Opciones').find({id: this.id}, cb);
};
const Opciones = mongoose.model('Opciones', Opcioneschema);
exports.findById = (id) => {
return Opciones.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createOpciones = (OpcionesData) => {
const opciones = new Opciones(OpcionesData);
return opciones.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Opciones.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, opciones) {
if (err) {
reject(err);
} else {
resolve(opciones);
}
})
});
};
exports.patchOpciones = (id, OpcionesData) => {
return new Promise((resolve, reject) => {
Opciones.findById(id, function (err, opciones) {
if (err) reject(err);

console.log(OpcionesData);
for (let i in OpcionesData) {
opciones[i] = OpcionesData[i];
}
opciones.save(function (err, updatedOpciones) {
if (err) return reject(err);
resolve(updatedOpciones);
});
});
})
};
exports.removeById = (OpcionesId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: OpcionesId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
