import DBconnection from '../config/mongo.js'

//7. Mostrar la cantidad total de automóviles disponibles en cada sucursal.
export const getSucursal = async (req, res) => {
    try {
        const sucursal = await DBconnection('Automoviles')
       const result = await sucursal.aggregate([
        {
          $unwind: "$Stock"
        },
        {
          $group: {
            _id: "$Stock.Sucursal",
            CantidadTotal: { $sum: "$Stock.Cantidad" }
          }
        },
        {
          $project: {
            _id: 0,
            Sucursal: "$_id",
            CantidadTotal: 1
          }
        }
      ]).toArray();
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


// 15.Listar todos los automóviles ordenados por marca y modelo.

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

//16. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.
export const getSucursalAutos = async (req, res) => {
    try {
        const sucursal = await DBconnection('Automoviles')
        const result = await sucursal.aggregate([
            {
              $unwind: "$Stock"
            },
            {
              $lookup: {
                from: "Sucursales",
                localField: "Stock.Sucursal",
                foreignField: "Nombre",
                as: "Sucursal"
              }
            },
            {
              $group: {
                _id: "$Stock.Sucursal",
                CantidadTotal: { $sum: "$Stock.Cantidad" },
                Direccion: { $first: "$Sucursal.Direccion" }
              }
            },
            {
              $project: {
                _id: 0,
                Sucursal: "$_id",
                CantidadTotal: 1,
                Direccion: 1

              }
            }
          ]).toArray();
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

//18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
export const getAutosDisponibles = async (req, res) => {
    try {
        const autos = await DBconnection('Automoviles')
        const result = await autos.find({$and : [{Capacidad: 5}, {'Stock.Cantidad': {$gt: 0}}]}).toArray()
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
//CRUD 
export const create = async (req, res) => {
    try {
        const autos = await DBconnection('Automoviles')
        const result = await autos.insertOne(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const update = async (req, res) => {
    try {
        const autos = await DBconnection('Automoviles')
        const result = await autos.updateOne({ _id: new ObjectId(req.body.id) }, { $set: req.body })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteOne = async (req, res) => {
    try {
        const autos = await DBconnection('Automoviles')
        const result = await autos.deleteOne({ _id: new ObjectId(req.body.id) })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}