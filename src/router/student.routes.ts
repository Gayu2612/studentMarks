import { Router } from 'express';
 import { deleteStudent, getAllStudent, getSingleStudent, saveStudent, updateStudent } from '../controller/student.controller';

const router: Router = Router();


router.post('/', saveStudent)
router.get('/', getAllStudent)
router.put('/', updateStudent)
router.delete('/', deleteStudent)
router.get('/getSingleStudent', getSingleStudent)

export default router;