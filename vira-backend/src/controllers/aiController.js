import OpenAI from 'openai'
import { supabaseAdmin } from '../config/supabase.js'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// POST /api/ai/transcribe
export async function transcribe(req, res) {
  const { projectId, storagePath } = req.body

  if (!projectId || !storagePath) {
    return res.status(400).json({ error: 'projectId and storagePath are required' })
  }

  // Update project status to processing
  await supabaseAdmin
    .from('projects')
    .update({ status: 'processing' })
    .eq('id', projectId)

  // Download video from Supabase Storage to temp file
  const { data: fileData, error: downloadError } = await supabaseAdmin.storage
    .from('videos')
    .download(storagePath)

  if (downloadError) throw downloadError

  // Save to temp file
  const tempPath = `/tmp/${uuidv4()}.mp4`
  const buffer   = Buffer.from(await fileData.arrayBuffer())
  fs.writeFileSync(tempPath, buffer)

  try {
    // Send to Whisper for transcription
    const transcription = await openai.audio.transcriptions.create({
      file:                fs.createReadStream(tempPath),
      model:               'whisper-1',
      response_format:     'verbose_json',
      timestamp_granularities: ['segment'],
    })

    // Save transcript to database
    const { data: transcript, error: transcriptError } = await supabaseAdmin
      .from('transcripts')
      .insert({
        project_id: projectId,
        full_text:  transcription.text,
        language:   transcription.language || 'en',
        segments:   transcription.segments,
      })
      .select()
      .single()

    if (transcriptError) throw transcriptError

    // Update project status
    await supabaseAdmin
      .from('projects')
      .update({ status: 'complete' })
      .eq('id', projectId)

    res.json({
      message:    'Transcription complete',
      transcript: transcript.id,
      text:       transcription.text,
      segments:   transcription.segments,
    })

  } finally {
    // Always clean up temp file
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
  }
}

// POST /api/ai/detect-clips
export async function detectClips(req, res) {
  const { projectId, transcript } = req.body

  if (!projectId || !transcript) {
    return res.status(400).json({ error: 'projectId and transcript are required' })
  }

  const prompt = `
You are a viral content expert for TikTok, YouTube Shorts, and Instagram Reels.

Analyze this video transcript and find the 5 most engaging, viral-worthy moments.

For each clip return:
- title: short catchy title
- start_time: start in seconds
- end_time: end in seconds  
- duration: length in seconds (max 60s)
- viral_score: score from 0-100
- hook: one compelling opening sentence
- hashtags: array of 4 relevant hashtags
- platform: best platform (tiktok, shorts, or reels)

Transcript:
${transcript}

Return ONLY a valid JSON object like this:
{
  "clips": [
    {
      "title": "...",
      "start_time": 0,
      "end_time": 30,
      "duration": 30,
      "viral_score": 94,
      "hook": "...",
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"],
      "platform": "tiktok"
    }
  ]
}
`

  const response = await openai.chat.completions.create({
    model:           'gpt-4',
    messages:        [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature:     0.7,
  })

  const result = JSON.parse(response.choices[0].message.content)

  // Save each clip to database
  const clipsToInsert = result.clips.map(clip => ({
    project_id:  projectId,
    user_id:     req.user.id,
    title:       clip.title,
    start_time:  clip.start_time,
    end_time:    clip.end_time,
    duration:    clip.duration,
    viral_score: clip.viral_score,
    hook:        clip.hook,
    hashtags:    clip.hashtags,
    platform:    clip.platform,
    status:      'pending',
  }))

  const { data: clips, error } = await supabaseAdmin
    .from('clips')
    .insert(clipsToInsert)
    .select()

  if (error) throw error

  res.json({
    message: 'Clips detected successfully',
    count:   clips.length,
    clips,
  })
}

// POST /api/ai/generate-hook
export async function generateHook(req, res) {
  const { transcript, style } = req.body

  if (!transcript) return res.status(400).json({ error: 'transcript is required' })

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role:    'user',
      content: `Generate 3 viral hooks for this ${style || 'general'} content. 
                Each hook should be under 15 words and stop the scroll immediately.
                Return JSON: { "hooks": ["hook1", "hook2", "hook3"] }
                
                Content: ${transcript.slice(0, 500)}`,
    }],
    response_format: { type: 'json_object' },
  })

  const result = JSON.parse(response.choices[0].message.content)
  res.json(result)
}

// POST /api/ai/generate-hashtags
export async function generateHashtags(req, res) {
  const { transcript, platform } = req.body

  if (!transcript) return res.status(400).json({ error: 'transcript is required' })

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role:    'user',
      content: `Generate 10 trending hashtags for ${platform || 'TikTok'} based on this content.
                Mix popular and niche hashtags for maximum reach.
                Return JSON: { "hashtags": ["#tag1", "#tag2", ...] }
                
                Content: ${transcript.slice(0, 500)}`,
    }],
    response_format: { type: 'json_object' },
  })

  const result = JSON.parse(response.choices[0].message.content)
  res.json(result)
}