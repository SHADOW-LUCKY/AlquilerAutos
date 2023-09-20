import {Router} from 'express'
import * as p from '../controllers/personas.controllers.js'

const router = Router()

router.get('/getall', p.getPersonas)
router.get('/getdni', p.getPersonaDNI)
router.get('/getcargo', p.getPersonasCargo)
router.get('/sellers ', p.getSellers)

export default router