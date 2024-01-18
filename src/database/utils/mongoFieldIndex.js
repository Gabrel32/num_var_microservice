const connectToDatabase = require("./mongodb");
const config = require("config");
const urlMongo = config.get("alcaravan.url");
const dbMongo = config.get("alcaravan.db");
const collectionMongo = config.get("alcaravan.collection");

async function mongoFieldIndex(indexField) {
  
  const { client, db } = await connectToDatabase(urlMongo, dbMongo);
  try {

    const collection = await db.collection(collectionMongo);

    return collection
      .createIndex({ [indexField]: 1 }, { name: indexField })
      .then(async (result) => {
        await client?.close();
        return result;
      })
      .catch(async (err) => {
        await client?.close();
        return err;
      });
  } catch (error) {
    return error;
  }
}

module.exports = mongoFieldIndex;
