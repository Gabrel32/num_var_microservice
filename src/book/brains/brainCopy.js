const $loading = document.querySelector("#loading"); //Referencia de la section loading
const $container = document.querySelector("#container"); //Referencia del contenedor de los artefactos matematicos
const $viewUrl = $container.getAttribute("data-viewUrl");
const $engineUrl = $container.getAttribute("data-engineUrl");
const $definitionUrl = $container.getAttribute("data-definitionUrl");
let engines = $engineUrl.split(","); //Array de los nombres de los motores
let $idMoodle; //id del usuario en sesion de moodle
let $shortName; //Nombre corto del curso en moodle
let seconds = 0; //Contador de segundos
const ip = "http://172.17.12.39:3030/"; //Aqui se define tu ip y el puerto de tu maquina

const petitionFetch = async (resource, params) => {
  try {
    const paramsRequest = {
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const myRequest = new Request(`${ip}${resource}${params}`, paramsRequest); //Arma el endpoint y el segundo parametro son los atributos de la request
    const response = await fetch(myRequest);
    const data = await response.text();
    return data;
  } catch (error) {
    return error;
  }
};

const view = async () => {
  if ($viewUrl) {
    //Verifica si esta definida en el DOM esta variable
    try {
      const data = await petitionFetch("view/", $viewUrl); //Peticion al microservicio del siguiente archivo
      $container.insertAdjacentHTML("beforeend", data); //Insercion del codigo html al DOM de moodle
    } catch (error) {
      console.error(error);
    }
  } else {
    console.warn("view sin definir");
  }
};

const engine = async () => {
  if ($engineUrl) {
    for (const iterator of engines) {
      //Recorre si existen multiples motores
      try {
        const $scriptEngine = document.createElement("script"); //Crea una etiqueta para insertar el codigo javascript
        let data = await petitionFetch("engine/", iterator); //Peticion del archivo
        $scriptEngine.textContent = data; //insercion del codigo a la etiqueta
        document.head.appendChild($scriptEngine); //Insercion de la etiqueta al DOM
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    return console.warn("engine sin definir");
  }
};

const definition = async () => {
  if ($definitionUrl) {
    const $scriptDefinition = document.createElement("script");
    try {
      const data = await petitionFetch("definition/", $definitionUrl);
      $scriptDefinition.textContent = data;
      document.head.appendChild($scriptDefinition);
    } catch (error) {
      console.error(error);
    }
  } else {
    return console.warn("definition sin definir");
  }
};

(async function (params) {
  await view();
  await engine();
  await definition();
  $loading.setAttribute("hidden", ""); //Oculta la section de loading
  $container.removeAttribute("hidden"); //Muestra la section de los artefactos matematicos
  $idMoodle =
    document.querySelector("#idMoodle")?.getAttribute("data-idMoodle") ?? null; // Obtener el id del usuario de moodle, sino existe lo setea por defecto null
  $shortName =
    document.querySelector("#idMoodle")?.getAttribute("data-shortName") ?? null; // Obtener el nombre corto del curso de moodle, sino existe lo setea por defecto null

  informationUser();
  sendData(params);
  //Temporalizador en segundos
  setInterval(() => {
    seconds++;
  }, 1000);
  //listenerBtnMoodle(); //Ejecuta la funcion que declara el listener de evento
})();

function informationUser(params) {
  const $cedula =
    document.querySelector("#idMoodle")?.getAttribute("data-cedula") ?? null;
  const $telefono =
    document.querySelector("#idMoodle")?.getAttribute("data-telefono") ?? null;
  const $section =
    document.querySelector("#idMoodle")?.getAttribute("data-seccion") ?? null;
  const $firstName =
    document.querySelector("#idMoodle")?.getAttribute("data-firstname") ?? null;
  const $lastName =
    document.querySelector("#idMoodle")?.getAttribute("data-lastname") ?? null;
  const $city =
    document.querySelector("#idMoodle")?.getAttribute("data-city") ?? null;
  const $pais =
    document.querySelector("#idMoodle")?.getAttribute("data-country") ?? null;
  const $email =
    document.querySelector("#idMoodle")?.getAttribute("data-email") ?? null;
  const $userName =
    document.querySelector("#idMoodle")?.getAttribute("data-email") ?? null;

  const personalInformation = {
    firstName: $firstName,
    lastName: $lastName,
    cedula: $cedula,
    section: $section,
    telefono: $telefono,
    email: $email,
    city: $city,
    pais: $pais,
    userName: $userName,
    pasword: "",
  };
  return personalInformation;
}

function numberOfChapterOrPage(params) {
  //Funcion que retorna un dato segun el parametro que le pase (params=0; Retorna el numero del capitulo -- params=1; Retorna el numero de la pagina --  sino tiene parametros retorna un array con ambos datos)
  const regex = /(\d+)/g; //Expresion regular que obtiene los numeros que se encuentra en un string
  let data = $definitionUrl.match(regex); //Array que almacena el numero de capitulo y pagina
  data = data.length > 2 ? [data[0], `${data[1]}.${data[2]}`] : data;
  switch (
    params //Evalua el params recibido para retornar el dato deseado.
  ) {
    case 0:
      return data[0];

    case 1:
      return data[1];

    default:
      return data;
  }
}

function sendData(params) {
  const date = new Date(); // Objeto de fecha
  const endPoint = `${ip}dataBase/:${$shortName}`;

  const personalInformation = informationUser();
  const data = {
    idMoodle: $idMoodle,
    personalInformation,
    interaction: {
      typeArtifact: "Load",
      chapter: numberOfChapterOrPage(0),
      page: numberOfChapterOrPage(1),
      date:
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
      hour: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      ...params,
    },
  };
  if (params) data.interaction.seconds = seconds;

  const paramRequest = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  };

  const myRequest = new Request(endPoint, paramRequest);
  fetch(myRequest)
    .then((res) => res.json())
    .then((res) => {
      console.log("Success " + res);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      seconds = 0;
    });
}

function listenerBtnMoodle() {
  //Declaracion de los escuchadores del evento clic de los botones de moodle
  const $btnNext = document.querySelector("#next-activity-link") ?? false; //Boton next de moodle, sino existe lo setea por defecto "false"
  const $btnPrev = document.querySelector("#prev-activity-link") ?? false; //Boton prev de moodle, sino existe lo setea por defecto "false"
  document.addEventListener("click", (e) => {
    //Escuchador del evento clic y comparacion con los botones prev y next
    if (e.target.id === $btnNext.id) {
      generatorPDF(e); //LLamar funcion que crea y retorna el pdf
    }
    if (e.target.id === $btnPrev.id) {
      generatorPDF(e);
    }
  });
}

function generatorPDF(e) {
  //Generador de pdf
  e.preventDefault(); //Detiene la accion del evento
  const $userFirstname = //Primer nombre del usuario
    document.querySelector("#idMoodle")?.getAttribute("data-firstname") ??
    "Usuario";
  const $userLastname = //Segundo nombre del usuario
    document.querySelector("#idMoodle")?.getAttribute("data-lastname") ??
    "Alcaravan";
  const date = new Date(); // Objeto de fecha

  let url = e.target.getAttribute("href");

  html2canvas($container).then((canvas) => {
    //Canvas para capturar el contenido de la pagina
    const img = canvas.toDataURL("/"); //Transformar el canvas a una imagen
    var doc = new jsPDF(); //Instancia el ojeto de pdf
    doc.setFontSize(10); //Tamaño de letra
    doc.text(10, 10, `Nombre del Usuario: ${$userFirstname} ${$userLastname} `); //Inserción de texto
    doc.text(10, 14, "Libro: Metodos de Graficación Parte 1");
    doc.text(
      10,
      18,
      `Capitulo: ${numberOfChapterOrPage(
        0
      )}  -  Pagina: ${numberOfChapterOrPage(1)}`
    );
    doc.text(
      10,
      22,
      `Fecha: ${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}  -  Hora: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    doc.addImage(img, "JPEG", 10, 24, 200, 250, "imgData", "FAST"); //Inserción de imagen del contenedor
    doc.save(
      `${$userFirstname}-cap${numberOfChapterOrPage(
        0
      )}-pag${numberOfChapterOrPage(1)}.pdf`
    ); //descarga PDF con el nombre: nombre-cap-pag.pdf
    return window.location.replace(url); //Cambia la pagina
  });
}
