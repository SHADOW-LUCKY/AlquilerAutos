import {MongoClient} from 'mongodb';

export default async function (Collection) {
    try {
      const client = new MongoClient(process.env.MANGOS_URL);
  
      await client.connect();
      const db = client.db();
      return db.collection(Collection);
    } catch (error) {
      throw new Error({ message: "Error al conectar a MongoDB:", error });
    }
  }

