const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Categoriachema = new Schema({
nombre : String,
empresa : String,
descripcion : String,
estado : Boolean,

}, { timestamps: true }
);
Categoriachema.virtual('id').get(function () {
return this._id.toHexString();
});
Categoriachema.set('toJSON', {
virtuals: true
});

Categoriachema.findById = function (cb) {
return this.model('Categoria').find({id: this.id}, cb);
};
const Categoria = mongoose.model('Categoria', Categoriachema);
exports.findById = (id) => {
return Categoria.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createCategoria = (CategoriaData) => {
const categoria = new Categoria(CategoriaData);
return categoria.save();
};
exports.list = (perPage, page,empresa) => {
return new Promise((resolve, reject) => {
Categoria.find({empresa:empresa})
.limit(perPage)
.skip(perPage * page)
.exec(function (err, categoria) {
if (err) {
reject(err);
} else {
resolve(categoria);
}
})
});
};
exports.patchCategoria = (id, CategoriaData) => {
return new Promise((resolve, reject) => {
Categoria.findById(id, function (err, categoria) {
if (err) reject(err);

console.log(CategoriaData);
for (let i in CategoriaData) {
categoria[i] = CategoriaData[i];
}
categoria.save(function (err, updatedCategoria) {
if (err) return reject(err);
resolve(updatedCategoria);
});
});
})
};
exports.removeById = (CategoriaId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: CategoriaId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
