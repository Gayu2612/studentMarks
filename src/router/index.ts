import { Router } from 'express';
const router: Router = Router();


import Mail from './mail.routes';
import Student from './student.routes';
import Mark from './mark.routes';
import Login from './login.routes';
import Register from './register.routes';



router.use('/mail', Mail);  
router.use('/student', Student);  
router.use('/marks', Mark);  
router.use('/login', Login);  
router.use('/register', Register);  





export default router;
