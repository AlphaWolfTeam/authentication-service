import * as env from 'env-var';
import './dotenv';

const config = {
    
    service: {
        port: process.env.PORT ? parseInt(process.env.PORT) : env.get('PORT').required().asPortNumber(),
        clientURL: process.env.CLIENT_URL || env.get('CLIENT_URL').required().asUrlString()
    },
    auth: {
        callbackURL: process.env.AUTH_CALLBACK_URL || env.get('AUTH_CALLBACK_URL').required().asString(),
        shragaURL: process.env.SHRAGA_URL || env.get('SHRAGA_URL').required().asString(),
        useEnrichId: true,
        secret: process.env.AUTH_SECRET || env.get('AUTH_SECRET').required().asString(),
        daysExpires: 3,
        token: process.env.AUTH_TOKEN || env.get('AUTH_TOKEN').required().asString(),
      }
    
};

export default config;
