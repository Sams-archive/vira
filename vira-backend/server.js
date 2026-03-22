import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

// ── Route imports ──────────────────────────────────────────────────────────
import authRoutes     from './src/routes/auth.js'
import projectRoutes  from './src/routes/projects.js'
import clipRoutes     from './src/routes/clips.js'
import uploadRoutes   from './src/routes/upload.js'
import aiRoutes       from './src/routes/ai.js'
import voiceRoutes    from './src/routes/voice.js'
import exportRoutes   from './src/routes/exports.js'

const app  = express()
const PORT = process.env.PORT || 4000

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(helmet())
app.use(morgan('dev'))
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true,
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// ── Health check ───────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status:  'ok',
    message: 'VIRA API is running',
    version: '1.0.0',
    time:    new Date().toISOString(),
  })
})

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/clips',    clipRoutes)
app.use('/api/upload',   uploadRoutes)
app.use('/api/ai',       aiRoutes)
app.use('/api/voice',    voiceRoutes)
app.use('/api/exports',  exportRoutes)

// ── 404 handler ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ───────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('❌ Error:', err.message)
  res.status(err.status || 500).json({
    error:   err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ── Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ VIRA API running on http://localhost:${PORT}`)
  console.log(`📋 Health check: http://localhost:${PORT}/health`)
})