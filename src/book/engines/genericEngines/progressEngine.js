/* 
 <div class="referencePosition">
    <div class="progressContainer">
        <span class="user progressBarTilte">Progreso de Página</span>
        <div class="contentProgress" style="display: flex; ">
            <div class="progressElement" data-type="general"></div>
            <div>
                <div class="progressElement" data-type="listSucces">
                </div>
                <button class="moreList ">
                    <div class="showMoreBtn__icon upIcon"></div>
                </button>
            </div>
        </div>
        <div class="progressBarText">
            <span>Recargue la pagina para saber el progreso actualizado</span>
        </div>
        <button class="minContent">
            <div class="showMoreBtn__icon upIcon upIcon--white rotate"></div>
        </button>


    </div>
</div>
*/

class ProgressCircle {
  constructor(informationUser) {
    this.nodeParent = null;
    this.countStart = 0;
    this.currentProgress = 0;
    this.userInformation = informationUser;
    //this.getValue()
  }

  setNode(node) {
    this.nodeParent = node;

    const element = `
          <div class="progressBar">
          <div class="progressBar__circle">
              <span class="progressBar__number">0%</span>
          </div>
         
           </div>
          `;
    this.nodeParent.insertAdjacentHTML("afterbegin", element);
  }

  updateProgress(percent) {
    setInterval(() => {
      if (this.currentProgress > percent) {
        clearInterval();
      } else {
        this.nodeParent.querySelector(
          ".progressBar"
        ).style.background = `conic-gradient(#00ff11 ${
          this.currentProgress * 3.6
        }deg, #fff 0deg)`;
        this.nodeParent.querySelector(
          ".progressBar__number"
        ).textContent = `${this.currentProgress}%`;
        this.currentProgress += 1;
        //console.log(this.currentProgress);
      }
    }, 50);
  }

  //:::::::::::::::::::::::::::::::||funcion dejada para cuando sea dinamico||:::::::::::::::::::::::::::::::::::::::::::

  /* async getValue(){
          let percent = 20
          try{
              const options = {
                  idMoodle:this.userInformation.idMoodle,
                  shortName: this.userInformation.shortName,
                  chapter: this.userInformation.chapter
              }
              const result = await fetch('https://unerg.alcaravan.com.ve:3031/movil/sync',{
                  method:'POST',
                  headers: {
                      "Content-Type": "application/json"
                    },
                  body:JSON.stringify(options)
              }) 
              
              const data = await result.json()    
             
             
              const informationPage = data[`${this.userInformation.chapter}`][this.userInformation.page]
              const {numberArtifacts,artifactsFalse,artifactsTrue} = informationPage
  
              console.log(parseInt(numberArtifacts),artifactsFalse.length,artifactsTrue.length);
              console.log('data: ', informationPage);
              const succesPercent = artifactsTrue.length / parseInt(numberArtifacts) * 100
              console.log('porcentaje de correctos: ',succesPercent, '%');
              percent = succesPercent
          }catch(e){
              console.warn('ERROR EN LA PETICION:   ',e)
          }
   
          this.updateProgress(percent)
          return null
      } */
}
/* 
 <script type="module">
      const respMovile = typeof Android !== 'undefined' ? JSON.parse(Android.capPage()) : null;
      const respDefault = {
         pag: 'pag_1',
         cap: '2',
         ejs: `<h1> hay dios amigo esta por defecto</h1>`,
         ...respMovile
      };


      respDefault.ejs = respDefault.ejs.replace(/\\/gi, '');
      respDefault.ejs = respDefault.ejs.replace(/<\s+/g, "<");

      const ejsclean = JSON.parse(JSON.stringify(respDefault));
      console.log(ejsclean.ejs.replace(/\\/gi, '').replace(/<\s+/g, "<"));

      async function initPage(respMovile) {
         const pagina = respMovile.ejs; //await obtenerPagina(respMovile);
         if (!pagina) {
            console.warn('error en la ruta de la pagina');
         }
         const $container = document.querySelector('.main');
         $container.insertAdjacentHTML("beforeend", pagina);
         const script = document.createElement('script');
         script.setAttribute('src', `../../../dist/definitions/cap_${respMovile.cap}/${respMovile.pag}.js`);

         document.body.appendChild(script);
      };
      initPage(respDefault); // Llama a la función para obtener la página
   </script>

*/


async function generateProgress(dataElements = "") {
  if (typeof window.Android !== "undefined") {
    console.log("-- mobile option --");
    let data = null
   // const artifactsTrue = dataElements?.split("//");
   if(typeof dataElements == 'string') data = JSON.parse(dataJson)
   else data = dataElements
   
   //const params = JSON.parse(dataJson)

    const {artifactsTrue} = data

    if (!artifactsTrue) {
      return;
    }
    artifactsTrue.forEach((nameArtifact) => {
      createProgressBorder(nameArtifact);
    });
  } else {
    let dataMicroserviceURL =
      document
        .querySelector("#idMoodle")
        ?.dataset?.microservice?.replace(/[ ]/g, "") ?? false;
    console.log(dataMicroserviceURL);
    if (!dataMicroserviceURL) {
      return;
    }
    const data = await petition(`${dataMicroserviceURL}/movil/sync`);

    if (data.error) {
      throw data.error;
    }

    const { artifactsTrue, numberArtifacts } = data;
    const generalProgress =
      (artifactsTrue.length / parseInt(numberArtifacts)) * 100;

    createProgressCard(generalProgress, artifactsTrue);

    artifactsTrue.forEach((nameArtifact) => {
      createProgressBorder(nameArtifact);
    });
  }
}

function createProgressBorder(nameArtifact) {
  const element = seachElement(nameArtifact);
  if (element !== null) {
    element.classList.add("artifactTrue");
  }
  return true;
}

function createProgressCard(generalProgress, artifactsTrue) {
  const template = `<div class="referencePosition">
      <div class="progressContainer">
          <span class="user progressBarTilte">Progreso de Página</span>
          <div class="contentProgress" >
              <div class="progressElement progressCircle" data-type="general"></div>
              <div>
                  <div class="progressElement" data-type="listSucces">
                  </div>
                  <button class="moreList ">
                      <div class="showMoreBtn__icon upIcon"></div>
                  </button>
              </div>
          </div>
          <div>
              <span>Recargue la pagina para saber el progreso actualizado</span>
          </div>
          <button class="minContent">
              <div class="showMoreBtn__icon upIcon upIcon--white rotate"></div>
          </button>
  
      </div>
  </div>`;

  const container = document.querySelector(".cardProgress");

  if (container === null) {
    return null;
  }

  container.insertAdjacentHTML("afterbegin", template);
  const containerElement = document.querySelector(".progressContainer");
  containerElement.style.display = "flex";
  const btnMoreSucces = document.querySelector(".moreList");
  const btnMin = document.querySelector(".minContent");
  const listSucces = document.querySelector(
    `.progressElement[data-type = 'listSucces']`
  );
  const iconBtn = document.querySelector(".showMoreBtn__icon");
  const minContent = document.querySelector(".contentProgress");

  btnMoreSucces.addEventListener("click", (e) => {
    e.preventDefault();
    listSucces.classList.toggle("heightAuto");
    iconBtn.classList.toggle("rotate");
  });

  btnMin.addEventListener("click", (e) => {
    minContent.classList.toggle("minContentProgrees");
    btnMin.querySelector(".showMoreBtn__icon").classList.toggle("rotate");
  });

  window.addEventListener("scroll", () => {
    const aux = containerElement.getBoundingClientRect();
    if (aux.y < 1) {
      containerElement.classList.add("fixedBar");
    } else if (
      containerElement.classList.contains("fixedBar") &&
      document.querySelector(".referencePosition").getBoundingClientRect().y > 1
    ) {
      containerElement.classList.remove("fixedBar");
    }
  });

  const progressCircleObject = new ProgressCircle();
  progressCircleObject.setNode(document.querySelector(".progressCircle"));
  progressCircleObject.updateProgress(generalProgress);

  listSucces.appendChild(createListSucces(artifactsTrue));
  return true;
}

function createListSucces(artifactsTrue) {
  const fragment = new DocumentFragment();
  artifactsTrue.sort();
  artifactsTrue.forEach((nameArtifact, index) => {
    const div = document.createElement("div");
    const link = document.createElement("a");

    div.classList.add("successArtifact__item");
    link.href = `#${nameArtifact}`;

    link.textContent = nameArtifact.replace("artifact_", "Artefacto ");

    div.appendChild(link);
    fragment.appendChild(div);
  });

  return fragment;
}

async function petition(endPoint) {
  const nodeUser = document.querySelector("#idMoodle");

  if (nodeUser == null) {
    return {
      error: "no hay contenedor con los datos para la petición",
      response: null,
    };
  }

  const containerPage = document.querySelector("#container");
  const definitionUrl = containerPage.getAttribute("data-definitionUrl");
  const parseInfo = definitionUrl.split("/");
  const chapter = parseInfo[0].replace(":cap", "chapter");

  const options = {
    idMoodle: nodeUser?.dataset?.idmoodle,
    shortName: nodeUser?.dataset?.shortname.replace(" ", ""),
    chapter,
  };

  try {
    const result = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    if (result.ok) {
      const data = await result?.json();
      const page = parseInfo[1].replace(":pag", "page");
      const informationPage = data[`${chapter}`][page] ?? null;

      return informationPage;
    }
  } catch {
    return {
      error: "error, la petición no pudo ser realizada",
      response: null,
    };
  }
}

function seachElement(nameArtifact) {
  let element = null;
  const selectors = [".", "#"];
  const dataSets = ["artifact", "ejercicio"];

    const elementDom = document.querySelector(`.${nameArtifact}, #${nameArtifact}`);
    element = elementDom !== null ? elementDom : element;
 

  if (element === null) {
    const elementDom = document.querySelector(
      `[data-artifact=${nameArtifact}],[data-ejercicio=${nameArtifact}]`
    );
    element = elementDom !== null ? elementDom : element;
  }

  if (element !== null) return element;
  return null;
}

//window.Android = {} //descomenta para pasar a version mobile

const interval = setInterval((e) => {
  if (seachElement("artifact_1")) {
    if (typeof window.Android == "undefined") {
      console.log("-- Loaded the Artifact --");
      generateProgress();
      clearInterval(interval);
    }
  }
}, 200);
