import { Router } from 'express';
import { deleteSection, getAllSection, saveSection, updateSection } from '../controller/section.controller';

const router: Router = Router();


router.post('/', saveSection)
router.get('/', getAllSection)
router.put('/', updateSection)
router.delete('/', deleteSection)



export default router;