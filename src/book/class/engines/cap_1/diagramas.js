class Engine extends baseBoards {
  constructor(def) {
    super();
    this.valueDefaults = def.valuesDefault
    this.conditions = def.conditions;
    this.inputsValidate = []
    this.allPoints = [];
    this.validation = new ValidationDiagrama();
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

  iniTMainReset() {
    const inputFields = this.htmlNode.querySelectorAll('.show');
    inputFields.forEach((inputField) => {
      inputField.value = '';
      inputField.classList.remove('passInLibrary')
      inputField.classList.remove('failedInLibrary')
    });

  }
  initEngine() {
    // timer

    this.initTimer(this.htmlNode)
    this.valueDefaults.forEach(value => {
      this.boardTypes(value.type, value)

      let board = document.createElement("div")
      board.id = value.id
      board.classList.add("board")
      this.contentBoards.appendChild(board)
      board = JXG.JSXGraph.initBoard(value.id,
        {
          grid: false,
          showcopyright: false,
          shownavigation: false,
          boundingbox: [-7, 10, 7, -9],
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
      this.board = board;
      this.lines.forEach(element => {

        if (Array.isArray(element)) {
          this.linesPoint(element, {}, board)
        } else {
          this.linesPoint(element.position, element.styles, board)
        }
      })

      this.array.forEach((element) => {

        //destructurado
        const { x, y, value, type } = element
        //aqui
        //agrega a loss inputs a validar 
        this.inputsValidate.push(...this.defineInput(x, y, value, type))

      })
    })
  }

  boardTypes(type = 1, valueDefault) {
    const {
      inputA,
      inputB,
      inputC,
      inputD,
      inputE,
      inputF,
      inputG,
      inputH,
    } = valueDefault
    //dejalo quieto
    switch (type) {
      case 1:

        this.lines = [
          [[5, 3], [5, -4.2]],
          [[-0, 1.5], [-0, 3]],
          [[-4.9, 1.5], [-0, 1.5]],
          [[-2.3, -4.2], [5, -4.2]],
          { styles: { lastArrow: true }, position: [[1.3, -4.2], [1.3, -5.7]] },
          { styles: { lastArrow: true }, position: [[-2.3, 1.5], [-2.3, -0]] },
          [[-4.9, 1.5], [-4.9, 3]],
          [[-2.3, -4.2], [-2.3, -3.3]],
          { styles: { color: 'black' }, position: [[-7, -9], [-7, 11]] },
          { styles: { color: 'black' }, position: [[7, -9], [7, 11]] },

        ]
        this.array = [
          { x: -4.8, y: 4.6, value: inputA },
          { x: 0, y: 4.6, value: inputB },
          { x: 5, y: 4.6, value: inputC },
          { x: -2.3, y: -1.6, value: inputD },
          { x: 1.3, y: -7.3, value: inputE },
          { x: -2.4, y: 2.7, value: inputF, type: 2 },
          { x: 1.3, y: -2.5, value: inputG, type: 2 },
        ]

        break;
      case 2:

        this.lines = [
          [[5, 3], [5, 1.5]],
          [[-0.4, 1.5], [-0.4, 3]],
          [[-0.4, 1.5], [5, 1.5]],
          [[-4.9, -4.2], [2.3, -4.2]],
          { styles: { lastArrow: true }, position: [[-1.3, -4.2], [-1.3, -5.7]] },
          { styles: { lastArrow: true }, position: [[2.3, 1.5], [2.3, -0]] },
          [[-4.9, 3], [-4.9, -4.2]],
          [[2.3, -4.2], [2.3, -3.3]],
          { styles: { color: 'black' }, position: [[-7, -9], [-7, 11]] },
          { styles: { color: 'black' }, position: [[7, -9], [7, 11]] },
        ]
        this.array = [
          { x: -4.8, y: 4.6, value: inputA },
          { x: -0.4, y: 4.6, value: inputB },
          { x: 5, y: 4.6, value: inputC },
          { x: 2.3, y: -1.6, value: inputD },
          { x: -1.3, y: -7.3, value: inputE },
          { x: 2.3, y: 2.7, value: inputF, type: 2 },
          { x: -1.3, y: -2.5, value: inputG, type: 2 },
        ]

        break;
      case 3:
        this.lines = [
          [[-2.8, 4], [-2.8, 1.8]],
          [[3.2, 4], [3.2, 1.8]],
          [[-2.8, 1.8], [3.2, 1.8]],
          { styles: { lastArrow: true }, position: [[0.3, 1.8], [0.3, -0.1]] },
          { styles: { lastArrow: true }, position: [[0.3, -3.3], [0.3, -5]] },
          { styles: { color: 'black' }, position: [[-7, -9], [-7, 11]] },
          { styles: { color: 'black' }, position: [[7, -9], [7, 11]] },
        ]
        this.array = [
          { x: -2.8, y: 5.6, value: inputA },
          { x: 3.2, y: 5.6, value: inputB },
          { x: 0.3, y: -6.6, value: inputC },
          { x: 0.4, y: -1.7, value: inputD, type: 3 },
          { x: 0.4, y: 3, value: inputE, type: 2 },
        ]
        break
      case 4:
        this.lines = [
          [[-2.8, 4], [-2.8, 1.8]],
          [[3.2, 4], [3.2, 1.8]],
          [[-2.8, 1.8], [3.2, 1.8]],
          { styles: { lastArrow: true }, position: [[0.3, 1.8], [0.3, -0.1]] },
          { styles: { color: 'black' }, position: [[-7, -9], [-7, 11]] },
          { styles: { color: 'black' }, position: [[7, -9], [7, 11]] },

        ]
        this.array = [
          { x: -2.8, y: 5.6, value: inputA },
          { x: 3.2, y: 5.6, value: inputB },
          { x: 0.4, y: -1.7, value: inputC },
          { x: 0.3, y: 3, value: inputD, type: 2 },
        ]
        break
      

      //si
      default:
        break;
    }
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
  //aqui
  defineInput(x, y, text, type = 1) {/* toma las caracteristicas por input individual retorna un array */
    return this.createInputs({
      inputs: [{
        x, y,
        value: text,
        style: {
          mathClass:
            type == 1 ?
              `inputClass` : (type == 2 ? `inputCuadrado` :
                (type == 3 ? `inputXpansion` : `inputFormula`)),
          mathRest:
            text !== "" ? " " : 'show',
        }
      }]
    });
  }

}
