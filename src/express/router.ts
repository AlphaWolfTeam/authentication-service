import { Router } from 'express';
import featureRouter from './feature/router';
import AuthenticationMiddleware from '../authentication/middleware';

const appRouter = Router();

appRouter.use('/api', AuthenticationMiddleware.requireAuth, featureRouter);

appRouter.get('/', AuthenticationMiddleware.requireAuth, (_req, res) => res.send('huhu'));

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

// appRouter.use('*', (_req, res) => {
//     res.status(404).send('Invalid Route');
// });

export default appRouter;
