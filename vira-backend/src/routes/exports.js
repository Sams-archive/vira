import { Router } from 'express'
import { getExports, createExport } from '../controllers/exportsController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/',      getExports)   // GET  /api/exports
router.post('/',     createExport) // POST /api/exports

export default router