const categoriaController = require('./controllers/categoria.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/categoria', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
categoriaController.insert
]);
app.get('/categoria', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
categoriaController.list
]);
app.get('/categoria/:categoriaId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
categoriaController.getById
]);
app.patch('/categoria/:categoriaId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
categoriaController.patchById
]);
app.delete('/categoria/:categoriaId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

categoriaController.removeById
]);
};