const config = require('./common/config/env.config.js');
var cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const AuthorizationRouter = require('./authorization/routes.config');
const empresaRouter = require('./empresa/routes.config');
const clienteRouter = require('./cliente/routes.config');
const categoriaRouter = require('./categoria/routes.config');
const opcionesRouter = require('./opciones/routes.config');
const ticketRouter = require('./ticket/routes.config');
const userRouter = require('./users/routes.config');

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Accept-Patch: application/example, text/example");
  next();
});
/*
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    //res.header('Access-Control-Expose-Headers', 'Content-Length');
    //res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Accept-Patch: application/example, text/example");
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
*/

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
empresaRouter.routesConfig(app);
opcionesRouter.routesConfig(app);
clienteRouter.routesConfig(app);
categoriaRouter.routesConfig(app);
ticketRouter.routesConfig(app);
userRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
