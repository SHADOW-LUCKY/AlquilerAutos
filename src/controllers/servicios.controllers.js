import DBconnection from '../config/mongo.js'
import {ObjectId} from 'mongodb'
// 2. Obtener todos los automóviles disponibles para alquiler.
export const getServicios = async (req, res) => {
    try {
        const servicios = await DBconnection('Servicios')
        const result = await servicios.find({Estado: 'Disponible'}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay servicios registrados'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

//3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.

export const getActiveAndClient = async (req, res) => {
    try {
        const servicios = await DBconnection('Servicios')
       const result = await servicios.aggregate([
         {
           $lookup: {
             from: 'Personas',
             localField: 'Id_Persona',
             foreignField: '_id',
             as: 'Cliente'
           }
         },
         {
           $project: {      
             "Cliente._id": 0,
             "Cliente.Direccion": 0,
             "Cliente.Email": 0,
             "Cliente.Password": 0,
             "Cliente.Distintivo": 0
           }
         }
       ]).toArray();
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay servicios registrados'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}
// 4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.

export const getPending = async (req, res) => {
    try {
        const servicios = await DBconnection('Servicios')
        const result = await servicios.aggregate([
            {$match : {Estado: 'Pendiente', Tipo_Servicio: 'Reserva'}},
            {$lookup: {
                from: 'Personas', 
                localField: 'Id_Persona', 
                foreignField: '_id', 
                as: 'Cliente'}},
            {$lookup: 
                {from: 'Automoviles', 
                localField: 'Id_Automovil', 
                foreignField: '_id', 
                as: 'Automovil'}},
            {$project: {
                Id_Automovil: 0,
                Id_Persona: 0,
                _id: 0,
                "Cliente._id": 0,
                "Cliente.Direccion": 0,
                "Cliente.Email": 0,
                "Cliente.Password": 0,
                "Cliente.Distintivo": 0,
                "Automovil._id": 0,
                "Automovil.Stock": 0,
                "Automovil.Precio_Diario": 0,
                
            }}
        ]).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay servicios registrados'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

// 5. Obtener los detalles del alquiler con el ID de alquiler específico.

export const getAlquiler = async (req, res) => {
    try {
        const servicios = await DBconnection('Servicios')
        const ID = req.body.id
        const result = await servicios.find({_id: new ObjectId(ID)}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay servicios registrados'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

//8. Obtener el costo total de un alquiler específico.
export const getCostoAlquiler = async (req, res) => {
    try {
        const servicios = await DBconnection('Servicios')
        const ID = req.body.id
        const result = await servicios.find({_id: new ObjectId(ID)}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay servicios registrados'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}
//11. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.

export const getAlquilerFecha = async (req, res) => {
    try {
        const servicios = await DBconnection('Servicios')
        const fecha = req.body.fecha
        const result = await servicios.find({Fecha_Inicio: fecha}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay servicios registrados'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}