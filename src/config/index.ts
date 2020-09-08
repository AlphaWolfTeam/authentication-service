import * as env from 'env-var';
import './dotenv';

const config = {
    
    service: {
        port: env.get('PORT').required().asPortNumber(),
        clientURL: env.get('CLIENT_URL').required().asUrlString()
    },
    auth: {
        callbackURL: env.get('AUTH_CALLBACK_URL').required().asString(),
        shragaURL: env.get('SHRAGA_URL').required().asString(),
        useEnrichId: true,
        secret: env.get('AUTH_SECRET').required().asString(),
        daysExpires: 3,
        token: env.get('AUTH_TOKEN').required().asString(),
      }
    
};

export default config;
