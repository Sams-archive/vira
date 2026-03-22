import { Router } from 'express'
import { transcribe, detectClips, generateHook, generateHashtags } from '../controllers/aiController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth)

router.post('/transcribe',        transcribe)        // POST /api/ai/transcribe
router.post('/detect-clips',      detectClips)       // POST /api/ai/detect-clips
router.post('/generate-hook',     generateHook)      // POST /api/ai/generate-hook
router.post('/generate-hashtags', generateHashtags)  // POST /api/ai/generate-hashtags

export default router