function gTime(def, mode = true, reset = true) {
   if (def.statusValidate === undefined) {
      def.statusValidate = false;
   }
   if (!def.statusValidate) {
      if (mode) {
         if (!def.timerState) {
            def.timer = setInterval(function () {
               def.timeInteraction++;
               if (def.debug) {
                  console.log(def.timeInteraction);
               }
            }, 1000);
            def.timerState = true;
         }
      } else {
         if (def.timer) {
            clearInterval(def.timer);
            def.timerState = false;
            if (reset) {
               def.timeInteraction = 0;
               def.statusValidate = true;
            }
         }
      }
   }
}

function loadTemplates() {
   try {
      let tempConfig = document.querySelector("#tmp-config");
      tempConfig.remove();
   } catch (error) {

   }

   let configAlertTemplate = `
  
  
  <template id="tmp-config">
  <div
     class="centerFloat pr-1 pl-1 toggleDisplay divConfig">
     <div class="configTop " >

  

        <p style="margin:0px">Configuraciones</p>
        <button class="btnClose closed buttonKey button-marg"></button>
 
        </div>

     <div class="configBottom"> 
 
           <p style="margin-bottom:10px"> Holgura de la curva</p>


           <div class="w-100  curvesBar buttonOptions d-flex justify-content-around">
          



<button id="curve3">

<img id="curve3" src="../../../assets/cap_2/curve3.svg" alt="hello" style="width:3rem;">
</button>
<button id="curve2">
<img id="curve2" src="../../../assets/cap_2/curve2.svg" alt="hello" style="width:3rem;">
</button>

<button id="curve1" style="margin-bottom:10px">
<img id="curve1" src="../../../assets/cap_2/curve1.svg" alt="hello" style="width:3rem;">
</button>

          
           </div>
           <p style="margin-bottom:10px"> Color de la curva</p>

<div class="row  ">
<div class="col-4 p-0 m-0 d-flex align-items-center ">
<svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M341.6 29.2L240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L482.8 170.4c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4L309.4 335.9l-45.3-45.3L143.4 411.3c-3 3-7.1 4.7-11.3 4.7H96V379.9c0-4.2 1.7-8.3 4.7-11.3L221.4 247.9l-45.3-45.3L55.4 323.3z"/></svg>

</div>

<div class="col-4 p-0 m-0 d-flex align-items-center">
<input class="colorConfig" type="color" name="" id=""> 

</div>

<div class="col-4">
</div>
</div>

    
         
           </div>
  </div>
  </template>
  
  `;
   document.body.insertAdjacentHTML("afterend", configAlertTemplate);





}

loadTemplates();
function gAxies({
   def,
   board,
   axie,
   position,
   values,
   color = "#000000",
} = {}) {
   if (!axie) {
      console.log("ponle una direction valueAxis:{ xd/yd: [[0, 0], [1, 0]],}");
      return;
   }

   const auxAxie = board.create("axis", axie);
   board.create("ticks", [auxAxie, position || false], {
      drawLabels: true,
      labels: values || false,
      label: {
         autoPosition: true,
         offset: [-5, 0],
         anchorX: "middle",
         anchorY: "top",
         visible: true,
      },
      color,
   });

   auxAxie.setAttribute({
      ticks: { visible: false },
   });
}

//points: [{ x: -3, y: 0, visible: true, interactive: true, fixed: true },]
function gAllPointsDefault(params = {}) {
   return params.points.map((p, i) => {
      let point = null;
      if (Array.isArray(p)) {
         point = params.board.create("point", [p[0], p[1]], {
            size: p[4] || 2,
            name: p[3] != undefined ? p[3] : "",
            label: {
               visible: undefined != p[3] && p[3] != "" ? true : false,
               autoPosition: true,
               offset: p[8] ?? [0, 10],
               fontSize: p[7] ?? 14,
            },
            fixed: false,
            visible: p[2] == undefined ? false : p[2],
            fillcolor: typeof p[5] == "string" ? p[5] : p[5] ? "white" : "#D55E00",
            strokeColor: typeof p[5] == "string" ? p[5] : "#D55E00",
            color: typeof p[6] == "string" ? p[6] : null,
            ...p,
         });
      } else {
         point = params.board.create("point", [p.x, p.y], {
            size: 2,
            label: {
               visible: p.name != undefined,
               autoPosition: true,
               offset: [0, 10],
               fontSize: 14,
            },
            fixed: false,
            visible: false,
            fillcolor: "#D55E00",
            strokeColor: "#D55E00",
            ...p,
         });
      }
      point.artifactNumber = params.i;
      point.ignore = params.ignore;
      point.notEliminate = true;
      point.iMod = i;
      point.label.ignore = true;

      if (p.interactive) {
         point.on("down", () => params.callback({ ...params, point, i }));
      }
      return point;
   });
}

function gLineDefault(params = {}) {
   if (!Array.isArray(params.lines)) {
      params.lines = [params.lines];
   }
   return params.lines.map((l) => {
      let pointResult;

      if (
         typeof l.points[0] == "object" &&
         !l.points[0].x &&
         l.points[0].x !== 0
      ) {
         pointResult = l.points;
      } else {
         pointResult = gAllPointsDefault({ ...params, points: l.points });
      }

      const line = params.board.create("line", pointResult, {
         strokeColor: "black",
         fixed: true,
         straightFirst: false,
         straightLast: false,
         firstArrow: false,
         lastArrow: false,
         strokeWidth: 2,
         name: l.name,
         label: {
            visible: l.name,
            autoPosition: true,
         },
         navbar: {
            strokeColor: "blue",
            fillColor: "orange",
            highlightFillColor: "#aaaaaa",
            padding: "2px",
            position: "absolute",
            fontSize: "14px",
            cursor: "pointer",
            zIndex: "100",
            right: "5px",
            bottom: "40px",
         },
         fullscreen: {
            symbol: "\u22c7",
            scale: 0.95,
         },
         precision: {
            touch: 8,
            mouse: 3,
            pen: 5,
            hasPoint: 1,
         },
         ...l,
      });
      line.iMod = params.iMod;
      line.typeCurve = l.typeCurve;
      if (l.name) {
         gTextDefault({ ...params, texts: [l.name] });
      }
      if (l.interactive && params.callback) {
         line.on("down", () => params.callback({ ...params, attractor: line }));
      }
      return line;
   });
}

function gCurveDefault(params = {}) {
   return params.curves.map((c) => {
      const style = {
         strokeColor: "black",
         strokeWidth: 1.5,
         fixed: true,
         label: {
            autoPosition: true,
            visible: true,
         },
         precision: {
            touch: 8,
            mouse: 3,
            pen: 5,
            hasPoint: 1,
         },

         ...c,
      };
      const cAux = params.board.create(
         "cardinalspline",
         [
            gAllPointsDefault({ ...params, points: c.points }),
            c.flex ?? 1,
            "centripetal",
         ],
         style
      );

      if (style?.addToObjet) {
         Object.keys(style.addToObjet).forEach(key => {
            cAux[key] = style.addToObjet[key];
         });
      }

      if (c.name) {
         gTextDefault({ ...params, texts: [c.name] });
      }
      cAux.iMod = params.iMod;
      cAux.typeCurve = c.typeCurve || "curve";
      if (c.interactive) {
         cAux.on("down", () => params.callback({ ...params, attractor: cAux }));
      }
      return cAux;
   });
}

function gPolygon(params = {}) {
   return params.polygons.map((polygon) => {
      if (polygon.name) {
         gTextDefault({ ...params, texts: [polygon.name] });
      }

      return params.board.create("polygon", polygon.points, {
         fixed: true,
         withLines: false,
         fillColor: "grey",
         fillOpacity: 0.1,
         vertices: { visible: false, fixed: true },
         ...polygon.styles,

      });
   });
}

function gArcDefault(params = {}) {
   return params.arcs.map((a) => {
      const arc = params.board.create(
         "arc",
         gAllPointsDefault({ points: a.points, ...params }),
         a.style
      );
      if (a.name) {
         gTextDefault({ ...params, texts: [a.name] });
      }
      if (a.interactive) {
         arc.on("down", () => callback({ ...params, attractor: arc }));
      }
      return arc;
   });
}
function gTextDefault(params = {}) {
   return params.texts.map((t) => {
      const style = {
         fontSize: 20,
         fixed: true,
         ...t.style,
      };
      const text = params.board.create("text", [t.x, t.y, t.text], style);
      if (t.interactive) {
         text.on("down", () =>
            callback[callback["text"] ? "text" : "default"](def, board, id, text)
         );
      }
      text.ignore = true;
      return text;
   });
}
//genera un board pasandole la referencia y las propiedades del board
function gBoard(def, boardSelect, id, style, callback = {}, i, params) {
   callback = {
      default: (def, board, id, ithem) => gFuntionDefault(def, board, id, ithem),
      ...callback,
   };
   const resultObj = {};
   style["reflectionAxie"] = {
      Y: style.reflectionAxie?.Y || false,
      X: style.reflectionAxie?.X || false,
      B: style.reflectionAxie?.B || false,
   };
   let board = JXG.JSXGraph.initBoard(id, {
      label: { visible: false },
      axis: style.axis[0] || false,
      boundingbox: style.boundingbox || [-4, 4, 4, -4],
      maxboundingbox: [-15, 15, 15, -15],
      grid: style.grid || false,
      grid: { strokeColor: !style.grid ? false : "grey" },
      showNavigation: style?.showNavigation ?? false,
      showCopyright: false,
      keyboard: {
         enabled: false,
         dy: 30,
         panShift: true,
         panCtrl: false,
      },
      pan: {
         needTwoFingers: true,
         enabled: false,
         needShift: true,
      },
      showFullscreen: style?.showFullscreen ?? false,
      fullscreen:
         style?.showFullscreen == true
            ? {
               symbol: "\u22c7",
               scale: 0.95,
            }
            : false,
      zoom: {
         needShift: false,
         pinchHorizontal: false,
         pinchVertical: false,
         pinchSensitivity: 0,
         min: 1000,
         max: 0,
         factorX: 0,
         factorY: 0,
         wheel: false,
      },
   });

   JXG.Options.navbar = {
      fillColor: "transparent",
      highlightFillColor: "#aaaaaa",
      padding: "2px",
      position: "absolute",
      fontSize: "18px",

      cursor: "pointer",
      zIndex: "100",
      right: "5px",
      bottom: "5px",
   };

   if (!style.axis[0] && style.axis[1]) {
      gAxies({
         def,
         board,
         axie: style.valueAxis?.xd,
         position: style.valueAxis?.xp,
         values: style.valueAxis?.xv,
         color: style.valueAxis?.colorx,
      });
   }

   if (!style.axis[0] && style.axis[2]) {
      gAxies({
         def,
         board,
         axie: style.valueAxis?.yd,
         position: style.valueAxis?.yp,
         values: style.valueAxis?.yv,
         color: style.valueAxis?.colory,
      });
   }

   const simetriAxies = [
      {
         points: [
            [-8, -8],
            [8, 8],
         ],
         visible: style?.reflectionAxie?.B,
         interactive: false,
         typeCurve: "bisectriz",
         ...style.reflectionAxie.B,
      }, //bisectriz
      {
         points: [
            [-8, 0],
            [8, 0],
         ],
         visible: style?.reflectionAxie?.X,
         interactive: false,
         typeCurve: "eje_x",
         ...style.reflectionAxie.X,
      }, //eje x
      {
         points: [
            [0, -8],
            [0, 8],
         ],
         visible: style?.reflectionAxie?.Y,
         interactive: false,
         typeCurve: "eje_y",
         ...style.reflectionAxie.Y,
      }, // eje Y
   ];

   const reflectionAxie = gLineDefault({
      def,
      board,
      id,
      lines: simetriAxies,
      callback: callback.line || callback.default,
      ...params,
   });
   //agrego los ejes al def
   def.reflectionAxie = {
      axieB: reflectionAxie[0],
      axieX: reflectionAxie[1],
      axieY: reflectionAxie[2],
   };

   //pintar lista de points
   if (boardSelect.points) {
      resultObj.points = gAllPointsDefault({
         callback: callback.point || callback.default,
         def,
         board,
         id,
         points: boardSelect.points,
         i,
         ...params,
      });
   }
   //pintar lista de lineas
   if (boardSelect.lines) {
      resultObj.lines = gLineDefault({
         callback: callback.line || callback.default,
         def,
         board,
         id,
         lines: boardSelect.lines,
         ...params,
      });
   }
   //pintar lista de curvas
   if (boardSelect.curves) {
      resultObj.curves = gCurveDefault({
         callback: callback.curve || callback.default,
         def,
         board,
         id,
         curves: boardSelect.curves,
         ...params,
      });
   }

   //pintar lista de textos
   if (boardSelect.texts) {
      resultObj.texts = gTextDefault({
         callback: callback.text || callback.default,
         def,
         board,
         id,
         texts: boardSelect.texts,
         ...params,
      });
   }

   if (boardSelect.polygons) {
      resultObj.polygon = gPolygon({
         callback: callback.polygon || callback.default,
         def,
         board,
         id,
         polygons: boardSelect.polygons,
         ...params,
      });
   }

   if (boardSelect.arcs) {
      resultObj.arcs = gArcDefault({
         callback: callback.arc || callback.default,
         def,
         board,
         id,
         arcs: boardSelect.arcs,
         ...params,
      });
   }
   if (boardSelect.asymptotes) {
      resultObj.asymptotes = gAsymptotes({
         def,
         asymptotes: boardSelect.asymptotes,
         board,
         ...params,
      });
   }
   return { board, resultObj };
}
//agrega avisos sobre el board
function gAlerts({ def, id, text, type = 1, size = 15, timer = 4 }) {
   if (def.timeAlertCounts == undefined) {
      def.timeAlertCounts = 0;
   }

   if (def.timerAlertState) {
      if (def.textAlert) {
         def.textAlert.remove();
         def.textAlert = null;
      }
      def.timeAlertCounts = 0;
      clearInterval(def.timerAlert);
      def.timerAlertState = false;
   }

   const textAlert = document.createElement("p");
   textAlert.textContent = text;

   textAlert.classList.add(
      type == 1
         ? "passInLibrary"
         : type == 2
            ? "failedInLibrary"
            : "warnInLibrary",
      'gAlert',
      "centerFloat",
   );

   textAlert.width = "fit-content";
   textAlert.maxWidth = '90%';

   if (!def.timerAlertState && type != 1) {
      def.timerAlert = setInterval(function () {
         def.timeAlertCounts++;
         if (def.debug) {
            console.log(def.timeAlertCounts);
         }
         if (timer == def.timeAlertCounts) {
            def.timeAlertCounts = 0;
            clearInterval(def.timerAlert);
            if (def.textAlert) {
               def.textAlert.remove();
               def.textAlert = false;
            }
            def.timerAlertState = false;
         }
      }, 1000);
      def.timerAlertState = true;
   }

   if (textAlert.style.fontSize) {
      console.console.warn('le tone valor a la fuente');
      textAlert.style.fontSize = size + "px";
   };

   if (document.querySelector("#" + id).querySelector('.jxgbox')) {
      const board = document.querySelector("#" + id).querySelector('.jxgbox');
      board.style.display = "grid";
      board.style.placeItems = 'center';
      board.appendChild(textAlert);

   } else {
      document.querySelector("#" + id).appendChild(textAlert);
   };

   def.textAlert = textAlert;
}

function displayConfig(params = {}) {
   if (params.def.divConfig) {
      params.def.divConfig.remove();
      params.def.divConfig = null;
   } else {
      const tmpConfig = document.querySelector("#tmp-config");
      const divConfig = tmpConfig.content.firstElementChild.cloneNode(true);
      // divConfig.querySelector(".rangeConfig").value =
      //   params.def.config?.curves?.flex ?? 1;

      divConfig.querySelector(".buttonOptions").addEventListener('click', (e) => {
         toEdit = params.def.config?.curves;
         toEdit.flex = 2;

         if (e.target.id == 'curve1') {
            toEdit.flex = 1;


         } else if (e.target.id == 'curve2') {
            toEdit.flex = 0.5;

         } else if (e.target.id == 'curve3') {
            toEdit.flex = 0;

         }
      });





      divConfig.querySelector(".colorConfig").value =
         params.def.config?.curves?.color ?? "black";
      document.querySelector("#" + params.id).appendChild(divConfig);
      params.def.divConfig = divConfig;
   }
}

//compara dos valores position  con cierta olgura
function gInterPoint(value, compare, noise = 0.1) {
   if (typeof value === "number" && typeof compare === "number") {
      if (
         parseFloat(value.toFixed(2)) <= parseFloat(compare.toFixed(2)) + noise &&
         parseFloat(value.toFixed(2)) >= parseFloat(compare.toFixed(2)) - noise
      ) {
         return true;
      } else {
         return false;
      }
   } else {
      return false;
   }
}

function gFuntionDefault(n, m, c) {
   console.log(" ************ Default ************* ");
   console.log(n);
   console.log(m);
   console.log(c);
}
//agrega un boton activo a la definicion ademas del toggle visual
function gButtonToggle(
   p = {},
   params = {
      toggleResect: true,
      option: true,
      buttonActive: "buttonActive",
      ...p,
   }
) {
   const { toggleResect, option, button, def, buttonActive, mode } = params;
   if (button != null && def[buttonActive] != button) {
      if (def[buttonActive] != null) {
         def[buttonActive].classList.toggle("buttonDownActive");
      }
      def.mode = mode;

      def[buttonActive] = button;
      if (option) {
         def[buttonActive].classList.toggle("buttonDownActive");
      }
   } else {
      if (def[buttonActive] != null) {
         def[buttonActive].classList.toggle("buttonDownActive");
      }
      if (toggleResect) {
         def.mode = null;
         def.iMod = null;
         if (def[buttonActive] != null) {
            def[buttonActive] = null;
         }
      }
   }
}

//funcion revursiva recorre todo el objeto y sus hijos para retornar un elemento html completo
function gRecurcibeObjectHtml(iteration) {
   const element = document.createElement(iteration.type || "div");
   gSetAttributeDivs(element, iteration);
   if (iteration.chields != undefined) {
      for (const divIter of Object.values(iteration.chields)) {
         element.appendChild(gRecurcibeObjectHtml(divIter));
      }
   }
   return element;
}
//setea los valores id, clases,data set del elemento
function gSetAttributeDivs(element, att) {
   if (att.id) {
      element.setAttribute("id", att.id);
   }

   if (att.attributes) {
      for (const p of Object.keys(att.attributes)) {
         element.setAttribute(p, att.attributes[p]);
      }
   }

   if (att.class) {
      element.className =
         att.class +
         `${att.type == "button" ? " button-marg buttonKey" : ""} 
   ${att.dataSet && -1 != att.dataSet.findIndex((e) => e[0] === "text")
            ? "buttonText"
            : ""
         };
   ${att.dataSet && -1 != att.dataSet.findIndex((e) => e[0] === "tool")
            ? "buttonTool"
            : ""
         }`;
   }
   if (att.title) {
      element.setAttribute("title", att.title);
   }
   if (att.dataSet) {
      att.dataSet.forEach((data) => {
         element.setAttribute("data-" + data[0], data[1]);
      });
   }
   if (att.styles) {
      element.style = att.styles;
   }
   if (att.value) {
      element.value = att.value;
   }
   element.textContent = att.content;
}

function gMakeModal(params) {
   const modalTmp = `
  <div id="myModal" class="modal">
     <!-- Modal content -->
     <div class="modal-content">
         <div class="top-bar" >
           <buttom class="closed close buttonAux"></buttom>
           <H3 id="title-modal">modal default</H3> 
        </div >
        <p id="text-modal">Alcaravan</p>
     </div >
  </div > `;

   document.body.insertAdjacentHTML("afterend", modalTmp);
   const modal = document.getElementById("myModal");
   modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("close")) {
         (() => (modal.style.display = "none"))();
      }
   });
   window.onclick = function (e) {
      if (e.target == modal) {
         modal.style.display = "none";
      }
   };
   return modal;
}

//compara una curva con un array de puntos [[x,y],[x,y],[x,y]]
function gCompareCurves(
   curve,
   points,
   minPoints = 2,
   mode = false,
   noiseY = 0.1,
   noiseX = 0.1,
   interval = [0.2, 0.8]
) {
   if (curve) {
      const allPoints = curve.points;
      const pointsCoord = allPoints.map((item) => {
         //obteniendo array con estructura mas manejable
         return [item.usrCoords[1], item.usrCoords[2]];
      });
      let condIni = null,
         condFinish = null;
      if (minPoints <= points.length) {
         return (
            points.every((coordDefault) => {
               // comparacion de puntos por defecto con puntos de la curva creada por el usuario
               if (!Array.isArray(coordDefault)) {
                  coordDefault = [coordDefault.X(), coordDefault.Y()];
               }
               const coordCurveUsr = pointsCoord.findIndex((item) => {
                  //busca un elemento que coinsida
                  return (
                     item[0] > coordDefault[0] - noiseX &&
                     item[0] < coordDefault[0] + noiseX &&
                     item[1] > coordDefault[1] - noiseY &&
                     item[1] < coordDefault[1] + noiseY
                  );
               });

               if (
                  mode.first ||
                  mode ||
                  coordCurveUsr < Math.round(pointsCoord.length * interval[0])
               ) {
                  //compara que al menos 1 de esos indices este por debajo del  20% de la curva
                  condIni = true;
               }

               if (
                  mode.last ||
                  mode ||
                  coordCurveUsr > Math.round(pointsCoord.length * interval[1])
               ) {
                  //compara que al menos 1 de esos indices este por encima del 80% de la curva
                  condFinish = true;
               }
               return coordCurveUsr != -1;
            }) &&
            condIni === true &&
            condFinish === true
         );
      } else {
         return false;
      }
   }
}

function gAddPoint(def, board, color = "#D55E00", anchor) {
   const remove = [];
   let coords = board.getUsrCoordsOfMouse(),
      x = coords[0],
      y = def.mode == 5 ? 0 : coords[1];

   if (def.curves === undefined || def.points === undefined) {
      def.points = [[]];
      def.curves = [];
   }

   if (def.mode != 5 && (def.maxCurves <= def.curves.length || def.mode != 4)) {
      return;
   }

   if (siteMode === undefined) {
      var siteMode = "desktop";
   }
   const elementIn = board.getAllUnderMouse();

   if (
      elementIn.findIndex((p) => {
         if (anchor?.type != "asymptote" && p.type === "asymptote") { anchor = p; };
         return (!Array.isArray(p) && (["glider", "point"].includes(p.elType)));

      }) !== -1
   ) { return; }

   const positionPoint = anchor ? [x, y, anchor] : [x, y];
   const size = siteMode == "desktop" ? 2.5 : 4;
   const visible = def.mode === 5;

   const pointData = board.create(anchor ? "glider" : "point", positionPoint, {
      visible: true,
      size,
      color,
      opacity: 0.8,
      name: "",
      fixed: false,
      isDraggable: false,
      anchor,
   });

   if (anchor) {
      anchor.pointsData.push(pointData);
      const indexA = anchor.pointsData.length - 1;
      remove.push({ element: pointData, from: anchor.pointsData, index: indexA });
   }
   pointData.mode = def.mode;
   pointData.setAttribute({
      visible: () => {
         return (
            anchor ||
            (def.mode === 4 && !visible) ||
            def.mode === pointData.mode ||
            def.mode == 6
         );
      },
   });
   if (def.mode == 5 && def.conditions?.asymptotes) {
      const line = gLineDefault({
         board,
         lines: {
            points: [
               [() => pointData.X(), -20],
               [() => pointData.X(), 20],
            ],
            ...{ dash: 2, ...def.conditions?.asymptotes },
         },
      })[0];
      pointData;
      line.type = "asymptote";
      line.pointsData = [];

      line.on("down", () => {
         if (
            (def.conditions?.asymptotes?.addpoints && def.mode == 4) ||
            def.conditions?.asymptotes?.positionY
         ) {
            gAddPoint(def, board, color, line);
         }
      });

      //evita que el desplazamiento del punto en el eje y
      board.on("move", function () {
         pointData.moveTo([pointData.X(), y]);
      });
      def.asymptotes.push([pointData, line]);
      def.other.push(line);

      const indexA = def.asymptotes.length - 1;
      remove.push({
         element: [pointData, line],
         from: def.asymptotes,
         index: indexA,
      });

      const indexB = def.other.length - 1;
      remove.push({ element: line, from: def.other, index: indexB });
   } else {
      def.points.at(-1).push(pointData);
      const index = def.points.at(-1).length - 1;
      remove.push({ element: pointData, from: def.points.at(-1), index });
   }

   if (def.mode == 4 && def.conditions?.road?.curve?.same || def.conditions?.others?.curve?.same) {
      console.log('entra');
      const b = def.reflectionAxie.axieB;
      const tranf = board.create("transform", [b], { type: "reflect" });
      const samepoint = board.create("point", [pointData, tranf], {
         name: "",
         color: "green",
         visible: () => def.debug && def.mode == 4,
      });
      def.samePoints.at(-1).push(samepoint);

      const samePosition = def.samePoints.at(-1).length - 1;
      remove.push({
         element: samepoint,
         from: def.samePoints.at(-1),
         index: samePosition,
      });
      board.update();
   }
   def.other.push(pointData);
   const otherPosition = def.other.length - 1;
   remove.push({ element: pointData, from: def.other, index: otherPosition });
   pointData.label.ignore = true;
   def.memory.push(remove);
}

function gAddCurv(def, board, points = false, mode = true) {
   const remove = [];
   if (siteMode === undefined) {
      var siteMode = "desktop";
   }

   const size = siteMode == "desktop" ? 2.5 : 3;
   if (
      def.maxCurves <= def.curves.length ||
      (!points && (!def.points.at(-1) || def.points.at(-1).length < 2))
   ) {
      return;
   }
   if (def.curveMod?.sort ?? mode) {
      def.points[def.points.length - 1].sort(
         (e, f) => e.coords.usrCoords[1] - f.coords.usrCoords[1]
      );
   }

   let curvepoints = !points
      ? def.points.at(-1).map((e) => e)
      : points.map((e) => e);
   let curva = board.create(
      "cardinalspline",
      [curvepoints, def.config?.curves?.flex ?? 1, "centripetal"],
      {
         strokeColor: def.config?.curves?.color ?? def.curveMod?.color,
         strokeWidth: size,
      }
   );

   curva.interactive = true;
   board.update();
   /////////////////////////////////// direccionar al def /////////////////////////////////////////
   if (!points) {
      def.samePoints.push([]);
      const index1 = def.samePoints.length - 1;
      const element1 = def.samePoints.at(-1);
      remove.push({ element: element1, from: def.samePoints, index: index1 });

      def.curves.push(curva);
      const index2 = def.curves.length - 1;
      remove.push({ element: curva, from: def.curves, index: index2 });
      def.points.push([]);

      const index3 = def.points.length - 1;
      const element3 = def.points.at(-1);
      remove.push({ element: element3, from: def.points, index: index3 });
   }

   def.memory.push(remove);
   return curva;
}

function gExtractCoords(p) {
   return [parseFloat(p.X().toFixed(3)), parseFloat(p.Y().toFixed(3))];
}

function gHelpMsg(def, artifact, ref) {
   //funcion para desplegar un panel dentro del board
   const fragmen = new DocumentFragment("div");
   const btnAll = artifact.querySelector(`.btn-all`);
   const content =
      typeof def.helpMsg === "object"
         ? def.helpMsg
         : 'Trabajo Realizado "Por el derecho a comprender"';
   const msg = `<div class="etwArtifact__help-msg" id="${ref}-helpMsg">
                 <div class="etwArtifact__help-msg-content">
                    <div class="etwArtifact__help-msg-btnClose-container">
                       <button class="etwArtifact__help-msg-btnClose btnCloseMsg button-marg buttonTertiary buttonKey" id="${ref}-closeMsg"></button>
                    </div>
                    <div class="etwArtifact__help-msg-textHelp" id="${ref}-containerHelpMsg"></div>
                    </div>
              </div>`;
   const div = document.createElement("div");
   div.style.position = "relative";
   div.classList.add("div-text-help");

   div.style = `  
   height: 100%!important;
   min-height: 100%; 
   position: absolute; 
   top: 0; 
   right: 0; 
   bottom: 0;
   width: 100%;
   display:none;
   `;

   fragmen.appendChild(div);
   div.insertAdjacentHTML("afterbegin", msg);
   const artifactMsg = fragmen.getElementById(`${ref}-helpMsg`);
   const textContainer = fragmen.getElementById(`${ref}-containerHelpMsg`);
   const btnCloseMsg = fragmen.getElementById(`${ref}-closeMsg`);

   if (content.addHtml === true) {
      textContainer.insertAdjacentHTML("afterend", content.html);
   } else {
      let contentTitle = document.createElement("h3");
      let contentText = document.createElement("p");

      contentText.style.marginTop = content.marginTop || "24px";
      contentText.style.fontSize = content.fontSize || "16px";
      contentTitle.appendChild(
         document.createTextNode(content.title ?? "<insertar titulo>")
      );
      contentText.appendChild(
         document.createTextNode(content.text ?? "<insertar texto en definicion>")
      );
      textContainer.appendChild(contentTitle);
      textContainer.appendChild(contentText);
   }

   artifact.insertBefore(fragmen, artifact.children[0]);
   btnAll.addEventListener("click", (e) => {
      if (
         e.target.classList.contains("help") ||
         e.target.classList.contains("help-btn")
      ) {
         div.style.display = "block";
         setTimeout(() => {
            artifactMsg.style.transform = "translate(0%)";
         }, 100);
      }
   });

   btnCloseMsg.addEventListener("click", () => {
      artifactMsg.style.transform = "translate(-100%)";
      setTimeout(() => {
         div.style.display = "none";
      }, 1000);
   });
}

function gOperationCurves(
   p = {},
   params = { strokeColor: "blue", positionline: -4, noise: 8, type: 1, ...p }
) {
   let { curve_1, curve_2 } = params;

   let pointCurve_1 = curve_1.points[0].usrCoords.slice(1);
   let pointCurve_2 = curve_2.points[0].usrCoords.slice(1);
   let pointLastCurve_1 = curve_1.points[
      curve_1.points.length - 1
   ].usrCoords.slice(1);
   let pointLastCurve_2 = curve_2.points[
      curve_2.points.length - 1
   ].usrCoords.slice(1);
   const boardDimentions = params.board.attr.boundingbox;
   const board = params.board;
   const arrayOut = [];
   const boardLength =
      boardDimentions[0] < 0 && boardDimentions[2] > 0
         ? Math.abs(boardDimentions[0]) + Math.abs(boardDimentions[2])
         : boardDimentions[0] > 0 && boardDimentions[2] > 0
            ? (boardLength = boardDimentions[0] - boardDimentions[2])
            : 1;

   const divitions = (params?.noise ?? 5) * boardLength;
   const min = Math.abs(boardLength / divitions);

   const p1 = [Math.max(pointCurve_1[0], pointCurve_2[0]), boardDimentions[1]];
   const p2 = [Math.max(pointCurve_1[0], pointCurve_2[0]), boardDimentions[3]];

   const p3 = [
      Math.min(pointLastCurve_1[1], pointLastCurve_2[0]),
      boardDimentions[1],
   ];
   const p4 = [
      Math.min(pointLastCurve_1[0], pointLastCurve_2[0]),
      boardDimentions[3],
   ];

   const line = params.board.create("line", [p1, p2], {
      visible: params.def.debug,
      straightFirst: false,
      straightLast: false,
      highlight: false,
      strokeColor: "red",
   });

   const newPoint1 = board.create("intersection", [params.curve_1, line, 0], {
      visible: false,
   });
   const newPoint2 = board.create("intersection", [params.curve_2, line, 0], {
      visible: false,
   });

   travelCurve({
      ...params,
      newPoint1,
      newPoint2,
      arrayOut,
      board,
      divitions,
      line,
      min,
   });

   line.point1.setPositionDirectly(JXG.COORDS_BY_USER, [p3, line.point1.Y()]);
   line.point2.setPositionDirectly(JXG.COORDS_BY_USER, [p4, line.point2.Y()]);
   board.update();
   arrayOut.push(
      operationCurves({ ...params, newPoint1, newPoint2, arrayOut, board })
   );

   const resultCurv = board.create(
      "cardinalspline",
      [arrayOut, params.def.config?.curves?.flex ?? 1, "centripetal"],
      { visible: params.def.debug, strokeColor: "green", strokeWidth: 3 }
   );
   return [resultCurv, arrayOut];
}

function travelCurve(params = {}) {
   let { divitions, line, board, newPoint1, newPoint2, arrayOut, min } = params;

   for (var i = 0; i < divitions; i++) {
      if (!Number.isNaN(newPoint1.X()) && !Number.isNaN(newPoint2.X())) {
         line.point1.setPositionDirectly(JXG.COORDS_BY_USER, [
            line.point2.X() + (i == 0 ? 0 : min),
            line.point1.Y(),
         ]);
         line.point2.setPositionDirectly(JXG.COORDS_BY_USER, [
            line.point2.X() + (i == 0 ? 0 : min),
            line.point2.Y(),
         ]);

         arrayOut.push(
            operationCurves({ ...params, newPoint1, newPoint2, arrayOut, board })
         );
      } else {
         break;
      }

      board.update();
   }
}

function operationCurves(params = {}) {
   let { newPoint1, newPoint2, type, board } = params;

   if (!Number.isNaN(newPoint1.X()) && !Number.isNaN(newPoint2.X())) {
      //el ternario solo afecta al eje y ya que es donde se aplicac la operacion
      let operation;
      switch (type) {
         case 1:
            operation = newPoint1.Y() + newPoint2.Y();
            break;
         case 2:
            operation = newPoint1.Y() * newPoint2.Y();
            break;
         case 3:
            operation = newPoint1.Y() - newPoint2.Y();
            break;
         case 4:
            operation = newPoint1.Y() / newPoint2.Y();
            break;
         default:
            operation = 0;
            break;
      }

      return board.create("point", [newPoint1.X(), operation], {
         visible: false,
         color: "blue",
         name: "",
         size: 1,
      });
   }
}

// Esta es una funcion de distancia si los puntos son visibles no es necesario por que la
//libreria usa el metodo Dist que hace la misma funcion pero al no estar visibles el metodo no funciona;
//esta funcion resibe dos puntos o un array de par ordenado ejemplo gDist(p1, p2) o gDist([2,1], [1,1])
function gDist(p1, p2) {
   if ((p1 && p2) || (p1 && p2 && p1?.X() && p2?.X())) {
      const x = Math.pow(
         (Array.isArray(p1) ? p1[0] : p1.X()) -
         (Array.isArray(p2) ? p2[0] : p2.X()),
         2
      );
      const y = Math.pow(
         (Array.isArray(p1) ? p1[1] : p1.Y()) -
         (Array.isArray(p2) ? p2[1] : p2.Y()),
         2
      );
      return Math.sqrt(x + y);
   } else {
      return null;
   }
}


function gTextToLatex(text = "") {
   return text
      .replace(/[\) 　]/g, "")
      .replace("(", "")
      .split(",(")
      .map((p) => {
         if (p.match(/[\/]/g)) {
            return `(${p
               .split(",")
               .map((text) =>
                  text.match(/[\/]/g) ? `\\frac{${text.replace("/", "}{")}}` : text
               )
               .join(",")})`;
         } else {
            return `(${p.replace(/π/g, "\\pi")})`;
         }
      })
      .join();
}

function gAsymptotes(
   p,
   params = { ...p },
   { def, board, asymptotes } = params
) {
   const boxDimention = board.attr.boundingbox;
   if (asymptotes.length > 0) {
      return asymptotes.map((asyn) => {
         const asymptote = gLineDefault({
            board,
            lines: {
               points: [
                  { x: asyn.x, y: boxDimention[1], ...asyn?.style?.point },
                  { x: asyn.x, y: boxDimention[3], ...asyn?.style?.point },
               ],
               ...{ dash: 2, ...asyn.style },
            },
         })[0];
         asymptote.pointsData = [];
         asymptote.type = "asymptote";
         return [Object.values(asymptote.ancestors)[0], asymptote];
      });
   }
}

function gStyleMath(pointLatex) {
   pointLatex._mathfield.element.style.width = "100%";
   pointLatex._mathfield.element.style.height = "100%";
   pointLatex._mathfield.element.childNodes[1].style.cssText =
      "justify-content: center;";
   pointLatex._mathfield.element.childNodes[1].childNodes[0].style.cssText =
      "justify-content: center; font-weight: bolder;";

   pointLatex.addEventListener("focus", (e) => {
      document.querySelectorAll("math-field").forEach((element) => {
         element.blur();
      });
   });
}
