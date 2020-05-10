const clienteController = require('./controllers/cliente.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/cliente', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
clienteController.insert
]);
app.get('/cliente', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
clienteController.list
]);
app.get('/cliente/:clienteId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
clienteController.getById
]);
app.patch('/cliente/:clienteId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
clienteController.patchById
]);
app.delete('/cliente/:clienteId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

clienteController.removeById
]);
};