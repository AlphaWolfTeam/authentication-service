import { Response, Request, NextFunction } from 'express';

export const wrapValidator = (func: (req: Request) => Promise<void>) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        func(req)
            .then(() => next())
            .catch(next);
    };
};

export const wrapController = (func: (req: Request, res: Response, next?: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    };
};
