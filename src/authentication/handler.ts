import { Application } from "express";
import * as passport from 'passport';
import { Strategy } from 'passport-shraga';
import config from '../config';


export default class AuthenticationHandler {

    static initialize(app: Application) {
        app.use(passport.initialize());
        app.use(passport.session());
        
        const shragaURL = config.auth.shragaURL;
        const callbackURL = config.auth.callbackURL;
        
        passport.use(new Strategy({ shragaURL, callbackURL }, (profile: any, done: any) => {
            console.log('test')
            done(null, profile);
        }));
        
        // passport.serializeUser((user: any, cb: any) => {
        //     console.log(user);
        //     cb(undefined, user.id);
        // });

        // passport.deserializeUser((id, cb) => {
        //     console.log(id);
        //     try {
        //         const user = { uid: '205707219' };
        //         cb(undefined, user);
        //     } catch (err) {
        //         cb(err, null);
        //     }
        // });

    }

    static authenticate() {
        return passport.authenticate('shraga', {
            failureRedirect: '/failed',
            failureFlash: true
        });
    }

}