import { Router } from 'express';
import { saveStudentMarks } from 'src/controller/marks.controller';

const router: Router = Router();


router.post('/', saveStudentMarks)
// router.get('/', getAllStudent)
// router.put('/', updateStudent)
// router.delete('/', deleteStudent)
// router.get('/getSingleStudent', getSingleStudent)

export default router;