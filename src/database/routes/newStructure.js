const express = require("express");
const router = express.Router({ mergeParams: true });
const MongoCliente = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("config");
const interactions = require("../utils/descriptionOfChapters");
const interactionCounters = require("../utils/interactionCounters");
const app = express();
const url = config.get("alcaravan.url");
let db;
let collection;
let collectionsName; //Array de nombres de las colecciones de la base de datos

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

MongoCliente.connect(
   url,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 100,
      connectTimeoutMS: 3000,
   },
   async (err, client) => {
      if (err) {
         console.log(err);
         return;
      }
      db = client.db(config.get("alcaravan.db")); //Establece la base de
      //collection.deleteMany({}); //Vacia todos los documentos de la coleccion
      collection = db.collection(config.get("alcaravan.collection"));
      await db
         .collections()
         .then(
            (data) => (collectionsName = data.map((ele) => ele.collectionName))
         );
   }
);

router.use(function timeLog(req, res, next) {
   console.log(`Time: ${Date()}`);
   console.log(Date.now());
   console.log(req.body);
   next();
});

router.get("/:shortName", async (req, res) => {
   const { shortName } = req.params; //Nombre de la coleccion donde se almacena la data. (Dinamicamente)
   if (!validationOfCollection(shortName)) {
      return res.json(`Error, coleccion no definida`);
   }
   collection
      .find()
      .toArray()
      .then((result) => {
         res.json(result);
      })
      .catch((err) => {
         console.error(err);
      });
   return (collection = db.collection(config.get("alcaravan.collection")));
});

router.post("/:shortName", async (req, res) => {
   const { shortName } = req.params; //Nombre de la coleccion donde se almacena la data. (Dinamicamente)
   if (!validationOfCollection(shortName)) {
      return res.status(402).json(`Error, coleccion no definida`);
   }
   //Obtención de las variables necesarias para las funciones de registro y actualización
   const { idMoodle = null, personalInformation = null, interaction = null } = req.body;

   const resultValidationOfBody = validationOfBody({ idMoodle, personalInformation, interaction });

   if (!resultValidationOfBody[0]) {
      return res.status(402).json(`${resultValidationOfBody[1]}`);
   }

   try {
      await userObjectValidation(
         personalInformation,
         idMoodle
      );
      /*   const updatePersonalInformationResult = await updatePersonalInformation(
          personalInformation,
          idMoodle); //Actualiza los datos personales del cliente */
      const updateInteractionsResult = await updateInteractions(
         interaction,
         idMoodle
      ); //Inserta la interaccion del cliente con un artefacto
      res.status(200).json(`Registro exitoso: *Update Interations ${updateInteractionsResult}`);
   } catch (error) {
      console.log(error);
      res.status(500).json("Error, al registrar data");
   }
   return (collection = db.collection(config.get("alcaravan.collection"))); //Establece la coleccion por defecto donde se almacenan los registros
});

function validationOfCollection(shortName) {
   if (
      !collectionsName.includes(shortName.slice(1)) &&
      shortName.slice(1) !== "null"
   )
      return false;

   if (shortName.slice(1) !== "null")
      collection = db.collection(shortName.slice(1)); //Fija la coleccion donde se guarda la data

   return true;
}
/* Funcion que valida si el cliente que esta haciendo una petición ya tiene un objeto en la colección,
recibe dos parametros idMoodle: para verificar si existe el objeto, personalInformation: las datos del cliente.*/
async function userObjectValidation(personalInformation, idMoodle = null) {
   if (!idMoodle) {
      return; //Termina la función por no tener un idMoodle valido
   }
   try {
      const result = await collection.findOne({ idMoodle });
      const originalObject = {
         idMoodle,
         personalInformation,
         interactions
      };
      return result
         ? console.log("The object exists")
         : collection.insertOne(originalObject) &&
         console.log("Created new object");
   } catch (error) {
      console.log(error);
   }
   return;
}

/* Funcion que actualiza la informacion personal del cliente, recibe dos parametros_
_la informacion personal obtenida desde el req del cliente y el idMoodle_
_el cual se utiliza para filtrar el objeto que se quiere actualizar.  */
async function updatePersonalInformation(personalInformation, idMoodle = null) {
   if (!idMoodle) {
      return; //Termina la función por no tener un idMoodle valido
   }
   try {
      const filter = { idMoodle };
      const updateDocumentDB = {
         $set: {
            personalInformation,
         },
      };
      const update = await updateDocument(filter, updateDocumentDB);
      console.log("Personal data inserted " + update);
      return update;
   } catch (error) {
      console.log(error);
   }
   return;
}

/* Funcion que inserta la interaccion del cliente, recibe tres parametros_
_la interaccion obtenida desde el req del cliente, el idMoodle_
_el cual se utiliza para filtrar el objeto que se quiere actualizar y la ruta donde se inserta el objeto */
async function updateInteractions(interaction, idMoodle = null) {
   if (!idMoodle) {
      return; //Termina la función por no tener un idMoodle valido
   }

   const filter = { idMoodle };
   const path = pathToInsert(interaction);
   let validationArtifact = null;
   if (interaction.results) {
      try {
         validationArtifact = await correctArtifact(interaction.results);
         interaction.validationArtifact = validationArtifact;

         const paramsPageStatus = {
            idMoodle,
            validationArtifact,
            interaction,
         };
         const pageStatusResult = await pageStatus(paramsPageStatus);
         console.log(`Update pageStatus ${pageStatusResult}`);
      } catch (error) {
         console.log(error);
      }
   }

   delete interaction.chapter;
   delete interaction.page;
   delete interaction.artifact;
   interaction.originMovil = false;

   const updateDocumentDB = {
      $push: {
         [path]: interaction,
      },
      $set: {
         "interactions.lastInteraction": Date.now()
      }
   };

   const dataArtifact = {
      pageLoading: interaction.typeArtifact == 'Load' ? 1 : 0,
      incorrectArtifacts: interaction?.typeArtifact == 'Standard' && !validationArtifact ? 1 : 0,
      correctArtifacts: interaction?.typeArtifact == 'Standard' && validationArtifact ? 1 : 0
   };
   try {
      const updateDocumentResult = await updateDocument(filter, updateDocumentDB);
      console.log(`Interaction object record ${updateDocumentResult}`);
      if (updateDocumentResult === 1) {
         await interactionCounters({
            ...dataArtifact,
            //pageLoading: 1,
            idMoodle,
            originMovil: interaction.originMovil
         });
      }

      return updateDocumentResult;
   } catch (error) {
      console.log(error);
   }
   return;
}

//Funcion que retorna la ruta donde se guarda la carga de una pagina o interaccion con un artefacto.
function pathToInsert(data) {
   // Reemplazar el punto decimal en data.page con un guión bajo _
   const page = data.page.replace(".", "_");
   //Retorna la ruta usando temple string, el cual tiene un operador ternerio para definir la ultima parte .loadPage o .artifact_#
   return `interactions.chapter_${data.chapter}.page_${page}${data.typeArtifact === "Load" ? ".loadPage" : `.artifact_${data.artifact}`
      }`;
}

/*Funcion que retorna si la interaccion del artefacto es tru o false, es decir,
si el participante respondio el arterafacto correctamente partiendo de el % impuesto por el evaluador (Umbral)*/
const correctArtifact = async (results) => {
   const umbral = 0.7;
   const { correct = 0, incorrect = 0, forAnswer = 0 } = results;
   const artifact =
      correct / (correct + incorrect + forAnswer) >= umbral ? true : false;
   return artifact;
};

const pageStatus = async ({
   idMoodle = null,
   validationArtifact,
   interaction,
}) => {
   if (!idMoodle) {
      return; //Termina la función por no tener un idMoodle valido
   }
   //const filter = { idMoodle };
   const artifact = `artifact_${interaction.artifact}`;
   const page = interaction.page.replace(".", "_");
   const path = `interactions.chapter_${interaction.chapter}.page_${page}.statusPage.${artifact}`;

   const filter = {
      idMoodle,
      $or: [
         { [path]: { $exists: false } }, //Verifica que la propiedad no exista y procede a crearla
         { [path]: { $eq: false } }, //Verifica que la propidad exista y su valor es false, para actualizarlo
      ],
   };

   const updateDocumentDB = {
      $set: {
         [path]: validationArtifact,
      },
   };

   try {
      const update = await updateDocument(filter, updateDocumentDB);
      return update;
   } catch (error) {
      console.log(error);
   }
};

const updateDocument = async (filter, updateDocumentDB) => {
   try {
      const updatedOneReult = await collection.updateOne(filter, updateDocumentDB);
      return updatedOneReult.modifiedCount;
   } catch (error) {
      console.log(error);
   }
};

const validationOfBody = ({ idMoodle, personalInformation, interaction }) => {
   const resultValidationOfBody = [];
   if (idMoodle === null || typeof idMoodle !== "string" || idMoodle.trim() === "") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad idMoodle correctamente");
      return resultValidationOfBody;
   }
   if (personalInformation === null || typeof personalInformation !== "object") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad personalInformation correctamente");
      return resultValidationOfBody;
   }
   if (personalInformation.firstName === null || typeof personalInformation.firstName !== "string" || personalInformation.firstName.trim() === "") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad personalInformation.firstName correctamente");
      return resultValidationOfBody;
   }
   if (personalInformation.lastName === null || typeof personalInformation.lastName !== "string" || personalInformation.lastName.trim() === "") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad personalInformation.lastName correctamente");
      return resultValidationOfBody;
   }
   if (personalInformation.email === null || typeof personalInformation.email !== "string" || personalInformation.email.trim() === "") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad personalInformation.email correctamente");
      return resultValidationOfBody;
   }
   if (interaction === null || typeof interaction !== "object") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad interaction correctamente");
      return resultValidationOfBody;
   }
   if (!interaction.chapter || typeof interaction.chapter !== "string" || interaction.chapter.trim() === "") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad interaction.chapter correctamente");
      return resultValidationOfBody;
   }
   if (!interaction.page || typeof interaction.page !== "string" || interaction.page.trim() === "") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad interaction.page correctamente");
      return resultValidationOfBody;
   }
   if (interaction.typeArtifact === null || interaction.typeArtifact !== "Load" && interaction.typeArtifact !== "Standard") {
      resultValidationOfBody.push(false, "Por favor defina la propiedad interaction.typeArtifact correctamente");
      return resultValidationOfBody;
   }
   if (interaction.typeArtifact === "Standard" && (!interaction.artifact || typeof interaction.artifact !== "number")) {
      resultValidationOfBody.push(false, "Por favor defina la propiedad interaction.artifact correctamente");
      return resultValidationOfBody;
   }
   resultValidationOfBody.push(true, "Validacion del body exitoso");
   return resultValidationOfBody;
};



module.exports = router;