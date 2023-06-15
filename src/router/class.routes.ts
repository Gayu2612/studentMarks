import { Router } from 'express';
import { deleteClass, getAllClass, saveClass, updateClass } from '../controller/class.controller';

const router: Router = Router();


router.post('/', saveClass)
router.get('/', getAllClass)
router.put('/', updateClass)
router.delete('/', deleteClass)



export default router;