import {Router} from 'express'
import * as s from '../controllers/servicios.controllers.js'

const router = Router()

router.get('/getdisp', s.getServicios)
router.get('/getact', s.getActiveAndClient)
router.get('/getpend', s.getPending)
router.get('/getalquiler', s.getAlquiler)
router.get('/getcosto', s.getCostoAlquiler)
router.get('/getalquilerfecha', s.getAlquilerFecha)
router.get('/reservasCliente', s.getReservasCliente)
router.get('/count', s.countAlquileres)
router.get('/getclialq', s.getClientesAlq)
router.get('/getfecha', s.getAlquileresFecha)
//CRUD
router.get('/getalq', s.getAll)
router.post('/addalquiler', s.create)
router.patch('/updatealquiler', s.update)
router.delete('/deletealquiler', s.delete)


export default router