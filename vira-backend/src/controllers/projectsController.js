import { supabaseAdmin } from '../config/supabase.js'

// GET /api/projects
export async function getProjects(req, res) {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*, clips(count)')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  res.json({ projects: data })
}

// GET /api/projects/:id
export async function getProject(req, res) {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*, clips(*)')
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .single()

  if (error) return res.status(404).json({ error: 'Project not found' })
  res.json({ project: data })
}

// POST /api/projects
export async function createProject(req, res) {
  const { title, source, original_video_url, s3_key } = req.body

  if (!title) return res.status(400).json({ error: 'Title is required' })

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert({
      user_id:            req.user.id,
      title,
      source:             source || 'upload',
      original_video_url: original_video_url || null,
      s3_key:             s3_key || null,
      status:             'pending',
    })
    .select()
    .single()

  if (error) throw error
  res.status(201).json({ project: data })
}

// PATCH /api/projects/:id
export async function updateProject(req, res) {
  const { title, status } = req.body

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update({ title, status, updated_at: new Date() })
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .select()
    .single()

  if (error) throw error
  res.json({ project: data })
}

// DELETE /api/projects/:id
export async function deleteProject(req, res) {
  const { error } = await supabaseAdmin
    .from('projects')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)

  if (error) throw error
  res.json({ message: 'Project deleted successfully' })
}