/**
 *@param {Object} definition
     * Clase que genera un tablero de dibujo con métodos para crear: 
     - Propiedades de caracteristicas del board
      - points 
      - lines
      - curves 
      - polygons
      - ellipses
     */
      class baseBoards {
        constructor(definition) {
          const {
            points = [],
            curves = [],
            polygons = [],
            ellipses = [],
            arcs = [],
            lines = [],
            inputs = [],
          } = definition;
          this.board = this.initBoardBase(definition); //JXG.JSXGraph.initBoard(definition.container, definition.attributes);
          if (!this.board) {
            console.error("ID no identificado definir un id en el objeto enviado");
            return;
          }
      
          this.pointsDefault = this.createPoints({ points });
          this.linesDefault = this.createLines({ lines });
          this.curvesDefault = this.createCurves({ curves });
          this.polygonsDefault = this.createPolygons({ polygons });
          // this.ellipsesDefault = this.createEllipses({ ellipses });
          this.arcsDefault = this.createArcs({ arcs });
          this.inputsDefault = this.createInputs({ inputs });
        }
      
        initBoardBase(definition) {
          const { id = definition?.id ?? "jxgbox", styles } = definition;
          if (!document.getElementById(id)) {
            return;
          }
      
          const style = {
            label: { visible: false },
            axis: styles?.axis ?? true,
            boundingbox: styles?.boundingbox ?? [-4, 4, 4, -4],
            maxboundingbox: styles?.maxboundingbox ?? [-15, 15, 15, -15],
            grid: false,
            showNavigation: styles?.showNavigation ?? false,
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
            showFullscreen: styles?.showFullscreen ?? false,
            fullscreen:
              styles?.showFullscreen == true
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
            reflectionAxie: {
              Y: styles?.reflectionAxie?.Y ?? false,
              X: styles?.reflectionAxie?.X ?? false,
              B: styles?.reflectionAxie?.B ?? false,
            },
            ...styles,
            defaultAxes: {
              y: {
                name: "Y",
                strokeWidth: 1.3,
                strokeColor: "black",
                visible: styles?.axies?.y?.visible ?? true,
                ticks: {
                  strokeColor: "grey",
                  minorTicks: 0,
                  visible:
                    styles?.grids?.y?.visible ||
                    (!styles?.grids?.y?.visible !== false &&
                      styles?.axies?.y?.visible),
                  drawZero:
                    styles?.axies != undefined && styles?.axies?.x?.visible == false
                      ? true
                      : false,
                  label: {
                    visible: ((styles?.axies?.y?.visible ?? false) || (styles?.axies?.y?.label ?? false)) ?? true,
                  },
                },
                ...styles?.axies?.y,
              },
              X: {
                name: "X",
                strokeWidth: 1.3,
                strokeColor: "black",
                visible: styles?.axies?.x?.visible ?? true,
                ticks: {
                  drawZero:
                    styles?.axies != undefined && !styles?.axies?.y?.visible
                      ? true
                      : false,
                  strokeColor: "grey",
                  minorTicks: 0,
                  visible:
                    styles?.grids?.x?.visible ||
                    (styles?.grids?.x?.visible !== false &&
                      styles?.axies?.x?.visible),
                  label: {
                    visible: styles?.axies?.x?.visible ?? true,
                  },
                },
                ...styles?.axies?.x,
              },
            },
          };
      
          let board = JXG.JSXGraph.initBoard(id, { ...style });
      
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
            ...style.navbar,
          };
      
          return board;
        }
      
        createPoints(params = {}) {
          const { styles, points } = params;
          const resultPoints = points.map((point, i) => {
            console.log(point?.style)
            const newPoint = this.addPoint(point);
            if (!Array.isArray(point)) {
              const style = { ...{ ...styles, visible: false, ...point?.style } }
              newPoint.setAttribute(style);
            }
            return newPoint;
          });
          return resultPoints;
        }
      
        createCurves(params) {
          const { styles, curves } = params;
          return curves.map((curve) => this.addCurve({ curve, styles })) ?? [];
        }
      
        createLines(params) {
          const { lines, styles } = params;
          if (!Array.isArray(params.lines)) {
            params.lines = [params.lines];
          }
      
          return lines.map((line) => {
            let pointResult;
      
            if (this.checkPointForm(line.points)) {
              pointResult = line.points;
            } else {
              pointResult = this.createPoints({
                styles: line.pointsStyle,
                points: line.points,
              });
            }
      
            const style = {
              strokeColor: "black",
              fixed: true,
              straightFirst: false,
              straightLast: false,
              firstArrow: false,
              lastArrow: false,
              strokeWidth: 2,
              name: "",
              label: {
                visible: line.name,
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
              ...styles,
              ...line.style,
            };
      
            const newLine = this.board.create("line", pointResult, style);
      
            newLine.iMod = params.iMod;
            newLine.typeCurve = line.typeCurve;
            newLine.point1.setAttribute({ ...line.pointsStyles });
            newLine.point2.setAttribute({ ...line.pointsStyles });
      
            if (line.name) {
              gTextDefault({ ...params, texts: [line.name] });
            }
      
            if (line.interactive) {
            }
            return newLine;
          });
        }
      
        checkPointForm(points) {
          return points.some(
            (point) => typeof point === "object" && typeof point.X === "function"
          );
        }
      
        createEllipses(params) {
          const { ellipses } = params;
          ellipses.forEach((square) => {
            const newSquare = this.board.create("polygon", [
              [square.p1.x, square.p1.y],
              [square.p1.x, square.p2.y],
              [square.p2.x, square.p2.y],
              [square.p2.x, square.p1.y],
            ]);
          });
        }
      
        createTexts() { }
      
        createArcs(params) {
          const { arcs, arc } = params;
      
          if (arcs && Array.isArray(arcs)) {
            return arcs.map((arc) => {
              return this.createArcs({ arc });
            });
          }
      
          const newArc = this.board.create(
            "arc",
            this.createPoints({ styles: arc.pointsStyle, points: arc.points }),
            arc.style
          );
      
          if (arc.name) {
            gTextDefault({ texts: [arc.name] });
          }
      
          if (arc.interactive) {
            newArc.on("down", () => callback({ attractor: newArc }));
          }
          return newArc;
        }
      
        addPoint(point) {
          let { style = {} } = point;
          const element = { ...point };
      
          if (Array.isArray(point)) {
      
            element.x = point[0];
            element.y = point[1];
      
            style = {
              size: point[4] ?? 2,
              name: point[3] ?? "",
              label: {
                visible: undefined != point[3] && point[3] != "" ? true : false,
                autoPosition: true,
                offset: point[8] ?? [0, 10],
                fontSize: point[7] ?? 14,
              },
              fixed: false,
              visible: point[2] ?? false,
              fillcolor:
                typeof point[5] == "string" ? point[5] : point[5] ? "white" : "black",
              strokeColor: typeof point[5] == "string" ? point[5] : "black",
              color: typeof point[6] == "string" ? point[6] : "black",
              ...point?.style
            };
          }
          const newPoint = this.board.create("point", [element.x, element.y], {
            size: 2,
            name: "",
            label: {
              visible: style.name != undefined,
              autoPosition: true,
              offset: [0, 10],
              fontSize: 14,
            },
            fixed: false,
            visible: true,
            color: "black",
            ...style,
      
          });
      
          newPoint.ignore = point.ignore;
          newPoint.notEliminate = true;
          newPoint.iMod = point.i;
          newPoint.label.ignore = true;
          return newPoint;
        }
      
        addCurve(params) {
          const { curve, styles } = params;
          const points = curve.points;
      
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
            ...styles,
            ...curve.style,
          };
      
          const cAux = this.board.create(
            "cardinalspline",
            [
              this.createPoints({ styles: curve.pointsStyle, points: points }),
              curve.flex ?? 1,
              "centripetal",
            ],
            style
          );
      
          if (curve.name) {
            gTextDefault({ ...params, texts: [curve.name] });
          }
      
          cAux.iMod = params.iMod;
          cAux.typeCurve = curve.typeCurve || "curve";
      
          if (curve.interactive) {
      
          }
          return cAux;
        }
      
        createPolygons(params) {
          const { polygons } = params;
          if (polygons && Array.isArray(polygons)) {
            return (
              polygons.map((polygon) => {
                const pointsStyle = {
                  fixed: true,
                  visible: false,
                  ...polygon.pointsStyle,
                };
      
                if (polygon.name) {
                  addTexts({ texts: [polygon.name] });
                }
                return this.createPolygons({ polygons: polygon, pointsStyle });
              }) ?? []
            );
          }
      
          const { points, styles } = polygons;
          return this.board.create(
            "polygon",
            this.createPoints({ styles: polygons.pointsStyle, points }),
            {
              fixed: true,
              withLines: false,
              fillColor: "red",
              fillOpacity: 0.1,
              vertices: { visible: false, fixed: true },
              ...styles,
            }
          );
        }
      
        createInputs(params) {
          const { inputs } = params
          inputs.map((input) => {
      
            const { x, y, value, style } = input
  
            const newInput = this.board.create('text',
              [
                x + (style?.input?.noiseX ?? 0),
                y + (style?.input?.noiseY ?? 0)
                , `<math-field
              class='colorInput'
              style=' ${style?.mathStyle ?? ''}'
               ${(style?.disabled||value&& style?.disabled!==false) ? 'disabled' : ''}
               ></math-field>`
      
              ], { anchorX: 'middle', anchorY: 'middle', ...style, fixed: true, layer: 20 }
            );
      
            const mathfield = newInput.rendNode.childNodes[0];
      
          const math=  new MathfieldElement()

          if (style?.disabled||!value) {
            mathfield.addEventListener("focusin", () => {
              console.log('se pulsa 3')
              mathVirtualKeyboard.layouts = ['numeric-only'];
             /*  mathVirtualKeyboard.visible = false; */
              mathVirtualKeyboard.show()
            });
          }

            mathfield.value = value ?? "";
            //resuelve el peo de la escritura de caracteres especiales con el teclado que seria los shorkcuts
            mathfield.inlineShortcutTimeout = 1
      
            mathfield.layouts = ["minimalist"];
          })
      
      
        }
      
        addEllipses(point) {
          this.createPoints({ points: [{ x: 0, y: 0, visible: true, ...point }] });
        }
      
        addTexts(point) {
          this.createPoints({ points: [{ x: 0, y: 0, visible: true, ...point }] });
        }
      }
      
      
      // test esta prueba revisa la creacion de todos los 
      // objetos y ademas los llamados de los metodos 
      // Objeto literal que contiene las características del tablero y las listas indicadas
      
      const definition = {
        id: "jxgbox",
        styles: {
          boundingbox: [-5, 5, 5, -5],
          grids: { x: { visible: false }, y: { visible: false } },
          axies: {
            y: {
              visible: false,
              strokeColor: "green",
            },
            x: {
              visible: true,
              strokeColor: "red",
              label: { visible: false }
            },
          },
        },
        points: [
          { x: 1, y: 1, style: { visible: true } },
          [3, 2, true],
        ],
        lines: [
          //{ points: [[0, 2], [2, 2]], style: { dash: 2 } },
          {
            pointsStyles: {
              color: "blue",
              visible: true,
            },
            points: [[-2, -3, true],
            { x: 2, y: -3, style: { visible: true } }],
          },
        ],
        curves: [
          {
            points: [
              [-3, -1, true],
              { x: 1.5, y: -1 },
              { x: 2, y: -2 }]
          }
          
        ],
        polygons: [
          {
            pointsStyle: {
              visible: true,
            },
            styles: { fillOpacity: 1 },
            points: [
              { x: 3, y: 3, style: { visible: false, color: 'red' } },
              { x: 1, y: 1 },
              { x: -2, y: 1 },
            ],
          },
        ],
        arcs: [
          {
            points: [
              [1, 0],
              [0, 0],
              [2, 0],
            ],
          },
          {
            points: [
              [0, 1],
              [0, 2],
              [0, 0],
            ],
          },
        ],
      };
      
      // Crear una instancia de la clase baseBoards con el objeto literal definition
      //const baseBoardsX = new baseBoards(definition);
      
      //baseBoardsX.addPoint({ x: 2, y: 3, style: { color: "green" } });