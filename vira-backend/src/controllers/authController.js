import { supabaseAdmin } from '../config/supabase.js'

// GET /api/auth/me
export async function getMe(req, res) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single()

  res.json({
    user: {
      id:       req.user.id,
      email:    req.user.email,
      name:     req.user.user_metadata?.full_name,
      plan:     profile?.plan || 'free',
      avatar:   profile?.avatar_url,
    }
  })
}