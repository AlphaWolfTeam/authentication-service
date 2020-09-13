import * as http from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
const proxy = require('express-http-proxy');

import { once } from 'events';
import { errorMiddleware } from './error';
import AuthenticationHandler from './authentication/handler';
import AuthenticationRouter from './authentication/router';
import AuthenticationMiddleware from './authentication/middleware';
import config from './config';

class Server {
    private app: express.Application;
    private http: http.Server;
    private port: number;

    constructor(port: number) {
        this.app = Server.createExpressApp();
        this.port = port;
        this.configurationMiddleware();
        this.initAuthentication();

        this.app.all('*', AuthenticationMiddleware.requireAuth, this.fwdUserDetailsMiddleware, proxy(config.service.clientURL, {
            proxyReqOptDecorator: (proxyReqOpts, _srcReq) => {
                proxyReqOpts.headers["Content-Type"] = "application/json";
                return proxyReqOpts;
            }
        }
        ));
    }

    private setHeaders = (_req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');
        next();
    };

    private configurationMiddleware() {
        this.app.use(this.setHeaders);
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(session({
            secret: config.auth.secret,
            resave: false,
            saveUninitialized: false
        }));
    }

    static createExpressApp() {
        const app = express();
        app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(errorMiddleware);
        return app;
    }

    async start() {
        this.http = this.app.listen(this.port);
        await once(this.http, 'listening');
    }

    private initAuthentication() {
        AuthenticationHandler.initialize(this.app);
        this.app.use('/auth/', AuthenticationRouter);
    }

    private fwdUserDetailsMiddleware(req: any, _res: express.Response, next: express.NextFunction) {
        const { adfsId, name } = req.user;
        req.body["currentUser"] = { adfsId, name };
        next();
    }

}

export default Server;
