const opcionesController = require('./controllers/opciones.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/opciones', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
opcionesController.insert
]);
app.get('/opciones', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
opcionesController.list
]);
app.get('/opciones/:opcionesId', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
opcionesController.getById
]);
app.patch('/opciones/:opcionesId', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
opcionesController.patchById
]);
app.delete('/opciones/:opcionesId', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

opcionesController.removeById
]);
};
