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

router.get('/',       getClips)    // GET  /api/clips
router.get('/:id',    getClip)     // GET  /api/clips/:id
router.post('/',      createClip)  // POST /api/clips
router.patch('/:id',  updateClip)  // PATCH /api/clips/:id
router.delete('/:id', deleteClip)  // DELETE /api/clips/:id

export default router