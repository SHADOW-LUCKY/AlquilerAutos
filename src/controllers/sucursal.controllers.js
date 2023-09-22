//crud
export const create = async (req, res) => {
  try {
    const sucursal = await DBconnection('Sucursales')
    const result = await sucursal.insertOne(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getSucursales = async (req, res) => {
  try {
    const sucursal = await DBconnection('Sucursales')
    const result = await sucursal.find().toArray()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const update = async (req, res) => {
  try {
    const sucursal = await DBconnection('Sucursales')
    const result = await sucursal.updateOne({ _id: new ObjectId(req.body.id) }, { $set: req.body })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteOne = async (req, res) => {
  try {
    const sucursal = await DBconnection('Sucursales')
    const result = await sucursal.deleteOne({ _id: new ObjectId(req.body.id) })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}