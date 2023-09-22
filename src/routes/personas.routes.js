import {Router} from 'express'
import * as p from '../controllers/personas.controllers.js'

const router = Router()

router.get('/getdni', p.getPersonaDNI)
router.get('/getcargo', p.getPersonasCargo)
router.get('/sellers ', p.getSellers)
router.get('/login', p.login)
//CRUD 
router.get('/getall', p.getPersonas)
router.post('/add', p.createPersona)
router.patch('/update', p.updatePersona)
router.delete('/delete', p.deletePersona)

export default router