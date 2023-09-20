import DBconnection from '../config/mongo.js'

// 1.Mostrar todos los clientes registrados en la base de datos.
export const getPersonas = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const result = await personas.find().toArray()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}