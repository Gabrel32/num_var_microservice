const { MongoClient } = require("mongodb");
const config = require("config");
const urlMongodefault = config.get("alcaravan.url");
const dbMongodefault = config.get("alcaravan.db");
// Función para conectar a la base de datos
async function connectToDatabase(
  urlMongo = urlMongodefault,
  dbMongo = dbMongodefault
) {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 100,
      connectTimeoutMS: 3000,
    };

    const client = await MongoClient.connect(urlMongo, options);
    const db = client.db(dbMongo); // Obtiene una instancia de la base de datos
    const collections = await db.collections();
    const collectionsName = collections.map((ele) => ele.collectionName);

    console.log("Conexión a MongoDB establecida");
    return { client, db, collectionsName };
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
