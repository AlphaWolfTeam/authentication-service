import Server from './server';
import config from './config';

const { service } = config;

const main = async () => {
    
    const server = new Server(service.port);

    await server.start();

    console.log(`Authentication microservice started on port: ${service.port}`);
    console.log(`Proxy set to: ${service.clientURL}`);
};

main().catch((err) => console.error(err));
