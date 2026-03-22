import { Router } from 'express'
import { getMe } from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/auth/me — get current logged in user info
router.get('/me', requireAuth, getMe)

export default router