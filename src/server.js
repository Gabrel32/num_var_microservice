const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();
const port = config.get("alcaravan.port");
const mongoFieldIndex = require("./database/utils/mongoFieldIndex");
const indexField = config.get("alcaravan.indexField");
app.use(cors());
app.use(bodyParser.json());

/****************
 *     Libraries
 ****************/
app.use("/library", require("./book/routes/libraries"));

/***************
 *      Artifact or Brain
 ****************/
app.use("/artifact", (req, res) => {
  res.sendFile(path.join(__dirname, "./book/brains/brain.js"));
});

/***************
 *       Views
 ***************/
app.use("/view", require("./book/routes/views"));

/*************
 *      Engines
 *************/
app.use("/engine", require("./book/routes/engines"));

/***************
 *      Definition
 ***************/
app.use("/definition", require("./book/routes/definitions"));

/***************
 *      Generic Engine
 ***************/
app.use("/genericEngine", require("./book/routes/genericEngines"));

/*******************
 *    Assets
 ******************/
app.use("/asset", require("./book/routes/assets"));

/***********************************************************
 *      Base de datos
 *********************************************************/
app.use("/dataBase", require("./database/routes/newStructure"));

/****************
 *     Endpoint del Envio de Datos Movil
 ****************/
app.use("/movil/sendData", require("./database/routes/sendDataMovil"));
/*******************
 * Endpoint de contador de interaciones
 ********************/
app.use("/interactionCounters", require("./database/routes/interactionCounters"))

/***************
 *      Testing
 ***************/
app.get("/fragata", function (req, res) {
  res
    .status(200)
    .json({ message: "Por el derecho a comprender", microservice: "Activado" });
});

/*******************
 * Indice del campo en la coleccion de mongo
 * *****************/
(async function () {
  const resultMongoFieldindex = await mongoFieldIndex(indexField);
  if (resultMongoFieldindex === indexField) {
    console.log(`Índice ${indexField} exitoso`);
  } else {
    console.log("Error al crear el indice: " + resultMongoFieldindex);
  }
  return
})();

app.listen(port);
console.log(config.get("alcaravan.db") + " " + port);
