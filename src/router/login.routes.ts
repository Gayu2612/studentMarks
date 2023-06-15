import { Router } from 'express';
import { loginEmail } from '../controller/login.controller';

const router: Router = Router();

router.post('',loginEmail)




export default router;

