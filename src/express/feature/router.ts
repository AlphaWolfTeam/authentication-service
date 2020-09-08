import { Router } from 'express';

const featureRouter: Router = Router();

featureRouter.get('/', (req: any, res) => {    
    console.log(req.user)
    res.send("feature router")
})

export default featureRouter;
