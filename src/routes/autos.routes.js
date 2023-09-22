import {Router} from 'express'
import * as a from '../controllers/autos.controllers.js' 

const router = Router()

router.get('/getGtFive', a.getAutosGtFive)
router.get('/getSucursal', a.getSucursal)
router.get('/getSucursalAutos', a.getSucursalAutos)
router.get('/getAutosDisponibles', a.getAutosDisponibles) 
//CRUD
router.get('/getall', a.getAutos)
router.post('/add', a.create)
router.patch('/update', a.update)
router.delete('/delete', a.deleteOne)

export default router