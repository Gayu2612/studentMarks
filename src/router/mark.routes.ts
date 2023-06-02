import { Router } from 'express';
import { deleteStudentMarks, getAllStudentMarks, saveStudentMarks, updateStudentMarks } from '../controller/marks.controller';

const router: Router = Router();


router.post('/', saveStudentMarks)
router.get('/', getAllStudentMarks)
router.put('/', updateStudentMarks)
router.delete('/', deleteStudentMarks)
// router.get('/getSingleStudent', getSingleStudent)

export default router;