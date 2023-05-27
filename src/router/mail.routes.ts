import { Router } from 'express';
// import { sendEmail } from '../helper/commonResponseHandler';
import {postEmail} from '../controller/mail.controller';

const router: Router = Router();

router.post('/postEmail',postEmail);
// router.port('/sendEmail', sendEmail)




export default router;

