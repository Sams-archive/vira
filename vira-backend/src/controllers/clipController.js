import { supabaseAdmin } from '../config/supabase.js'

// GET /api/clips
export async function getClips(req, res) {
  const { project_id, status, platform } = req.query

  let query = supabaseAdmin
    .from('clips')
    .select('*, projects(title, source)')
    .eq('user_id', req.user.id)
    .order('viral_score', { ascending: false })

  if (project_id) query = query.eq('project_id', project_id)
  if (status)     query = query.eq('status', status)
  if (platform)   query = query.eq('platform', platform)

  const { data, error } = await query
  if (error) throw error
  res.json({ clips: data })
}

// GET /api/clips/:id
export async function getClip(req, res) {
  const { data, error } = await supabaseAdmin
    .from('clips')
    .select('*, projects(title)')
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .single()

  if (error) return res.status(404).json({ error: 'Clip not found' })
  res.json({ clip: data })
}

// POST /api/clips
export async function createClip(req, res) {
  const {
    project_id, title, start_time,
    end_time, duration, platform,
    viral_score, hook, hashtags,
  } = req.body

  if (!project_id) return res.status(400).json({ error: 'project_id is required' })

  const { data, error } = await supabaseAdmin
    .from('clips')
    .insert({
      project_id,
      user_id:     req.user.id,
      title,
      start_time:  start_time  || 0,
      end_time:    end_time    || 0,
      duration:    duration    || 0,
      platform:    platform    || 'general',
      viral_score: viral_score || 0,
      hook:        hook        || null,
      hashtags:    hashtags    || [],
      status:      'pending',
    })
    .select()
    .single()

  if (error) throw error
  res.status(201).json({ clip: data })
}

// PATCH /api/clips/:id
export async function updateClip(req, res) {
  const { data, error } = await supabaseAdmin
    .from('clips')
    .update({ ...req.body, updated_at: new Date() })
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .select()
    .single()

  if (error) throw error
  res.json({ clip: data })
}

// DELETE /api/clips/:id
export async function deleteClip(req, res) {
  const { error } = await supabaseAdmin
    .from('clips')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)

  if (error) throw error
  res.json({ message: 'Clip deleted successfully' })
}