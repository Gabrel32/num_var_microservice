const express = require("express");
const router = express.Router({ mergeParams: true });
const cors = require("cors");
const connectToDatabase = require("../utils/mongodb");
const config = require("config");
const bodyParser = require("body-parser");
const app = express();
const urlMongo = config.get("alcaravan.url");
const dbMongo = config.get("alcaravan.db");
const collectionCounters = config.get("alcaravan.collectionCounters");

app.use(bodyParser.json());
app.use(cors());

router.post("/", async (req, res) => {
  try {
    const { instance = null } = req.body;
    const validInstances = ["liceos", "universidades", "visitante", "all"];
    const filter = instance.toLowerCase();
    if (!instance || !validInstances.includes(filter)) {
      res
        .status(400)
        .json({ code: 400, message: "Error de peticion", data: [] });
    }
    const resultGetInstanceObject = await getInstanceObject(filter);
    res.status(200).json({
      code: 200,
      message: "Solicitud exitosa",
      data: resultGetInstanceObject,
    });
    console.log("success interactionCounter");
  } catch (error) {
    console.log("Error Interaction Counters");
    res.status(400).json({ code: 400, message: "Error de peticion", data: [] });
  } finally {
    return;
  }
});

async function getInstanceObject(instance) {


  const { client, db } = await connectToDatabase(urlMongo, dbMongo);
  try {

   

    let instanceObjects = await db
      .collection(collectionCounters)
      .find({})
      .toArray();

    const clearInstanceObjects = instanceObjects.map((doc) => {
      delete doc._id;
      return doc;
    });

    if (instance === "all") {

      instanceObjects = clearInstanceObjects;

      await client?.close();

      return instanceObjects;
    } else {
      instanceObjects = clearInstanceObjects.find(
        (doc) => doc.instance === instance
      );
      
      await client?.close();

      return [instanceObjects];
    }
  } catch (error) {
    await client?.close()
    return console.log("Error al obtener los objetos de instancias: " + error);
  } 
}

module.exports = router;
