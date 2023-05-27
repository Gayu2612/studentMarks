import { Router } from 'express';
const router: Router = Router();


import Mail from './mail.routes';
import Student from './student.routes';
import Mark from './mark.routes';



router.use('/mail', Mail);  
router.use('/student', Student);  
router.use('/marks', Mark);  




export default router;
