import {Router} from 'express'
import * as s from '../controllers/servicios.controllers.js'

const router = Router()

router.get('/getdisp', s.getServicios)
router.get('/getact', s.getActiveAndClient)
router.get('/getpend', s.getPending)
router.get('/getalquiler', s.getAlquiler)


export default router