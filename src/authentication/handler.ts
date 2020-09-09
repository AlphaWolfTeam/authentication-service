import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { Application, Response, Request, NextFunction } from 'express';
import { Strategy } from 'passport-shraga';

import config from '../config';

export default class AuthenticationHandler {

    static initialize(app: Application) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(AuthenticationHandler.serialize);
        passport.deserializeUser(AuthenticationHandler.deserialize);

        passport.use(new Strategy(config.auth, (profile: any, done: any) => {
            done(null, profile);
        }));

        return passport.initialize();

    }

    static authenticate() {
        return passport.authenticate('shraga', {
            failureRedirect: '/failed',
            failureFlash: true
        });
    }

    private static serialize(user: any, done: (err?: Error, user?: any) => void) {
        done(undefined, user);
    }

    private static async deserialize(user: any, done: (err?: Error, user?: any) => void) {
        try {
            done(undefined, user);
        } catch (err) {
            done(err, null);
        }
    }

    static async redirectUserToken(req: Request, res: Response, next: NextFunction) {
        const { user } = req;
        const userToken = jwt.sign(JSON.parse(JSON.stringify(user)), config.auth.secret);

        res.cookie(config.auth.token, userToken);
        next();
    }

}