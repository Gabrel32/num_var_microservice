class Engine extends BaseEngine {
  constructor(def,defBoard) {
    super(defBoard);
    this.defBoard = defBoard
    this.valueDefaults = def.valuesDefault
    this.allPoints = [];
    this.idTemplate = def.tmp
    this.tmp = document.querySelector(`#${this.idTemplate}`)
    this.htmlNode = this.tmp.content.firstElementChild.cloneNode(true)
    this.contentBoards = this.htmlNode.querySelector(".boards")
    this.content = document.querySelector("body")
    this.content.appendChild(this.htmlNode)
  }
  templateInsert = () => {
    if (!document.querySelector(`#${this.idTemplate}`)) {
      document.body.insertAdjacentHTML('afterend', $templateDefaults);
    }
    return this.htmlNode
  }
  boardTypes(type = 1,valueDefault) {
    const {
      inputA,
      inputB,
      inputC,
      inputD,
      inputE,
      inputF,
      inputG,
    } = valueDefault
    //dejalo quieto
    switch (type) {
      case 1:


        this.lines = [
          [[-3, 2.5], [-3, 1.5]],
          [[0, 2.5], [0, 1.5]],
          [[0, 1.5], [-1.5, 1.5]],
          [[-3, 1.5], [-1.5, 1.5]],
          [[3, -1.5], [-1.5, -1.5]],
          { styles: { lastArrow: true }, position: [[0, -1.5], [0, -3]] },
          { styles: { lastArrow: true }, position: [[-1.5, 1.5], [-1.5, 0.5]] },
          [[3, 2.5], [3, -1.5]],
          [[-1.50, -0.5], [-1.50, -1.50]],
        ]
        this.array = [
          { x: -3, y: 3.6, value: inputA },
          { x: 3, y: 3.6, value: inputB },
          { x: 0, y: 3.6, value: inputC },
          { x: 0, y: -3.5, value: inputD },
          { x: -1.5, y: -0.1, value: inputE },
          { x: -1.5, y: 2.8, value: inputF, type: 2 },
          { x: 1, y: -0.2, value: inputG, type: 2 },
        ]

        break;
      case 2:

        this.lines = [
          [[3, 2.5], [3, 1.5]],
          [[0, 2.5], [0, 1.5]],
          [[0, 1.5], [1.5, 1.5]],
          [[3, 1.5], [1.5, 1.5]],
          [[-3, -1.5], [1.5, -1.5]],
          { styles: { lastArrow: true }, position: [[0, -1.5], [0, -3]] },
          { styles: { lastArrow: true }, position: [[1.5, 1.5], [1.5, 0.5]] },
          [[-3, 2.5], [-3, -1.5]],
          [[1.50, -1.5], [1.50, 1.50]],
        ]
        this.array = [
          { x: -3, y: 3.6, value: inputA },
          { x: 0, y: 3.6, value: inputB},
          { x: 3, y: 3.6, value: inputC},
          { x: 1.5, y: -0.1, value: inputD},
          { x: 0, y: -3.5, value: inputE},
          { x: 1.5, y: 2.8, value: inputF, type: 2 },
          { x: -1, y: -0.2, value: inputG, type: 2 },
        ]

        break;
      case 3:
        this.lines = [
          [[-1.5, 2.5], [-1.5, 1.5]],
          [[1.5, 2.5], [1.5, 1.5]],
          [[0, 1.5], [1.5, 1.5]],
          [[-1.5, 1.5], [1.5, 1.5]],
          { styles: { lastArrow: true }, position: [[0, -1], [0, -3]] },
          [[0, 1.4], [0, 0.5]]

        ]
        this.array = [
          { x: -1.5, y: 3.6, value: inputA },
          { x: 1.5, y: 3.6, value:inputB},
          { x: 0, y: -3.5, value: inputC },
          { x: 0, y: 0, value: inputD },
          { x: 0, y: 2.8, value: inputE, type: 2 },
        ]
        break
      case 4:
        this.lines = [
          [[-1.5, 2.5], [-1.5, 0.8]],
          [[1.5, 2.5], [1.5, 0.8]],
          [[-1.5, 0.8], [1.5, 0.8]],
          { styles: { lastArrow: true }, position: [[0, 0.8], [0, -0.4]] },

        ]
        this.array = [
          { x: -1.5, y: 3.6, value: inputA },
          { x: 1.5, y: 3.6, value: inputB },
          { x: 0, y: -1, value: inputC },
          { x: 0, y: 2.2, value: inputD, type: 2 },
        ]
        break
      //si
      default:
        break;
    }
  }
  initEngine() {
    // timer
    this.initTimer(this.htmlNode)
    this.valueDefaults.forEach(value=>{
      this.boardTypes(value.type,value)

      let board = document.createElement("div")
      board.id = value.id
      board.classList.add("board")
      this.contentBoards.appendChild(board)

      board = JXG.JSXGraph.initBoard(value.id,
      {
        showcopyright: false,
        shownavigation: false,
          boundingbox: [-5, 5, 5, -5],
          axis: this.bool2,
          ticks: { visible: false },
      pan: {
      enabled: false,   // Allow panning
      needTwoFingers: true, // panning is done with two fingers on touch devices
      needShift: true, // mouse panning needs pressing of the shift key
      },
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
      this.lines.forEach(element => {
  
        if (Array.isArray(element)) {
          this.linesPoint(element,{},board)
        } else {
          this.linesPoint(element.position, element.styles,board)
        }
      })
      
      this.array.forEach((element) => {
  
        //destructurado
        const { x, y, value, type } = element
        //invocación sin "element"
        this.createInput1(x, y, value, type,board)
      })
    })


  }


  linesPoint(position, style, board) {
    
    board.create('line', position,
      {
        strokecolor: 'blue',
        strokeWidth: 2,
        straightFirst: false,
        straightLast: false,

        fixed: true,
        ...style
      })

  }

  createInput1(x, y, text, type = 1,board) {
    return board.create(
      "text",
      [x, y, `<math-field value='${text ?? " "}' ${!text ? " ":'disabled'} 
	  class='${type == 1 ? `inputClass` : `inputCuadrado`}'></math-field>`],
      {
        anchorX: "middle",
        anchorY: "middle",
        fixed: true,
        layer: 70,
        fontSize: 8,
        fontUnit: 'vmin',
      }
    );
  }

}
