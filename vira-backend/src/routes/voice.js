import { Router } from 'express'
import { getVoices, generateVoice } from '../controllers/voiceController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.get('/voices',    getVoices)      // GET  /api/voice/voices
router.post('/generate', generateVoice)  // POST /api/voice/generate

export default router