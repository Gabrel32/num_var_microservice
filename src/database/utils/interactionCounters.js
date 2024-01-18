const config = require("config");
const connectToDatabase = require("./mongodb");
const collectionMongo = config.get("alcaravan.collectionCounters");
const collection = config.get("alcaravan.collection");
async function interactionCounters(dataUser) {
   if (!dataUser) {
      console.log("Error de count");
      return;
   }
   try {
      await countersInteractionArtifacts(dataUser);
   } catch (error) {
      console.log(">> Error al contar " + error);
   }
   return;
}

async function countersInteractionArtifacts(interaccion) {
   const { client, db } = await connectToDatabase();
   const objMongo = await db
      .collection(collection)
      .findOne({ idMoodle: interaccion.idMoodle });
   client.close();
   const origin = interaccion.originMovil
      ? "appInteractions"
      : "webInteractions";

   if (!objMongo.personalInformation.rol) {
      return console.log("Objeto no encontrado");
   }
   const { incorrectArtifacts, correctArtifacts, pageLoading } = interaccion;

   switch (objMongo.personalInformation.rol) {
      case "estudiante_bachiller":
         try {
            const filter = { instance: "liceos" };
            const objLiceo = await db.collection(collectionMongo).findOne(filter);

            if (objLiceo) {
               const { rol, municipio, parroquia, liceo } =
                  objMongo.personalInformation;
               const filter = { rol, municipio, parroquia, liceo };
               const template = {
                  filter,
                  origin,
               };
               if (incorrectArtifacts > 0) {
                  updateInteraction({
                     ...template,
                     count: incorrectArtifacts,
                     type: "incorrectArtifacts",
                  });
               }
               if (correctArtifacts > 0) {
                  updateInteraction({ ...template, count: correctArtifacts });
               }
               if (pageLoading > 0) {
                  updateInteraction({
                     ...template,
                     count: pageLoading,
                     type: "pageLoading",
                  });
               }
            } else {
               console.log("Objetos de liceo no encontrado");
            }
         } catch (error) {
            console.log("Error al contar interaccion de liceos " + error);
         }
         break;

      case "estudiante_universidad":
         try {
            const getDocument = await db
               .collection(collectionMongo)
               .findOne({ instance: "universidades" });
            if (getDocument) {
               const { universidad } = objMongo.personalInformation;

               const template = {
                  arrayFilters: [],
                  field: { "universidades.name": universidad },
                  query: `universidades.$`,
                  count: incorrectArtifacts,
                  origin,
               };
               if (incorrectArtifacts > 0) {
                  updateInteraction({
                     ...template,
                     count: incorrectArtifacts,
                     type: "incorrectArtifacts",
                  });
               }
               if (correctArtifacts > 0) {
                  updateInteraction({
                     ...template,
                     count: correctArtifacts,
                  });
               }
               if (pageLoading > 0) {
                  updateInteraction({
                     ...template,
                     count: pageLoading,
                     type: "pageLoading",
                  });
               }
               return;
            } else {
               console.log("Objeto 'universidades' no encontrado");
            }
         } catch (error) {
            console.log("Error del contador de interaction universidad: " + error);
         }
         break;

      case "visitante":
         try {
            const getDocument = await db
               .collection(collectionMongo)
               .findOne({ instance: "visitante" });

            if (!getDocument) {
               return console.log("Documento no encontrado");
            }

            const template = {
               arrayFilters: [],
               field: { instance: "visitante" },
               query: "",
               count: incorrectArtifacts,
               origin,
            };
            if (incorrectArtifacts > 0) {
               updateInteraction({
                  ...template,
                  count: incorrectArtifacts,
                  type: "incorrectArtifacts",
               });
            }
            if (correctArtifacts > 0) {
               updateInteraction({
                  ...template,
                  count: correctArtifacts,
               });
            }
            if (pageLoading > 0) {
               updateInteraction({
                  ...template,
                  count: pageLoading,
                  type: "pageLoading",
               });
            }
            return console.log("sendData visitante +1");
         } catch (error) {
            await client.close();
            console.log("Error al contar interaction visitante: " + error);
         }
         break;

      default:
         break;
   }
   return; /* await client.close(); */
}

async function updateInteraction({
   filter,
   count = 1,
   field = {
      "municipios.name": filter?.municipio,
      "municipios.parroquias": {
         $elemMatch: {
            name: filter?.parroquia,
            "liceos.name": filter?.liceo,
         },
      },
   },
   arrayFilters = [
      { "elem.name": filter?.municipio },
      { "parroquia.name": filter?.parroquia },
      { "liceo.name": filter?.liceo },
   ],
   type = "correctArtifacts",
   origin = "webInteractions",
   query = `municipios.$[elem].parroquias.$[parroquia].liceos.$[liceo]`,
}) {
   query = `${query}.${origin}.${type}`.replace(/^\./g, "");

   const { client, db } = await connectToDatabase();
   db.collection(collectionMongo)
      .updateOne(field, { $inc: { [query]: count } }, { arrayFilters })
      .then((result) => {
         client.close();
      })
      .catch((error) => {
         client.close();
         console.error(error);
      });
}
module.exports = interactionCounters;
