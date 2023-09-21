import DBconnection from '../config/mongo.js'
import { ObjectId } from 'mongodb'

// 1.Mostrar todos los clientes registrados en la base de datos.
export const getPersonas = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const result = await personas.find().toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg: 'No hay personas registradas'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}
//7. Listar los empleados con el cargo de "Vendedor"

export const getSellers = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const result = await personas.find({Distintivo: 'vendedor'}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg : 'No hay vendedores registrados ...eso no es bueno'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}


//9.Listar los clientes con el DNI específico.

export const getPersonaDNI = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const DNIreq = req.body.DNI 
        const result = await personas.find({DNI: DNIreq}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg : 'No hay personas que tengan ese DNI'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
    
}
//14.Mostrar los empleados con cargo de "Gerente" o "Asistente".

export const getPersonasCargo = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const cargo = req.body.cargo 
        const result = await personas.find({Distintivo: cargo}).toArray()
        result.length === 0 ?(
            res.status(400).json({
                msg : 'No hay personas que tengan ese cargo'
            })
        ):(
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}