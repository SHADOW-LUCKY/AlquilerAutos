import DBconnection from '../config/mongo.js'
import { ObjectId } from 'mongodb'
import { createToken } from '../middlewares/token.js'
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
//19. Login de usuario mediante JWT.
export const login = async (req, res) => {
    const { Email, Password } = req.body;
    try {
      const Cliente = await DBconnection("Personas");
      const User = await Cliente.find({
        Email,
        Password,
      }).toArray();
      if (User) {
        const token = await createToken(User[0]._id);
        res.status(200).json({
          msg: "Login Exitoso",
          data: User,
          token,
        });
      } else {
        res.status(400).json({
          msg: "Usuario no encontrado",
          status: 404,
        })
      }
    } catch (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  };

//crud 


export const createPersona = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const result = await personas.insertOne(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updatePersona = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const result = await personas.updateOne({_id: new ObjectId(req.body.id)}, {$set: req.body})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deletePersona = async (req, res) => {
    try {
        const personas = await DBconnection('Personas')
        const result = await personas.deleteOne({_id: new ObjectId(req.body.id)})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}