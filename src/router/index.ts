import { Router } from 'express';
const router: Router = Router();


import Mail from './mail.routes';
import Student from './student.routes';
import Mark from './mark.routes';
import Login from './login.routes';
import Register from './register.routes';
import Section from './section.routes';
import Class from './class.routes';





router.use('/mail', Mail);  
router.use('/student', Student);  
router.use('/marks', Mark);  
router.use('/login', Login);  
router.use('/register', Register);  
router.use('/section', Section);  
router.use('/class', Class);  








export default router;
