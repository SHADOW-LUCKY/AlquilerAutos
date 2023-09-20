import {Router} from 'express'
import * as p from '../controllers/personas.controllers.js'

const router = Router()

router.get('/getall', p.getPersonas)

export default router