import { Router } from 'express'
import {
  getClips,
  getClip,
  createClip,
  updateClip,
  deleteClip,
} from '../controllers/clipsController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/',       getClips)
router.get('/:id',    getClip)
router.post('/',      createClip)
router.patch('/:id',  updateClip)
router.delete('/:id', deleteClip)

export default router