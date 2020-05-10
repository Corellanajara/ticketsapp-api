const empresaController = require('./controllers/empresa.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/empresa', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
empresaController.insert
]);
app.get('/empresa', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
empresaController.list
]);
app.get('/empresa/:empresaId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
empresaController.getById
]);
app.patch('/empresa/:empresaId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
empresaController.patchById
]);
app.delete('/empresa/:empresaId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

empresaController.removeById
]);
};