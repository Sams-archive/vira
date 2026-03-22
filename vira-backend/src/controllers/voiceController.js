import { supabaseAdmin } from '../config/supabase.js'
import { v4 as uuidv4 } from 'uuid'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ELEVENLABS_URL     = 'https://api.elevenlabs.io/v1'

// Available voices
const VOICES = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Aria',  gender: 'Female', accent: 'American',   tone: 'Warm'         },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', gender: 'Male',   accent: 'American',   tone: 'Calm'         },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli',   gender: 'Female', accent: 'American',   tone: 'Emotional'    },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh',   gender: 'Male',   accent: 'American',   tone: 'Deep'         },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', gender: 'Male',   accent: 'American',   tone: 'Crisp'        },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam',   gender: 'Male',   accent: 'American',   tone: 'Narration'    },
]

// GET /api/voice/voices
export async function getVoices(_req, res) {
  res.json({ voices: VOICES })
}

// POST /api/voice/generate
export async function generateVoice(req, res) {
  const { text, voiceId, emotion, speed, pitch } = req.body

  if (!text)    return res.status(400).json({ error: 'text is required' })
  if (!voiceId) return res.status(400).json({ error: 'voiceId is required' })

  // Call ElevenLabs API
  const response = await fetch(`${ELEVENLABS_URL}/text-to-speech/${voiceId}`, {
    method:  'POST',
    headers: {
      'xi-api-key':   ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability:        0.5,
        similarity_boost: 0.75,
        style:            emotion === 'excited' ? 0.8 : 0.5,
        use_speaker_boost: true,
        speed:            speed || 1.0,
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail?.message || 'ElevenLabs API error')
  }

  // Convert audio to buffer
  const audioBuffer = Buffer.from(await response.arrayBuffer())

  // Upload audio to Supabase Storage
  const fileName  = `${req.user.id}/${uuidv4()}.mp3`
  const { error: uploadError } = await supabaseAdmin.storage
    .from('videos')
    .upload(`voiceovers/${fileName}`, audioBuffer, {
      contentType: 'audio/mpeg',
    })

  if (uploadError) throw uploadError

  // Get signed URL for playback
  const { data: urlData } = await supabaseAdmin.storage
    .from('videos')
    .createSignedUrl(`voiceovers/${fileName}`, 3600)

  // Save to voiceovers table
  const { data: voiceover } = await supabaseAdmin
    .from('voiceovers')
    .insert({
      user_id:    req.user.id,
      script_text: text,
      voice_id:   voiceId,
      voice_name: VOICES.find(v => v.id === voiceId)?.name || 'Unknown',
      emotion:    emotion || 'neutral',
      speed:      speed   || 1.0,
      pitch:      pitch   || 0,
      s3_key:     `voiceovers/${fileName}`,
      status:     'ready',
    })
    .select()
    .single()

  res.json({
    message:    'Voiceover generated successfully',
    voiceover,
    url:        urlData?.signedUrl,
    duration:   Math.round(text.split(' ').length / 2.5), // estimated seconds
  })
}