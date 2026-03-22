import { Router } from 'express'
import { getUploadUrl, confirmUpload } from '../controllers/uploadController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/presigned', getUploadUrl)   // GET  /api/upload/presigned
router.post('/confirm',  confirmUpload)  // POST /api/upload/confirm

export default router