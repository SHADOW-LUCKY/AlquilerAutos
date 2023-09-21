import DBconnection from '../config/mongo.js'

//7. Mostrar la cantidad total de automóviles disponibles en cada sucursal.
export const getSucursal = async (req, res) => {
    try {
        const sucursal = await DBconnection('Automoviles')
        const result = await sucursal.aggregate([]).toArray();
        result.length === 0 ? (
            res.status(400).json({
                msg: 'No hay sucursales registradas'
            })
        ) : (
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
    
}


//10.Mostrar todos los automóviles con una capacidad mayor a 5 personas. 

export const getAutosGtFive = async (req, res) => {
    try {
        const autos = await DBconnection('Automoviles')
        const result = await autos.find({ Capacidad: { $gt: 5 } }).toArray()
        result.length === 0 ? (
            res.status(400).json({
                msg: 'No hay autos con una capacidad mayor a 5 personas'
            })
        ) : (
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

// 16.Listar todos los automóviles ordenados por marca y modelo.

export const getAutos = async (req, res) => {
    try {
        const autos = await DBconnection('Automoviles')
        const result = await autos.find().sort({ Marca: 1, Modelo: 1 }).toArray()
        result.length === 0 ? (
            res.status(400).json({
                msg: 'No hay autos registrados'
            })
        ) : (
            res.status(200).json(result)
        )
    } catch (error) {
        res.status(500).json(error)
    }
}