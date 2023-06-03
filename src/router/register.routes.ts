import { Router } from 'express';
import { saveUser } from '../controller/register.controller';

const router: Router = Router();


router.post('/', saveUser)


export default router;