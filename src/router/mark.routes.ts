import { Router } from 'express';
import { getAllStudentMarks, saveStudentMarks } from '../controller/marks.controller';

const router: Router = Router();


router.post('/', saveStudentMarks)
router.get('/', getAllStudentMarks)
// router.put('/', updateStudent)
// router.delete('/', deleteStudent)
// router.get('/getSingleStudent', getSingleStudent)

export default router;