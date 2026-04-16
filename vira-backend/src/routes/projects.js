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

router.use(requireAuth)

router.get('/',       getProjects)
router.get('/:id',    getProject)
router.post('/',      createProject)
router.patch('/:id',  updateProject)
router.delete('/:id', deleteProject)

export default router