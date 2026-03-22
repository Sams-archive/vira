import { supabaseAdmin } from '../config/supabase.js'

// GET /api/exports
export async function getExports(req, res) {
  const { data, error } = await supabaseAdmin
    .from('exports')
    .select('*, clips(title, platform, duration)')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  res.json({ exports: data })
}

// POST /api/exports
export async function createExport(req, res) {
  const { clipId, format, resolution, platform } = req.body

  if (!clipId) return res.status(400).json({ error: 'clipId is required' })

  // Get clip to find storage path
  const { data: clip, error: clipError } = await supabaseAdmin
    .from('clips')
    .select('*')
    .eq('id', clipId)
    .eq('user_id', req.user.id)
    .single()

  if (clipError) return res.status(404).json({ error: 'Clip not found' })

  // Generate download URL if file exists
  let downloadUrl = null
  if (clip.storage_path) {
    const { data: urlData } = await supabaseAdmin.storage
      .from('videos')
      .createSignedUrl(clip.storage_path, 86400) // 24 hour link
    downloadUrl = urlData?.signedUrl
  }

  // Save export record
  const { data: exportRecord, error } = await supabaseAdmin
    .from('exports')
    .insert({
      clip_id:      clipId,
      user_id:      req.user.id,
      format:       format     || 'mp4',
      resolution:   resolution || '1080p',
      platform:     platform   || clip.platform,
      download_url: downloadUrl,
      expires_at:   new Date(Date.now() + 86400 * 1000),
    })
    .select()
    .single()

  if (error) throw error

  res.status(201).json({
    message:      'Export created',
    export:       exportRecord,
    downloadUrl,
  })
}
// ```

// ---

// ## Final folder structure

// Your `vira-backend` should now look like this:
// ```
// vira-backend/
// ├── .env
// ├── package.json
// ├── server.js
// └── src/
//     ├── config/
//     │   └── supabase.js
//     ├── middleware/
//     │   └── auth.js
//     ├── routes/
//     │   ├── auth.js
//     │   ├── projects.js
//     │   ├── clips.js
//     │   ├── upload.js
//     │   ├── ai.js
//     │   ├── voice.js
//     │   └── exports.js
//     └── controllers/
//         ├── authController.js
//         ├── projectsController.js
//         ├── clipsController.js
//         ├── uploadController.js
//         ├── aiController.js
//         ├── voiceController.js
//         └── exportsController.js