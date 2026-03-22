import { Router } from 'express'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectsController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// All routes require authentication
router.use(requireAuth)

router.get('/',        getProjects)    // GET  /api/projects
router.get('/:id',     getProject)     // GET  /api/projects/:id
router.post('/',       createProject)  // POST /api/projects
router.patch('/:id',   updateProject)  // PATCH /api/projects/:id
router.delete('/:id',  deleteProject)  // DELETE /api/projects/:id

export default router