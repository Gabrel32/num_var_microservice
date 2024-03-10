class Engine extends baseBoards {
  constructor(def) {
    super();
    this.valueDefaults = def.valuesDefault
    this.conditions = def.conditions;
    this.allPoints = [];
    this.validation = new ValidationDiagrama();
    this.idTemplate = def.tmp
    this.tmp = document.querySelector(`#${this.idTemplate}`)
    this.htmlNode = this.tmp.content.firstElementChild.cloneNode(true)
    this.contentBoards = this.htmlNode.querySelector(".boards")
    this.content = document.querySelector("body")


    this.content.appendChild(this.htmlNode)
  }

  resetInputs() {
    const inputFields = this.htmlNode.querySelectorAll('.show');
    inputFields.forEach((inputField) => {
      inputField.value = '';
      inputField.style.backgroundColor = 'transparent'
    });
  }

  templateInsert = () => {
    if (!document.querySelector(`#${this.idTemplate}`)) {
      document.body.insertAdjacentHTML('afterend', $templateDefaults);
    }
    return this.htmlNode
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
      this.lines.forEach(element => {

        if (Array.isArray(element)) {
          this.linesPoint(element, {}, board)
        } else {
          this.linesPoint(element.position, element.styles, board)
        }
      })

      this.array.forEach((element) => {

        // destructurado
        const { x, y, value, type } = element
        //invocación sin "element"
        this.createInputs(x, y, value, type, board)
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

  createInputs(x, y, text, type = 1, board) {
    this.htmlNode.addEventListener("keydown", (evt) =>
      evt.preventDefault(), { capture: true });

    this.htmlNode.mathVirtualKeyboardPolicy = "auto";
    this.htmlNode.addEventListener("focusin", (e) => {

      if (e.target.matches('.show')) {
        mathVirtualKeyboard.show()
      } else {

        mathVirtualKeyboard.hide()
      }

      this.iniciarTimer
    });
    return board.create(
      "fo",
      [`<math-field value='${text ?? " "}' ${!text ? " " : 'disabled'} 
	  class='${text ? " " : 'show'}
${type == 1 ? `inputClass` :
          (type == 2 ? `inputCuadrado` :
            (type == 3 ? `inputXpansion` : `inputFormula`))
        }'></math-field>`, [x, y]],
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
