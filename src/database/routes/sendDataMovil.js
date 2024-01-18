const express = require("express");
const router = express.Router({ mergeParams: true });
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("config");
const connectToDatabase = require("../utils/mongodb");
const interactionCounters = require("../utils/interactionCounters");
const app = express();
const urlMongo = config.get("alcaravan.url");
const dbMongo = config.get("alcaravan.db");

app.use(bodyParser.json());
app.use(cors());

router.use(function timeLog(req, res, next) {
  console.log(`Time: ${Date()}`);
  console.log(Date.now());
  console.log(req.body);
  next();
});

router.post("/:shortName", async (req, res) => {
  try {
    const { shortName } = req.params; //Nombre de la coleccion donde se almacena la data. (Dinamicamente)
    //Obtención de las variables necesarias para las funciones de registro y actualización
    const { idMoodle = null, interactions = null } = req.body;

    const resultValidationOfBody = validationOfBody({
      idMoodle,
      interactions,
    });

    if (!resultValidationOfBody[0]) {
      return res.status(402).json(`${resultValidationOfBody[1]}`);
    }

    if (
      !(await validationOfCollection({
        shortName: shortName.slice(1),
      }))
    ) {
      return res.status(402).json(`Error, coleccion no definida`);
    }

    const userObjectValidationResult = await userObjectValidation({
      idMoodle,
      shortName: shortName.slice(1),
    });

    if (!userObjectValidationResult) {
      // Cerrar la conexión
      return res
        .status(400)
        .json(`idMoodle '${idMoodle}' no existe en la base de datos`);
    }
    const updateInteractionsResult = await updateInteractions({
      interactions,
      idMoodle,
      shortName: shortName.slice(1),
    }); //Inserta la interaccion del cliente con un artefacto
    res
      .status(200)
      .json(
        `Registro exitoso: *Estored Interations ${updateInteractionsResult}`
      );
  } catch (error) {
    res.status(500).json("Error, al registrar data");
  }
});

async function validationOfCollection(params) {
  const { client, collectionsName } = await connectToDatabase();
  if (
    !collectionsName.includes(params.shortName) &&
    params.shortName !== "null"
  ) {
    client.close();
    return false;
  }
  client.close();
  return true;
}

/* Funcion que valida si el cliente que esta haciendo una petición ya tiene un objeto en la colección,
recibe un parametro idMoodle: para verificar si existe el objeto.*/
async function userObjectValidation(params) {
  const { client, db, collectionsName } = await connectToDatabase();
  if (!params.idMoodle) {
    return false; //Termina la función por no tener un idMoodle valido
  }
  try {
    const result = await db
      .collection(params.shortName)
      .findOne({ idMoodle: params.idMoodle });
    client.close();

    return result ? true : false;
  } catch (error) {
    client.close();
    console.log(error);
    return false;
  }
}

/* Funcion que inserta la interaccion del cliente, recibe dos parametros_
_la interaccion obtenida desde el req del cliente (array de objetos), el idMoodle_
_el cual se utiliza para filtrar el objeto que se quiere actualizar y la ruta donde se inserta el objeto */
async function updateInteractions(params) {
  if (!params.idMoodle) {
    return;
  }
  const filter = { idMoodle: params.idMoodle };
  let numberOfUpdatedDocuments = 0;
  const allObj = {
    correctArtifacts: 0,
    incorrectArtifacts: 0,
    pageLoading: 0,
    idMoodle: params.idMoodle,
    originMovil: true,
  };
  for (const obj of params.interactions) {
    try {
      const resultValidationOfObj = validationOfObj(obj);

      if (!resultValidationOfObj[0]) {
        continue;
      }

      const path = pathToInsert(obj);
      if (obj.results) {
        obj.validationArtifact = correctArtifact(obj.results);
        const paramsPageStatus = {
          idMoodle: params.idMoodle,
          validationArtifact: obj.validationArtifact,
          obj,
          shortName: params.shortName,
        };

        await pageStatus(paramsPageStatus);
      }

      delete obj.chapter;
      delete obj.page;
      delete obj.artifact;
      obj.originMovil = true;

      const updateDocumentDB = {
        $push: {
          [path]: obj,
        },
        $set: {
          "interactions.lastInteraction": Date.now(),
        },
      };
      try {
        const updateDocumentResult = await updateDocument({
          filter,
          updateDocumentDB,
          shortName: params.shortName,
        });

        switch (obj.typeArtifact) {
          case "Standard":
            if (obj.validationArtifact) {
              allObj.correctArtifacts += 1;
            } else {
              allObj.incorrectArtifacts += 1;
            }
            break;
          case "Load":
            allObj.pageLoading += 1;
            break;
          default:
            break;
        }

        numberOfUpdatedDocuments += updateDocumentResult;
      } catch (error) {
        console.log(error);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  await interactionCounters(allObj);
  console.log(`interactions inserted ${numberOfUpdatedDocuments}`);
  return numberOfUpdatedDocuments;
}

//Funcion que retorna la ruta donde se guarda la carga de una pagina o interaccion con un artefacto.
function pathToInsert(data) {
  // Reemplazar el punto decimal en data.page con un guión bajo _
  const page = data.page.replace(".", "_");
  //Retorna la ruta usando temple string, el cual tiene un operador ternerio para definir la ultima parte .loadPage o .artifact_#
  return `interactions.chapter_${data.chapter}.page_${page}${
    data.typeArtifact === "Load" ? ".loadPage" : `.artifact_${data.artifact}`
  }`;
}

/*Funcion que retorna si la interaccion del artefacto es tru o false, es decir,
si el participante respondio el arterafacto correctamente partiendo de el % impuesto por el evaluador (Umbral)*/
const correctArtifact = (results) => {
  const umbral = 0.7;
  const { correct = 0, incorrect = 0, forAnswer = 0 } = results;
  const artifact =
    correct / (correct + incorrect + forAnswer) >= umbral ? true : false;
  return artifact;
};

const pageStatus = async (params) => {
  if (!params.idMoodle) {
    return; //Termina la función por no tener un idMoodle valido
  }

  //const filter = { idMoodle };
  const artifact = `artifact_${params.obj.artifact}`;
  const page = params.obj.page.replace(".", "_");
  const path = `interactions.chapter_${params.obj.chapter}.page_${page}.statusPage.${artifact}`;

  const filter = {
    idMoodle: params.idMoodle,
    $or: [
      { [path]: { $exists: false } }, //Verifica que la propiedad no exista y procede a crearla
      { [path]: { $eq: false } }, //Verifica que la propidad exista y su valor es false, para actualizarlo
    ],
  };

  const updateDocumentDB = {
    $set: {
      [path]: params.validationArtifact,
    },
  };

  const { db, client } = await connectToDatabase();
  try {
    const update = await db
      .collection(params.shortName)
      .updateOne(filter, updateDocumentDB);
    client.close();
    return update;
  } catch (error) {
    client.close();
    console.log(error);
  }
};

const updateDocument = async (params) => {
  const { db, client } = await connectToDatabase();
  try {
    const updatedOneResult = await db
      .collection(params.shortName)
      .updateOne(params.filter, params.updateDocumentDB);
    client.close();
    return updatedOneResult.modifiedCount;
  } catch (error) {
    client.close();
    console.log(error);
    return 0;
  }
};

const validationOfBody = ({ idMoodle, interactions }) => {
  const resultValidationOfBody = [];
  if (
    idMoodle === null ||
    typeof idMoodle !== "string" ||
    idMoodle.trim() === ""
  ) {
    resultValidationOfBody.push(
      false,
      "Por favor defina la propiedad idMoodle correctamente"
    );
    return resultValidationOfBody;
  }

  if (interactions === null || !interactions?.length) {
    resultValidationOfBody.push(
      false,
      "Por favor defina la propiedad interactions correctamente"
    );
  }
  resultValidationOfBody.push(true, "Validacion del body exitoso");
  return resultValidationOfBody;
};

const validationOfObj = (obj) => {
  const resultValidationOfObj = [];

  if (
    !obj.chapter ||
    typeof obj.chapter !== "string" ||
    obj.chapter.trim() === ""
  ) {
    resultValidationOfObj.push(
      false,
      "Por favor defina la propiedad obj.chapter correctamente"
    );
    return resultValidationOfObj;
  }
  if (!obj.page || typeof obj.page !== "string" || obj.page.trim() === "") {
    resultValidationOfObj.push(
      false,
      "Por favor defina la propiedad obj.page correctamente"
    );
    return resultValidationOfObj;
  }
  if (
    obj.typeArtifact === null ||
    (obj.typeArtifact !== "Load" && obj.typeArtifact !== "Standard")
  ) {
    resultValidationOfObj.push(
      false,
      "Por favor defina la propiedad obj.typeArtifact correctamente"
    );
    return resultValidationOfObj;
  }
  if (obj.typeArtifact === "Load" && (obj.artifact || obj.results)) {
    resultValidationOfObj.push(
      false,
      "Por favor defina la propiedad obj.artifact correctamente"
    );
    return resultValidationOfObj;
  }
  if (
    obj.typeArtifact === "Standard" &&
    (!obj.artifact || typeof obj.artifact !== "number")
  ) {
    resultValidationOfObj.push(
      false,
      "Por favor defina la propiedad obj.artifact correctamente"
    );
    return resultValidationOfObj;
  }
  if (
    obj.typeArtifact === "Standard" &&
    (!obj.results || typeof obj.results !== "object")
  ) {
    resultValidationOfObj.push(
      false,
      "Por favor defina la propiedad obj.results correctamente"
    );
    return resultValidationOfObj;
  }
  resultValidationOfObj.push(true, "Validacion del obj exitoso");
  return resultValidationOfObj;
};

module.exports = router;
