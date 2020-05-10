const ticketController = require('./controllers/ticket.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var multer  = require('multer');
var upload = multer();
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/ticket', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
ticketController.insert
]);
app.post('/ticket/:codigo', upload.none() ,[
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
ticketController.insertAndSendEmail
]);
app.get('/ticket', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
ticketController.list
]);
app.get('/ticket/:ticketId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
ticketController.getById
]);
app.patch('/ticket/:ticketId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
ticketController.patchById
]);
app.delete('/ticket/:ticketId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

ticketController.removeById
]);
};
