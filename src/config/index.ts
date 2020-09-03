import * as env from 'env-var';
import './dotenv';

const config = {
    
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    auth: {
        callbackURL: env.get('AUTH_CALLBACK_URL').required().asString(),
        shragaURL: env.get('SHRAGA_URL').required().asString(),
        useEnrichId: true,
        secret: env.get('AUTH_SECRET').required().asString(),
        daysExpires: 3,
      }
    
};

export default config;
