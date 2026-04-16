import { supabase } from './supabase'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// ── Core request function ──────────────────────────────────────────────────
async function request(method, endpoint, body = null) {
  try {
    // Get current user's JWT token
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    if (!token) throw new Error('Not authenticated')

    const options = {
      method,
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }

    if (body) options.body = JSON.stringify(body)

    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    const data     = await response.json()

    if (!response.ok) throw new Error(data.error || 'Request failed')

    return data

  } catch (err) {
    // If backend is offline fall back gracefully
    if (err.message === 'Failed to fetch') {
      throw new Error('Cannot connect to VIRA server. Make sure the backend is running.')
    }
    throw err
  }
}

// ── API methods ────────────────────────────────────────────────────────────
export const api = {
  get:    (endpoint)       => request('GET',    endpoint),
  post:   (endpoint, body) => request('POST',   endpoint, body),
  patch:  (endpoint, body) => request('PATCH',  endpoint, body),
  delete: (endpoint)       => request('DELETE', endpoint),
}

// ── Typed API calls ────────────────────────────────────────────────────────

// Auth
export const authApi = {
  getMe: () => api.get('/api/auth/me'),
}

// Projects
export const projectsApi = {
  getAll:  ()              => api.get('/api/projects'),
  getOne:  (id)            => api.get(`/api/projects/${id}`),
  create:  (body)          => api.post('/api/projects', body),
  update:  (id, body)      => api.patch(`/api/projects/${id}`, body),
  delete:  (id)            => api.delete(`/api/projects/${id}`),
}

// Clips
export const clipsApi = {
  getAll:  (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    return api.get(`/api/clips${params ? `?${params}` : ''}`)
  },
  getOne:  (id)           => api.get(`/api/clips/${id}`),
  create:  (body)         => api.post('/api/clips', body),
  update:  (id, body)     => api.patch(`/api/clips/${id}`, body),
  delete:  (id)           => api.delete(`/api/clips/${id}`),
}

// AI
export const aiApi = {
  transcribe:        (body) => api.post('/api/ai/transcribe',        body),
  detectClips:       (body) => api.post('/api/ai/detect-clips',      body),
  generateHook:      (body) => api.post('/api/ai/generate-hook',     body),
  generateHashtags:  (body) => api.post('/api/ai/generate-hashtags', body),
}

// Voice
export const voiceApi = {
  getVoices: ()     => api.get('/api/voice/voices'),
  generate:  (body) => api.post('/api/voice/generate', body),
}

// Exports
export const exportsApi = {
  getAll:  ()     => api.get('/api/exports'),
  create:  (body) => api.post('/api/exports', body),
}