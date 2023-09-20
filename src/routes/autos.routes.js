import {Router} from 'express'
import * as a from '../controllers/autos.controllers.js' 

const router = Router()

router.get('/getGtFive', a.getAutosGtFive)
router.get('/getall', a.getAutos)

export default router