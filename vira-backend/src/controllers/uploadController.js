import { supabaseAdmin } from '../config/supabase.js'
import { v4 as uuidv4 } from 'uuid'

// GET /api/upload/presigned
// Generates a signed URL so frontend can upload directly to Supabase Storage
export async function getUploadUrl(req, res) {
  const { filename, contentType } = req.query

  if (!filename) return res.status(400).json({ error: 'filename is required' })

  const ext      = filename.split('.').pop()
  const filePath = `${req.user.id}/${uuidv4()}.${ext}`

  const { data, error } = await supabaseAdmin.storage
    .from('videos')
    .createSignedUploadUrl(filePath)

  if (error) throw error

  res.json({
    signedUrl:  data.signedUrl,
    path:       filePath,
    token:      data.token,
  })
}

// POST /api/upload/confirm
// Called after upload completes — creates the project record
export async function confirmUpload(req, res) {
  const { filename, storagePath, fileSize } = req.body

  if (!storagePath) return res.status(400).json({ error: 'storagePath is required' })

  // Create project in database
  const { data: project, error } = await supabaseAdmin
    .from('projects')
    .insert({
      user_id: req.user.id,
      title:   filename?.replace(/\.[^/.]+$/, '') || 'Untitled project',
      status:  'pending',
      source:  'upload',
      s3_key:  storagePath,
    })
    .select()
    .single()

  if (error) throw error

  res.status(201).json({
    message: 'Upload confirmed',
    project,
  })
}